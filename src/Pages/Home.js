import React, { useEffect, useState } from 'react';
import SingleCommPost from '../components/SingleCommPost';
import PoliceData from '../components/data';
import { Button, Input } from '@chakra-ui/react';
import { ThreeDots } from 'react-loader-spinner';

function Home() {
  const [searchResults, setSearchResults] = useState(PoliceData);
  const [searchTerm, setSearchTerm] = useState('');
  const [index, setIndex] = useState(6);
  const [flag, setFlag] = useState(true);
  const [loader, setLoader] = useState(false);
  const [divv,setDiv]=useState(true);

  const handleclick = () => {
    if (searchTerm.trimStart().length === 0) {
      alert("Please type a valid Police Station");
      return;
    }
    const temp = PoliceData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(temp);
  };

  const handlechange = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortBy = (field) => (a, b) => (a[field] > b[field]) - (a[field] < b[field]);
  const sortByRev = (field) => (a, b) => (a[field] < b[field]) - (a[field] > b[field]);

  const showLoader = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      setIndex((prevIndex) => prevIndex + 6);
    }, 1000);
  };

  useEffect(() => {
    setSearchResults(searchResults);
    setIndex(6);
  }, [flag, searchResults]);

  const sort = (sortState) => {
    if(sortState === 'name' || sortState === 'rating') searchResults.sort(sortBy(sortMethods[sortState].method));
    else searchResults.sort(sortByRev(sortMethods[sortState].method));
    setFlag(!flag);
  };

  const [sortState, setSortState] = useState("name");

  const sortMethods = {
    none: { method: null },
    name: { method: 'name' },
    name_dsc: { method: 'name' },
    rating: { method: 'rating' },
    rating_dsc: { method: 'rating' },
  };

  return (
    <div className=''>
      <div className='w-[80%] mx-auto mt-28 flex'>
        <Input placeholder='Search Police Stations' onChange={handlechange} className=' text-[#8C4E1D] border-2 border-sky-500' />
        <Button className='customButton' onClick={handleclick}>
          Search
        </Button>
      </div>
      <div className='w-[80%] mx-auto'>
      <select defaultValue="None" onChange={(e) => setSortState(e.target.value)}>
        <option value="null" disabled>None</option>
        <option value="name">Name</option>
        <option value="name_dsc">Name Dsc</option>
        <option value="rating">Rating</option>
        <option value="rating_dsc">Rating Dsc</option>
      </select>
        <Button className='customButton' onClick={() => sort(sortState)}>
          Sort
        </Button>
      </div>
      
      <div className='container w-[80%] mx-auto grid md:grid-cols-3 grid-cols-1 gap-10 mt-5'>
        {searchResults.slice(0, Math.min(index, searchResults.length)).map((item) => (
          <SingleCommPost key={item.id} item={item} />
        ))}
      </div>
      
      {
        searchResults.length>0?
        
      <div className='flex justify-center items-center w-[80%] mx-auto py-5'>
        
        {loader ? (
          <h1>
            <ThreeDots visible={true} height='80' width='80' color='#8C4E1D' radius='9' ariaLabel='three-dots-loading' />
          </h1>
        ) : (
          <div>
            {
              index<searchResults.length?
          <Button onClick={showLoader} className='mx-auto justify-center mt-2 customButton'>
            Load More
          </Button>:""
}
          </div>
         
        )}
      </div>:<h1 className='mt-5 text-[#8C4E1D] text-center text-3xl'>No Police Staions found!!</h1>
      }
    </div>
  );
}

export default Home;
