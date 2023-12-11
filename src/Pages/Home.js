import React, { useState } from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'
import { Button, useStatStyles } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller';

function Home() {
  const [searchResults,setSearchResults]=useState(PoliceData);
  const [searchTerm,setSearchTerm]=useState('');
  const [index,setIndex]=useState(15);
  const loadFunc=()=>{
    setIndex(index+3);
  }
  
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
      <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={ searchResults.length>15?true:false}
    
>
      <div className='container w-[80%] mx-auto grid grid-cols-3 gap-10'>
        
        {searchResults.slice(0,Math.min(index,searchResults.length+1)).map((item)=>{
          return <SingleCommPost key={item.id} item={item}></SingleCommPost>
        })}
      </div>
      </InfiniteScroll>
    </>
  )
}

export default Home