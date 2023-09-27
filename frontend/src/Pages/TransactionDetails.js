import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './userContext.js';
import BackButton from '../Component/BackButton.js';

const TransactionDetails = () => {
    const acc_aid = useParams();
    console.log(acc_aid.accountid);
    const [transactions, setTransactions] = useState([]);
    const userDetails = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [hasTransaction, setHasTransaction] = useState(true);
    useEffect(() => {
        setLoading(true);
        const headers = {
          "Content-type": "application/json",
          Authorization: `bearer ${userDetails.token}`,
        };
        axios
          .get(`https://localhost:7180/api/Accounts/transactions/all/${acc_aid.accountid}`, {
            headers: headers,
          })
          .then((response) => {
            console.log(response);
            //change based on above response 
            setTransactions(response.data.txns);
            if (response.data.success === false) {
              setHasTransaction(false);
            }
            setLoading(false);
          });
      }, [userDetails.token, acc_aid]);
      return (
        <div>
          {loading ? (
            <div>Loading ...</div>
          ) : (
            <div className="login-container">
              <h1>Transactions</h1>
              <BackButton />
              {!hasTransaction ? (
                <div>No transactions for this account</div>
              ) : (
                <table border={1}>
                  <tr>
                    <th>Transaction Id</th>
                    <th>Amount</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Debit or Credit</th>
                    <th>Transaction Type</th>
                    <th>Receiver ID</th>
                  </tr>
                  {transactions.map((tr) => {
                    return (
                      <tr key={tr.tid}>
                        <td>{tr.tid}</td>
                        <td>{tr.amount} {tr.currency}</td>
                        <td>{new Date(tr.txnTime).toLocaleDateString()}</td>
                        <td>{tr.loc}</td>
                        <td>{tr.isDebit ? 'Debit':'Credit'}</td>
                        <td>{tr.isDebit==false?tr.remarks!=null?`CHEQUE/${tr.remarks}`:'CASH DEPOSIT':tr.txnType==='T'&&tr.remarks!=null?`TRANSFER/${tr.remarks}`:'CASH WITHDRAWAL'}</td>
                        <td>{tr.remarks}</td>
                      </tr>
                    );
                  })}
                </table>
              )}
            </div>
          )}
        </div>
      );
}

export default TransactionDetails;