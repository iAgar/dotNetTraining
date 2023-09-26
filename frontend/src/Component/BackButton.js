import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Link,useNavigate } from 'react-router-dom';




const BackButton = () =>{

    const Navigation = useNavigate();

    const back = () =>{
        Navigation(-1);
    }

    return(
        <button style={{width:'100px',height:'50px'}} onClick={back}>back</button>
    )

}

export default BackButton;