import React, { useState, useContext } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPaperPlane, faHand, faCircle } from '@fortawesome/free-regular-svg-icons';
import { SidebarContext } from '../views/Main/Dashboard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const TheSidebar = () => {

  const navigate = useNavigate()
  
  const SidebarContent = useContext(SidebarContext)

  const handleIsAccounts = ()=>{
      SidebarContent?.setIsAccount(true)
      SidebarContent?.setIsPiggyboxes(false)
      SidebarContent?.setIsSavings(false) 
      SidebarContent?.setIsTransfer(false)
      SidebarContent?.setIsDefault(false)

  }
  
  const handleIsPiggyboxes = ()=>{
    console.log("tyguhjkl;,")
    console.log(SidebarContent)
      SidebarContent?.setIsAccount(false)
      SidebarContent?.setIsPiggyboxes(true)
      SidebarContent?.setIsSavings(false) 
      SidebarContent?.setIsDefault(false)
      SidebarContent?.setIsTransfer(false)


  }

  const handleIsSavings = ()=>{
    console.log("tyguhjkl;,")
    console.log(SidebarContent)
      SidebarContent?.setIsAccount(false)
      SidebarContent?.setIsPiggyboxes(false)
      SidebarContent?.setIsSavings(true) 
      SidebarContent?.setIsDefault(false)
      SidebarContent?.setIsTransfer(false)


  }
  const handleIsTransfer = ()=>{
    console.log("tyguhjkl;,")
    console.log(SidebarContent)
      SidebarContent?.setIsAccount(false)
      SidebarContent?.setIsPiggyboxes(false)
      SidebarContent?.setIsSavings(false) 
      SidebarContent?.setIsDefault(false)
      SidebarContent?.setIsTransfer(true)


  }


  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    controls.start({ width: isOpen ? 200 : 150 });
  };

  const handleLogout = async (e) => {
    e.preventDefault();
  
    try {
      // Make sure to include the headers in the axios request.
      const response = await axios.post(
        'https://rldondon.pythonanywhere.com/api/token/blacklist/',
        {
          refresh: localStorage.getItem('refresh_token'),
          access: localStorage.getItem('access_token'),
        
        },        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
  
      console.log('Logout successful:', response.data);
  
      // Clear tokens and navigate to the login page or wherever you want.
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with an error:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  
  

  return (
    <div className='sidebar relative p-3 bg-[#121212]/30 rounded-lg w-fit flex flex-col gap-10'> 
      <motion.nav
        initial={{ width: 150 }}
        animate={controls}
        transition={{ duration: 0.5 }}
      >
        <ul className='flex flex-col gap-2 justify-start items-start'>
        <motion.li onClick={handleIsTransfer} className='nav-item' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.998}}>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />

            Transfer
          </motion.li>
          <motion.li onClick={handleIsAccounts} className='nav-item' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.998 }}>
          <FontAwesomeIcon icon={faCreditCard} size='lg' />
             Accounts
          </motion.li>


          <motion.li onClick={handleIsPiggyboxes} className='nav-item' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.998 }}>
          <lord-icon
            src="https://cdn.lordicon.com/ksdjzsym.json"
            trigger="hover"
            stroke="bold"
            colors="primary:#ffffff,secondary:#ffffff"
            style={{width:25, height:25}}>
        </lord-icon>
             Piggyboxes
          </motion.li>


          <motion.li onClick={handleIsSavings} className='nav-item' whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.998}}>
          <FontAwesomeIcon icon={faHand} size='lg' />
            Savings Groups
          </motion.li>
      
          <motion.li onClick={handleLogout} className='nav-item border-solid border-[0.5px] border-white/10 hover:bg-red-700 ease-in duration-150 mt-[340px]' whileHover={{ scale: 1.02 }} whileTap={{ scale:0.998 }}>
            Logout
          </motion.li>
        </ul>
      </motion.nav>
    </div>
  );
};

export default TheSidebar;
