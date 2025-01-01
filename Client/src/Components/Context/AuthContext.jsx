import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { server } from "../../Server";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
}

);

const AuthContextProvider = (props) => {
  // Use a string for user type like 'admin', 'user'
  
  
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  })
  
    
    
 
  // Guest login handler
  const loginAsGuest = () => {
    const guestUser = {
      username: "guest",
      type: "guest", // Assuming "guest" is a valid user type in your backend
    };
  };



  


        
  // useEffect(() => {
  //   // Fetch all users (this can be removed if you don’t need this data globally)
  //   axios
  //     .get(`${server}/get-users`)
  //     .then((res) => setUserData(res.data.getusers));
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        loginAsGuest,
        
        currentUser, setCurrentUser,
        
        isAuthenticated,
        setAuthenticated,
     
    
       
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
