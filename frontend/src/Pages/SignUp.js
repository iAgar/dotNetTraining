import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import axios from 'axios';

const SignUp = ()=>{

    
    const [userDetails,setUserDetails] = useState({
        'username': '',
        'email': '',
        'dob': '',
        'pin': '',
        'contact': '',
        'address': '',
        'password': ''
    });
    
    const [error,setError] = useState('')
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})
        // console.log(userDetails)
    }
    
    const handlesubmit = async(event) => {
        console.log(userDetails)
        event.preventDefault();

        try {
            axios.post('https://dummy.restapiexample.com/api/v1/create', userDetails).then((response) => {
                console.log(response);
                const{status ,message} = response.data;
                if(status == 'success'){
                    alert("successful signup");
                }
                else{
                    alert("unsuccessful signup");
                }
            })
        }
        catch (error){
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1>Sign Up page</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    username: <br/><input name ='username' type = 'text' value = {userDetails.username} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    email: <br/><input name='email' type = 'email' value = {userDetails.email} onChange={handleChange}/> 
                </div>
                <br/>
                <div>
                    dob: <br/><input name = 'dob' type = 'date' value = {userDetails.dob} onChange={handleChange} /> 
                </div>
                <br/> 
                <div>
                    contact: <br/><input name = 'contact' type = 'text' value = {userDetails.contact} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    pin: <br/><input name = 'pin' type = 'number' value = {userDetails.pin} onChange={handleChange}/> 
                </div>   
                <br/>            
                <div>
                    address: <br/><input name = 'address' type = 'text' value = {userDetails.address} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    password: <br/><input name = 'password' type = 'alphanum' value = {userDetails.password} onChange={handleChange} ></input> 
                </div>
                <br/>
                <div>
                    <button type = 'submit'>Sign Up</button>
                </div>
                <br/>
                <div>Already a user ? <a href="">Sign In</a></div>
            </form>
        </div>
    )
} 
export default SignUp;