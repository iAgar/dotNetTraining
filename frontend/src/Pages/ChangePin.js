import React, { useContext, useState } from "react";
import axios from 'axios';
import './SignIn.css';
import './SignUp.css';

const ChangePin =() =>{
    
    const [userDetails, setPinChange] = useState({
        'aid': 0,
        'oldPin': '',
        'newPin' :'',
    });
    // const user = useContext(UserContext);
    const[error,setError] = useState();

    const handleChange =(event) =>{
        setPinChange({...userDetails, [event.target.name] : event.target.value})
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const headers = {
            'Content-type': 'application/json',
            'Authorization': `bearer ${userDetails.token}`
        }

        try {
            axios.post(`https://localhost:7180/changepin/${userDetails.aid}`, userDetails,{
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
                    Account ID <br/> <input class = 'form-input' name='aid' type='number' />
                </div>
                <br/>

                <div>
                    Old PIN: <br/><input class = "form-input" name='oldPin' type = 'text' maxLength={4} minLength={4} value = {userDetails.oldPin} onChange={handleChange}/> 
                </div>
                <br/>
                <div>
                    New PIN: <br/><input class = "form-input" name = 'newPin' type = 'text' maxLength={4} minLength={4}  value = {userDetails.newPin} onChange={handleChange} /> 
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
