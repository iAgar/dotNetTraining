import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./userContext.js";
import "./SignUp.css";
import { useEffect } from "react";
import BackButton from "../Component/BackButton.js";

const Txn = () => {
  const [txnDetails, setTxnDetails] = useState({
    aid: 0,
    amount: 0,
    txnType: "",
    loc: "",
    rec_aid: 0,
    isDebit: true,
    currency: "",
    remarks: null
  });

  const userDetails = useContext(UserContext);

  const [, setError] = useState("");

  const [accts, setAccts] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `bearer ${userDetails.token}`,
    };
    try {
      axios
        .get(
          `https://localhost:7180/api/Accounts/all/${userDetails.user.userid}`,
          { headers: headers }
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
          headers: headers,
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
  }, [userDetails.token, userDetails.user.userid]);

  const handleChange = (event) => {
    setTxnDetails({ ...txnDetails, [event.target.name]: event.target.value });
  };
  const handlesubmit = async (event) => {
    event.preventDefault();

    if(txnDetails.aid == txnDetails.rec_aid){
        alert('Change account-id of recipient');
        return;
    }

    const headers = {
      "Content-type": "application/json",
      Authorization: `bearer ${userDetails.token}`,
    };
    try {
      console.log(txnDetails.txnType)
      if(txnDetails.txnType == "Transfer"){    
        setTxnDetails({...txnDetails, remarks: txnDetails.rec_aid})
    }
      axios
        .post(
          `https://localhost:7180/api/Accounts/${txnDetails.txnType.toLowerCase()}/${
            txnDetails.aid
          }`,
          { ...txnDetails, txnType: txnDetails.txnType.substring(0, 3) },
          {
            headers: headers,
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
      <br />
      <br />
      <h1>Transaction Page</h1>
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
            <option>Select Account ID</option>
            {accts
              .filter((e) => !e.isDeleted)
              .map((acct) => (
                <option>{acct.aid}</option>
              ))}
          </select>
        </div>
        

        <div>
          {accts.filter((e) => e.aid == txnDetails.aid).length != 0 && <><br /> Balance: <br /></>}
          <div>
            {accts
              .filter((e) => e.aid == txnDetails.aid)
              .map((acct) => (
                <>
                  {Math.round(acct.balance*100)/100} {acct.currency}
                </>
                
              ))}
          </div>
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
            <option>Select Currency</option>
            {currencies.map((currency) => (
              <option>{currency}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          Amount: <br />
          <input
            class="form-input"
            name="amount"
            type="number"
            value={txnDetails.amount}
            min ={0}
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
        <div>
          Transaction Type: <br />
          <select
            class="form-input"
            name="txnType"
            value={txnDetails.txnType}
            onChange={handleChange}
          >
            <option disabled selected></option>
            <option>Deposit</option>
            <option>Withdraw</option>
            <option>Transfer</option>
          </select>
        </div>
        <br />
        {(txnDetails.txnType === "Withdraw" ||
          txnDetails.txnType === "Transfer") && (
          <div>
            Pin: <br />
            <input
              class="form-input"
              name="pin"
              type="password"
              value={txnDetails.pin}
              onChange={handleChange}
            />
          </div>
        )}
        <br />
        {txnDetails.txnType === "Transfer" && (
          <div>
            Reciever Account ID: <br />
            <input
              class="form-input"
              name="rec_aid"
              type="number"
              value={txnDetails.rec_aid}
              onChange={handleChange}
            />
          </div>
        )}
        <br />
        <button type="submit" class="signup-button">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Txn;
