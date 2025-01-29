import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Starting from "./component/Dashboard/Starting";
import Login from "./component/Dashboard/Login";
import Signup from "./component/Dashboard/Signup";
import { ProfileProvider } from "./component/Home/ProfileContext";
import { CheckComponent } from "./component/Home/CheckComponent";
import { ChatProvider } from "./component/Chat/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <Router>
    <ToastContainer/>
      <ProfileProvider>
        <ChatProvider>
          <CheckComponent>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/" element={<Starting />} />
            </Routes>
          </CheckComponent>
        </ChatProvider>
      </ProfileProvider>
    </Router>
  );
}
