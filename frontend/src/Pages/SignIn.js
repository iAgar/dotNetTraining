import React, { useContext } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { UserContext, UserDispatchContext } from './UserContext.js';
import { useNavigate } from "react-router-dom";

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
                const user = response.data.user;

                if(response.data.success){
                    alert("successful signin");
                    // console.log(user);
                    setUserDetails(user);
                    //send signed in user details using context and route to post-signin
                    // <UserContext.Provider>
                        {/* <Navigate  to = '/CreateAccount' replace={true}/> */}
                        
                    Navigation("/UserProfile",{Users: user})
                           
                    // </UserContext.Provider>
                    
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