import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Allregister.css";
import { UserContext } from "../../App";

const Allregister = () => {
  const [loggedInUser] = useContext(UserContext);
  const [registerUser, setRegisterUser] = useState([]);
  const [deleted, setDeleted] = useState({});

  useEffect(() => {
    fetch(
      `https://damp-lake-82353.herokuapp.com/registerUser/${loggedInUser.email}`
    )
      .then((res) => res.json())
      .then((data) => setRegisterUser(data))
      .catch((err) => console.log(err));
  }, []);

  const removeDocument = (event, id) => {
    fetch(`https://damp-lake-82353.herokuapp.com/deleteregister/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDeleted(data.ok > 0);
        }
      })
      .catch(err=> console.log(err))
    if (deleted) {
      event.target.parentNode.style.display = "none";
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="row ">
          {registerUser.map((register) => (
            <div className="col-md-6 ">
              <button
                onClick={(event) => removeDocument(event, register._id)}
                className="btn btn-secondary"
                id="buttons"
              >
                Cancel
              </button>
              <div className="allregister_box ">
                <div className="img">
                  <img
                    className={"humanity_hand"}
                    src={register.photoId}
                    alt=""
                  />
                </div>
                <div className="text">
                  <h3>{register.registerName}</h3>
                  <span>{register.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Allregister;
