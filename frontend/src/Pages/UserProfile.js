import React, { useContext } from "react";
import { UserContext } from "./userContext.js";
import "./SignIn.css";
import BackButton from "../Component/BackButton.js";

const UserProfile = () => {
  const userDetails = useContext(UserContext).user;

  console.log(userDetails);

  return (
    <div class="signup-container">
      <h1>User Profile</h1>
      <BackButton />
      <div class="form-group form-label">
        <br />
        <br />
        <div>
          User ID : <br /> <div class="form-input">{userDetails.userid}</div>
        </div>
        <br />
        <div>
          Username: <div class="form-input">{userDetails.uname}</div>
        </div>
        <br />
        <div>
          Date of Birth:{" "}
          <div class="form-input">
            {new Date(userDetails.dob).toLocaleDateString()}{" "}
          </div>{" "}
        </div>
        <br />
        <div>
          Email: <div class="form-input">{userDetails.email} </div>{" "}
        </div>
        <br />
        <div>
          {" "}
          PAN: <div class="form-input">{userDetails.proof} </div>{" "}
        </div>
        <br /> <br />
      </div>
    </div>
  );
};

export default UserProfile;
