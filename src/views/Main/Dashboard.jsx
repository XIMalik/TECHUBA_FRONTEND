import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import TheSidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import MainContent from '../../components/MainContent';
import { useNavigate } from 'react-router-dom';

export const SidebarContext= createContext()

const Dashboard = () => {


  const navigate = useNavigate()
  const [message, setMessage] = useState('');

  const [isAccounts, setIsAccount] = useState(false)
  const [isPiggyboxes, setIsPiggyboxes] = useState(false)
  const [isSavings, setIsSavings] = useState(false)
  const [isTransfer, setIsTransfer] = useState(false)
  const [isDefault, setIsDefault] = useState(true)




  useEffect(() => {
    // Retrieve data from localStorage
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

  }, [])

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
     navigate('/login')
    } else {
      (async () => {
        try {
          const response = await axios.get(
            'https://rldondon.pythonanywhere.com',
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`, // Include the access token in the headers
              },
            }
          );
          console.log(response.data);
          setMessage(response.data); 
        } catch (e) {
          console.log('Not authorized');
        }
      })();
    }
  }, []);



  return (

    <SidebarContext.Provider value={{
      isAccounts, 
      setIsAccount,
      isPiggyboxes, 
      setIsPiggyboxes,
      isSavings, 
      setIsSavings,
      isTransfer, 
      setIsTransfer, 
      isDefault,
      setIsDefault}}
    >
    
      <div className="h-screen w-[100vw]">
              <div className="grid-container w-full h-full">
              <Header />
              <TheSidebar/>
              <div className="main-content rounded-lg p-5 bg-[#121212]/50">
                  <MainContent name = {message} />
              </div>
              </div>
          </div>
    </SidebarContext.Provider>
  );
}

export default Dashboard;
