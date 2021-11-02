import React, { useEffect, useState } from "react";
import "./Header.css";
import mainLogo from "../../mainLogo.png";
import { Link } from "react-router-dom";
import { createNotification } from "../Shared/Notify";

const Header = () => {
  const [userInfo, setInfo] = useState({});
  const [refresh, setFresh] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    userInfo !== null && setInfo(JSON.parse(userInfo));
  }, [refresh]);

  const logOut = () => {
    localStorage.setItem("userInfo", JSON.stringify({}));
    setFresh((prev) => !prev);
    createNotification("success", "Successfully", "Log Out");
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <Link to='/home'>
            <img className="mainLogo" src={mainLogo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto d-flex align-items-center">
              <li className="nav-item active">
                <Link to="/home">
                  {" "}
                  <span className="nav-link" href="#">
                    Home
                  </span>
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" href="#">
                  Donation
                </span>
              </li>
              <li className="nav-item">
                {userInfo.email ? (
                  <span></span>
                ) : (
                  <Link to="/login">
                    <span className="nav-link" href="#">
                      Login
                    </span>
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {userInfo.email ? (
                  <img
                    className="profile_pic"
                    src={userInfo.photoURL}
                    alt="profile_img"
                  />
                ) : (
                  <span></span>
                )}
                {userInfo.email ? (
                  userInfo.displayName
                ) : (
                  <button className="btn btn-secondary register-btn">
                    Register
                  </button>
                )}
              </li>
              <li className="nav-item">
                {userInfo.email && (
                  <button
                    onClick={logOut}
                    className="nav-link btn btn-dark text-light py-1"
                    href="#"
                  >
                    Logout
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
