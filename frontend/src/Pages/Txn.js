import React, { useContext, useState } from "react";
import  axios  from "axios";
import { UserContext } from "./UserContext";
const Txn =()=>{
    const [txnDetails, setTxnDetails] = useState({
        'aid' : 0,
        'amount' : 0,
        'txnType' : ''
        
    });

    const userDetails = useContext(UserContext);

    const [error,setError] = useState('')

    const handleChange = (event) => {
        setTxnDetails({...txnDetails, [event.target.name] : event.target.value})
        // console.log(userDetails)
    }
    const handlesubmit = async(event) => {
        console.log(txnDetails);
        event.preventDefault();
        const headers = {
            'Content-type': 'application/json',
            'Authorization': `bearer ${userDetails.token}`
        }
        try {
            axios.post(`https://localhost:7180/api/Accounts/${txnDetails.txnType.toLowerCase()}/${txnDetails.aid}`, {...txnDetails, txnType: ""}, {
                headers:headers
            }).then((response) => {
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
                    Acct id: <br/><input name='aid'  type = 'number' value = {txnDetails.aid} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    amount: <br/><input name='amount'  type = 'number' value = {txnDetails.amount} onChange={handleChange}/> 
                </div>
                <br/> 
                <div>
                txnType: <br/><select name='txnType' value = {txnDetails.txnType} onChange={handleChange}>
                            <option disabled defaultChecked></option>
                        <option>Deposit</option>
                        <option>Withdraw</option>
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