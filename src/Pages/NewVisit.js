import React, { useState } from "react";
import formBG from "../assets/formBG.jpg";
import PoliceData from "../components/data";
import { useNavigate } from "react-router-dom";
import { useSupabase } from "../context/SupabaseContext";

const NewVisit = () => {
  const navigator = useNavigate();
  const { handleSubmit, individual } = useSupabase();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    pstation: individual || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    handleSubmit(form);

    setForm({
      name: "",
      age: "",
      email: "",
      pstation: individual | "",
    });

    navigator("/");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-[50%] w-[90%] mx-auto mt-28">
        <form
          className="mt-12 flex flex-col px-2 gap-8 lg:mb-10 bg-slate-50 rounded-md shadow-xl shadow-[#5e5d5d]"
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
