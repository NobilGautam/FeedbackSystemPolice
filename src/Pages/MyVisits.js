import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { Auth, db } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SingleVisitPost from '../components/SingleVisitPost';
import policeStations from '../components/data';

export const MyVisits = () => {

    const docRef = collection(db, 'visits');
    const [user] = useAuthState(Auth);
    const [personal, setPersonal] = useState([]);
    const [imgLinks, setImgLinks] = useState([]);
    const [addressLinks, setAddressLinks] = useState([]);
    useEffect(() => {
      const getVisits = async () => {
        const visits = await getDocs(docRef);
        const temp = visits.docs.filter((item) => {
          const visit = item.data();
          return visit.email === user.email;
        })

        const myVisits = temp.map((item) => {
          return { ...item.data(), id: item.id }; 
        });
        const matching_PS = [];
        for (var i = 0; i < myVisits.length; i++) {
          const Ps = myVisits[i].policeStation;
          for (var j = 0; j < policeStations.length; j++) {
            if (Ps === policeStations[j].name) {
              matching_PS.push(policeStations[j]);
            }
          }
        }
        const ImgUrls = new Map();
        const Address = new Map();
        for (var k = 0; k < matching_PS.length; k++) {
          ImgUrls.set(matching_PS[k].name, matching_PS[k].image);
          Address.set(matching_PS[k].name, matching_PS[k].address);
        }
        setPersonal(myVisits);
        setImgLinks(ImgUrls);
        setAddressLinks(Address);
      }
      getVisits();
    }, [docRef, user.email])


  return (
    <div className='mt-24 py-10 '>
      {personal.map((item) => {
        return <SingleVisitPost key={item.id} ImgLinks={imgLinks} addressLinks={addressLinks} item={item} documentId={item.id} />
      })}
    </div>
  )
}

export default MyVisits;