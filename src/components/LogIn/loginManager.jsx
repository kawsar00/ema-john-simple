import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
  // Initialize Firebase
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(res => {
      const { displayName, email, photoURL } = res.user
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
      }
      setUserToken()
      return signedInUser
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
}

//get user token
const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  .then(function(idToken) {
    sessionStorage.setItem('token', idToken)
  }).catch(function(error) {
    // Handle error
  });
}
 //function for facebook sign in button
 export const handleFbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider)
  .then(res => {
    // The signed-in user info.
    const user = res.user;
    user.success = true;
    return user
    // console.log('facebook user information', user)
  }).catch(function(error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage)
  });
}

//code for sign out button
export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
      }
      return signedOutUser
    })
    .catch(err => {
      console.log(err)
      console.log(err.message)
    })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUseName(name);
          return newUserInfo;
        })
        .catch(error => {
          const newUserInfo = {}
          newUserInfo.error = error.message
          newUserInfo.success = false
          return newUserInfo
        });
}

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
          const newUserInfo = res.user
          newUserInfo.error = ''
          newUserInfo.success = true
         return newUserInfo
        })
        .catch(error => {
          const newUserInfo = {}
          newUserInfo.error = error.message
          newUserInfo.success = false
          return newUserInfo
        });
}

//update user name and other information
const updateUseName = name => {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: name
  }).then(res => {
    console.log('User name update successfully')
  })
  .catch(error => {
    console.log(error)
  });
}