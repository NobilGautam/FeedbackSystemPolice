import React, { useEffect } from 'react'
import { useSupabase } from '../context/SupabaseContext'
import { useNavigate, useParams } from 'react-router';

function QR() {
    const navigator=useNavigate();
    const {id}=useParams();
    const  {QR,setQR} = useSupabase();
    useEffect(()=>{
        setQR(true);
navigator(`/single/${id}`);
    },[])
  return (
    <div></div>
  )
}

export default QR