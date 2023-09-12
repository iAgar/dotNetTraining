import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import axios from 'axios';

const SignIn = () =>{

    const [userDetails, setUserDetails] = useState({
        'uname': '',
        'pass': '',
    });
  
    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})

    }

    const handleSubmit = async(event) => {
        console.log(userDetails);
        event.preventDefault();
        try{
            axios
            .post('https://dummy.restapiexample.com/api/v1/create',userDetails)
            .then((response)=>{
                console.log(response);
                const{status ,message} = response.data;
                if(status == 'success'){
                    alert("successful signup");
                }
                else{
                    alert("unsuccessful signup");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br/><br/>
                <div>
                    username: <input name='uname' type = 'text' value = {userDetails.uname} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    password: <input name='pass' type = 'alphanum' value = {userDetails.pass} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    <button type = 'submit'>Sign In</button>
                </div>
            </form>
        </div>
    )
}
export default SignIn;