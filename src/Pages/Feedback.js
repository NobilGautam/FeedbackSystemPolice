import React from 'react'
import { FieldPath, collection,getDocs } from 'firebase/firestore';
import { Auth, db } from '../Firebase';
import { useState,useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import policeStations from '../components/data';

function Feedback() {
  const postRef=collection(db,'feedbacks');
  const [personal,setPersonal]=useState([]);
  const [policeDetails,setPoliceDetails]=useState([]);
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
const imgUrls=[];
for(var i=0; i<fina.length; i++){
const Ps=fina[i].PoliceStation;
for(var j=0; j<policeStations.length; j++){
  if(Ps==policeStations[j].name){
    imgUrls.push(policeStations[j]);

  }
}
}
console.log(imgUrls);

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