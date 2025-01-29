import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from '../../URL';
const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [prodata, setProdata] = useState({});
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      // if (!token) {
      //   navigate('/');
      //   return;
      // }
      const response = await fetch(`${baseURL}/userdetails`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const data = await response.json();
      if (data) {
        setProdata(data.user);
      } else {
        toast.error("User Does Not Exist");
        // navigate("/");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [navigate]);

  return (
    <ProfileContext.Provider value={{ prodata, setProdata }}>
      {children}
      <ToastContainer />
    </ProfileContext.Provider>
  );
}

export default ProfileContext;
