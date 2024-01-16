/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import formBG from "../assets/formBG.jpg";
import { useSupabase } from "../context/SupabaseContext";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { Auth } from "../Firebase";
import { useNavigate } from "react-router";

const NewVisit = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { setShow2, show2, setQR, handleSubmit, individual, tableData:PoliceData } = useSupabase();
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigatorr = useNavigate();
  const [user] = useAuthState(Auth);

  
  const policeStationLocation = {
    latitude:  26.866866376682413,  // Replace with the actual latitude of the police station
    longitude:  75.81917399765078,  // Replace with the actual longitude of the police station
   
  };

  const thresholdDistance = 5; // Replace with your desired threshold distance in kilometers

  useEffect(() => {
    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude,longitude);
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          setError('Error getting user location. Please enable location services.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    // Check if user is within the threshold distance from the police station
    if (userLocation) {
      const distance = calculateDistance(userLocation.latitude,userLocation.longitude, policeStationLocation.latitude,policeStationLocation.longitude);
      setShowForm(distance <= thresholdDistance);
    }
  }, [userLocation]);
  function calculateDistance(lat1, lon1, lat2, lon2) {
    console.log(lat1);
    console.log()
    const latDelta = lat2- lat1;
    const lonDelta = Number(lon2) - Number(lon1);
    console.log(latDelta);
    console.log(lonDelta);

  
    const distance = Math.sqrt(latDelta * latDelta + lonDelta * lonDelta);
    console.log(distance/1000);
    return distance/1000;
  }

  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    pstation: individual || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      setPhoneNumber(value);
    }
    setForm({ ...form, [name]: value });
  };

  const toast = useToast();

  const handleSendSMS = async () => {
    try {
      const response = await axios.get(
        "https://f4eedback-server-59l6.onrender.com/send-text",
        {
          params: {
            recipient: phoneNumber,
          },
          responseType: "json",
        }
      );
    } catch (error) {}
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
    navigatorr("/myVisits");
  };
  useEffect(() => {
    if (show2) {
      setShow(true);
      setShow2(false);
      setQR(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) {
    return (
      <h1 className="mt-32 text-center text-[#8c4e1d] text-3xl h-[80vh] flex justify-center items-center my-auto">
        You got to scan QR
      </h1>
    );
  }

  return (
    
    <div className="flex flex-col justify-center items-center">
      {userLocation && showForm?
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
      </div>:<h1  className="mt-32 text-[#8c4e1d] text-xl ">Your Location doesnt match the police station vicinity</h1>
}
    </div>
  );
};

export default NewVisit;
