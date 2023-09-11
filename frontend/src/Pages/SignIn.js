import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

const SignIn = () =>{
    const [username, setusername] = useState(' ');
    const [password, setpassword] = useState(' ');    

    const handleUsername = (event) =>{
        setusername(event.target.value);

    }

    const handlepassword = (event) =>{
        setpassword(event.target.value);

    }

    return (
        <div>
            <form >
                <br/><br/>
                <div>
                    username: <input type = 'text' value = {username} onChange={handleUsername} /> 
                </div>
                <br/>
                <div>
                    password: <input type = 'alphanum' value = {password} onChange={handlepassword} ></input> 
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