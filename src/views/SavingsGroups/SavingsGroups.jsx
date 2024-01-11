import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons'
import PublicGroups from './PublicGroups'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faArrowAltCircleRight, faSquare, faCreditCard, faPaperPlane, faHand, faCircle } from '@fortawesome/free-regular-svg-icons';
import CreateGroup from './CreateGroup'
import GroupDeposit from './GroupDeposit'
import Leaderboard from './Leaderboard'
import AddMemberGroup from './AddMemberGroup'
import RemoveMemberGroup from './RemoveMemberGroup'
import LeaveGroup from './LeaveGroup'
import AllDeposits from './AllDeposits'


const SavingsGroups = () => {
    const {logedInUser} =useContext(UserContext)
    const [data, setData] = useState({ count: 0, next: null, previous: null, results: [] });
    const [showBalance, setShowBalance] = useState(true); // State to track visibility
    const [buttonText, setButtonText] = useState('Hide balance'); // Initial text for the button

    const [showPublic, setShowPublic] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [showDeposit, setShowDeposit] = useState(false)
    const [showLeaderboard, setShowLeaderboard] = useState(false)

    const [showAddMember, setShowAddMember] = useState(false)
    const [showRemoveMember, setShowRemoveMember] = useState(false)
    const [showLeaveGroup, setShowLeaveGroup] = useState(false)
    const [showAllDeposits, setShowAllDeposits] = useState(false)


    
      const handlePublic=()=>{
        setShowPublic(true)
        setShowCreate(false)
        setShowDeposit(false)
        setShowLeaderboard(false)
      }

      const handleCreate=()=>{
        setShowPublic(false)
        setShowDeposit(false)
        setShowCreate(true)
        setShowLeaderboard(false)

      }

      const handleDeposit=()=>{
        setShowPublic(false)
        setShowDeposit(true)
        setShowCreate(false)
        setShowLeaderboard(false)

      }

      const handleLeaderboard=()=>{
        setShowPublic(false)
        setShowDeposit(false)
        setShowCreate(false)
        setShowLeaderboard(true)
      }

      const handleAddMember=()=>{
        setShowAddMember(true)
        setShowRemoveMember(false)
        setShowLeaveGroup(false)
        setShowAllDeposits(false)
      }

      const handleRemoveMember=()=>{
        setShowAddMember(false)
        setShowLeaveGroup(false)
        setShowAllDeposits(false)
        setShowRemoveMember(true)

      }

      const handleLeaveGroup=()=>{
        setShowAddMember(false)
        setShowLeaveGroup(true)
        setShowRemoveMember(false)
        setShowAllDeposits(false)
      }

      const handleAllDeposits=()=>{
        setShowAddMember(false)
        setShowLeaveGroup(false)
        setShowRemoveMember(false)
        setShowAllDeposits(true)
      }
      
    


  return (
  <>
    {/* <div>{logedInUser}</div> */}
    <div className="accounts_display flex gap-5">

        <div className="leftside w-[50%] flex flex-col gap-2">
          <div className="account_action_toggles flex gap-2 w-[100%]">   
              <button><h1 onClick={handlePublic} className='text-xs'>Public Groups</h1></button>
              <button><h1 onClick={handleCreate} className='text-xs'>Create Group</h1></button>
              <button><h1 onClick={handleDeposit} className='text-xs'>Deposit</h1></button>
              <button><h1 onClick={handleLeaderboard} className='text-xs'>Leaderboard</h1></button>
          </div>

          <div className="t_and_history w-[100%] flex gap-2">
              <div className="account_actions rounded-lg bg-[#2D2A32]/50 w-full h-[60vh] relative">
                  {(!showPublic && !showCreate && !showDeposit && !showLeaderboard) &&(
                      <div className=' h-full w-full flex flex-col gap-3 justify-center items-center text-center'>
                      <FontAwesomeIcon icon={faHand} className='text-green-100'/>
                      </div>
                  )}
                  
                  {showPublic && <PublicGroups />}
                  {showCreate && <CreateGroup />}
                  {showDeposit && <GroupDeposit />}
                  {showLeaderboard && <Leaderboard />}
              </div>
          </div>
        </div>

        <div className="rrightside w-[50%] flex flex-col gap-2">
        <div className="account_action_toggles flex gap-2 w-[100%]">   
              <button><h1 onClick={handleAddMember} className='text-xs'>Add member</h1></button>
              <button><h1 onClick={handleRemoveMember} className='text-xs'>Remove member</h1></button>
              <button><h1 onClick={handleLeaveGroup} className='text-xs'>Leave group</h1></button>
              <button><h1 onClick={handleAllDeposits} className='text-xs'>All deposits</h1></button>
          </div>

          <div className="t_and_history w-[100%] flex gap-2">
              <div className="account_actions rounded-lg bg-[#2D2A32]/50 w-full h-[75vh] relative">
                  {(!showAddMember && !showRemoveMember && !showLeaveGroup && !showAllDeposits) &&(
                      <div className=' h-full w-full flex flex-col gap-3 justify-center items-center text-center'>
                      <FontAwesomeIcon icon={faHand} className='text-green-100'/>
                      </div>
                  )}
                  
                  {showAddMember && <AddMemberGroup />}
                  {showRemoveMember && <RemoveMemberGroup />}
                  {showLeaveGroup && <LeaveGroup />}
                  {showAllDeposits && <AllDeposits />}
              </div>
          </div>
        </div>
        


    </div>
        
    
    
    </>
  )
}

export default SavingsGroups