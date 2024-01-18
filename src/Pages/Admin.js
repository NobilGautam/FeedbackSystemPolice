import React from "react";
import { Input } from "@chakra-ui/react";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router";

function Admin({ handleAdminLogin }) {
  const [pincode, setPincode] = useState("");
  const [userpass, setUserPass] = useState("");

  const navigator = useNavigate();
  const pass = "1234";
  const handleChange = (e) => {
    setPincode(e.target.value);
  };
  const handleChangePass = (e) => {
    setUserPass(e.target.value);
  };
  const handleClick = () => {
    if (userpass != pass) {
      return alert("INVALID CREDITENTIAL");
    }
    sessionStorage.setItem("authToken", "your_token_here");
    handleAdminLogin();

    navigator(`/singleAdmin/${pincode.toUpperCase()}`);
  };
  return (
    <div className="py-5 mt-32 w-[40%] mx-auto text-center flex flex-col items-centers">
      <form>
        <Input
          placeholder={"Enter your Admin Username"}
          className="searchBar shadow-md "
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder={"Enter your PassWord"}
          onChange={handleChangePass}
          className="searchBar shadow-md mt-5"
        />
        <Button
          className="customButton  mt-5 "
          type="submit"
          onClick={handleClick}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Admin;
