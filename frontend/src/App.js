import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { BrowserRouter as Router,Route,Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import UserProfile from './Pages/UserProfile';
import Txn from './Pages/Txn';
import WelcomePage from './Pages/WelcomePage';
import { UserContext, UserProvider } from './Pages/UserContext';
import Protectedroute from './Pages/Protectedroute';
import ChangePin from './Pages/ChangePin';
import ProtectedrouteAdmin from './Pages/ProtectedrouteAdmin';
// import userType from React.createContext('none');


function App() {
  return (
    <UserProvider>
    <div className='App'>
    <Router>
      
      <Routes>
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/" element={<WelcomePage />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path='/CreateAccount' element ={<ProtectedrouteAdmin><CreateAccount/></ProtectedrouteAdmin>}/>
      <Route path='/UserProfile' element ={<Protectedroute><UserProfile/></Protectedroute>}/>
      <Route path='/Txn' element ={<Txn/>}/>
      <Route path ='/ChangePin' element={<ChangePin/>}/>
      </Routes>
      
    </Router>
    </div>
    </UserProvider>
   
  );
}


export default App;
