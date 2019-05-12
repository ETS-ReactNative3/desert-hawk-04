// import React, { Component } from 'react';
// import React from 'react';

// firebase
import firebase from '@firebase/app';
import '@firebase/firestore';
// const db = firebase.firestore();
// const path = 'leads';

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
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
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

export const loadAsyncData = async path => {
  // console.log('path\n', path);
  const out = await getAsyncItems(path);
  // console.log('out\n', out);

  const promise = new Promise((resolve, reject) => {
    resolve(out);
  });
  promise.cancel = () => {};
  return promise;
};

const getAsyncItems = async path => {
  // used for reading CRUD objects
  // console.log('path\n', path);
  // console.log('state\n', this.state);
  // this.setState({isLoading: true});
  
  // debugger;
  const a = [];
  const db = firebase.firestore();
  const ready = db;
  if(!ready) return;

  const out = await db.collection(path)
    .where( 'deletedAt', '==', 0, ) // filters out deleted documents // deletedAt also used by updateItem (not replacedAt)
    // .where( 'name', '==', 'alpha', )
    .orderBy( 'createdAt', 'desc', ) // throws error: "firebase error: the query requires an index"
    // .limit(10)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        // doc.data() is always defined for query doc snapshots
        // console.log(doc.id, '\n', doc.data());
        // console.log('createdAt: ', doc.createdAt()); // throws error // must define createdAt, then save it
        // console.log('createdAt: ', doc.get('createdAt')); // undefined
        // console.log('id: ', doc.id); // works
        // console.log('data\n', doc.data()); // works
        a.push({
          docId: doc.id,
          ...doc.data(),
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
  // console.log('out\n', out); // returns before promise settles; therefore, returns empty array
  // always set state inside promise!
  // otherwise, function returns before data loads!
  return out;
  // const newState = { items: out };
  // this.setState(newState);
  // }
};