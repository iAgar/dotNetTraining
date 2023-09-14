import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from './userContext';

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

    const user = useContext(UserContext);
    console.log(user);

    return(
        <div>
            <h1>
                Profile Page
            </h1>
            <br/>
             
            <div>Name: {user?.uname}</div>
            <br/>
            <div> DOB: {user?.dob}</div>     
            <br/>
            <div> email: {user?.email}</div>          
            <br/> 
            <div> Account Type: </div>
            <br/>
            <div>Account balance:</div>


        </div>
    )
}

export default UserProfile;