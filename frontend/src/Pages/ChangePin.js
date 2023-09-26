import React, { useContext, useState } from "react";
import { UserContext } from "./userContext.js";
import axios from 'axios';
import './SignIn.css';
import './SignUp.css';
import { useEffect } from "react";
import BackButton from "../Component/BackButton.js";

const ChangePin =() =>{
    
    const [pinChangeDetails, setPinChange] = useState({
        'Aid': '',
        'Pin': '',
        'NewPin' :'',
    });
    const userDetails = useContext(UserContext);
    // const user = useContext(UserContext);
    const[error,setError] = useState();
    const[accts,setAccts] = useState([]);
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `bearer ${userDetails.token}`
    }
    
    useEffect(() => {
        try{
            axios.get(`https://localhost:7180/api/Accounts/all/${userDetails.user.userid}`, {headers:headers})
            .then((res)=>{
                console.log(res);
                
                if( res.data.success){
                    setAccts(res.data.accounts);
                    console.log(res.data.accounts);
                }
            }).catch((error)=>{
                console.log(error);
                alert(error);
            })
        }
        catch(error){
            setError(error.Message);
        }
    },[]);


    const handleChange =(event) =>{
        setPinChange({...pinChangeDetails, [event.target.name] : event.target.value})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        console.log(pinChangeDetails);
        try {
            axios.post(`https://localhost:7180/changepin/${pinChangeDetails.Aid}`, pinChangeDetails,{
                headers: headers
            }).then((response) => {
                console.log(response);
                alert(response.data.message);
            }).catch((e)=>{
                console.log(e);
            })
        }
        catch (error){
            setError(error.Message);
        }
    }
    return (
        // <Router>
        <div class="signup-container">
            <br/><br/>
            <h1>Change PIN</h1>
            <BackButton/>
            <form onSubmit={handleSubmit} class = "form-group form-label ">
                <div>
                Account Id: <br/><select class = "form-input" name='aid'  value = {pinChangeDetails.aid} onChange={handleChange} >
                <option>Select Account Id</option>
                    {
                        
                        
                        accts.map( (acct) => {acct.isDeleted===false&&<option>{acct.aid}</option>} )
                    }
                        
                       </select>  
                </div>
                <br/>

                <div>
                    Old PIN: <br/><input class = "form-input" name='Pin' type = 'password' maxLength={4} minLength={4} value = {userDetails.Pin} onChange={handleChange}/> 
                </div>
                <br/>
                <div>
                    New PIN: <br/><input class = "form-input" name = 'NewPin' type = 'password' maxLength={4} minLength={4}  value = {userDetails.NewPin} onChange={handleChange} /> 
                </div>
                <br/> 
               
                <div>
                    <button type = 'submit' class="signup-button">Submit</button>
                </div>
                <br/>
            </form>
        </div>
    )
} 
export default ChangePin;
