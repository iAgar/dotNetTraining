import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./userContext.js";
import { Link } from "react-router-dom";
import BackButton from "../Component/BackButton.js";

const Accounts = (props) => {
  const { userid } = useParams();
  console.log(userid);
  const [accounts, setAccounts] = useState([]);
  const userDetails = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  useEffect(() => {
    setLoading(true);
    const headers = {
      "Content-type": "application/json",
      Authorization: `bearer ${userDetails.token}`,
    };
    axios
      .get(`https://localhost:7180/api/Accounts/all/${userid}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        setAccounts(response.data.accounts);
        if (response.data.success === false) {
          setHasAccount(false);
        }
      })
      .catch((e) => {
        console.error(e);
        if (userid !== userDetails.user.userid && !userDetails.user.isAdmin)
          alert("Unauthorised");
        setHasAccount(false);
      })
      .finally(() => setLoading(false));
  }, [userDetails.user.isAdmin, userDetails.token, userDetails.user.userid, userid]);
  const deleteUser = (aid) => {
    axios
      .delete(`https://localhost:7180/api/Accounts/delete/${aid}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${userDetails.token}`,
        },
      })
      .then(window.location.reload());
  };

  return (
    <div>
      {loading ? (
        <div>Loading ...</div>
      ) : (
        <div className="login-container">
          <h1>Accounts</h1>
          <BackButton />
          {!hasAccount ? (
            <div>No accounts for this user or unauthorised</div>
          ) : (
            <table border={1}>
              <tr>
                <th>Account Id</th>
                <th>Balance</th>
                <th>Currency</th>
                <th>Is Active</th>
                <th>Home Branch</th>
              </tr>
              {accounts.map((acc) => {
                return (
                  <tr key={acc.aid}>
                    <td>
                      <Link
                        to={`/accounts/transactions/all/${acc.aid}`}
                        style={{ border: "none" }}
                      >
                        {acc.aid}
                      </Link>
                    </td>
                    <td>{Math.round(acc.balance * 100) / 100}</td>
                    <td>{acc.currency}</td>
                    {acc.isDeleted === false && <td>Yes</td>}
                    {acc.isDeleted === true && <td>No</td>}
                    <td>{acc.homeBranch}</td>
                    {acc.isDeleted === false && userDetails.user.isAdmin && (
                      <td>
                        <button
                          onClick={() => deleteUser(acc.aid)}
                          className="logout-button"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Accounts;
