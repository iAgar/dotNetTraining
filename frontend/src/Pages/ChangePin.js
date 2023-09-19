import React, { useContext, useState } from "react";
import { UserContext } from "./userContext.js";
import axios from 'axios';
import './SignIn.css';
import './SignUp.css';

const ChangePin =() =>{
    
    const [pinChangeDetails, setPinChange] = useState({
        'Aid': '',
        'Pin': '',
        'NewPin' :'',
    });
    const userDetails = useContext(UserContext);
    // const user = useContext(UserContext);
    const[error,setError] = useState();

    const handleChange =(event) =>{
        setPinChange({...pinChangeDetails, [event.target.name] : event.target.value})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const headers = {
            'Content-type': 'application/json',
            'Authorization': `bearer ${userDetails.token}`
        }
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
            <form onSubmit={handleSubmit} class = "form-group form-label ">
                <div>
                    Account ID <br/> <input class = "form-input" name='Aid' type='number' value={userDetails.Aid} onChange={handleChange}/>
                </div>
                <br/>

                <div>
                    Old PIN: <br/><input class = "form-input" name='Pin' type = 'text' maxLength={4} minLength={4} value = {userDetails.Pin} onChange={handleChange}/> 
                </div>
                <br/>
                <div>
                    New PIN: <br/><input class = "form-input" name = 'NewPin' type = 'text' maxLength={4} minLength={4}  value = {userDetails.NewPin} onChange={handleChange} /> 
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
