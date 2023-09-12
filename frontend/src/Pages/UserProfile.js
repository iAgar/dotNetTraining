import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

const UserProfile = () =>{

    const [userDetails,setUserDetails] = useState({
        'uname': 0,
        'email': '',
        'dob': '',
        'proof': '',
        'pass': '',
        'address':'',
        'contact':'',
        'accType':'',
        'balance':0,
        'accNumber':0,

    });
    const [error,setError] = useState('')
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})
        // console.log(userDetails)
    }

    


    return(
        <div>
            <h1>
                Profile Page
            </h1>
            <br/>
             
            <div>Name:</div>
            <br/>
            <div> DOB: </div>     
            <br/>
            <div> email:</div>          
            <br/> 
            <div> Contact:</div>   
            <br/>     
            <div> Address:</div>
            <br/>
            <div> Account Type: </div>
            <br/>
            <div>Account balance:</div>


        </div>
    )
}

export default UserProfile;