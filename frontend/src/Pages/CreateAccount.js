import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import { UserContext } from "./userContext.js";
import './SignUp.css';

const CreateAccount =()=>{
    const [accDetails, setAccDetails] = useState({
        userid:0,
        accType:'',
        homeBranch:'',
        balance:0,
        pin: '',
        currency:''
    })
    const userDetails = useContext(UserContext);

    const [error,setError] = useState('');

    const handleChange = (event) => {
        setAccDetails({...accDetails, [event.target.name] : event.target.value})
        

    }
    
    const handleSubmit = (event) => {
        console.log(accDetails);
        event.preventDefault();

        try {
            axios.post('https://localhost:7180/api/Accounts/new', accDetails, {
                headers:{
                   'Content-type': 'application/json',
Authorization: `bearer ${userDetails.token}`
                }                
            }).then((response) => {
                console.log(response);
                const{status ,message} = response.data;
                if(response.data.success){
                    alert("successful account creation");
                }
                else{
                    alert("unsuccessful account creation");
                }
            }
            ).catch((error)=>{
                console.log(1);
                console.log(error);
                alert('unsuccessful');
            })
        }
        catch (error){
            console.log(1);
            setError(error.Message);
            alert('unsuccessful');
        }
    }
    return (
        <div class="signup-container">
            <br/><br/>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit} class = "form-group form-label">
                <div>
                    User ID: <br/><input class = "form-input" name ='userid' type = 'number' value = {userDetails.userid} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    Account Type: <br/><select name='accType' value = {userDetails.accType} onChange={handleChange}>
                    <option disabled defaultChecked></option>
                        <option>Savings</option>
                        <option>Current</option>
                        <option>Salary</option>
                       </select> 
                </div>
                <br/>
                <div>
                    Home Branch: <br/><input class = "form-input" name = 'homeBranch' type = 'text' value = {userDetails.homeBranch} onChange={handleChange} /> 
                </div>
                <br/> 
                <br/>
            
                <div>
                    Pin: <br/><input class = "form-input" name = 'pin' type = 'text' value = {userDetails.pin} onChange={handleChange} /> 
                </div>
                <br/> 
                <div>
                    <button type = 'submit' class="signup-button">Create Account</button>
                </div>
                
            </form>
            <br/>
            <br/><br/>
                <Link to='/SignUp'>Register User</Link>
            
        </div>
    )

}

export default CreateAccount;

