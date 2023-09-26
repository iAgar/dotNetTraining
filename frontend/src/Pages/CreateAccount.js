import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./userContext.js";
import "./SignUp.css";
import { useEffect } from "react";
import BackButton from "../Component/BackButton";

const CreateAccount = () => {
  const [accDetails, setAccDetails] = useState({
    userid: 0,
    accType: "",
    homeBranch: "",
    balance: 0,
    pin: "",
    currency: "",
  });
  const userDetails = useContext(UserContext);

  const [, setError] = useState("");
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const headers = {
      "Content-type": "application/json",
      Authorization: `bearer ${userDetails.token}`,
    };

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
  }, [userDetails.token]);

  const handleChange = (event) => {
    setAccDetails({ ...accDetails, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    console.log(accDetails);
    event.preventDefault();

    try {
      axios
        .post("https://localhost:7180/api/Accounts/new", accDetails, {
          headers: {
            "Content-type": "application/json",
            Authorization: `bearer ${userDetails.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            alert("successful account creation");
          } else {
            alert("unsuccessful account creation");
          }
        })
        .catch((error) => {
          console.log(1);
          console.log(error);
          alert("unsuccessful");
        });
    } catch (error) {
      console.log(1);
      setError(error.Message);
      alert("unsuccessful");
    }
  };
  return (
    <div class="signup-container">
      <br />
      <br />
      <h1>Create Account</h1>
      <BackButton />
      <form onSubmit={handleSubmit} class="form-group form-label">
        <div>
          User ID: <br />
          <input
            class="form-input"
            name="userid"
            type="number"
            value={userDetails.userid}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          Account Type: <br />
          <select
            name="accType"
            value={userDetails.accType}
            className="form-input"
            onChange={handleChange}
          >
            <option>Select type</option>
            <option>Savings</option>
            <option>Current</option>
            <option>Salary</option>
          </select>
        </div>
        <br />
        <div>
          Home Branch: <br />
          <input
            class="form-input"
            name="homeBranch"
            type="text"
            value={userDetails.homeBranch}
            onChange={handleChange}
          />
        </div>
        <br />
        <br />

        <div>
          PIN: <br />
          <input
            class="form-input"
            name="pin"
            type="password"
            value={userDetails.pin}
            onChange={handleChange}
          />
        </div>
        <br />
        <div>
          Currency: <br />
          <select
            className="form-input"
            name="currency"
            value={userDetails.currency}
            onChange={handleChange}
          >
            <option selected disabled>Select Currency</option>
            {currencies.map((currency) => (
              <option>{currency}</option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <button type="submit" class="signup-button">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
