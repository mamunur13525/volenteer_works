import React, { useContext } from "react";
import mainLogo from "../../mainLogo.png";
import "./Login.css";
import google_img from "../../google_logo.png";
import firebaseConfig from "./firebaseConfig";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createNotification } from "../Shared/Notify";

require("firebase/auth");
const firebase = require("firebase/app");
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();
  const googleClick = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then(function (result) {
        // The signed-in user info.
        const { displayName, photoURL, email } = result.user;
        const user = { ...loggedInUser, displayName, photoURL, email };
        localStorage.setItem("userInfo", JSON.stringify(user));
        setLoggedInUser(user);
        createNotification('success', 'Successfully','Log In')
        if (loggedInUser.title) {
          history.replace(location.state.from);
        } else {
          history.replace("/");
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorMessage = error.message || error.email;
        createNotification('error', 'Failed',errorMessage)
        createNotification('error', 'Failed',errorMessage)


      });
  };

  return (
    <div className="text-center">
      <img loading='lazy' className="mainLogo" src={mainLogo} alt="" />
      <div className="loginBox">
        <h3>Login With</h3>
        <div onClick={googleClick} className="continue_google_box">
          <img loading='lazy' className="google_logo" src={google_img} alt="" />
          <span>Continue With Google</span>
        </div>
        <p className="create_account">
          Don't have an account?<span href="#">Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
