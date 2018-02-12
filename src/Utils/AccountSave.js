import { auth , firebase } from '../firebase'

const doSaveAccountInfoToFirebse = (email, name) => {
  const currName = firebase.auth.currentUser.displayName;
  const currEmail = firebase.auth.currentUser.email;

  if (email !== currEmail) {
    try {
      auth.doUpdateEmail(email);
    }
    catch(error) {
      console.log(error);
      throw 'huhuhu';
    };
  };

  if (name !== currName) {
    auth.doUpdateProfile({ displayName: name });
  };
}

export {
  doSaveAccountInfoToFirebse
};