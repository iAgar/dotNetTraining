import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

const UserProfile = () =>{

    const userDetails = useContext(UserContext);

    console.log(userDetails);
    const [error,setError] = useState('')
    


    return(
        <div >
            <h1>
                Profile Page
            </h1>
            <p style={{position:'absolute', left:'30px'}}><button><Link to='/Txn'>Make a Transaction</Link></button></p>
            <br/><br/>

            <div> <h2>user_id :</h2> {userDetails.userid}</div>
            <br/>
            <div><h2>username:</h2> {userDetails.uname}</div>
            <br/>
            <div><h2>DOB:</h2>  {userDetails.dob}</div>     
            <br/>
            <div><h2>email:</h2>{userDetails.email}</div>          
            <br/> 
            <div><h2> PAN:</h2>{userDetails.proof}</div>   
            <br/>     
            


        </div>
    )
}

export default UserProfile;