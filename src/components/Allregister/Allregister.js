import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Allregister.css';
import humanity_hand from '../../extraVolunteer.png'
import { UserContext } from '../../App';

const Allregister = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [registerUser , setRegisterUser] = useState([])
    const [deleted , setDeleted] = useState({})


   useEffect(()=>{
    fetch(`http://localhost:5050/registerUser/${loggedInUser.email}`)
    .then(res => res.json())
    .then(data => setRegisterUser(data))
   },[])

 
   const removeDocument= (event, id)=>{

    fetch(`http://localhost:5050/deleteregister/${id}` , {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
          }
    })
    .then(res => res.json())
    .then(data =>{
      
        if(data){ 
            setDeleted(data.ok>0)
        }
    })
    if(deleted){
        event.target.parentNode.style.display = 'none';
    }
            
  
}

    return (
        <div>
            <Header></Header>
            <div className="container">
                        <div className="row ">
            {
                registerUser.map(register =>
                        
                            <div className="col-md-6 ">
                                 <button onClick={(event)=>removeDocument(event,register._id)} className="btn btn-secondary" id="buttons">Cancel</button>
                                <div className="allregister_box ">
                                
                                         <div className="img">
                                        <img className={"humanity_hand"} src={register.photoId} alt=""/>
                                        </div>
                                        <div className="text">
                                            <h3>{register.registerName}</h3> 
                                             <span>{register.date}</span>
                                           
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