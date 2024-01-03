import React, { useState } from 'react'
import formBG from '../assets/formBG.jpg';
import PoliceData from '../components/data';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Firebase';

const NewVisit = () => {

  const docRef = collection(db, 'visits');

  const [form, setForm] = useState({
    name: '',
    age: '',
    email: '',
    pstation: PoliceData[0].name
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addDoc(docRef, {
      name: form.name,
      age: form.age,
      email: form.email,
      policeStation: form.pstation,
      timeStamp: serverTimestamp()
    });

    setForm({
      name: '',
      age: '',
      email: '',
      pstation: PoliceData[0].name
    })

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='lg:w-[50%] mx-auto lg:mt-28'>
        <form className='mt-12 flex flex-col gap-8 lg:mb-10 bg-slate-50 rounded-md shadow-xl shadow-[#5e5d5d]' style={{
              background: `url(${formBG})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
            id='visitForm'
            onSubmit={handleSubmit}>
              <label className='flex flex-row justify-center gap-[10%]'>
                <span className='w-[20%]'>Full Name:</span>
                <input
                  type='text'
                  required
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                />
              </label>
              <label className='flex flex-row justify-center gap-[10%]'>
                <span className='w-[20%]'>Age:</span>
                <input
                  type='text'
                  required
                  name='age'
                  value={form.age}
                  onChange={handleChange}
                />
              </label>
              <label className='flex flex-row justify-center gap-[10%]'>
                <span className='w-[20%]'>Email:</span>
                <input
                  type='text'
                  required
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
              <label className='flex flex-row justify-center gap-[10%]'>
                <span className='w-[20%]'>Police Station: </span>
                <select
                  name='pstation'
                  form='visitForm'
                  value={form.pstation}
                  onChange={handleChange}
                  className=''>
                  {PoliceData.map((data) => (
                    <option key={data.id} value={data.name}>{data.name}</option>
                  ))}
                </select>
              </label>
              <button type='submit'>
                Submit
              </button>
        </form>
      </div>  
    </div>
  )
}

export default NewVisit