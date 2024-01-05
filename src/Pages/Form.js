/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import formBG from "../assets/formBG.jpg";
import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router";
import { useSupabase } from "../context/SupabaseContext";
import { Auth } from "../Firebase";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";

var Sentiment = require("sentiment");
var sentiment = new Sentiment();

function Form() {
  var options = {
    extras: {
      not: -2,
    },
  };

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
    });
  }, [individual]);

  const toast = useToast();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      name: form.fname,
      age: form.age,
      email: form.email,
      pstation: form.psname,
      gender: form.gender,
      feedback: form.feedback,
      purpose: form.purpose,
      Feel: sentiment.analyze(form.feedback, options).score,
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
      });
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

  return (
    <>
      <div className="flex h-[100%] lg:flex-row justify-center flex-col items-center flex-wrap lg:mt-0 mt-[90px]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={slideInLeftAndFadeIn}
          className="w-[30%] flex mx-auto justify-center items-center"
        >
          <h1 className="text-9xl">Fill</h1>
          <h1 className="text-5xl">YOUR FEEDBACK</h1>
        </motion.div>
        ;
        <motion.div
          initial="hidden"
          animate="show"
          variants={slideInRightAndFadeIn}
          className=" lg:w-[50%] mx-auto lg:mt-28"
        >
          <form
            id="feedbackForm"
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8 lg:mb-10 bg-slate-50 rounded-md shadow-xl shadow-[#5e5d5d]"
            style={{
              background: `url(${formBG})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-row justify-start flex-wrap">
              <label className="w-[45%] ml-[5%] flex flex-col mt-5 mb-2">
                <span className="font-bold">Full Name: </span>
                <input
                  name="fname"
                  value={form.fname}
                  required
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="rounded-md mt-1 bg-transparent"
                  disabled
                />
              </label>
            </div>

            <div className="flex justify-start flex-wrap flex-row">
              <label className="flex flex-col lg:flex-row w-[45%] lg:items-center ml-[5%] mt-5 mb-2">
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
            </div>

            <div className="flex justify-start flex-wrap flex-row">
              <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2 ml-[5%]">
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

            <div className="flex justify-start flex-wrap flex-row">
              <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2 ml-[5%]">
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
              <label className="flex flex-col lg:flex-row lg:items-center mt-5 mb-2 ml-[5%]">
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

            <div className="flex flex-initial justify-start flex-wrap flex-col">
              <label className="flex flex-col mt-5 mb-2 ml-[5%]">
                <span className="font-bold">Your feedback: </span>
                <textarea
                  type="text"
                  name="feedback"
                  required
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder="Enter your feedback"
                  className="xl:w-[550px] mr-2 mt-1 xl:mt-0 bg-gray-100 rounded-md p-2"
                />
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
        </motion.div>
      </div>
    </>
  );
}

export default Form;
