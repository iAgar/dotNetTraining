import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { BrowserRouter as Router,Route,Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import UserProfile from './Pages/UserProfile';
import Txn from './Pages/Txn';
import WelcomePage from './Pages/WelcomePage';
import { UserContext, UserProvider } from './Pages/userContext.js';
import Protectedroute from './Pages/Protectedroute';
import ChangePin from './Pages/ChangePin';
import ProtectedrouteAdmin from './Pages/ProtectedrouteAdmin';
import ChequeDeposit from './Pages/ChequeDeposit';
import AdminPostSignIn from './Pages/AdminPostSignIn';
import Accounts from './Pages/Accounts';
import { useNavigate } from 'react-router-dom';
import BackButton from './Component/BackButton';
import Navbar from './Pages/navbar';
import React from 'react';
// import userType from React.createContext('none');



function App() {


  const logout = () =>{
    localStorage.removeItem('user');
    window.location.reload();
  };

  

  return (
    <UserProvider>
    <div className='App'>
      <Navbar />
    
    <Router>
      
      <Routes>
      <Route path="/SignUp" element={<ProtectedrouteAdmin><SignUp/></ProtectedrouteAdmin>} />
      <Route path="/" element={<WelcomePage />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path='/CreateAccount' element ={<ProtectedrouteAdmin><CreateAccount/></ProtectedrouteAdmin>}/>
      <Route path='/UserProfile' element ={<Protectedroute><UserProfile/></Protectedroute>}/>
      <Route path='/Txn' element ={<Protectedroute><Txn/></Protectedroute>}/>
      <Route path ='/ChangePin' element={<Protectedroute><ChangePin/></Protectedroute>}/>
      <Route path ='/ChequeDeposit' element={<Protectedroute><ChequeDeposit/></Protectedroute>}/>
      <Route path ='/AdminPostSignIn' element={<ProtectedrouteAdmin><AdminPostSignIn/></ProtectedrouteAdmin>}/>
      <Route path = '/accounts/:userid' element={<Accounts/>}/>
      </Routes>
      
    </Router>
    <br/>
    <button style={{width:'100px',height:'50px'}} onClick={logout}>Log Out</button>
    
    </div>
    </UserProvider>
   
  );
}


export default App;
