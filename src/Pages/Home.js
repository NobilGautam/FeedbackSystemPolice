import React, { useEffect, useState } from 'react'
import SingleCommPost from '../components/SingleCommPost'
import PoliceData from '../components/data'
import { Button } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import InfiniteScroll from 'react-infinite-scroller';
import { Circles } from 'react-loader-spinner'
import { ThreeDots } from 'react-loader-spinner'


function Home() {
  const [searchResults, setSearchResults] = useState(PoliceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [index, setIndex] = useState(15);
  const [flag,setFlag]=useState(true);
  const [loader,setLoader]=useState(false);
  const url = "https://script.google.com/macros/s/AKfycbzvSyrLrcpMXul2X517D714Y8LvOlr29FDmJNH0OYDCqBEqKPPts9VBw6pIrjCORYB6uQ/exec"
  const loadFunc = () => {
    // setIndex(index+3);
    setLoader(true);
    
    setTimeout(() => {
      setIndex(index => index + 6);

    }, 2000);

    setLoader(false);


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

  const handleclick = () => {
    if (searchTerm.trimStart().length === 0) {
      alert("Please type valid PoliceStation")
      return;
    }
    const temp = PoliceData.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    console.log(temp);
    setSearchResults(temp);
  }
  const handlechange = (e) => {

    setSearchTerm(e.target.value);
  }
  function sortBy(field) {
    return function(a, b) {
      return (a[field] > b[field]) - (a[field] < b[field])
    };
  }
  const showLoader=()=>{
    setLoader(true);
   
setTimeout(()=>{
  
  setLoader(false);
  setIndex(index => index + 3);
},1000)




  }

  useEffect(()=>{
    setSearchResults(searchResults);
  },[flag]);

  const sort=()=>{
  searchResults.sort(sortBy('rating'));
  
setFlag(!flag);
 
   
  
    
  }

  return (
    < div className=''>
      <div className='w-[80%] mx-auto mt-28 flex '>
        <Input placeholder='Search Police Stations' onChange={handlechange} />
        <Button colorScheme='teal' onClick={handleclick} >Search</Button>

      </div>
      <div className='w-[80%] mx-auto'>
        <Button colorScheme='teal' onClick={sort}>sort</Button>
        
      </div>
      {/* <InfiniteScroll

        loadMore={loadFunc}
        hasMore={true || false}
        loader={searchResults.length > 15 ? <h1 className='text-center w-[100%] flex justify-center mx-auto'><ThreeDots
        visible={true}
        height="100"
        width="100"
        color="#8C4E1D"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></h1>: ""}

      > */}
        <div className='container w-[80%] mx-auto grid md:grid-cols-3 grid-cols-1 gap-10 mt-5'>


          {searchResults.slice(0, Math.min(index, searchResults.length)).map((item) => {
            return <SingleCommPost key={item.id} item={item}></SingleCommPost>
          })}
       
        </div>
        
        <div className='flex justify-center items-center w-[80%] mx-auto py-5'>
          {loader?<h1><ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#8C4E1D"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></h1>:<Button onClick={showLoader} className='mx-auto justify-center mt-2 loadmore' >Load More</Button>}
          </div>
      {/* </InfiniteScroll> */}
    </div>
  )
}

export default Home