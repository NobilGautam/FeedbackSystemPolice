import React from 'react'
import '../index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function SingleFeedbackPost({item,ImgLinks,addressLinks}) {
    useEffect(()=>{
        AOS.init({duration:1000});
    },[]);
    
  return ( 
  <div className='grid grid-cols-3 md:w-[80%]  w-[100%] mx-auto mt-16' data-aos='fade-up'>
<div className='flex justify-center items-center'>
 <img src={ImgLinks.get(item.PoliceStation)} className='w-[40%] hata px-2'></img>
    <h2 className='text-sm'>{item.PoliceStation}</h2>
</div>
<div className='flex items-center justify-center'>
    {addressLinks.get(item.PoliceStation)}
</div>

<div className='flex items-center justify-center'>
 {item.Feedback}
</div>

  </div>
   
  )
}

export default SingleFeedbackPost