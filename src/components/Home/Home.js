import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import img from '../../img-support.jpg'
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const Home = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [valunteer, setValunteer] = useState([])
    
    useEffect(()=>{
        fetch('http://localhost:5050/allValunteer')
        .then(res => res.json())
        .then(data => setValunteer(data))

    },[])
    const handleClick = (event) => {
        const title = event.target.alt;
        const photoId = event.target.src;
        setLoggedInUser({title: title,photoId: photoId})
    }


    return (
        <div>
           <div className="first_section">
            <div className="background">
                </div>
                    <h1 className="text-center">i grow by helping people in need.</h1>

                        <div className="search">
                            <div className="row">
                            
                                <div class="search">
                                <input type="text" className="form-control "  placeholder="Search" />
                                <button type="submit" className="search_btn btn btn-primary ">Search</button>
                                </div>
                            </div>
                        </div>
           </div>
           <div className="second_section">
                <div className="container">
                    <div className="row">
                      {
                          valunteer.map(single =>  <div className="col-md-3">
                          <div onClick={handleClick} className="card" style={{width: "18rem"}}>
                          <Link to='/register'> 
                              <img src={single.photoId} className="card-img-top" alt={single.name}/>
                              <div className="card-body">
                              <h5 style={{background:"tomato"}} class="card-text">{single.name}</h5>
                                    </div>
                            </Link>
                                </div>
                            </div>)
                      }
                       
                    
                    </div>
                </div>
           </div>
          
        </div>
    );
};

export default Home;