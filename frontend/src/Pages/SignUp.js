import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

const SignUp = ()=>{
    const [username, setusername] = useState(' ');
    const [email, setemail] = useState(' ');
    const [pin, setpin] = useState(' ');
    const [contact, setcontact] = useState(' ');
    const [address, setaddress] = useState(' ');
    const [dob, setdob] = useState(' ');
    const [password, setpassword] = useState(' ');

    const handleUsername = (event) =>{
        setusername(event.target.value);

    }
    const handledob = (event) =>{
        setdob(event.target.value);

    }
    const handlepin = (event) =>{
        setpin(event.target.value);

    }
    const handleemail = (event) =>{
        setemail(event.target.value);

    }
    const handlepassword = (event) =>{
        setpassword(event.target.value);

    }
    const handleaddress = (event) =>{
        setaddress(event.target.value);

    }
    const handlecontact = (event) =>{
        setcontact(event.target.value);

    }
    
    return (
        <div>
            <form >
                <br/><br/>
                <div>
                    username: <input type = 'text' value = {username} onChange={handleUsername} /> 
                </div>
                <br/>
                <div>
                    email: <input type = 'email' value = {email} onChange={handleemail}/> 
                </div>
                <br/>
                <div>
                    dob: <input type = 'date' value = {dob} onChange={handledob} /> 
                </div>
                <br/> 
                <div>
                    contact: <input type = 'text' value = {contact} onChange={handlecontact} /> 
                </div>
                <br/>
                <div>
                    pin: <input type = 'number' value = {pin} onChange={handlepin}/> 
                </div>   
                <br/>            
                <div>
                    address: <input type = 'text' value = {address} onChange={handleaddress} /> 
                </div>
                <br/>
                <div>
                    password: <input type = 'alphanum' value = {password} onChange={handlepassword} ></input> 
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

