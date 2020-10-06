import React, { useContext, useState } from 'react';
import './Register.css';

import mainLogo from '../../mainLogo.png';
import { Redirect, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';



const Register = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext)
   const [result, setResult ] = useState({count : false})

   

   const { register, handleSubmit } = useForm();
    const onSubmit = formData => {
        const dataform = {...formData, photoId: loggedInUser.photoId}
  
        fetch('https://damp-lake-82353.herokuapp.com/addregister',{
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body: JSON.stringify(dataform)
        })
            .then(res => res.json())
            .then(data =>{
                setResult(data)
            })
         
        }
 
   
        const user = JSON.parse(sessionStorage.getItem('loginUser'))

    return (
        <div className="text-center">
          
             <img className="mainLogo" src={mainLogo} alt=""/>
                <div className="register_box">
                    <h3>Register as a Volunteer</h3>
                   <div className="input_box">
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <input ref={register} placeholder="Full Name" value={user.displayName} type="text" name="name" id="name" required/><br/>
                            <input ref={register} placeholder="Username or Email" value={user.email} type="email" name="email" id="email" required/><br/>
                            <inpu ref={register} value={loggedInUser.photoId} type="text" className="d-none" required/>


                            <input ref={register}  type="date" name="date" id="dateofbirth" required/>

                            <input ref={register}  placeholder="Write Some Description" type="text" name="description" id="" required/><br/>
                            <input  ref={register} className="btn_last" value={loggedInUser.title} type="text" name="registerName" id="" required/><br/>
                            <input value="Registration" className="btn  btn-primary" type="submit" name="submit" id="submit" />
                        </form>
                    </div> 
                </div>
           
              {
                  result.insertedCount> 0 ? <Redirect to="/allregister"></Redirect>: <Redirect to="/register"></Redirect>
              }
        </div>
    );
};

export default Register;