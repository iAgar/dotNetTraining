import React from "react";
import ReactDOM from 'react-dom/client';
import { useContext } from 'react';
import { UserContext } from './UserContext.js';

//read user detais using context and render appropriate page

const PostSignIn = () =>{
    const user = useContext(UserContext);
}

export default PostSignIn;