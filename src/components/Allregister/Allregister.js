import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { createNotification } from "../Shared/Notify";
import "./Allregister.css";
import BeatLoader from "react-spinners/BeatLoader";
import Trash from '../../images/icon/trash.jpg';


const Allregister = () => {
  const [registerUser, setRegisterUser] = useState({
    status: "not_fetch",
    resultArr: [],
  });
  const [deleted, setDeleted] = useState({});
  const useData = JSON.parse(localStorage.getItem("userInfo"))||{};
  useEffect(() => {
    fetch(`https://voleenter-works.herokuapp.com/registerUser/${useData.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRegisterUser({ status: "fetch", resultArr: data });
      })
      .catch((err) => console.log(err));
  }, []);

  const removeDocument = (event, id) => {
    fetch(`https://voleenter-works.herokuapp.com/deleteregister/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setDeleted(data.ok > 0);
          createNotification("success", "Complete", "Delete your Registration");
        }
      })
      .catch((err) => {
        createNotification("error", "Failed", err);
      });
    if (deleted) {
      event.target.parentNode.style.display = "none";
    }
  };
  console.log(registerUser);
  return (
    <div>
      <Header></Header>
      <div className="container">
        <div className="row ">
          {registerUser.status === "not_fetch" && (
            <div className="d-flex flex-column align-items-center w-100 mt-5">
              <BeatLoader loading={true} color={"#FB543F"} size={15} />
              <p className='mt-3'>Loading</p>
            </div>
          )}
          {registerUser.status === "fetch" &&
            JSON.stringify(registerUser.resultArr) === "[]" && (
              <div className="d-flex flex-column align-items-center w-100 mt-5">
                <img loading='lazy' src={Trash} alt="trash" />
                <span className='mt-3'>NO Register File Yet!</span>
              </div>
            )}

          {registerUser.status === "fetch" &&
            registerUser.resultArr.map((register) => (
              <div key={register._id} className="col-md-6 ">
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
                    loading='lazy'
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
