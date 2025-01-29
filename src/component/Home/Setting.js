import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
export default function Setting() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        toast.success("You have logged out successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
    };

    return (
        <>
          
           <div className="setting">
            <div><button onClick={handleLogout}>Logout</button></div>
           </div>
          
        </>
    );
}
