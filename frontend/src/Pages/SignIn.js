import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import axios from 'axios';

const SignIn = () =>{

    const [userDetails, setUserDetails] = useState({
        'username': '',
        'password': ''
    });
  
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})

    }

    const handleSubmit = async(event) => {
        console.log(userDetails);
        event.preventDefault();
        try{
            axios
            .post('',userDetails)
            .then((response)=>{
                console.log(response);
                const{status ,message} = response.data;
                if(status == 'success'){
                    alert("successful signup");
                }
                else{
                    alert("unsuccessful signup");
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
                    username: <input type = 'text' value = {userDetails.username} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    password: <input type = 'alphanum' value = {userDetails.password} onChange={handleChange} ></input> 
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