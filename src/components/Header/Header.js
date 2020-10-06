import React, { useContext } from 'react';
import './Header.css';
import mainLogo from '../../mainLogo.png';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    
    return (
        <div>
             
                    <nav className="navbar navbar-expand-lg navbar-light ">
                    <div className="container">
                    <img className="mainLogo" src={mainLogo} alt=""/>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/home">  <span className="nav-link" href="#">Home</span></Link>
                            </li>
                            <li className="nav-item">
                            <span className="nav-link" href="#">Donation</span>
                            </li>
                            
                            <li className="nav-item">
                                {
                                    loggedInUser.email ?<span></span>:<Link to='/login'><span className="nav-link" href="#">Login</span></Link>

                                }
                            </li>
                          
                            <li className="nav-item">
                            {
                                loggedInUser.email ? <img className="profile_pic" src={loggedInUser.photoURL}/>:<span></span> 
                             }
                             {
                                loggedInUser.email ? loggedInUser.displayName: <button className="btn btn-secondary register-btn">Register</button> 
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