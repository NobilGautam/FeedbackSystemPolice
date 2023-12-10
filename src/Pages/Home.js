import React, { useState } from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'
import { Button, useStatStyles } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

function Home() {
  const [searchResults,setSearchResults]=useState([]);
  const [searchTerm,setSearchTerm]=useState('');
  
 
  return (
    <>
    <div className='w-[80%] mx-auto my-5 flex'>
  <Input placeholder='Search Police Stations' />
  <Button colorScheme='teal' >Search</Button>
  </div>
   <div className='container w-[80%] mx-auto grid grid-cols-3 gap-10'>
    
    
   {   PoliceData.map((item)=>{
    return <SingleCommPost key={item.id} item={item}></SingleCommPost>
   })}

    
    </div>

    </>
    
  
  )
}

export default Home