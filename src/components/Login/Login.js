import React, { useContext } from 'react';
import mainLogo from '../../mainLogo.png';
import './Login.css';
import google_img from '../../google_logo.png'
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';



require("firebase/auth");
const firebase = require("firebase/app");
   // Initialize Firebase
firebase.initializeApp(firebaseConfig);


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const location = useLocation();
    const history = useHistory();
   

 
   const googleClick =()=>{
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider).then(function(result) {
           
        // The signed-in user info.
        const {displayName, photoURL ,email} = result.user;
        const user = {...loggedInUser, displayName,photoURL,email}
        sessionStorage.setItem('loginUser', JSON.stringify(user))
        setLoggedInUser(user)
            if(loggedInUser.title){
                history.replace(location.state.from)
            }else{
                history.replace('/')
            }

     
        }).catch(function(error) {
        // Handle Errors here.
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;

        });
   }
 

    return (
        <div className="text-center">
                <img className="mainLogo" src={mainLogo} alt=""/>
                <div className="loginBox">
                    <h3>Login With</h3>
                    <div onClick={googleClick} className="continue_google_box">
                        <img className="google_logo" src={google_img} alt=""/>
                        <span>Continue With Google</span>
                    </div>
                   <p className="create_account">Don't have an account?<span href="#">Create an account</span></p> 
                </div>
        </div>
    );
};

export default Login;