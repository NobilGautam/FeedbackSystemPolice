import React from 'react'
import '../index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function SingleFeedbackPost({ item, ImgLinks, addressLinks }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
    {/* <div className='grid grid-cols-3 md:w-[80%]  w-[100%] mx-auto mt-16' data-aos='fade-up'>
      <div className='flex justify-center items-center'>
        <img src={ImgLinks.get(item.PoliceStation)} className='w-[40%] hata px-2 '></img>
        <h2 className='text-sm'>{item.PoliceStation}</h2>
      </div>
      <div className='flex items-center justify-center'>
        {addressLinks.get(item.PoliceStation)}
      </div>

      <div className={`flex items-center justify-center ${item.Feel<=0?'text-red-500':'text-green-500'}`}>
        {item.Feedback}
      </div>

    </div> */}


    <div className='flex justify-center my-4 lg:h-[140px] hover:scale-105 duration-300' data-aos='fade-up'>
    <div className='flex flex-row md:w-[80%] justify-between rounded-2xl overflow-hidden shadow-md shadow-[#8e8e8e] bg-[#f6bd85]'>
      <div className='flex justify-between items-center w-[30%]'>
        <img src={ImgLinks.get(item.PoliceStation)} className='w-[60%] h-[100%]'></img>
        <h2 className='text-[1.2rem] font-bold text-center w-[100%]'>{item.PoliceStation}</h2>
      </div>
      <div className='flex items-center md:text-[1.2rem] font-light justify-center w-[40%]'>
        {addressLinks.get(item.PoliceStation)}
      </div>
 
      <div className={`flex items-center bg-[#f9d4ae] m-2 rounded-lg p-2 font-light w-[30%] justify-center ${item.Feel<=0?'text-red-500':'text-green-500'}`}>
        {item.Feedback}
      </div>
    </div>
    </div>
    </>

  )
}

export default SingleFeedbackPost