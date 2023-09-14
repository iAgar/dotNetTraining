import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';

const CreateAccount =()=>{
    const [userDetails, setUserDetails] = useState({
        userid:0,
        accType:'',
        homeBranch:'',
        balance:0,

    })
    const [error,setError] = useState('');

    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})
        

    }
    
    const handleSubmit = (event) => {
        console.log(userDetails);
        event.preventDefault();

        try {
            axios.post('https://dummy.restapiexample.com/api/v1/create', userDetails).then((response) => {
                console.log(response);
                const{status ,message} = response.data;
                if(status == 'success'){
                    alert("successful signup");
                }
                else{
                    alert("unsuccessful signup");
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
                    userid: <br/><input name ='userid' type = 'number' value = {userDetails.userid} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    accType: <br/><select name='accType' value = {userDetails.accType} onChange={handleChange}>
                        <option>Savings</option>
                        <option>Current</option>
                        <option>Salary</option>
                       </select> 
                </div>
                <br/>
                <div>
                    homeBranch: <br/><input name = 'homeBranch' type = 'text' value = {userDetails.homeBranch} onChange={handleChange} /> 
                </div>
                <br/> 
                <div>
                    balance: <br/><input name = 'balance' type = 'number' value = {userDetails.balance} onChange={handleChange} /> 
                </div>
                <br/>
            
                <div>
                    <button type = 'submit'>Create Account</button>
                </div>
            </form>
        </div>
    )

}

export default CreateAccount;

