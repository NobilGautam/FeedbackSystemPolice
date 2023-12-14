import React from 'react'
import { FieldPath, collection, getDocs } from 'firebase/firestore';
import { Auth, db } from '../Firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import policeStations from '../components/data';
import SingleFeedbackPost from '../components/SingleFeedbackPost';
import { Img } from '@chakra-ui/react';


function Feedback() {
  const postRef = collection(db, 'feedbacks');
  const [ImgLinks, setImgLinks] = useState([]);
  const [personal, setPersonal] = useState([]);
  // const [policeDetails,setPoliceDetails]=useState([]);
  const [addressLinks, setAddressLinks] = useState([]);
  const [user] = useAuthState(Auth);
  useEffect(() => {
    const getPost = async () => {
      const dataa = await getDocs(postRef);
      const temp = dataa.docs.filter((item) => {
        const va = item.data();
        // console.log(va)
        return va.Email === user.email;

      })

      const fina = temp.map((item) => { return item.data() });
      // console.log(fina);
      const matching_PS = [];
      for (var i = 0; i < fina.length; i++) {
        const Ps = fina[i].PoliceStation;
        for (var j = 0; j < policeStations.length; j++) {
          if (Ps == policeStations[j].name) {
            matching_PS.push(policeStations[j]);

          }
        }
      }
      // setPoliceDetails(matching_PS);
      const ImgUrls = new Map();
      const Address = new Map();
      for (var j = 0; j < matching_PS.length; j++) {
        ImgUrls.set(matching_PS[j].name, matching_PS[j].image);
        Address.set(matching_PS[j].name, matching_PS[j].address);
      }
      console.log(ImgUrls);


      setPersonal(fina);
      setImgLinks(ImgUrls);
      setAddressLinks(Address);







    }
    getPost();
  }, [])

  console.log((personal));


  return (
    <div className='mt-24 py-10 '>
      <div className='header grid grid-cols-3 w-[100%] md:w-[80%]  mx-auto'>
        <h1 className='text-center text-xl font-bold'>Name</h1>
        <h1 className='text-center text-xl font-bold '>Adress</h1>
        <h1 className='text-center text-xl font-bold'>Feedback</h1>
      </div>
      {personal.map((item) => {
        return <SingleFeedbackPost ImgLinks={ImgLinks} addressLinks={addressLinks} item={item} />
      })}
    </div>
  )
}

export default Feedback