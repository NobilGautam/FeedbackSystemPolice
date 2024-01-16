import React, { useState } from "react";
import { Auth, Provider } from "../Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import rpLogo from "../assets/rplogo.png";
import emblem from "../assets/emblem.png";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
} from "@chakra-ui/react";
import { IoCheckmarkCircleOutline, IoDocumentOutline, IoHomeOutline, IoLogInOutline, IoLogOutOutline, IoMenu } from "react-icons/io5";
import { useTranslation } from "react-i18next";

function Navbar() {
  const navigator = useNavigate();
  const [user] = useAuthState(Auth);
  const { t, i18n } = useTranslation();

  const link=useLocation();
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
    { name: t("navbar.home"), link: "/" , icon: <IoHomeOutline/>},
    user && { name: t("navbar.myFeedbacks"), link: "/myfeedback", icon: <IoDocumentOutline/> },
    user && { name: t("navbar.myVisits"), link: "/myVisits", icon: <IoCheckmarkCircleOutline/> },
  ];

  console.log(link);
  const [selectedLink, setSelectedLink] = useState(`${link.pathname==='/myfeedback'?"My Feedbacks":link.pathname==='/myVisits'?"My Visits":"Home"}`);


  const handleNavClick = (link) => {
    setSelectedLink(link.name);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleImgclick=()=>{
    navigator('/');
  }
  
  return (
    <div className="shadow-md w-full fixed z-20 top-0 left-0">
      <div className="md:flex items-center justify-between py-4 md:px-10 px-7 bg-[#8C4E1D]">
        <div className="font-semibold text-2xl cursor-pointer flex items-center text-gray-800">
          
          <img src={emblem} alt="Emblem" className="w-[50px] hatade mr-4" onClick={handleImgclick}/>
          <img src={rpLogo} className="w-[15%] mr-4" alt="Logo"  onClick={handleImgclick}/>
          <span onClick={handleImgclick} className="text-white text-base md:text-2xl">
            {t("navbar.rpf")}
          </span>
          <div className="md:hidden flex flex-1 justify-end items-center">
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<IoMenu />}
                style={{
                  backgroundColor: "#F0F0F0",
                  borderRadius: "50%",
                }}
              />
              <MenuList>
                {user ? (
                  <>
                    <MenuItem className="flex justify-between">
                      <div className="text-sm">
                        Namaste, <br /> {user.displayName}
                      </div>
                      <img
                        src={user.photoURL}
                        className="rounded-full"
                        alt={user.displayName}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                        }}
                      />
                    </MenuItem>
                    <MenuDivider />
                  </>
                ) : (
                  <MenuItem>
                  <IoLogInOutline/>
                    <Link className="text-sm ml-2 w-full text-green-600" onClick={signIN}>
                      {t("navbar.login")}
                    </Link>
                  </MenuItem>
                )}
                <MenuOptionGroup
                  className="text-sm"
                  defaultValue="English"
                  title="Language"
                  type="radio"
                  onChange={(selectedValue) => {
                    let lang = selectedValue === 'English' ? 'en' : 'hi'
                    changeLanguage(lang) 
                  }}
                >
                  <MenuItemOption className="text-sm w-full" value="English">
                    {t("navbar.english")}
                  </MenuItemOption>
                  <MenuItemOption className="text-sm w-full" value="Hindi">
                    {t("navbar.hindi")}
                  </MenuItemOption>
                </MenuOptionGroup>
                <MenuDivider />
                {Links.filter((link) => link).map((link) => (
                  <MenuItem key={link.name}>
                    {link.icon}
                    <Link
                      as={Link}
                      to={link.link}
                      className="text-sm ml-2 w-full"
                      onClick={() => {
                        handleNavClick(link);
                      }}
                    >
                      {link.name}
                    </Link>
                  </MenuItem>
                ))}
                {user ? (
                  <MenuItem>
                  <IoLogOutOutline/>
                    <Link
                      onClick={signout}
                      className="text-red-500 ml-2 w-full text-sm hover:text-gray-400 duration-500"
                    >
                      {t("navbar.logout")}
                    </Link>
                  </MenuItem>
                ) : (
                  <></>
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
        <ul className="hidden font-medium flex-row md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#8C4E1D] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in">
          <li>
            <Select
              style={{ backgroundColor: "#F0F0F0" }}
              onChange={(event) => {
                const selectedLanguage = event.target.value;
                changeLanguage(selectedLanguage);
              }}
            >
              <option value="en">{t("navbar.english")}</option>
              <option value="hi">{t("navbar.hindi")}</option>
            </Select>
          </li>
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
            <Menu>
              <MenuButton
                as={IconButton}
                className="ml-5"
                icon={
                  <img
                    src={user.photoURL}
                    className="rounded-full"
                    alt={user.displayName}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                    }}
                  />
                }
                style={{
                  backgroundColor: "#F0F0F0",
                  borderRadius: "50%",
                }}
                size="lg"
              />
              <MenuList>
                {user ? (
                  <MenuGroup title={`Namaste, ${user.displayName}`} />
                ) : (
                  <MenuItem>
                  <IoLogInOutline/>
                    <Link onClick={signIN}>{t("navbar.login")}</Link>
                  </MenuItem>
                )}
                <MenuItem>
                <IoLogOutOutline/>
                  <Link
                    onClick={signout}
                    className="text-red-500 w-full ml-2 hover:text-gray-400 duration-500"
                    >
                    {t("navbar.logout")}
                  </Link>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <li className="md:ml-8 text-xl md:my-0 my-7">
              <Link
                onClick={signIN}
                className="text-white hover:text-gray-400 duration-500"
              >
                {t("navbar.login")}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
