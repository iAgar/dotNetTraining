import './App.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import { BrowserRouter as Router,Route,Routes, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import CreateAccount from './Pages/CreateAccount';
import UserProfile from './Pages/UserProfile';
import Txn from './Pages/Txn';
// import userType from React.createContext('none');


function App() {
  return (
    <div className='App'>
    <Router>
      
      <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path='/CreateAccount' element ={<CreateAccount/>}/>
      <Route path='/UserProfile' element ={<UserProfile/>}/>
      <Route path='/Txn' element ={<Txn/>}/>
      </Routes>
      
    </Router>
    </div>
   
  );
}


export default App;
