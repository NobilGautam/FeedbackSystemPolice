import React, { useState } from "react";
import { Auth, Provider } from "../Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import rpLogo from "../assets/rplogo.png";
import emblem from "../assets/emblem.png";
import PDF from "./PDF";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ changeLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          onClick={toggleDropdown}
        >
          Language
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            <button
              onClick={() => {
                changeLanguage("en");
                toggleDropdown(); 
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              English
            </button>
            <button
              onClick={() => {
                changeLanguage("hi");
                toggleDropdown(); 
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Hindi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};



function Navbar() {
  const { t, i18n } = useTranslation();
  const navigator = useNavigate();
  const [open, setOpen] = useState(false);
  const [user] = useAuthState(Auth);

  const [showTooltip, setShowTooltip] = useState(false);

  const handleImageClick = () => {
    setShowTooltip(!showTooltip);
  };

  const signIN = () => {
    signInWithPopup(Auth, Provider)
      .then(() => console.log("Sign in successful"))
      .catch((err) => console.log(err));
    navigator("/");
  };

  const signout = async () => {
    await signOut(Auth);
    navigator("/");
  };

  const Links = [
    { name: "Home", link: "/" },
    user && { name: "My Feedbacks", link: "/myfeedback" },
    user && { name: "My Visits", link: "/myVisits" },
  ];

  const [selectedLink, setSelectedLink] = useState("Home");

  const handleNavClick = (link) => {
    setSelectedLink(link.name);


  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="shadow-md w-full fixed z-20 top-0 left-0">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7 bg-[#8C4E1D]">
        <div className="font-semibold text-2xl cursor-pointer flex items-center text-gray-800">
          <img src={emblem} alt="Emblem" className="w-[50px] hatade mr-4" />
          <img src={rpLogo} className="w-[15%] mr-4" alt="Logo" />
          <span className="text-white text-base md:text-2xl">
            Rajasthan Police Feedback
          </span>
          <div className="md:hidden flex flex-1 justify-end items-center">
            <img
              src={open ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              onClick={() => setOpen(!open)}
            />
            <div
              className={`${
                !open ? "hidden" : "flex"
              } bg-slate-50 p-6 absolute top-20 right-0 mx-4 shadow-2xl my-2 min-w-[140px] z-10 rounded-xl`}
            >
              <ul className="list-none flex justify-end items-start flex-1 flex-col gap-2">
                {user ? (
                  <li
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="md:ml-8 text-base md:my-0 my-3 flex items-center justify-between h-min"
                  >
                    <div>
                      {user.displayName.split(" ").map((xname) => (
                        <h1>{xname}</h1>
                      ))}
                    </div>
                    <img
                      src={user.photoURL}
                      className="text-sm rounded-[50%] w-[30%] logoimg "
                      alt={user.displayName}
                    />
                  </li>
                ) : (
                  <></>
                )}
                {Links.filter((link) => link).map((link) => (
                  <li
                    key={link.name}
                    onClick={() => {
                      setOpen(!open);
                      handleNavClick(link);
                    }}
                    className="md:ml-8  text-base md:my-0 my-3"
                  >
                    <Link
                      to={link.link}
                      className="text-black hover:text-gray-400 duration-500"
                      onClick={() => {
                        setOpen(!open);
                      }}
                    >
                      <p
                        className={`hover:border-b-[3px] ${
                          selectedLink === link.name ? "border-b-[3px]" : ""
                        } border-black duration-100 pb-2`}
                      >
                        {link.name}
                      </p>
                    </Link>
                  </li>
                ))}
                {user ? (
                  <li
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="md:ml-8  text-base md:my-0 my-3 flex items-center"
                  >
                    <Link
                      onClick={signout}
                      className="text-red-500 hover:text-gray-400 duration-500   "
                    >
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      setOpen(!open);
                    }}
                    className="md:ml-8  text-base md:my-0 my-3"
                  >
                    <Link
                      onClick={signIN}
                      className="text-black hover:text-gray-400 duration-500"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
        <LanguageSwitcher changeLanguage={changeLanguage} />
        <ul className="hidden font-medium flex-row md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#8C4E1D] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in">
          {Links.filter((link) => link).map((link) => (
            <li
              key={link.name}
              className="md:ml-8 text-xl md:my-0 my-7"
              onClick={() => {
                handleNavClick(link);
              }}
            >
              <Link
                to={link.link}
                onClick={
                  (link.name === "LOGIN" ? signIN : "") &&
                  setSelectedLink(link.name) &&
                  console.log(selectedLink)
                }
                className="text-white hover:text-gray-400 duration-500"
              >
                <p
                  className={`hover:border-b-[3px] ${
                    selectedLink === link.name ? "border-b-[3px]" : ""
                  } border-white duration-100 pb-2`}
                >
                  {link.name}
                </p>
              </Link>
            </li>
          ))}
          {user ? (
            <li className="md:ml-8 text-xl md:my-0 my-7 flex items-center">
              <img
                src={user.photoURL}
                className="text-sm rounded-[50%] w-[50%] hover:shadow-[#B27D3E] hover:shadow-lg cursor-pointer"
                alt={user.displayName}
                onClick={handleImageClick}
              />
              {showTooltip && (
                <div className="bg-slate-50 px-8 py-2 absolute top-20 right-0 mx-20 shadow-2xl my-2 w-min z-10 rounded-xl">
                  <Link
                    onClick={signout}
                    className="text-red-500 hover:text-gray-400 duration-500"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </li>
          ) : (
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                onClick={signIN}
                className="text-white hover:text-gray-400 duration-500"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
