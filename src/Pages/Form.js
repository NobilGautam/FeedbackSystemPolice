import React, { useState } from 'react'
import PoliceData from '../components/data'
import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';

function Form() {
  const policeData = PoliceData;

  const [form, setForm] = useState({
    fname:'',
    surname:'',
    age:'',
    gender:'male',
    psname:policeData.at(1).name,
    purpose:'',
    feedback:''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(form.fname + form.surname + form.age + form.gender + form.psname + form.purpose + form.feedback);
    setForm({
      fname:'',
      surname:'',
      age:'',
      gender:'male',
      psname:policeData.at(1).name,
      purpose:'',
      feedback:''
    });
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setForm({...form, [name]:value})
  }

  return (
    <>
    <div className='flex h-[100%] lg:flex-row flex-col flex-wrap lg:mt-0 sm:mt-[90px]'>
    <motion.div
    initial="hidden"
    animate="show" 
    variants={slideIn('left', "tween", 0.2, 1)}
    className='w-[30%] flex mx-auto justify-center items-center'>
      <h1 className='text-9xl'>Fill</h1>  
      <h1 className='text-5xl'>YOUR FEEDBACK</h1>
    </motion.div>


    <motion.div 
    initial="hidden"
    animate="show"
    variants={slideIn('right', "tween", 0.2, 1)}
    className=' lg:w-[50%] mx-auto mt-28'>
      <form
        id='feedbackForm'
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-8  bg-slate-50 rounded-md shadow-md mb-3'>
          <div className='flex flex-row justify-start flex-wrap'>
            <label
              className='w-[45%] ml-[5%] flex flex-col mt-5 mb-2'>
                <span className='font-bold'>First Name: </span>
                <input
                  name='fname'
                  value={form.fname}
                  required
                  onChange={handleChange}
                  placeholder='Enter your first name'
                  className='rounded-md mt-1 bg-transparent'
                />
            </label>
            <label
              className='flex flex-col mt-5 mb-2'>
                <span className='font-bold'>Last Name: </span>
                <input
                  name='surname'
                  value={form.surname}
                  onChange={handleChange}
                  placeholder='Enter your last name'
                  className='rounded-md mt-1 bg-transparent'
                />
            </label>
          </div>

          <div className='flex justify-start flex-wrap flex-row'>
            <label
              className='flex flex-col lg:flex-row w-[45%] lg:items-center ml-[5%] mt-5 mb-2'>
                <span className='font-bold'>Age: </span>
                <input
                  name='age'
                  required
                  value={form.age}
                  onChange={handleChange}
                  placeholder='Enter your age'
                  type='number'
                  className='rounded-md sm:mt-1 xl:mt-0 xl:ml-2 bg-transparent'
                />
            </label>
            <label
              className='flex flex-col lg:flex-row lg:items-center mt-5 mb-2'>
                <span className='font-bold'>Gender: </span>
                <select name='gender' form='feedbackForm' onChange={handleChange} value={form.gender} className='bg-transparent sm:mt-1 xl:mt-0 xl:ml-2'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
            </label>
          </div>

          <div className='flex justify-start flex-wrap flex-row'>
            <label
              className='flex flex-col lg:flex-row lg:items-center mt-5 mb-2 ml-[5%]'>
                <span className='font-bold'>Select Police Station: </span>
                <select name='psname' form='feedbackForm' value={form.psname} onChange={handleChange} className='bg-transparent sm:mt-1 xl:mt-0 xl:ml-2'>
                {
                  policeData.map((data) => {
                      return <option value={data.name}>{data.name}</option>
                  })
                }
                </select>
            </label>
          </div>

          <div className='flex justify-start flex-wrap flex-row'>
            <label
              className='flex flex-col lg:flex-row lg:items-center mt-5 mb-2 ml-[5%]'>
                <span className='font-bold'>Purpose of visit: </span>
                <input
                  type='text'
                  name='purpose'
                  value={form.purpose}
                  required
                  onChange={handleChange}
                  placeholder='Enter your purpose of visit in not more than one line'
                  className='w-[550px] sm:mt-1 xl:mt-0 xl:ml-2 bg-transparent'
                />
            </label>
          </div>

          <div className='flex flex-initial justify-start flex-wrap flex-col'>
            <label
              className='flex flex-col mt-5 mb-2 ml-[5%]'>
                <span className='font-bold'>Your feedback: </span>
                <textarea
                  type='text'
                  name='feedback'
                  required
                  value={form.feedback}
                  onChange={handleChange}
                  placeholder='Enter your feedback'
                  className='xl:w-[550px] mr-2 mt-1 xl:mt-0 bg-gray-100 rounded-md p-2'
                />
            </label>
          </div>

          <button
            type="submit"
            className=" bg-gray-300 hover:bg-gray-400 ml-[5%] py-3 px-8 mb-3 outline-none w-fit text-black font-bold shadow-md shadow-primary rounded-xl"
          >
            Submit
          </button>
        </form>
    </motion.div>
    </div>
    </>
  )
}

export default Form