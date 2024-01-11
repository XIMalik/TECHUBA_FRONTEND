import { faCreditCard, faHand, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Default = (props) => {
  return (
    <>
        <div className="default h-[100%] w-[100%] flex flex-col justify-center gap-5 rounded-lg items-center bg-[#2D2A32]/20 from-[#121212]/50 to-[#2D2A32]/50">
            <span className='text-sm text-white/50'>{props.name}</span>
            <div className="icons flex justify-center gap-5 items-center underline underline-offset-2 underline-blue-500">
                <FontAwesomeIcon icon={faCreditCard} size='lg' />
                <lord-icon
                    src="https://cdn.lordicon.com/ksdjzsym.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#ffffff,secondary:#ffffff"
                    style={{width:25, height:25}}>
                </lord-icon>
                <FontAwesomeIcon icon={faHand} size='lg' />
                <FontAwesomeIcon icon={faPaperPlane} size="lg" />
            </div>
            


        </div>
    </>
  )
}

export default Default