import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

const Userdetails = ()=>{
    const [username, setusername] = useState(' ');
    const [email, setemail] = useState(' ');
    const [pin, setpin] = useState(' ');
    const [contact, setcontact] = useState(' ');
    const [address, setaddress] = useState(' ');
    const [dob, setdob] = useState(' ');
    const [balance, setbalance] = useState(' ');

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
    const handlebalance = (event) =>{
        setbalance(event.target.value);

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
                <div>
                    username: <br/> <input type = 'text' value = {username} onChange={handleUsername} /> 
                </div>
                <div>
                    email:<br/> <input type = 'email' value = {email} onChange={handleemail}/> 
                </div>
                <div>
                    dob:<br/> <input type = 'date' value = {dob} onChange={handledob} /> 
                </div> 
                <div>
                    contact:<br/> <input type = 'text' value = {contact} onChange={handlecontact} /> 
                </div>
                <div>
                    pin:<br/> <input type = 'number' value = {pin} onChange={handlepin}/> 
                </div>               
                <div>
                    address: <br/><input type = 'text' value = {address} onChange={handleaddress} /> 
                </div>
                
                <div>
                    balance:<br/> <input type = 'number' value = {balance} onChange={handlebalance} ></input> 
                </div>
                <div>
                    <button type = 'submit'>Login</button>
                </div>

            </form>
        </div>
    )
} 
export default Userdetails;

