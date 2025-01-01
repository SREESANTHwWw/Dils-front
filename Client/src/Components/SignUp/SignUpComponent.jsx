import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowForwardOutline } from "react-icons/io5";
import { RiLock2Fill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../Server";
import { ProductsContext } from "../Context/ProductsContext";
import { SignupInputValContext } from "../Context/SignupInputValContext";
import validator from "validator";

const SignUpComponent = () => {
  const { cities } = useContext(ProductsContext);
  const { signupvalues } = useContext(SignupInputValContext);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [type, setType] = useState();
  const [validmsg, setValidmsg] = useState("");


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${server}/registration`, {
        shopname: signupvalues[0].value,
        owner: signupvalues[1].value,
        phonenumber: signupvalues[2].value,
        address: signupvalues[4].value,
        gstno: signupvalues[8].value,
        username: signupvalues[9].value,
        password,
        pincode: signupvalues[6].value,
        city: signupvalues[5].value,
        whatsappno:signupvalues[3].value,
        stateid: signupvalues[7].value,
        type,
      })

      if (res.data.msg === "success") {
        toast.success("Registered successfully",{theme:"colored"});
       
        setPassword("");
        setSelectedCity("");
        signupvalues.forEach(({ setValue }) => setValue(""));
        navigate("/login");
      } else {
        toast.error(res.error || "Registration failed, please check your input" ,{theme:"colored"} );
      }
    } catch (error) {
      toast.error(error.response.data.msg);
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="sm:w-[85%] sm:max-w-[800px] w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-950">Register</h1>
          <p className="text-gray-600 text-sm">Create your new account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {signupvalues.map(({ icon, placeholder, value, setValue }, index) => (
              <div key={index} className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500">
                  {icon}
                </div>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  required
                  onChange={(e) => {
                    setValue(e.target.value);
                    setValidmsg("");
                  }}
                  className={`w-full h-12 pl-10 pr-4 rounded-lg shadow-sm outline-none focus:border-blue-950 focus:ring-1 ${validmsg ? "border-red-500" : ""}`}
                />
                {index === 2 || index === 3 ? (
                  <p className="text-red-500 text-sm">{validmsg}</p>
                ) : null}
              </div>
            ))}

            <div className="relative col-span-1">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-10 pr-12 rounded-lg shadow-sm outline-none focus:border-blue-950 focus:ring-1 transition-all duration-300 ease-in-out"
              />
              <RiLock2Fill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500" />
              {visible ? (
                <AiOutlineEye
                  size={24}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500"
                  onClick={() => setVisible(false)}
                />
              ) : (
                <AiOutlineEyeInvisible
                  size={24}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500"
                  onClick={() => setVisible(true)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-6 bg-blue-950 text-white rounded-lg shadow-md hover:bg-blue-900 transition-colors"
          >
            Sign Up
            <IoArrowForwardOutline className="inline ml-2" />
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-950 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
