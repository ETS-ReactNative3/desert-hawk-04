import React from 'react';
// import MasterDetail from 'my-app/layouts/MasterDetail.js'
// import UserMultiForm from 'my-app/components/forms/UserMultiForm';

import ContactsApp from 'my-app/apps/contacts/ContactsApp';

function Contacts(props) {
  // const { list, detail } = props;
  return (
    // <MasterDetail
    //   list='Contacts left'
    //   detail={
    //     <UserMultiForm
    //       heading='Add new contact'
    //       savePath='contacts'
    //       geoStepperLabel='Contact location'
    //     />
    //   }
    // />
    <ContactsApp/>
  );
}

export default Contacts;