import React, { useContext, useState } from "react";
import "./Register.css";

import mainLogo from "../../mainLogo.png";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import { createNotification } from "../Shared/Notify";

const Register = () => {
  const [loggedInUser] = useContext(UserContext);
  const [result, setResult] = useState({ count: false });
  const { register, handleSubmit } = useForm();
  const   userData= JSON.parse(localStorage.getItem("userInfo"))||{};
  const onSubmit = (formData) => {
    const dataform = { ...formData, photoId: loggedInUser.photoId };
    fetch("https://voleenter-works.herokuapp.com/addregister", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(dataform),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        createNotification('success','Successfully','Register as a Valunteer')
      }).catch(err=> createNotification('error','Failed','Proceed'))
  };

  console.log({ loggedInUser });
  return (
    <div className="text-center">
      <Link to="/">
        <img loading='lazy' className="mainLogo" src={mainLogo} alt="" />
      </Link>
      <div className="d-flex justify-content-center">
        {loggedInUser.photoId && (
          <div
            style={{
              background: `url(${loggedInUser.photoId})`,
            }}
            className="left_side"
          ></div>
        )}
        <div className="register_box register_bg right_side">
          <h3>Register as a Volunteer</h3>
          <div className="input_box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className="input_feild"
                ref={register}
                placeholder="Full Name"
                value={userData.displayName}
                type="text"
                name="name"
                id="name"
                onChange={console.log}
                required
              />

              <input
                className="input_feild"
                ref={register}
                placeholder="Username or Email"
                value={userData.email}
                type="email"
                name="email"
                id="email"
                onChange={console.log}
                required
              />

              <input
                ref={register}
                value={loggedInUser.photoId}
                type="text"
                className="d-none input_feild"
                onChange={console.log}
                required
              />

              <input
                className="input_feild"
                ref={register}
                type="date"
                name="date"
                id="dateofbirth"
                required
              />

              <input
                className="input_feild"
                ref={register}
                placeholder="Write Some Description"
                type="text"
                name="description"
                required
              />

              <input
                ref={register}
                className="btn_last input_feild"
                value={loggedInUser.title}
                type="text"
                name="registerName"
                onChange={console.log}
                required
              />

              <input
                value="Registration"
                className="btn  btn-primary"
                type="submit"
                name="submit"
                id="submit"
              />
            </form>
          </div>
        </div>
      </div>

      {result.insertedCount > 0 ? (
        <Redirect to="/allregister" />
      ) : (
        <Redirect to="/register" />
      )}
    </div>
  );
};

export default Register;
