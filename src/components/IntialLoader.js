import React from 'react'
import rpLogo from "../assets/rplogo.png";
import emblem from "../assets/emblem.png";
function IntialLoader() {
  return (
    <div className='h-[100vh] text-center flex justify-center items-center'>
        <img src={emblem}  className="w-[15%] mr-4"></img>
        <img src={rpLogo}  className="w-[15%] mr-4"></img>
    </div>
  )
}

export default IntialLoader