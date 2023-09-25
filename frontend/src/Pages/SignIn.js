import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { UserContext, UserDispatchContext } from './userContext.js';
import { useNavigate } from "react-router-dom";
import UserProfile from './UserProfile.js';
import './SignIn.css'; 
import BackButton from '../Component/BackButton.js';

const SignIn = () =>{
    const setUserDetails = useContext(UserDispatchContext);

    const [userDetails, setUserLoginDetails] = useState({
        'email': '',
        'pass': '',
    });
    const Navigation = useNavigate();
    const handleChange = (event) => {
        setUserLoginDetails({...userDetails, [event.target.name] : event.target.value})

    }

    const handleSubmit = async(event) => {
        console.log(userDetails);
        event.preventDefault();
        try{
            axios
            .post('https://localhost:7180/api/Users/login',userDetails)
            .then((response)=>{
                
                console.log(response);
                const user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                if(response.data.success){
                    alert("Sign In successful");
                    // console.log(user);
                    setUserDetails(user);
                    //send signed in user details using context and route to post-signin
                    if(!user.user.isAdmin){
                   return  <UserContext.Provider value={user}>
                        {/* <Navigate  to = '/CreateAccount' replace={true}/> */}
                            {Navigation("/UserProfile")}
                           
                    </UserContext.Provider>
                    }else{
                        return <UserContext.Provider value='user'>
                        {/* <Navigate  to = '/CreateAccount' replace={true}/> */}
                            {Navigation("/AdminPostSignIn")}
                           
                    </UserContext.Provider>
                        
                    }
                    
                }
                else{
                    alert("Sign in unsuccessful");
                }
            }).catch((err)=>
                console.log("error", err)
            )
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div class="login-container">
            <h1>Sign In</h1>
            <BackButton/>
            <form onSubmit={handleSubmit} class="login-form">
                <br/><br/>
                <div>
                    Email: <br/> <input name='email' type = 'email' class="form-input" value = {userDetails.email} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    Password: <br/> <input name='pass' type = 'password' class="form-input" value = {userDetails.pass} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    <button class="login-button" type = 'submit'>Sign In</button>
                </div>
            </form>
        </div>
    )
}
export default SignIn;