// import React, { Component } from 'react';
// import React from 'react';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
// const db = firebase.firestore();
// const path = 'leads';

const BATCH_SIZE = 15; // 20

// ref: https://medium.freecodecamp.org/how-to-master-async-await-with-this-real-world-example-19107e7558ad

// export const loadAsyncData = () => {
//   let timeout;
//   const promise = new Promise((resolve, reject) => {
//     timeout = setTimeout(
//       () =>
//         resolve({
//           example: "value",
//           random: Math.random()
//         }),
//       1000
//     );
//   });
//   promise.cancel = () => clearTimeout(timeout);
//   return promise;
// };

export const loadUserData = async path => {
  // path: string: example: 'users/myUserID/settings' | 'users/myUserID/dashboard'
  // console.log('path\n', path);
  const out = await getUserData(path);
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const getUserData = async path => {
  // console.log('path\n', path);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});
  
  // debugger;
  const a = [];
  const db = firebase.firestore();
  const ready = db;
  if(!ready) return;

  const out = await db.collection(path)
    // .where( 'deletedAt', '==', 0, ) // filters out deleted documents
    // .where( 'name', '==', 'alpha', )
    .orderBy( 'createdAt', 'desc', ) // throws error: "firebase error: the query requires an index"
    .limit(1)
    .get()
    .then(documentSnapshots => {
      documentSnapshots.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data());
        // console.log('createdAt: ', doc.createdAt()); // throws error // must define createdAt, then save it
        // console.log('createdAt: ', doc.get('createdAt')); // undefined
        // console.log('id: ', doc.id); // works
        // console.log('data\n', doc.data()); // works
        a.push({
          ...doc.data(), // !important, this line is FIRST, otherwise docId will be overwritten
          docId: doc.id, // !important, this line is LAST
        });
        // console.log('a\n', a);
        // this.setState(a);
      });
      // console.log('a\n', a);
      return a;
    })
    .then(result => {
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // console.log('result', result);
      // debugger;
      // return result;
      return result[0];
    })
    // .then(() => {
    //   this.unsubscribe(path);
    //   return path;
    // })
    .catch(error => {
      console.error('Error getting documents: \n', error);
      throw new Error(`Unable to get items from: ${path}\nError:\n${error}`);
    });
  // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
  // always set state inside promise!
  // otherwise, function returns before data loads!
  return out;
  // const newState = { items: out };
  // this.setState(newState);
  // }
};

export const loadAsyncData = async ( path, batchSize, lastVisible, searchFilterSortModel, ) => {
  // console.log('path\n', path);
  const batch = batchSize || BATCH_SIZE;
  const out = await getAsyncItems( path, batch, lastVisible, searchFilterSortModel, );
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject,) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const getAsyncItems = async ( path, batchSize = BATCH_SIZE, lastVisible, searchFilterSortModel = {}, ) => {
  // used for reading CRUD objects

  const ready1 = path;
  if(!ready1) return;

  console.log('path\n', path);
  console.log('searchFilterSortModel\n', searchFilterSortModel);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});
  
  const { searchString, searchBy, filterBy = {}, sortBy, sortDirectionIsDescending, } = searchFilterSortModel;

  const batch = batchSize || BATCH_SIZE;
  
  // debugger;
  const data = [];
  const db = firebase.firestore();
  const ready2 = db;
  if(!ready2) return;

  let lastShown;

  const queryInit = await db.collection(path)
    .where( 'deletedAt', '==', 0, ) // filters out deleted documents // deletedAt also used by updateItem (not replacedAt)
    // .where( 'name', '==', 'alpha', )
    .orderBy( 'createdAt', 'desc', ); // throws error: "firebase error: the query requires an index"

  // augment queryInit with searchString, searchBy, filterBy, sortBy, sortDirectionIsDescending,

  // // start compound query in series
  // // note: limited support for compound queries in firestore and need for indexing
  // // requires us to suspend development of this feature and only support simple queries
  // // with limited need for individual indices until this feature is more fully supported
  // // by firesotre

  // const getSearchedQuery = ( query, searchString, searchBy, ) => {
  //   const ready1 = searchString && searchString.length;
  //   if(!ready1) return query;
  //   const ready2 = searchBy && searchBy.length;
  //   if(!ready2) return query;
  //   const out = query.where( searchBy, '==', searchString, );
  //   return out;
  // }
  
  // const getFilteredQuery = ( query, filterBy, ) => {
  //   // example: filterBy = [ 'All', 'Starred', 'Unstarred', 'Won', ... ]
  //   // example: filterBy = [ {field: 'deletedAt', operator: '==', value: 0,}, ... ]
  //   const ready1 = filterBy && filterBy.length;
  //   if(!ready1) return query;
  //   const out = filterBy.map( filter => query.where(filter.field, filter.operator, filter.value,));
  //   return out;
  // }
  
  // const getSortedQuery = ( query, sortBy, sortDirectionIsDescending, ) => {
  //   const ready1 = sortBy && sortBy.length;
  //   if(!ready1) return query;
  //   const out = query.orderBy( sortBy, (sortDirectionIsDescending ? 'desc' : null), );
  //   return out;
  // }

  // const searchedQuery = await getSearchedQuery( queryInit, searchString, searchBy, );
  // const filteredQuery = await getFilteredQuery( searchedQuery, filterBy, );
  // const sortedQuery = await getSortedQuery( filteredQuery, sortBy, sortDirectionIsDescending, );
  // const qualifiedQuery = await sortedQuery;
  // // end compound query in series

  // begin simple query

  const getSearchedQuery = ( searchString, searchBy, ) => {
    const ready1 = searchString && searchString.length;
    if(!ready1) return null;
    const ready2 = searchBy && searchBy.length;
    if(!ready2) return null;
    const out = queryInit.where( searchBy, '==', searchString, );
    return out;
  }
  
  const getFilteredQuery = ({ field, operator, value, }) => {
    // example: filterBy = [ 'All', 'Starred', 'Unstarred', 'Won', ... ]
    // example: filterBy = [ {field: 'deletedAt', operator: '==', value: 0,}, ... ]
    const ready1 = field && operator && value && field.length && operator.length && value.length;
    if(!ready1) return null;
    const out = queryInit.where(field, operator, value,);
    return out;
  }
  
  const getSortedQuery = ( sortBy, sortDirectionIsDescending, ) => {
    const ready1 = sortBy && sortBy.length;
    if(!ready1) return null;
    const out = queryInit.orderBy( sortBy, (sortDirectionIsDescending ? 'desc' : null), );
    return out;
  }

  const qualifiedQuery =
    getSearchedQuery( searchString, searchBy, )
    ||
    getFilteredQuery( filterBy, )
    ||
    getSortedQuery( sortBy, sortDirectionIsDescending, )
    ||
    queryInit;

  // end simple query

  // paginate query
  // ref: docs: https://firebase.google.com/docs/firestore/query-data/query-cursors
  // ref: youtube: https://www.youtube.com/watch?v=poqTHxtDXwU
  // use trinary operator to makes query robust to cases where there is no lastVisible value
  const queryPage = lastVisible ? qualifiedQuery.startAfter(lastVisible) : qualifiedQuery;

  const out = queryPage    
    // .limit(10)
    .limit(batch)
    .get()
    .then(documentSnapshots => {
      documentSnapshots.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data(),);
        // console.log('createdAt: ', doc.createdAt(),); // throws error // must define createdAt, then save it
        // console.log('createdAt: ', doc.get('createdAt'),); // undefined
        // console.log('id: ', doc.id,); // works
        // console.log('data\n', doc.data(),); // works
        // console.log('doc\n', doc,);
        data.push({
          docId: doc.id,
          ...doc.data(),
        });
        // console.log('a\n', a);
        // this.setState(a);
        lastShown = doc;
      });
      // console.log('a\n', a); // {data: arrayOfObjects, lastShown: docSnapshot,}  (same as below two returns)
      return { data, lastShown, };
    })
    .then(result => {
      // always set state inside promise!
      // otherwise, function returns before data loads!
      // console.log('result', result); // {data: arrayOfObjects, lastShown: docSnapshot,} (same as returns above and below)
      // debugger;
      return result;
    })
    // .then(() => {
    //   this.unsubscribe(path);
    //   return path;
    // })
    .catch(error => {
      console.error('Error getting documents: \n', error);
      throw new Error(`Unable to get items from: ${path}\nError:\n${error}`);
    });
    // if not contained within a promise,
    // then this step returns before promise settles;
    // therefore, it returns an empty array
    // therefore, always set state inside promise!
    // otherwise, function returns before data loads!
    // console.log('out\n', out); // {data: arrayOfObjects, lastShown: docSnapshot,} (same as above two returns)
    return out;
    // const newState = { items: out };
    // this.setState(newState);
    // }
};