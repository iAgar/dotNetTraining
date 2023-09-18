import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import { UserContext } from "./userContext.js";

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
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    userid: <br/><input name ='userid' type = 'number' value = {accDetails.userid} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    accType: <br/><select name='accType' value = {accDetails.accType} onChange={handleChange}>
                        <option>Savings</option>
                        <option>Current</option>
                        <option>Salary</option>
                       </select> 
                </div>
                <br/>
                <div>
                    homeBranch: <br/><input name = 'homeBranch' type = 'text' value = {accDetails.homeBranch} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    Pin: <br/><input name = 'pin' type = 'text' value = {accDetails.pin} onChange={handleChange} /> 
                </div>
                <br/> 
                <br/>
            
                <div>
                    <button type = 'submit'>Create Account</button>
                </div>
            </form>
        </div>
    )

}

export default CreateAccount;

