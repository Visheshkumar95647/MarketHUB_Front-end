import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import ProfileContext from "./ProfileContext";
import { useNavigate } from "react-router-dom";
import checkingComponent from "./CheckComponent";
import { baseURL } from "../../URL";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ProfileSection from "./ProfileSection";
import Search from "./Search";
import Post from "./Post";
import ChatContext from "../Chat/ChatProvider";
import ChatHome from "../Chat/ChatHome";
import GetAllchat from "../Chat/GetAllchat";
import Setting from "./Setting";

export default function Home() {
  const {
    checkHome,
    setCheckHome,
    checkSearch,
    checkSetting, 
    setCheckSetting,
    setCheckSearch,
    checkProfile,
    setCheckProfile,
    setUsernameData,
    checkPost,
    setCheckPost,
    setCheckmsg,
    checkMsg,
  } = useContext(checkingComponent);
  const { prodata } = useContext(ProfileContext);
  const { setuserTochat, userTochat  , checkLogo} = useContext(ChatContext);
  // const {setUsername} = useContext(ProfileSec);

  const navigate = useNavigate();

  const [allProfile, setallProfile] = useState([]);
  const [allUpload, setallUpload] = useState([]);

  //SET Username for Profile section
  const getProfileByUsername = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseURL}/inspect/${id}`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUsernameData(result);
        // setuserTochat(result);
      } else if (response.status === 404) {
        console.log("User not found");
      } else {
        console.log("Failed to fetch profile data");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    getProfileByUsername(id);
    setCheckHome(false);
    setCheckmsg(false);
    setCheckSetting(false);
    setCheckProfile(true);
    setCheckSearch(false);
  };
  const fetchAllProfile = async () => {
    const token = localStorage.getItem("token");
    // if (!token) {
    //   navigate("/mar");
    // }
    try {
      const res = await fetch(`${baseURL}/allprofile`, {
        method: "GET",
      });
      if (res.ok) {
        const result = await res.json();
        if (result) {
          setallProfile(result.alluser);
        } else {
          console.log("Profile Data not Fetched Properly ");
        }
      } else {
        console.log("Response is not Ok");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  const getAllProduct = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch(`${baseURL}/getallproduct`, {
          method: "GET",
        });
        if (response.ok) {
          const result = await response.json();
          if (result) {
            setallUpload(result.uploadData);
          } else {
            console.log("No data returned from API");
          }
        } else {
          console.log("Response not OK", response.statusText);
        }
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllProfile();
    getAllProduct();
  }, []);

  return (
    <>
      { 
        !checkPost &&
        !checkMsg &&
        !checkProfile &&
        !checkSearch &&
        checkHome &&
        !checkSetting &&
        allUpload.map((product, i) => {
          const users = allProfile.filter(
            (profile) => profile._id === product.id
          );
          const images = product.Productimages.map((img) => ({
            url: `${baseURL}/product/${img}`,
          }));

          return (
            <div key={i} className="uploads">
              {users.map((user, j) => (
                <div key={j}>
                  <div className="top">
                    <div className="top-data">
                      <div>
                        {user.image && (
                          <>
                            <img
                              className="profileimage"
                              src={`${baseURL}/images/${user.image}`}
                              alt="Profile"
                            />
                          </>
                        )}
                      </div>
                      <div className="proname">
                        <a href="" onClick={(e) => handleClick(e, user._id)}>
                          {user.name}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="middle">
                <div className="slide-container">
                  <Slide>
                    {images.map((image, index) => (
                      <div key={index}>
                        <div>
                          <img src={image.url} alt="" />
                        </div>
                      </div>
                    ))}
                  </Slide>
                </div>
              </div>

              <div className="bottom">
              </div>
            </div>
          );
        })}
      {!checkSearch &&
        !checkHome &&
        checkProfile &&
        !checkPost &&
        !checkMsg && !checkSetting && <ProfileSection />}
      {!checkHome &&
        !checkProfile &&
        !checkPost &&
        !checkMsg &&
        checkSearch &&!checkSetting && <Search />}
      {!checkSearch &&
        !checkHome &&
        !checkProfile &&
        !checkMsg &&
        checkPost &&!checkSetting && <Post />}
      {!checkSearch &&
        !checkHome &&
        !checkProfile &&
        !checkPost &&
        checkMsg &&!checkSetting && <GetAllchat />}
        {!checkSearch &&
        !checkHome &&
        !checkProfile &&
        !checkPost &&
        !checkMsg && checkSetting && <Setting/>}
    </>
  );
}
