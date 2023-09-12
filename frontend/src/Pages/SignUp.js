import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';

const SignUp = ()=>{

    
    const [userDetails,setUserDetails] = useState({
        'userid': 0,
        'email': '',
        'dob': '',
        'uname': '',
        'proof': '',
        'pass': ''
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
        // <Router>
        <div>
            <h1>Sign Up page</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    username: <br/><input name ='uname' type = 'text' value = {userDetails.uname} onChange={handleChange} /> 
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
                    PAN: <br/><input name = 'proof' type = 'text' value = {userDetails.proof} onChange={handleChange} /> 
                </div>
                <br/>
             
                <div>
                    password: <br/><input name = 'pass' type = 'alphanum' value = {userDetails.pass} onChange={handleChange} ></input> 
                </div>
                <br/>
                <div>
                    <button type = 'submit'>Sign Up</button>
                </div>
                <br/>
                
                <div>
                    <ul>
                        <li>
                            Already a user ? 
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