import React, { useEffect } from 'react'
import { useSupabase } from '../context/SupabaseContext'
import { useState } from 'react';
import { useParams } from 'react-router';
import { load } from 'ol/Image';

function SingleAdmin({isAdminLoggedin}) {


// When the application starts
const storedToken = sessionStorage.getItem('authToken');
const isAuthenticated = !!storedToken;
    const {tableData}=useSupabase();
    const {pincode}=useParams();
    console.log(pincode);
    const [ps,setPs]=useState({});
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        setLoading(true);
        var temp={};

        for(var i=0 ;i<tableData.length; i++){
           
          
            if(tableData[i].address===Number(pincode)){
                temp=tableData[i];
                break;
            }
        }
        console.log(temp);
        setPs(temp);
        setLoading(false);


    },[pincode,tableData])
   
   if(!isAuthenticated){
    return <h1 className='mt-32'>Login admin first</h1>
   }
    if(loading){
        return <h1 className='mt-32'>Loading...</h1>
    }
    
  return (
    <div className='mt-32'>
        <h1 className='text-[#8c4e1d] text-lg'>Hi,{ps.name}</h1>
    </div>
  )
}

export default SingleAdmin