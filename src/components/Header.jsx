import React from 'react';

const Header = () => {
  const image = "https://patoodesign.com/wp-content/uploads/2015/08/UBA-logo.jpg";

  return (
    <>
      <div className="base header h-[80px] flex flex-col absolute top-0 w-full justify-start items-center">
        <div className="ubalogo overflow-hidden top-10 h-[100px] rounded-xl bg-red-500">
          <img src={image} alt="UBA Logo" className='object-cover h-[100%] w-[100%]' />
        </div>
      </div>
    </>
  );
};

export default Header;
