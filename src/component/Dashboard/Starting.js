import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "../Home/ProfileContext";
import checkingComponent from "../Home/CheckComponent";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "../Home/Home";
import ChatContext from "../Chat/ChatProvider";
import { baseURL } from "../../URL";
import { imgURL } from "../../imgURL";
export default function Starting() {
  const { prodata } = useContext(ProfileContext);
  const { checkLogo } = useContext(ChatContext);
  const {
    setCheckHome,
    setCheckSearch,
    setCheckProfile,
    setCheckPost,
    setUsernameData,
    setCheckmsg,
    checkMsg,
    setCheckSetting,
    checkSetting,
  } = useContext(checkingComponent);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast.success("You have logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    AOS.init({
      offset: 200,
      duration: 1500,
      easing: "ease-in-sine",
      delay: 50,
      once: true,
      mirror: false,
      anchorPlacement: "top-center",
    });

    AOS.refresh();
  }, []);

  return (
    <>
      <ToastContainer />
      {!checkMsg && (
        <div className="down-nav">
          <div className="down">
            <div className="list">
              <div
                className="nav"
                onClick={() => {
                  setCheckHome(true);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(false);
                  setCheckmsg(false);
                }}
              >
                <div className="icon">
                  <img src="h.png" alt="Home" 
  loading="lazy" />
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setCheckHome(false);
                  setCheckSetting(false);
                  setCheckSearch(true);
                  setCheckProfile(false);
                  setCheckPost(false);
                  setCheckmsg(false);
                }}
              >
                <div className="icon">
                  <img src="sea.png" alt="Search" 
  loading="lazy" />
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setUsernameData(prodata);
                  setCheckHome(false);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckmsg(false);
                  setCheckProfile(true);
                  setCheckPost(false);
                }}
              >
                <div className="icon">
                  <img src="pro.png" alt="Search" 
  loading="lazy" />
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setCheckmsg(true);
                  setCheckHome(false);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(false);
                }}
              >
                <div className="icon">
                  <img src="msg.png" alt="Message" loading="lazy" />
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setUsernameData(prodata);
                  setCheckHome(false);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(true);
                  setCheckmsg(false);
                }}
              >
                <div className="icon">
                  <img src="upload.png" alt="Post" loading="lazy" />
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setCheckmsg(false);
                  setCheckHome(false);
                  setCheckSetting(true);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(false);
                }}
              >
                <div className="icon">
                  <img src="setting.png" alt="Setting"  loading="lazy"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="start">
        {!checkMsg && (
          <div className="left-sidebar">
            <div className="img">
              <img src="l-markethub.png" alt="Market Logo" loading="lazy" />
            </div>
            <div className="list">
              <div
                className="nav"
                onClick={() => {
                  setCheckHome(true);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(false);
                  setCheckmsg(false);
                }}
              >
                <div className="icon">
                  <img src="h.png" alt="Home" loading="lazy" />
                </div>
                <div>
                  <h3>Home</h3>
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setCheckHome(false);
                  setCheckSearch(true);
                  setCheckSetting(false);
                  setCheckProfile(false);
                  setCheckPost(false);
                  setCheckmsg(false);
                }}
              >
                <div className="icon">
                  <img src="sea.png" alt="Search" loading="lazy" />
                </div>
                <div>
                  <h3>Search</h3>
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setUsernameData(prodata);
                  setCheckHome(false);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckmsg(false);
                  setCheckProfile(true);
                  setCheckPost(false);
                }}
              >
                <div className="icon">
                  <img src="pro.png" alt="Search" loading="lazy" />
                </div>
                <div>
                  <h3>Profile</h3>
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setCheckmsg(true);
                  setCheckHome(false);
                  setCheckSetting(false);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(false);
                }}
              >
                <div className="icon">
                  <img src="msg.png" alt="Message" loading="lazy" />
                </div>
                <div>
                  <h3>Message</h3>
                </div>
              </div>
              <br />
              <br />
              <div
                className="nav"
                onClick={() => {
                  setUsernameData(prodata);
                  setCheckHome(false);
                  setCheckSearch(false);
                  setCheckProfile(false);
                  setCheckPost(true);
                  setCheckSetting(false);
                  setCheckmsg(false);
                }}
              >
                <div className="icon">
                  <img src="upload.png" alt="Post" loading="lazy" />
                </div>
                <div>
                  <h3>Post</h3>
                </div>
              </div>
              <br />
              <br />
              <div className="nav"
                onClick={() => {
                    setCheckSetting(true);
                    setCheckmsg(false);
                    setCheckHome(false);
                    setCheckSearch(false);
                    setCheckProfile(false);
                    setCheckPost(false);
                  }}
              >
                <div className="icon">
                  <img src="setting.png" alt="Setting" loading="lazy"/>
                </div>
                <div>
                  <h3>Setting</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="middle-bar">
          {!checkMsg && (
            <div className="logo-img" data-aos="zoom-in">
              <img src="l-markethub.png" alt="Preview" loading="lazy"/>
            </div>
          )}
          <div>{<Home />}</div>
        </div>

        {!checkMsg && (
          <div className="right-sidebar">
            {prodata && (
              <>
                <div className="profileimg">
                  {prodata.image && (
                    <img
                      src={`${imgURL}/${prodata.image}`}
                      alt="Profile"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="proname">{prodata.name}</div>
                <div>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
