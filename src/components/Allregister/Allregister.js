import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Allregister.css';
import humanity_hand from '../../extraVolunteer.png'
import { UserContext } from '../../App';

const Allregister = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [registerUser , setRegisterUser] = useState([])

   useEffect(()=>{
    fetch(`http://localhost:5050/registerUser/${loggedInUser.email}`)
    .then(res => res.json())
    .then(data => setRegisterUser(data))
   },[])

 
const removeDocument= ( id)=>{

        fetch(`http://localhost:5050/deleteregister/${id}` , {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(res => res.json())
        .then(data => (data == true)?alert('register remove'): console.log())
}

    return (
        <div>
            <Header></Header>
            <div className="container">
                        <div className="row ">
            {
                registerUser.map(register =>
                        
                            <div className="col-md-6 ">
                                <div className="allregister_box d-flex">
                                    <div className="img">
                                        <img className={"humanity_hand"} src={register.photoId} alt=""/>
                                        </div>
                                        <div className="text">
                                            <h3>{register.registerName}</h3> 
                                             <span>{register.date}</span>
                                            <button onClick={removeDocument( register._id)} className="btn btn-secondary">Cancel</button>
                                        </div> 
                                </div>
                        
                            </div>
                            
                     
                )
            }
               </div>
                    </div>
        </div>
    );
};

export default Allregister;