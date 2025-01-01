import { createContext, useContext, useState, useEffect } from "react";
import { AiFillShop } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { PiPhoneCall } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";
import { FaRegAddressBook } from "react-icons/fa";
import { PiCity } from "react-icons/pi";
import { IoLocationSharp } from "react-icons/io5";
import { HiHashtag } from "react-icons/hi";
import { AuthContext } from "./AuthContext";

export const SignupInputValContext = createContext();

const SignupvalContextProvider = (props) => {

 
   
  const [shopname, setShopname] = useState( "");
  const [owner, setOwnername] = useState( "");
  const [phonenumber, setPhoneNumber] = useState( "");
  const [whatsappno, setWhatsapp] = useState( "");
  const [address, setAddress] = useState( "");
  const [city, setCity] = useState( "");
  const [pincode, setPincode] = useState( "");
  const [gstno, setGstNumber] = useState("");
  const [username, setUsename] = useState( "");
  const [stateid, setSelectedCity] = useState("");



  const signupvalues = [
    { icon: <AiFillShop />, placeholder: "Shop Name", value: shopname, setValue: setShopname },
    { icon: <FaRegUser />, placeholder: "Owner Name", value: owner, setValue: setOwnername },
    { icon: <PiPhoneCall />, placeholder: "Phone Number", value: phonenumber, setValue: setPhoneNumber },
    { icon: <BsWhatsapp />, placeholder: "WhatsApp", value: whatsappno, setValue: setWhatsapp },
    { icon: <FaRegAddressBook />, placeholder: "Address", value: address, setValue: setAddress },
    { icon: <PiCity />, placeholder: "City", value: city, setValue: setCity },
    { icon: <PiCity />, placeholder: "State", value: stateid, setValue: setSelectedCity },
    { icon: <IoLocationSharp />, placeholder: "Pincode", value: pincode, setValue: setPincode },
    { icon: <HiHashtag />, placeholder: "GST No. (Optional)", value: gstno, setValue: setGstNumber },
    { icon: <FaRegUser />, placeholder: "Username", value: username, setValue: setUsename },
  ];

  return (
    <SignupInputValContext.Provider value={{ signupvalues }}>
      {props.children}
    </SignupInputValContext.Provider>
  );
};

export default SignupvalContextProvider;
