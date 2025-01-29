import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../App.css";
import "react-awesome-button/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from '../../URL';
export default function Signup(){
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [proimage, setproimage] = useState(null); // Initialize to null
  const navigate = useNavigate();

  const checkpass = () => {
    if (password !== confirm) {
      toast.error("Password didn't match");
      setPassword("");
      setConfirm("");
    }
  };

  const ImageUpload = (e) => {
    setproimage(e.target.files[0]);
  }

  const adduser = async (e) => {
    e.preventDefault();

    if (!name || !username || !password || !confirm || !number || !address || !city || !pin || !proimage) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', proimage);
      formData.append('name', name);
      formData.append('username', username);
      formData.append('password', password);
      formData.append('number', number);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('pin', pin);

      const response = await fetch(`${baseURL}/register`, {
        method: "POST",
        body: formData,
        
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        navigate('/login');
      } else {
        console.error("Error:", result);
        toast.error(result.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to connect to the server");
    }
  };

  return (
    <>
      <div className="sign">
      <ToastContainer />
      <div className="sign-credentials">
      <main>
        <div className="input">
          <div>
            <input type="file" accept='image/*' onChange={ImageUpload} />
          </div>
          <div>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Your Name' />
          </div>
          <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder='Enter Your Username' />
          </div>
          <div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter Your Password' />
          </div>
          <div>
            <input value={confirm} onChange={(e) => setConfirm(e.target.value)} onBlur={checkpass} type="password" placeholder='Confirm Your Password' />
          </div>
          <div>
            <input value={number} onChange={(e) => setNumber(e.target.value)} type="number" placeholder='Enter Your Mobile Number' />
          </div>
          <div>
            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder='Enter Your Address' />
          </div>
          <div>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Enter Your City' />
          </div>
          <div>
            <input value={pin} onChange={(e) => setPin(e.target.value)} type="number" placeholder='Enter Your Pincode' />
          </div>
          <button onClick={adduser}>Register</button>
        </div>
      </main>
      </div>
      </div>
    </>
  );
}
