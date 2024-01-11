import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';


const NoPage = () => {
  return (
    <>
    <div className="notfound flex flex-col justify-center items-center">
    <Header />

        <div className="container flex justify-center items-center h-screen">
            <div className="bg-[#121212]/30  flex justify-center items-center flex-col gap-2 h-[60vh] p-5 min-w-[400px] w-[30vw] rounded-xl">
                <h1>404</h1>
                <p>Looks like you're lost</p>

                <Link to ='/'>
                <button className='notfoundbutton'>
                    Go home
                </button>
                </Link>

            </div>
        </div>
    </div>
    </>
  )
}

export default NoPage