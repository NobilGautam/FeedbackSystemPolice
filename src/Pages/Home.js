import React from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'

function Home() {
 
  return (
    <div>
   {PoliceData.map((item)=>{
    return <SingleCommPost key={item.id} item={item}></SingleCommPost>
   })}

    
    </div>
  )
}

export default Home