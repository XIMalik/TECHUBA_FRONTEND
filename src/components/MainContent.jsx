import React, { useContext, useState } from 'react'
import Account from '../views/Accounts/Account'
import {SidebarContext } from '../views/Main/Dashboard'
import Piggybox from '../views/Piggyboxes/Piggybox'
import Default from '../views/Default'
import SavingsGroups from '../views/SavingsGroups/SavingsGroups'
import Transfer from '../views/Transfer/Transfer'


const MainContent = (props) => {

  const SidebarContent = useContext(SidebarContext)
  console.log(SidebarContent)

  return (
    <>
    
    {/* <div className='text-white/70'>{props.name}</div> */}
    {SidebarContent?.isDefault && <Default name = {props.name} />}

    {SidebarContent?.isAccounts && <Account />}
    {SidebarContent?.isPiggyboxes && <Piggybox />}
    {SidebarContent?.isSavings && <SavingsGroups />}
    {SidebarContent?.isTransfer && <Transfer />}
    
    </>
  )
}

export default MainContent