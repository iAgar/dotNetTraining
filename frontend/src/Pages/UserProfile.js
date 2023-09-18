import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () =>{

    const userDetails = useContext(UserContext).user;

    console.log(userDetails);
    const [error,setError] = useState('')
    


    return(
        <div className="user-details-container">
            <h1>
                Profile Page
            </h1>

            <p style={{position:'absolute', left:'30px'}}><button><Link to='/Txn'>Make a Transaction</Link></button></p>
            <br/><br/><br/>
            <p style={{position:'absolute', left:'30px'}}><button><Link to='/ChangePin'>Change PIN</Link></button></p>
            <br/><br/>

            <div className="user-info"> <h2>User ID :</h2> {userDetails.userid}
            <br/>
            <h2>Username:</h2> {userDetails.uname}
            <br/>
            <h2>Date of birth:</h2> {userDetails.dob}    
            <br/>
            <h2>Email:</h2> {userDetails.email}         
            <br/> 
            <h2> PAN:</h2> {userDetails.proof}</div>   
            <br/>     
            


        </div>
    )
}

export default UserProfile;