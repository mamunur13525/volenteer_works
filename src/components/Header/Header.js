import React, { useContext } from 'react';
import './Header.css';
import mainLogo from '../../mainLogo.png';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    
    return (
        <div>
             
                    <nav class="navbar navbar-expand-lg navbar-light ">
                    <div className="container">
                    <img class="mainLogo" src={mainLogo} alt=""/>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <Link to="/home">  <a class="nav-link" href="#">Home</a></Link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Donation</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Events</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Blog</a>
                            </li>
                            <li class="nav-item">
                                
                                {
                                (loggedInUser.email)?'':<button class="btn btn-primary register-btn">Register</button>
                             }
                            </li>
                            <li class="nav-item">
                            {
                                (loggedInUser.email)?<img className="profile_pic" src={loggedInUser.photoURL}/>:<span></span> 
                             }
                             {
                                (loggedInUser.email)?loggedInUser.displayName: <button class="btn btn-secondary register-btn">Register</button> 
                             }
                            </li>
                        </ul>
                    </div>
                        </div>  
                </nav>    
                  
           
        </div>
    );
};

export default Header;