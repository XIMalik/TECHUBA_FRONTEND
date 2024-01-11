import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'
import Withdraw from './Withdraw'
import Deposit from './Deposit'
import TransactionHistory from './TransactionHistory'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons'
import CreateAccount from './CreateAccount'
import Delete from './Delete'


const Account = () => {
    const {logedInUser} =useContext(UserContext)
    const [data, setData] = useState({ count: 0, next: null, previous: null, results: [] });
    const [showBalance, setShowBalance] = useState(true); // State to track visibility
    const [buttonText, setButtonText] = useState('Hide balance'); // Initial text for the button

    const [showWithdraw, setShowWithdraw] = useState(false)
    const [showDeposit, setShowDeposit] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)




    const toggleBalanceVisibility = () => {
        setShowBalance((prevShowBalance) => !prevShowBalance);
        setButtonText((prevButtonText) => (prevButtonText === 'Show balance' ? 'Hide balance' : 'Show balance'));
      };

      const handleWithdrawal=()=>{
        setShowDeposit(false)
        setShowCreate(false)
        setShowDelete(false)
        setShowWithdraw(!showWithdraw)
      }

      const handleDeposit=()=>{
        setShowWithdraw(false)
        setShowCreate(false)
        setShowDelete(false)
        setShowDeposit(!showDeposit)
      }
      
      const handleCreate=()=>{
        setShowDeposit(false)
        setShowWithdraw(false)
        setShowDelete(false)
        setShowCreate(!showCreate)

      }
      const handleDelete=()=>{
        setShowDeposit(false)
        setShowWithdraw(false)
        setShowCreate(false)
        setShowDelete(!showDelete)

      }

    
      
    // useEffect(() => {
    //     const access_token = localStorage.getItem('access_token');
    //     const refresh_token = localStorage.getItem('refresh_token');
      
    //     // Additional logic related to localStorage if needed
      
    //   }, []);
      
      useEffect(() => {
        if (localStorage.getItem('access_token') === null) {
          window.location.href = '/login';
        } else {
          (async () => {
            try {
              const response = await axios.get(
                'https://rldondon.pythonanywhere.com/my-accounts',
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  },
                }
              );
              setData(response.data)
            } catch (e) {
              console.log('Error:', e.message);
              console.log('Not authorized');
            }
          })();
        }
      }, []);
      
  return (
  <>
    {/* <div>{logedInUser}</div> */}
    <div className="accounts_display flex flex-col gap-2">

        <div className="top flex justify-between mb-2">
            {/* <div className='text-md font-semibold text-white/50'>You have {data.count} registered accounts</div> */}
            <button>
                <span onClick={toggleBalanceVisibility} className='text-white text-xs p-3 rounded-lg'>{buttonText}</span>
            </button>
        </div>


        <div className="account_display flex gap-3">   
        {data.results.map((result) => (
            <div key={result.account_number} className='account_details flex bg-[#2D2A32]/50 p-7 rounded-lg flex-col-reverse gap-4'>
            <h2 className='tracking-wider'>{result.account_number}</h2>
                <h1>
                    <span className='text-xs tracking-wider'>NGN</span> {showBalance ? result.account_balance : '***'}
                </h1>
            </div>
        ))}
        </div>

        <div className="account_action_toggles flex gap-2 w-[100%]">   
            <button><h1 onClick={handleWithdrawal} className='text-xs'>Withdraw</h1></button>
            <button><h1 onClick={handleDeposit} className='text-xs'>Deposit</h1></button>
            <button><h1 onClick={handleCreate} className='text-xs' >Create</h1></button>
            <button><h1 onClick={handleDelete} className='text-xs' >Delete</h1></button>
        </div>

        <div className="t_and_history w-[100%]  flex gap-2">
            <div className="account_actions w-[50%] h-[55vh] relative">
                {(!showDeposit && !showWithdraw && !showCreate && !showDelete) &&(
                    <div className='bg-[#2D2A32]/50 h-full w-full rounded-lg flex flex-col gap-3 justify-center items-center text-center'>
                    <FontAwesomeIcon icon={faMoneyBill1} className='text-green-100'/>
                    <span className='text-white '>Perform a transaction on an account</span>
                    </div>
                )}
                
                {showWithdraw &&<Withdraw />}
                {showDeposit && <Deposit />}
                {showCreate && <CreateAccount />}
                {showDelete && <Delete />}
            </div>
            <div className="transaction_history w-[50%] h-[55vh]">
                <TransactionHistory/>
            </div>
        </div>
        


    </div>
        
    
    
    </>
  )
}

export default Account