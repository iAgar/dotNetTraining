import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { Link,useNavigate } from 'react-router-dom';




const BackButton = () =>{

    const Navigation = useNavigate();

    const back = () =>{
        Navigation(-1);
    }

    return(
        <button style={{width:'100px',height:'50px0', marginRight: "auto", display: "block"}} onClick={back} className='login-button'>&#x2190; Back</button>
    )

}

export default BackButton;