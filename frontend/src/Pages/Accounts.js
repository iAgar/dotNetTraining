import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './userContext.js';

const Accounts = (props) => {
    const {userid} = useParams()
    console.log(userid);
    const [accounts, setAccounts] = useState([])
    const userDetails = useContext(UserContext);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
    setLoading(true);
    const headers = {
        'Content-type': 'application/json',
        'Authorization': `bearer ${userDetails.token}`
    }
    axios.get(`https://localhost:7180/api/Accounts/all/${userid}`,{headers: headers}).then((response) => {
        console.log(response);
        setAccounts(response.data.accounts);
        setLoading(false)
      })
  }, [])

  return (
    <div>
        {loading ? (<div>Loading ...</div>):(
            <div>
            <h1>Accounts</h1>
            <table border={1}>
              <tr>
                <th>Account Id</th>
                {/* <th>Balance</th>
         */}
              </tr>
              {accounts.map(acc => {return (
                <tr key={acc}>
                  <td>{acc}</td>
                  <td><button onClick={()=>{axios.delete(`https://localhost:7180/api/Accounts/delete/${acc}`)}}>Delete</button></td>
                </tr>
              )})}
            </table>
            </div>
        )}
    </div>
    
)

}

export default Accounts;