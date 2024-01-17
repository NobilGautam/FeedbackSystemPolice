import React from 'react'
import rpLogo from "../assets/rplogo.png";
import emblem from "../assets/emblem.png";
function IntialLoader() {
  return (
    <div className='h-[100vh] text-center flex flex-col items-center justify-center'>
        <div className='flex justify-center w-[100%]'>
        <img src={emblem}  className="w-[15%] mr-4"></img>
        <img src={rpLogo}  className="w-[15%] mr-4"></img>
        </div>
        <h1 className='text-[3rem] font-semibold'>RAJASTHAN POLICE FEEDBACK SERVICES</h1>
    </div>
  )
}

export default IntialLoader