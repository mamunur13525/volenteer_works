import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useForm } from "react-hook-form";
import Footer from "../Footer/Footer";
import spinner from "../../images/icon/spinner.gif";
const Home = () => {
  const { register, handleSubmit } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [valunteer, setValunteer] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    fetch("https://voleenter-works.herokuapp.com/allValunteer")
      .then((res) => res.json())
      .then((data) => setValunteer(data))
      .catch((err) => console.log(err));
  }, []);
  const handleClick = (event) => {
    const title = event.target.alt;
    const photoId = event.target.src;
    setLoggedInUser({ ...loggedInUser, title: title, photoId: photoId });
  };

  const onSubmit = ({ search }) => {
    setSearchValue(search);
  };
  return (
    <div>
      <div className="first_section">
        <div className="background"></div>
        <h1 className="text-center">i grow by helping people in need.</h1>
        <div className="d-flex justify-content-center">
          <div className="search">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="search">
                <input
                  type="search"
                  className="form-control "
                  placeholder="Search"
                  name="search"
                  ref={register}
                />
                <button type="submit" className="search_btn btn btn-primary ">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="second_section">
        <div className="container">
          <div className="row justify-content-center">
            {JSON.stringify(valunteer) === "[]" && (
              <div className="d-flex justify-content-center flex-column align-items-center mb-5">
                <img
                  loading="lazy"
                  style={{ width: "4rem" }}
                  src={spinner}
                  alt="spinner"
                />
                <h3 className="text-center mt-3">Loading</h3>
              </div>
            )}
            {valunteer.filter((item) => {
              if (searchValue === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchValue.toLowerCase())
              ) {
                return item;
              }
            }).length === 0 && searchValue !== "" ? (
              <p>No Search Found!</p>
            ) : (
              valunteer
                .filter((item) => {
                  if (searchValue === "") {
                    return item;
                  } else if (
                    item.name.toLowerCase().includes(searchValue.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((volentire, ind) => (
                  <div
                    key={ind}
                    id={volentire._id}
                    className="col-lg-3 col-md-6 col-sm-12"
                  >
                    {console.log({ volentire })}
                    <div
                      onClick={handleClick}
                      className="card"
                      style={{ width: "18rem", margin: "auto" }}
                    >
                      <Link id={volentire._id} to="/register">
                        <img
                          loading="lazy"
                          src={volentire.image}
                          className="card-img-top"
                          alt={volentire.name}
                        />
                        <div className="card-body">
                          <h5
                            style={{ background: "tomato" }}
                            className="card-text"
                          >
                            {volentire.name}
                          </h5>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
