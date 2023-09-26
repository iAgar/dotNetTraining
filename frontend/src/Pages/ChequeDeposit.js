import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext.js";
import "./SignUp.css";
import BackButton from "../Component/BackButton.js";
import { useEffect } from "react";

const ChequeDeposit = () => {
  const [txnDetails, setTxnDetails] = useState({
    aid: 0,
    amount: 0,
    txnType: "Deposit",
    loc: "",
    rec_aid: 0,
    isDebit: true,
    remarks: "",
  });

  const userDetails = useContext(UserContext);

  const headers = {
    "Content-type": "application/json",
    Authorization: `bearer ${userDetails.token}`,
  };
  const [error, setError] = useState("");

  const [accts, setAccts] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(
          `https://localhost:7180/api/Accounts/all/${userDetails.user.userid}`,
          { headers }
        )
        .then((res) => {
          console.log(res);

          if (res.data.success) {
            setAccts(res.data.accounts);
            console.log(res.data.accounts);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      setError(error.Message);
    }
    try {
      axios
        .get("https://localhost:7180/api/Users/currencies", {
          headers,
        })
        .then((res) => {
          console.log(res);

          if (res.data.success) {
            setCurrencies(res.data.currency);
            console.log(res.data.currency);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      setError(error.Message);
    }
  }, []);

    const handleChange = (event) => {
        setTxnDetails({...txnDetails, [event.target.name] : event.target.value})
        // console.log(userDetails)
    }
    
    useEffect(() => {
        try{
            axios.get(`https://localhost:7180/api/Accounts/all/${userDetails.user.userid}`, {headers:headers})
            .then((res)=>{
                console.log(res);
                
                if( res.data.success){
                    setAccts(res.data.accounts);
                    console.log(res.data.accounts);
                }
            }).catch((error)=>{
                console.log(error);
                alert(error);
            })
        }
        catch(error){
            setError(error.Message);
        }
    },[]);

  const handlesubmit = async (event) => {
    console.log(txnDetails);
    event.preventDefault();

    try {
      axios
        .post(
          `https://localhost:7180/api/Accounts/${txnDetails.txnType.toLowerCase()}/${
            txnDetails.aid
          }`,
          { ...txnDetails, txnType: txnDetails.txnType.substring(0, 3) },
          {
            headers,
          }
        )
        .then((response) => {
          console.log(response);
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } catch (error) {
      setError(error.Message);
    }
  };
  return (
    <div class="signup-container">
      <h1>Cheque Deposit Page</h1>
      <BackButton />
      <form onSubmit={handlesubmit} class="form-group form-label">
        <div>
          Account ID: <br />
          <select
            class="form-input"
            name="aid"
            value={txnDetails.aid}
            onChange={handleChange}
          >
            <option disabled selected>Select Account ID</option>
            {accts.map((acct) => (
              <option>{acct.aid}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          Currency: <br />
          <select
            class="form-input"
            name="currency"
            value={txnDetails.currency}
            onChange={handleChange}
          >
            <option disabled selected>Select Currency</option>
            {currencies.map((currency) => (
              <option>{currency}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          Cheque Number: <br />
          <input
            class="form-input"
            name="remarks"
            type="number"
            value={txnDetails.ChequeNumber}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          Amount: <br />
          <input
            class="form-input"
            name="amount"
            type="number"
            min ={0}
            value={txnDetails.amount}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          Location: <br />
          <input
            class="form-input"
            name="loc"
            type="text"
            value={txnDetails.loc}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit" class="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default ChequeDeposit;
