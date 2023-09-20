import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import { UserContext } from './userContext.js';
import { Link } from 'react-router-dom';

const AdminPostSignIn = () =>{
    return (
        <div>
            <Link  to='/SignUp'>Sign Up new User</Link>
            <br/><br/> <br/><br/>
            <Link to='/CreateAccount'>Create new Bank Account</Link>
        </div>
            
    )
}

export default AdminPostSignIn;