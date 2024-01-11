import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './views/Landing';
import NoPage from './views/NoPage';
import SignUp from './views/Auth/SignUp';
import Login from './views/Auth/Login';
import Dashboard from './views/Main/Dashboard';
import Account from './views/Accounts/Account';

export const UserContext=createContext()
function App() {
  const [logedInUser, setLogedInUser ] = useState({})
  return (
    <UserContext.Provider value={{logedInUser, setLogedInUser}}>
      <BrowserRouter>
        <Routes>

            <Route path="/" element={<Landing />} />   

            <Route path="*" element={<NoPage />} />        

            {/* auth */}
            <Route path="/signup" element={<SignUp />} />        
            <Route path="/login" element={<Login />} />    

            {/* main */}
            <Route path="/dashboard" element={<Dashboard />} />    

        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
} 

export default App;
