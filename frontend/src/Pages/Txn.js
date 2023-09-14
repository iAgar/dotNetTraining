import React, { useState } from "react";
import  axios  from "axios";
const Txn =()=>{
    const [userDetails, setUserDetails] = useState({
        'aid' : 0,
        'amount' : 0,
        'txnType' : ''
        
    });

    const [error,setError] = useState('')

    const handleChange = (event) => {
        setUserDetails({...userDetails, [event.target.name] : event.target.value})
        // console.log(userDetails)
    }
    const handlesubmit = async(event) => {
        console.log(userDetails)
        event.preventDefault();

        try {
            axios.post('https://localhost:7180/api/Accounts/deposit/', userDetails).then((response) => {
                console.log(response);
                alert(response.data.message);
            }).catch((error)=>{
                console.log(error);
                alert(error);
            })
        }
        catch (error){
            setError(error.Message);
        }
    }
    return (
        <div>
            <h1>Transaction Page</h1>
            <form onSubmit={handlesubmit}>
                <div>
                    Acct id: <br/><input name='aid'  type = 'number' value = {userDetails.aid} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    amount: <br/><input name='amount'  type = 'number' value = {userDetails.amount} onChange={handleChange}/> 
                </div>
                <br/> 
                <div>
                txnType: <br/><select name='txnType' value = {userDetails.txnType} onChange={handleChange}>
                        <option>Deposit</option>
                        <option>withdraw</option>
                       </select> 
                </div>
                <br></br>
                <button type = 'submit'>
                    Submit
                </button>
            </form>
        </div>
    )





}
export default Txn;