import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { UserContext } from './userContext.js';
import { Link } from 'react-router-dom';
//import './UserProfile.css';
import "./SignIn.css";

const UserProfile = () =>{

    const userDetails = useContext(UserContext).user;

    console.log(userDetails);
    const [error,setError] = useState('')
    


    return(
        <div class='login-container'>
            <h1>User Profile</h1>
            <div  class="login-form">
                <br/><br/>
                <div>
                    User ID : <br/> <div class="form-input">{userDetails.userid}</div>
                </div>

                <br/>
                <div>Username: <div class="form-input">{userDetails.uname}</div>
                </div>
                <br/>
                <div>Date of birth: <div class="form-input">{userDetails.dob}  </div>  </div>
                <br/>
                <div>Email: <div class="form-input">{userDetails.email}  </div>    </div>   
                <br/> 
                <div> PAN: <div class="form-input">{userDetails.proof} </div> </div>
                <br/>  <br/>
              
            </div>   

            <br/><br/>
            
        
            <Link to='/Txn'>Make a Transaction</Link>
            <br/><br/><br/><br/>

            <Link  to='/ChangePin'>Change PIN</Link>
            <br/><br/> <br/><br/>
            <Link to='/ChequeDeposit'>Cheque Deposit</Link>
            <br/><br/> 

        </div>
    )
}

export default UserProfile;