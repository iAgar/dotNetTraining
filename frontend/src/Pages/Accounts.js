import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

const Accounts = (props) => {
    const {userid} = useParams()
    console.log(userid)
}

export default Accounts;