/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import formBG from "../assets/formBG.jpg";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { useSupabase } from "../context/SupabaseContext";
import { Auth } from "../Firebase";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import { encrypt,decrypt } from "n-krypta";


var Sentiment = require("sentiment");
var sentiment = new Sentiment();
 const SECRET_KEY='ABC'


function Form() {
  var options = {
    extras: {
      not: -2,
    },
  };
  const [refreshFlag,setRefresh]=useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [user] = useAuthState(Auth);
  const {
    individual,
    setIndividual,
    handleSubmit,
    fetchVisits,
    visits,
    updateVisit,
    tableData: policeData,
  } = useSupabase(); // Use the Supabase context


  const { documentId } = useParams();



  useEffect(() => {
    const fetchDocument = async () => {
      fetchVisits(user?.email); // Fetch visits for the logged-in user

      if (documentId) {
        // If documentId exists, set individual visit for editing
        const visit = visits.find((v) => v.documentID === documentId);
        if (visit) {
          setIndividual(visit);
        }
      }
    };
 fetchDocument();
  }, []);

  const [form, setForm] = useState({
    fname: "",
    surname: "",
    age: "",
    email: "",
    gender: "male",
    psname: policeData[0].name,
    purpose: "",
    feedback: "",
    overallRating: '3',
    time: '',
    pbehaviour: '',
    pguidance: '',
    phelpful: '',
    infra: '',
  });

  useEffect(() => {
    setForm({
      fname: individual.name,
      age: individual.age,
      email: individual.email,
      gender: individual.gender || "male",
      psname: individual.policeStation,
      purpose: "",
      feedback: individual.feedback || "",
      overallRating: individual.rating || '3',
      time: individual.time || "Immediately",
      pbehaviour: individual.pbehaviour || 'Abusive',
      pguidance: individual.pguidance || 'Excellent',
      phelpful: individual.phelpful || 'Excellent',
      infra: individual.infra || 'Excellent',
    });
  }, [individual]);

  const toast = useToast();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if(!captcha){
      alert("CHECK THE CAPTCHA ");
      return;
    }
    console.log(form.time);
    console.log(form.pbehaviour);

    const updatedFormData = {
      name: form.fname,
      age: form.age,
      email: form.email,
      pstation: form.psname,
      gender: form.gender,
      feedback: encrypt(form.feedback,toString(process.env.SECRET_KEY)),
      purpose: form.purpose,
      Feel: sentiment.analyze(form.feedback, options).score,
      overallRating: rating,
      time: time,
      pbehaviour: pbehaviour,
      pguidance: pguidance,
      phelpful: phelpful,
      infra: infra,
    };

    // If documentId exists, update the existing visit
    
    if (documentId) {
      toast.promise(updateVisit(documentId, updatedFormData), {
        success: { title: "Feedback Recorded", description: "Looks great" },
        error: { title: "Error", description: "Something wrong" },
        loading: { title: "Recording Feedback", description: "Please wait" },
      });
    } else {
      // Otherwise, submit a new visit
      toast.promise(handleSubmit(updatedFormData), {
        success: { title: "Feedback Recorded", description: "Looks great" },
        error: { title: "Error", description: "Something wrong" },
        loading: { title: "Recording Feedback", description: "Please wait" },
      });
    }

    setTimeout(() => {
      setForm({
        fname: "",
        surname: "",
        age: "",
        email: "",
        gender: "male",
        psname: policeData[0].name,
        purpose: "",
        feedback: "",
        overallRating: '3',
        time: 'Immediately',
        pbehaviour: 'Abusive',
        pguidance: 'Excellent',
        phelpful: 'Excellent',
        infra: 'Excellent',
      });
    }, 5000);
  };
// console.log(encrypt(4,SECRET_KEY));
const handleRecaptchaVerify=()=>{
  setCaptcha(true);

}
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({ ...form, [name]: value });
  };

  const slideInLeftAndFadeIn = {
    hidden: { opacity: 0, x: "-100%" },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const slideInRightAndFadeIn = {
    hidden: { opacity: 0, x: "100%" },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };
  const stringg="divyam";
  const secretKey="abc"
  const [rating, setRating] = useState(3);
  const [time, setTime] = useState('Immediately');
  const [pbehaviour, setPbehaviour] = useState('Abusive');
  const [pguidance, setPguidance] = useState('Excellent');
  const [phelpful, setPhelpful] = useState('Excellent');
  const [infra, setInfra] = useState('Excellent');
   const [captcha,setCaptcha]=useState(false);

  const timeTaken = [
    "Immediately",
    "5 Mins",
    "10 Mins",
    "15 Mins",
    "More than 15 Mins"
  ]

  const behaviour = [
    "Abusive",
    "Rude",
    "Polite",
  ]

  const feedback = [
    "Poor",
    "Below Average",
    "Average",
    "Good", 
    "Excellent"
  ]
  

  return (
    <>
      <div className="flex h-[100%] lg:flex-row justify-center flex-col items-center flex-wrap lg:mt-0 mt-[190px]">
        <div
          initial="hidden"
          animate="show"
          variants={slideInRightAndFadeIn}
          className=" lg:w-[90%] mx-auto lg:mt-28 justify-center flex"
        >
          <form
            id="feedbackForm"
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8 w-[90%] lg:mb-10 bg-slate-50 rounded-md shadow-xl shadow-[#5e5d5d]"
            style={{
              background: `url(${formBG})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex mt-10 lg:flow-row flex-col flex-wrap w-[90%] justify-between mx-[5%]">
                <label className="flex flex-row mt-5 mb-2">
                  <span className="font-bold">Full Name: </span>
                  <input
                    name="fname"
                    value={form.fname}
                    required
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="rounded-md sm:mt-1 xl:mt-0 xl:ml-2 bg-transparent"
                    disabled
                  />
                </label>

              <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2">
                  <span className="font-bold">Age: </span>
                  <input
                    name="age"
                    required
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Enter your age"
                    type="number"
                    className="rounded-md sm:mt-1 xl:mt-0 xl:ml-2 bg-transparent"
                    disabled
                  />
                </label>

                <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2">
                  <span className="font-bold">Gender: </span>
                  <select
                    name="gender"
                    form="feedbackForm"
                    onChange={handleChange}
                    value={form.gender}
                    className="bg-transparent sm:mt-1 xl:mt-0 xl:ml-2"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </label>

              <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2">
                  <span className="font-bold">Select Police Station: </span>
                  <select
                    name="psname"
                    form="feedbackForm"
                    value={form.psname}
                    onChange={handleChange}
                    className="bg-transparent sm:mt-1 xl:mt-0 xl:ml-2"
                    disabled
                  >
                    {policeData.map((data) => (
                      <option key={data.id} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                  </select>
                </label>
            </div>

            <div className="flex flex-col lg:flow-row justify-between mx-[5%] w-[100%]">
              <div className="flex justify-start flex-wrap flex-row">
                <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2">
                  <span className="font-bold">Purpose of visit: </span>
                  <input
                    type="text"
                    name="purpose"
                    value={form.purpose}
                    required
                    onChange={handleChange}
                    placeholder="Enter your purpose of visit in not more than one line"
                    className="w-[550px] sm:mt-1 xl:mt-0 xl:ml-2 bg-transparent"
                  />
                </label>
              </div>
              <div className="flex justify-start flex-wrap flex-row">
                <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2">
                  <span className="font-bold">Email </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    required
                    onChange={handleChange}
                    placeholder="Enter your Email"
                    className="w-[550px] sm:mt-1 xl:mt-0 xl:ml-2 bg-transparent"
                    disabled
                  />
                </label>
              </div>
            </div>

            
              <label className="flex flex-col lg:flex-row gap-2 mt-5 mb-2 ml-[5%]">
                <span className="font-bold">After how much time you were heard in police station: </span>
                <div className="flex lg:items-center flex-col items-start lg:flex-row ml-2">
                  {timeTaken.map((value) => (
                    <label key={value} className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="time"
                        value={value}
                        checked={time === value}
                        onChange={() => setTime(value)}
                        className="mr-1"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </label>

            
              <label className="flex flex-col lg:flex-row gap-2 mt-5 mb-2 ml-[5%]">
                <span className="font-bold">How do you rate the behaviour of the police officers: </span>
                <div className="flex lg:items-center flex-col items-start lg:flex-row ml-2">
                  {behaviour.map((value) => (
                    <label key={value} className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="pbehaviour"
                        value={value}
                        checked={pbehaviour === value}
                        onChange={() => setPbehaviour(value)}
                        className="mr-1"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </label>

            
              <label className="flex flex-col lg:flex-row gap-2 mt-5 mb-2 ml-[5%]">
                <span className="font-bold">Guidance received at the police station: </span>
                <div className="flex lg:items-center flex-col items-start lg:flex-row ml-2">
                  {feedback.map((value) => (
                    <label key={value} className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="pguidnace"
                        value={value}
                        checked={pguidance === value}
                        onChange={() => setPguidance(value)}
                        className="mr-1"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </label>

            
              <label className="flex flex-col lg:flex-row gap-2 mt-5 mb-2 ml-[5%]">
                <span className="font-bold">Courtesy and helpfullness of the staff at the police station: </span>
                <div className="flex lg:items-center flex-col items-start lg:flex-row ml-2">
                  {feedback.map((value) => (
                    <label key={value} className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="phelpful"
                        value={value}
                        checked={phelpful === value}
                        onChange={() => setPhelpful(value)}
                        className="mr-1"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </label>

              <label className="flex flex-col lg:flex-row gap-2 mt-5 mb-2 ml-[5%]">
                <span className="font-bold">Infrastructure at the police station: </span>
                <div className="flex lg:items-center flex-col items-start lg:flex-row ml-2">
                  {feedback.map((value) => (
                    <label key={value} className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="infra"
                        value={value}
                        checked={infra === value}
                        onChange={() => setInfra(value)}
                        className="mr-1"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </label>

              <label className="flex flex-col lg:flex-row gap-2 mt-5 mb-2 ml-[5%]">
                <span className="font-bold">Overall Experience with the Police Station: </span>
                <div className="flex lg:items-center flex-col items-start lg:flex-row ml-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="flex items-center mr-4">
                      <input
                        type="radio"
                        name="overallRating"
                        value={value}
                        checked={rating === value}
                        onChange={() => setRating(value)}
                        className="mr-1"
                      />
                      {value === 1 && "Very Dissatisfied"}
                      {value === 2 && "Dissatisfied"}
                      {value === 3 && "Neutral"}
                      {value === 4 && "Satisfied"}
                      {value === 5 && "Very Satisfied"}
                    </label>
                  ))}
                </div>
              </label>

            <div className="flex flex-initial justify-start flex-wrap flex-col">
              <label className="flex flex-col lg:flex-row items-center gap-[5%] mt-5 mb-2 ml-[5%]">
                <span className="font-bold">Your feedback: </span>
                <textarea
                  type="text"
                  name="feedback"
                  required
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder="Enter your feedback"
                  className="xl:w-[550px] w-[90%] mr-2 mt-1 xl:mt-0 bg-gray-100 rounded-md p-2"
                />
              </label>
            </div>
            <div className="flex flex-initial justify-start flex-wrap flex-col">
              <label className="flex flex-col  mb-2 ml-[5%]">
               
              <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        onChange={handleRecaptchaVerify}></ReCAPTCHA>
              </label>
            </div>

            <button
              type="submit"
              className="bg-gray-300 hover:bg-gray-400 ml-[5%] py-3 px-8 mb-3 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl"
              onClick={handleFormSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
