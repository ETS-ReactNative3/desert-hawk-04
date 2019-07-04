// inspired by: src/my-app/store/actions/my-actions/leadsActions.js
// ref: https://firebase.google.com/docs/firestore/quickstart#next_steps

// import { getComponentsNavConfig, } from 'my-app/config/AppConfig';

// const getNavElement = ({path, settings,}) => {
//   // path: string: 'leads', 'archive', 'outbox'
//   // console.log('path\n', path,);
//   const componentsNavConfig = getComponentsNavConfig(settings,);
//   // console.log('componentsNavConfig\n', componentsNavConfig,);
//   const out = componentsNavConfig.find(x =>
//     (x && x.crudConfig && x.crudConfig.readable && x.crudConfig.readable.path) === path
//   );
//   // console.log('out\n', out,);
//   return out;
// }

const getDashboardNewData = (path, oldData, incrementer, sourceDocId, creatable,) => {
  // uid: string: 'abcxyz'
  // path: string: 'leads'
  // oldData: object: { net: 5, outbox: 4, ... }
  // incrementer: string: 'onCreate' | 'onDelete' (deprecated)
  // incrementer: integer: 1 | -1
  // console.log('path\n', path,); // 'leads'
  // console.log('oldData\n', oldData,); // 'abcxyz'
  // console.log('incrementer\n', incrementer,); // 1
  // console.log('sourceDocId\n', sourceDocId,); // 'abcxyz'
  const timestamp = Date.now();
  // const mapEntityPathNameToDashboard = {
  //   leads: {
  //     outbox: 1,
  //     net: 1,
  //   },
  // };

  // const dashItem = mapEntityPathNameToDashboard[path]; // 'outbox'
  // const oldCount = oldData[dashItem]; // 4
  // const newCount = oldCount + incrementer; // 5
  const out = {
    ...oldData,
    // [dashItem]: newCount, // outbox: 5
    // deletedAt: 0,
    createdAt: timestamp,
    sourceDocPath: path,
    sourceDocId,
  };
  // console.log('out\n', out,);

  // const navElement = getNavElement({path,});
  // const navId = navElement.id; // outbox
  // console.log('navId\n', navId,); // outbox
  // console.log('navElement\n', navElement,); // outbox
  // const dashboardChangeOrders = navElement.dashboardConfig[incrementer]; // deprecated // { archive: 1, withdrawals: 1, net: -1, }
  // const dashboardChangeOrders = navElement.crudConfig.creatable.dashboard.local;
  const dashboardChangeOrders = creatable && creatable.dashboard && creatable.dashboard.local;
  // console.log('dashboardChangeOrders\n', dashboardChangeOrders,); // outbox
  // ref: https://codeburst.io/javascript-the-difference-between-foreach-and-for-in-992db038e4c2
  // dashboardChangeOrders.forEach(r => {
  for (let dashboardItemId in dashboardChangeOrders) {
    // console.log('dashboardItemId\n', dashboardItemId,); // 'outbox' | 'net'
    const delta = incrementer * dashboardChangeOrders[dashboardItemId]; // 1
    // console.log('delta\n', delta,);
    const oldCount = oldData[dashboardItemId]; // 4
    // console.log('oldCount\n', oldCount,);
    const newCount = oldCount + delta; // 5
    // console.log('newCount\n', newCount,);
    out[dashboardItemId] = newCount; // outbox: 5
  };
  // console.log('out\n', out,); // {net: 5, outbox: 5, ...}
  return out;
}

const handleEditDashboard = ( uid, path, oldData, incrementer, sourceDocId, dispatch, getFirestore, creatable, ) => {
  // uid: string: 'abcxyz'
  // path: string: 'leads'
  // oldData: object: { net: 5, outbox: 4, ... }
  // incrementer: integer: 1 | -1 (deprecated)
  // incrementer: string: 'onCreate' | 'onDelete'
  // console.log('uid\n', uid,); // 'abcxyz'
  // console.log('path\n', path,); // 'leads'
  // console.log('incrementer\n', incrementer,); // 1
  const newData = getDashboardNewData(path, oldData, incrementer, sourceDocId, creatable,);
  // console.log('newData\n', newData,); // 1
  const firestore = getFirestore();
  firestore
    .collection('users')
    .doc(uid)
    .collection('dashboard')
    .add(newData)
    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#increment_a_numeric_value
    // .update({
    //   [dashItem] : firestore.FieldValue.increment(incrementer),
    // })
  .then( docRef => {
    // console.log('docRef\n', docRef,);
    dispatch({
      type: 'EDIT_DASHBOARD_SUCCESS',
      value: newData,
    });
  })
  .catch( error => {
    // console.log('error\n', error,);
    dispatch({ type: 'EDIT_DASHBOARD_ERROR', }, error);
  });
}

// source: https://github.com/iamshaunjp/React-Redux-Firebase-App/blob/lesson-18/marioplan/src/store/actions/projectActions.js
export const createItem = ( path, item, uid, dashboard, creatable, ) =>
  (dispatch, getState, { getFirebase, getFirestore, }) => {

    // console.log('path\n', path,);
    // console.log('item\n', item,);
    // console.log('uid\n', uid,);
    // console.log('dashboard\n', dashboard,);
    // console.log('settings\n', settings,);
    // console.log('creatable\n', creatable,);

    if(!item.createdAt) {
      const timestamp = Date.now();
      item.createdAt = timestamp;
    }

    // begin addOns
    // const navElement = getNavElement({path, creatable,});
    // console.log('navElement\n', navElement,)
    const addOns = creatable && creatable.addOns;
    // console.log('addOns\n', addOns,)
    // end addOns


    // const timestamp = Date.now();
    const newData = {
      ...item,
      // createdAt: timestamp,
      deletedAt: 0,
      createdBy: uid,
      // createdAt: new Date(),
      // authorFirstName: 'Net',
      // authorLastName: 'Ninja',
      // authorId: 12345,
      ...addOns,
    };

    // make async call to database
    const firestore = getFirestore();
    // console.log('item\n', item);
    // console.log('firestore\n', firestore);
    // console.log('getState\n', getState);

    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    // firestore.collection('test').add({
    firestore
      .collection(path)
      .add(newData)
    .then( docRef => {
      // console.log('uid\n', uid,); // 'abcxyz'
      // console.log('path\n', path,); // 'leads'
      // console.log('docRef\n', docRef,);
      handleEditDashboard( uid, path, dashboard, 1, docRef.id, dispatch, getFirestore, creatable, );
      // dispatch({ type: 'CREATE_ITEM_SUCCESS', });
    })
    .catch( error => {
      console.error('error\n', error,);
      dispatch({ type: 'CREATE_ITEM_ERROR', }, error);
    });
  }

export const actionItem = ( uid, actionable, settings, dashboard, ) => {
  console.log('uid\n', uid,);
  console.log('actionable\n', actionable,);
  console.log('settings\n', settings,);
  console.log('dashboard\n', dashboard,);
}

export const updateItem = ( path, docId, newItem, oldItem, ) => // uid,
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // ref: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
    // console.log('path\n', path);
    // console.log('docId\n', docId);
    // console.log('getState\n', getState);

    const timestamp = Date.now();
    const newDoc = {
      ...newItem,
      createdAt: oldItem.createdAt,
      updatedAt: timestamp,
      updatedItem: docId,
      deletedAt: 0, // bypass readable filter 
    };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection(path)
      .add(newDoc) // https://firebase.google.com/docs/firestore/manage-data/add-data#add_a_document
    .then( docRef => {
      const newDocId = docRef.id;
      // console.log( 'Document written with ID: ', newDocId, );
      const newData = {
        deletedAt: timestamp, // use deletedAt instead of replacedAt because that's the filter used by LoadAsync.js
        replacedBy: newDocId,
      };
      firestore
        .collection(path)
        .doc(docId)
        // .set(newData // do NOT use .set() method because it overwrites the data
        .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
        // ,{ merge: true, }
        )
        .then(() => {
          dispatch({ type: 'UPDATE_ITEM_SUCCESS', });
        }).catch( error => {
          console.log('error\n', error,);
          dispatch({ type: 'UPDATE_ITEM_ERROR', }, error);
        });
    })
    .then(() => {
      dispatch({ type: 'UPDATE_ITEM_SUCCESS', });
    })
    .catch( error => {
      console.log('error\n', error,);
      dispatch({ type: 'UPDATE_ITEM_ERROR', }, error);
    });
  }

// To "delete" a record, we do NOT use the .delete() method described here: https://firebase.google.com/docs/firestore/manage-data/delete-data
// Instead, we will update the record with a field: deletedAt: Date.now()
// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
// Then, we will query records without a deletedAt field as described here: https://firebase.google.com/docs/firestore/query-data/queries#compound_queries
// example: citiesRef.where("state", "==", "CO").where("deletedAt", "==", false)
export const deleteItem = ( path, docId, uid, dashboard, creatable, ) =>
  (dispatch, getState, { getFirebase, getFirestore, }) => {
    // console.log('path\n', path);
    // console.log('docId\n', docId);
    // console.log('getState\n', getState);

    const timestamp = Date.now();
    const newData = { deletedAt: timestamp, };

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection(path)
      .doc(docId)
      // .set(newData // do NOT use .set() method because it overwrites the data
      .update(newData // use .update() method: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
      // ,{ merge: true, }
      )
    .then( () => {
      handleEditDashboard( uid, path, dashboard, -1, docId, dispatch, getFirestore, creatable, );
      dispatch({ type: 'DELETE_ITEM_SUCCESS', });
    }).catch( error => {
      console.log('error\n', error,);
      dispatch({ type: 'DELETE_ITEM_ERROR', }, error);
    });
  }