import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import './SignUp.css'
import { useEffect } from 'react';
import { UserContext } from './userContext';
import { useContext } from 'react';
import BackButton from '../Component/BackButton';
const SignUp = ()=>{

    
    const [userDetails,setUserDetails] = useState({
        
        'email': '',
        'dob': '',
        'uname': '',
        'proof': '',
        'pass': ''
    });

    const context = useContext(UserContext);
    
    const [error,setError] = useState('')
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})
        // console.log(userDetails)
    }
    
    const handlesubmit = async(event) => {
        console.log(userDetails)
        event.preventDefault();
        const headers = {
            'Content-type': 'application/json',
            //change userdetails here
            'Authorization': `bearer ${context.token}`
        }
        try {
            axios.post('https://localhost:7180/api/Users/register', userDetails, {headers:headers}).then((response) => {
                console.log(response);
                alert(response.data.message);
            }).catch((e)=>{
                console.log(e);
            })
        }
        catch (error){
            setError(error.Message);
        }
    }
    return (
        // <Router>
        <div class="signup-container">
            <br/><br/>
            <h1>Sign Up</h1>
            <BackButton/>
            <form onSubmit={handlesubmit} class = "form-group form-label ">
                <div>
                    Username: <br/><input class = "form-input" name ='uname' type = 'text' value = {userDetails.uname} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    Email: <br/><input class = "form-input" name='email' type = 'email' value = {userDetails.email} onChange={handleChange}/> 
                </div>
                <br/>
                <div>
                    Date of Birth: <br/><input class = "form-input" name = 'dob' type = 'date' value = {userDetails.dob} onChange={handleChange} /> 
                </div>
                <br/> 
                <div>
                    PAN: <br/><input maxLength="10" pattern='[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}' class = "form-input" name = 'proof' type = 'text' value = {userDetails.proof} onChange={handleChange} /> 
                </div>
                <br/>
             
                <div>
                    Password: <br/><input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" class = "form-input" name = 'pass' type = 'password' value = {userDetails.pass} onChange={handleChange} ></input> 
                </div>
                <br/>
                <div>
                    <button type = 'submit' class="signup-button">Sign Up</button>
                </div>
                <br/>
                
                <div>
                    <ul>
                        <li>
                            Already a user? 
                            <Link to='/SignIn'>Sign In</Link>
                        </li>
                    </ul>
                   
                </div>
            </form>
        </div>
        // </Router>
    )
} 
export default SignUp;