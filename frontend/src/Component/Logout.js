import React, { useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../Pages/userContext';

const Logout = () =>{
    const userDetails = useContext(UserContext);
    const logout =()=>{
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <>{userDetails && <button style={{width:'100px',height:'50px'}} onClick={logout}>Log Out</button> }</>
        
    )
    
    
}
export default Logout;