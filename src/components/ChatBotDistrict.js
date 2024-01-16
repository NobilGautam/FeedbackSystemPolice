import React from 'react'
import { useSupabase } from '../context/SupabaseContext';
import { useState,useEffect } from 'react';

function ChatBotDistrict({previousStep}) {
    const {tableData}=useSupabase();
    // console.log(previousStep.message);
    // console.log(tableData);
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
      setLoading(true);
      var temp=[];
      for(var i=0; i<tableData.length; i++){
       const newstrong=tableData[i].name.replace(/\d+/g, '').toLowerCase()
    //    console.log(newstrong);
    //    console.log(previousStep.message);
       
        if(newstrong.trim()===previousStep.message.trim()){
            // console.log("tableData[i].name:", tableData[i].name);
            // console.log("previousStep.message:", previousStep.message);
            
          temp.push(tableData[i]);
          
        }
        
      }
      console.log(temp);
      setData(temp);
setLoading(false);

    },[])


    if(loading){
      return <h1>hell</h1>
    }
   
  return (
    <div>
{data.map((item)=>{
    return (<h1>{item.name}</h1>)
})}

    </div>
  )
}

export default ChatBotDistrict