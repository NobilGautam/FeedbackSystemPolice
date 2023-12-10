import React from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'

function Home() {
 
  return (
    <div className='container w-[80%] mx-auto grid grid-cols-3 gap-10'>
   {PoliceData.map((item)=>{
    return <SingleCommPost key={item.id} item={item}></SingleCommPost>
   })}

    
    </div>
  )
}

export default Home