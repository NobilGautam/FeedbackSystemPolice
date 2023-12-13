import React, { useEffect, useState } from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller';
import { Circles } from 'react-loader-spinner'

function Home() {
  const [searchResults,setSearchResults]=useState(PoliceData);
  const [searchTerm,setSearchTerm]=useState('');
  const [index,setIndex]=useState(15);
  const url="https://script.google.com/macros/s/AKfycbzvSyrLrcpMXul2X517D714Y8LvOlr29FDmJNH0OYDCqBEqKPPts9VBw6pIrjCORYB6uQ/exec"
  const loadFunc=()=>{
    // setIndex(index+3);
    setTimeout(() => {
      setIndex(index=>index+6);
      
    }, 1500);
  

  }
  // useEffect(()=>{
  //   const fetchdata=async(url)=>{

  //    const data=await fetch(url);
  //    const res=await data.json();
  //    console.log(res);
     
 //for api
  //   }
  //   fetchdata(url);
  // },[])
  
  const handleclick=()=>{
    if(searchTerm.trimStart().length===0){
      alert("Please type valid PoliceStation")
      return;
    }
    const temp=PoliceData.filter((item)=>{
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    console.log(temp);
    setSearchResults(temp);
  }
  const handlechange=(e)=>{
   
    setSearchTerm(e.target.value);
  }
 
  return (
    <>
      <div className='w-[80%] mx-auto mt-28  flex'>
        <Input placeholder='Search Police Stations' onChange={handlechange} />
        <Button colorScheme='teal'onClick={handleclick} >Search</Button>
      </div>
      <InfiniteScroll
  
    loadMore={loadFunc}
    hasMore={ true||false}
    loader={searchResults.length>15?<h1 className='text-center w-[100%] flex justify-center mx-auto'><Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      
    /></h1>:""}
    
 >
      <div className='container w-[80%] mx-auto grid md:grid-cols-3 grid-cols-1 gap-10 mt-5'>
        
        {searchResults.slice(0,Math.min(index,searchResults.length)).map((item)=>{
          return <SingleCommPost key={item.id} item={item}></SingleCommPost>
        })}
      </div>
      </InfiniteScroll>
    </>
  )
}

export default Home