import React, { useEffect, useState } from "react";
import formBG from "../assets/formBG.jpg";
import PoliceData from "../components/data";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "@chakra-ui/react";
import axios from 'axios';
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { useNavigate } from "react-router";

const NewVisit = () => {
  const {setShow2,show2,setQR, QR,handleSubmit, individual } = useSupabase();
  const [show,setShow]=useState(false);
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [isInProximity, setIsInProximity] = useState(false);
  const navigator=useNavigate();
  const policeStationLocation = { latitude: 40.7128, longitude: -74.0060 };

  const [user]=useAuthState(Auth);


  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    pstation: individual || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      setPhoneNumber(value);
    }
    setForm({ ...form, [name]: value });
    console.log(form.mobile);
  };

  const toast = useToast()

  const handleSendSMS = async () => {
    try {
      const response = await axios.get('https://f4eedback-server-59l6.onrender.com/send-text', {
        params: {
          recipient: phoneNumber
        },
        responseType: 'json',
      });
  
      console.log('SMS Sent:', response.data);
    } catch (error) {
      console.error('Error sending SMS:', error.response?.data || error.message);
    }
  };
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    toast.promise(handleSubmit(form), {
      success: { title: "Visit Marked", description: "Looks great" },
      error: { title: "Error", description: "Something wrong" },
      loading: { title: "Marking Your Visit", description: "Please wait" },
    });

    handleSendSMS();

    setForm({
      name: "",
      age: "",
      email: "",
      mobile: "",
      pstation: individual || "",
    });
    navigator('/myVisits')
  };
  useEffect(()=>{
    if(show2){
      setShow(true);
      setShow2(false);
      setQR(false);
    }
  },[])
  // const getUserLocation = () => {
  //   // if geolocation is supported by the users browser
  //   if (navigator.geolocation) {
  //     // get the current users location
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // save the geolocation coordinates in two variables
  //         const { latitude, longitude } = position.coords;
  //         console.log(latitude,longitude);
  //         // update the value of userlocation variable
  //         setUserLocation({ latitude, longitude });
          
  //       },
  //       // if there was an error getting the users location
  //       (error) => {
  //         console.error('Error getting user location:', error);
  //       }
  //     );
  //   }
  //   // if geolocation is not supported by the users browser
  //   else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // };
  // // useEffect(()=>{
  //   navigator('/');
  // },[])
  // useEffect(()=>{
  //   getUserLocation();
  // },[user])
  // const calculateDistance = (lat1, lon1, lat2, lon2) => {
  //   const R = 6371; // Radius of the Earth in kilometers
  //   const dLat = toRadians(lat2 - lat1);
  //   const dLon = toRadians(lon2 - lon1);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c;
  //   return distance;
  // };

  // const toRadians = (degree) => {
  //   return degree * (Math.PI / 180);
  // };

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  // useEffect(() => {
  //   if (userLocation) {
  //     const distance = calculateDistance(
  //       userLocation.latitude,
  //       userLocation.longitude,
  //       policeStationLocation.latitude,
  //       policeStationLocation.longitude
  //     );

  //     // Set a threshold distance (in kilometers) to determine proximity
  //     const proximityThreshold = 5; // Adjust as needed

  //     setIsInProximity(distance <= proximityThreshold);
  //   }
  // }, [userLocation]);
  if(!show){
    return <h1 className="mt-32 text-center text-[#8c4e1d] text-3xl h-[80vh] flex justify-center items-center my-auto">You got to  scan QR</h1>
  }
  
// if(!userLocation){
//   return <h1 className="mt-32 text-center text-[#8c4e1d] text-3xl h-[80vh] flex justify-center items-center my-auto">You got to provide your location</h1>
// }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-[50%] w-[90%] mx-auto mt-28">
        <form
          className="mt-12 flex flex-col px-2 gap-8 lg:mb-10 bg-slate-50 rounded-md shadow-md shadow-[#5e5d5d]"
          style={{
            background: `url(${formBG})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          id="visitForm"
          onSubmit={handleFormSubmit}
        >
          <label className="flex mt-4 flex-row justify-center items-center gap-[10%]">
            <span className="w-[20%] font-bold">Full Name:</span>
            <input
              type="text"
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="bg-transparent border-[1px] border-black rounded-xl p-2"
            />
          </label>
          <label className="flex flex-row justify-center items-center gap-[10%]">
            <span className="w-[20%] font-bold">Age:</span>
            <input
              type="number"
              required
              name="age"
              value={form.age}
              onChange={handleChange}
              className="bg-transparent border-[1px] border-black rounded-xl p-2"
            />
          </label>
          <label className="flex flex-row justify-center items-center gap-[10%]">
            <span className="w-[20%] font-bold">Mobile:</span>
            <input
              type="text"
              required
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="bg-transparent border-[1px] border-black rounded-xl p-2"
            />
          </label>
          <label className="flex flex-row justify-center items-center gap-[10%]">
            <span className="w-[20%] font-bold">Email:</span>
            <input
              type="text"
              required
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent border-[1px] border-black rounded-xl p-2"
            />
          </label>
          <label className="flex flex-row justify-center items-center gap-[10%]">
            <span className="w-[20%] font-bold">Police Station: </span>
            <select
              name="pstation"
              form="visitForm"
              value={individual}
              onChange={handleChange}
              disabled
              className="bg-transparent border-[1px] border-black rounded-xl p-2"
            >
              {PoliceData.map((data) => (
                <option key={data.id} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-row justify-center items-center m-5">
            <button
              type="submit"
              className="bg-[#f7bc6a] w-[200px] p-2 rounded-xl duration-300 hover:bg-[#d5a96a]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewVisit;
