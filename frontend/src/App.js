import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { BrowserRouter as Router,Route,Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import UserProfile from './Pages/UserProfile';
import Txn from './Pages/Txn';
import WelcomePage from './Pages/WelcomePage';
import { UserContext, UserProvider } from './Pages/UserContext';
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
      <Route path='/CreateAccount' element ={<CreateAccount/>}/>
      <Route path='/UserProfile' element ={<UserProfile/>}/>
      <Route path='/Txn' element ={<Txn/>}/>
      </Routes>
      
    </Router>
    </div>
    </UserProvider>
   
  );
}


export default App;
