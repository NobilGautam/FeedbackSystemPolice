import React, { useEffect, useState } from 'react'
import { useSupabase } from '../context/SupabaseContext';
import map from "../assets/map.png";
function ChatBotNearest({previousStep}) {
    // console.log(previousStep.message);
    const {tableData}=useSupabase();
    // console.log(tableData);
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      setLoading(true);
      var temp={};
      for(var i=0; i<tableData.length; i++){
        if(tableData[i].address===Number(previousStep.message)){
          temp=tableData[i];
          break;
        }
        
      }
      setData(temp);
setLoading(false);

    },[])


    if(loading){
      return <h1>hell</h1>
    }
    console.log(data);
   
  return (
    <div>
 <h1  className='text-xl text-[#8c4e1d] text-center'>Nearest Police Station</h1>
     <h2 className='text-md'>As per your Pincode Provided which is {previousStep.message},the following Police Station is the Nearest to you </h2>
     <div>
      <img src={data.image}></img>
    <h3  className='text-xl text-[#8c4e1d]'>  Name:{data.name}</h3>
     <h3 className='text-xl text-[#8c4e1d]'> Address:{data.address}</h3>
     <div className='text-xl text-[#8c4e1d]'>Map:</div>
    <img src={map}></img>
     </div>
    </div>
  )
}

export default ChatBotNearest