import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function LogIn() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const [newUser, setNewUser] = useState(false)// for user sign in via checkbox

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
  }) // useState initial value

  //context api call from app.jsx
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/"} }
  //code for sign in button
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user
        // console.log(displayName, email, photoURL)

        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        }
        setUser(signedInUser)
      })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }

  //code for sign out button
  const handleSignOut = () => {
    firebase.auth().signOut()
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
        setUser(signedOutUser)
      })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
  }

  //function for sign up form
  const handleSubmit = (e) => {
    console.log(user.email, user.password)

    // this code for the sign up user
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          updateUseName(user.name)
        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // console.log(errorCode, errorMessage)
        });
    }

    // this code for the sign in user
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user }
          newUserInfo.error = ''
          newUserInfo.success = true
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
          history.replace (from)
          console.log('Sign in user info', res.user)
        })
        .catch(error => {
          const newUserInfo = { ...user }
          newUserInfo.error = error.message
          newUserInfo.success = false
          setUser(newUserInfo)
        });
    }
    e.preventDefault()
  }
  //update user name and other information
  const updateUseName = name => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(res => {
      console.log('User name update successfully')
    })
    .catch(error => {
      console.log(error)
    });
  }
//function for facebook sign in button
  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
    .then(res => {
      // The signed-in user info.
      const user = res.user;
      // ...
      console.log('facebook user information', user)
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }
  const handleBlur = (e) => {
    // console.log(e.target.name, e.target.value) //to show this event value with name
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value) //use regular expression for email validation
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6 //pass. should be more than 6 characters
      const passwordHasNumber = /\d{1}/.test(e.target.value) // should have minimum 1 number
      isFieldValid = isPasswordValid && passwordHasNumber
    }
    if (isFieldValid) {
      const newUserInfo = { ...user }
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign in</button>
      }
      {/* facebook sign in */} <br/>
      <button onClick={handleFbSignIn}>Sign in using facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div> // if isSignIn = true, then it will show this div element
      }

      {/* create sign up form for authentication */}
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
      <label htmlFor="newUser">New User Sign UP</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Your name" />} <br />
        <input type="email" name="email" onBlur={handleBlur} placeholder="Your email address" required /> <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required /> <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
      </form>

      {/* to show successful/error message on screen */}
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
      }
    </div>
  );
}

export default LogIn;
