import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from './userContext.js';
import { useNavigate } from "react-router-dom";

const SignIn = () =>{

    const [userDetails, setUserDetails] = useState({
        'email': '',
        'pass': '',
    });
    const Navigation = useNavigate();
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})

    }

    const handleSubmit = async(event) => {
        console.log(userDetails);
        event.preventDefault();
        try{
            axios
            .post('https://localhost:7180/api/RegisteredUsers/login',userDetails)
            .then((response)=>{
                console.log(response);
                if(response.data.success){
                    alert("successful signin");
                    //send signed in user details using context and route to post-signin
                    <UserContext.Provider value='user'>
                        {/* <Navigate  to = '/CreateAccount' replace={true}/> */}
                            {Navigation("/UserProfile")}
                           
                    </UserContext.Provider>
                    
                }
                else{
                    alert("unsuccessful signin");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br/><br/>
                <div>
                    email: <input name='email' type = 'email' value = {userDetails.email} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    password: <input name='pass' type = 'alphanum' value = {userDetails.pass} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    <button type = 'submit'>Sign In</button>
                </div>
            </form>
        </div>
    )
}
export default SignIn;