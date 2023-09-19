import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { UserContext } from './userContext.js';
import { Link } from 'react-router-dom';
import './UserProfile.css';
//import { Button } from 'react-bootstrap';

const UserProfile = () =>{

    const userDetails = useContext(UserContext).user;

    console.log(userDetails);
    const [error,setError] = useState('')
    


    return(
        <div class='user-profile'>
            <div  class="user-details-container">
            <div class="user-info"> 
                <h2>User Profile</h2>
                <br />
                <h4>User ID :</h4> {userDetails.userid}
                <br/>
                <h4>Username:</h4> {userDetails.uname}
                <br/>
                <h4>Date of birth:</h4> {userDetails.dob}    
                <br/>
                <h4>Email:</h4> {userDetails.email}         
                <br/> 
                <h4> PAN:</h4> {userDetails.proof}
                <br/>  <br/>
            </div>   
            </div>   

            <br/><br/>

            {/* <Link to='/Txn'>
            <button type="button" class="btn btn-primary">Primary</button>
            </Link> */}
            
        
            <button class="my-btn" role='button'><Link to='/Txn'>Make a Transaction</Link></button>
            <br/><br/>

            <button class="my-btn" role='button'><Link to='/ChangePin'>Change PIN</Link></button>
            <br/><br/> 

        </div>
    )
}

export default UserProfile;