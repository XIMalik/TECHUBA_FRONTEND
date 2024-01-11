import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Leaderboard = () => {

    const [data, setData] = useState()
    const [groupName, setGroupName] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.get(
            `https://rldondon.pythonanywhere.com/groups/${groupName}/leaderboard`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
            }
          );
    
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.error('Error:', error.message);
          setError(error.message);
        }
      };
      
  return (
    <div className='flex flex-col gap-3 p-5'>

        <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3'>
            <div className='field group-name'>
                <label htmlFor="group_name">Group Name</label>
                <input
                    type="text"
                    id="group_name"
                    name="group_name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
            </div>

            <button type="submit" className='submit_signup bg-red-700 hover:bg-red-800 transition-ease-in duration-300'>Get leaderboard</button>
        </form>

        <div className="leaderboard_render">
        {data && (
            <div className='h-full accounts_form w-full bg-[#2D2A32] rounded-lg p-5 overflow-y-scroll'>
                <div className="rendered_leaderboard w-full flex flex-col gap-4">
                    <div className="flex w-[100%] flex-row leaderboard justify-between text-center" >
                            <label className=''>Rank</label>
                            <label className=''>user</label>
                            <label className='flex gap-1 items-center'>amount <span className='text-xs currency'>(NGN)</span></label>
                    </div>

                {data.map((item, index) => (
                    <div className="w-full flex justify-between bg-[#000]/10 p-5 rounded-lg text-center" key={item.index}>
                        <div className='number'>
                            <span>{index + 1}</span>
                        </div>
                    <div className='users'>
                        <span>{item.user__email}</span>
                    </div>
                    <div className='amounts'>
                        <span className='flex gap-2 items-end font-bold'>{item.Total}</span>
                    </div>
                    </div>
                ))}
                </div> 
            </div>
        )}
        </div>


        { (error) && (
          <div className="notification absolute flex justify-center items-center bg-red-900/50 text-white rounded-lg overflow-hidden text-xs top-4 right-2">
            {error && <div className='h-full w-full bg-red-900 p-2'>{error}</div>}
          </div>
        )}
    </div>
  )
}

export default Leaderboard