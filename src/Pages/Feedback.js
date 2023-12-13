import React from 'react'
import { FieldPath, collection,getDocs } from 'firebase/firestore';
import { Auth, db } from '../Firebase';
import { useState,useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';


function Feedback() {
  const postRef=collection(db,'feedbacks');
  const [personal,setPersonal]=useState([]);
  const [user]=useAuthState(Auth);
  useEffect(()=>{
    const getPost=async()=>{
     const dataa= await getDocs(postRef);
     const temp=dataa.docs.filter((item)=>{
      const va=item.data();
      // console.log(va)
     return va.Email===user.email;
    
     })
    
const fina=temp.map((item)=>{return item.data()});
// console.log(fina);
setPersonal(fina);


    




    }
    getPost();
  },[])
  
  console.log((personal));
  
  return (
    <div className='mt-24'>
      {personal.map((item)=>{
        return <h1>{item.PoliceStation}</h1>
      })}
    </div>
  )
}

export default Feedback