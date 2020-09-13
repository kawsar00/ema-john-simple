import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


function LogIn() {
  const [newUser, setNewUser] = useState(false)// for user sign in via checkbox

  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: '',
  }) // useState initial value

  // Initialize Firebase
  initializeLoginFramework() 

  //context api call from app.jsx
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/"} }

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }

  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }
  const SignOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  //function for sign up form
  const handleSubmit = (e) => {
    // this code for the sign up user
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    // this code for the sign in user
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    e.preventDefault()
  }

  //avoid repeat code
  const handleResponse = (res, redirect) => {
    setUser(res)
    setLoggedInUser(res)
    history.replace (from)
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
        user.isSignedIn ? <button onClick={SignOut}>Sign out</button> :
          <button onClick={googleSignIn}>Sign in</button>
      }
      {/* facebook sign in */} <br/>
      <button onClick={fbSignIn}>Sign in using facebook</button>
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
