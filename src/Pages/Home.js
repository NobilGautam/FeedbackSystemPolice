import React, { useState } from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'
import { Button, useStatStyles } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

function Home() {
  const [searchResults,setSearchResults]=useState(PoliceData);
  const [searchTerm,setSearchTerm]=useState('');
  
  const handleclick=()=>{
    const temp=PoliceData.filter((item)=>{
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    setSearchResults(temp);
  }
  const handlechange=(e)=>{
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <div className='w-[80%] mx-auto mt-28 flex'>
        <Input placeholder='Search Police Stations' onChange={handlechange} />
        <Button colorScheme='teal'onClick={handleclick} >Search</Button>
      </div>
      <div className='container w-[80%] mx-auto grid grid-cols-3 gap-10'>
        {   searchResults.map((item)=>{
          return <SingleCommPost key={item.id} item={item}></SingleCommPost>
        })}
      </div>
    </>
  )
}

export default Home