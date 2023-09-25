import React, { useContext, useState } from "react";
import  axios  from "axios";
import { UserContext } from "./userContext.js";
import './SignUp.css';
import BackButton from "../Component/BackButton.js";

const ChequeDeposit =()=>{
    const [txnDetails, setTxnDetails] = useState({
        'aid' : 0,
        'amount' : 0,
        'txnType' : '',
        'loc': '',
        'rec_aid': 0,
        'isDebit': true,
        'remarks': ''
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
        <div class="signup-container">
            <h1>Cheque Deposit Page</h1>
            <BackButton/>
            <form onSubmit={handlesubmit}  class = "form-group form-label">
                <div>
                    Account id: <br/><input class = "form-input" name='aid'  type = 'number' value = {txnDetails.aid} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    Cheque Number: <br/><input class = "form-input" name='remarks'  type = 'number' value = {txnDetails.ChequeNumber} onChange={handleChange} /> 
                </div>
                <br/>
                <div>
                    Amount: <br/><input class = "form-input" name='amount'  type = 'number' value = {txnDetails.amount} onChange={handleChange}/> 
                </div>
                <br/> 
                <div>
                    Location: <br/><input class = "form-input" name='loc' type= 'text' value={txnDetails.loc} onChange={handleChange}/>
                </div>
                <br/>
                <div>
                Transaction Type: <br/><select name='txnType' value = {txnDetails.txnType} onChange={handleChange}>
                            <option disabled defaultChecked></option>
                        <option>Deposit</option>
                        <option>Withdraw</option>
                        <option>Transfer</option>
                       </select> 
                </div>
                <br/>
                {(txnDetails.txnType=='Withdraw' || txnDetails.txnType=='Transfer') && <div>
                    Pin: <br/><input name='pin' type='password' value={txnDetails.pin} onChange={handleChange}/></div>}
                <br/>
                {txnDetails.txnType=='Transfer' &&
                <div>
                   Reciever Account ID: <br/><input name='raid'  type = 'number' value = {txnDetails.raid} onChange={handleChange} /> 
                </div>
}
                <br/>
                <button type = 'submit' class="signup-button">
                    Submit
                </button>
            </form>
        </div>
    )





}
export default ChequeDeposit;