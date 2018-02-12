import { auth } from './firebase';

// Sign up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign in
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();

// Reset pass
export const doPasswordReset = email =>
  auth.sendPasswordResetEmail(email);

// Password change
export const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password);

// Update user info
export const doUpdateProfile = (data) => {
  let currDisplayName = auth.currentUser.displayName;
  let currPhotoURL = auth.currentUser.photoURL;
  if (data.photoURL === '') {
    data.photoURL =  currPhotoURL;
  }
  if (data.displayName === '') {
    data.displayName = currDisplayName;
  }
  auth.currentUser.updateProfile({
    displayName: data.displayName,
    photoURL: data.photoURL,
  })
    .then(() => {
      console.log('Profile updated.');
    })
    .catch((error) => {
      console.log(error);
    });
}

// Update email
export const doUpdateEmail = (email) => {
  auth.currentUser.updateEmail(email)
    .then(() => {
      console.log('Email updated.');
    })
    .catch((error) => {
      console.log(error);
      throw 'uh oh';
    });
}