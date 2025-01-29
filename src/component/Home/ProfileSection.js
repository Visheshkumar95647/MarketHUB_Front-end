import React, { useContext, useEffect, useState } from "react";
import checkingComponent from "./CheckComponent";
import { Slide } from "react-slideshow-image";
import ProfileContext from "./ProfileContext";
import ChatContext from "../Chat/ChatProvider";
import { baseURL } from "../../URL";
export default function ProfileSection() {
  const {
    setCheckHome,
    setCheckSearch,
    setCheckProfile,
    usernameData,
    setUsernameData,
    setCheckmsg,
  } = useContext(checkingComponent);
  const { prodata } = useContext(ProfileContext);
  const { setuserTochat, setChecklogo, setCheckSingleChat , userTochat } =
    useContext(ChatContext);
  const [product, setProduct] = useState([]);
  const allProduct = async (id) => {
    try {
      const response = await fetch(
        `${baseURL}/getProductbyId/${id}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(usernameData);
        setProduct(result);
      } else {
        console.log("Failed to fetch the product.");
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (usernameData) {
      allProduct(usernameData._id);
    }
  }, [usernameData]);
  return (
    <>
      {console.log(usernameData.name)}
      {usernameData && (
        <>
          <div className="profileSec">
            <div className="profileImg">
              {usernameData.image && (
                <img
                  src={`${baseURL}/images/${usernameData.image}`}
                  alt="Profile"
                />
              )}
            </div>
            <div className="profileName">
              <div className="key">
                <u>Name</u> :{" "}
              </div>
              <div className="value">{usernameData.name}</div>
            </div>
            <div className="profileUsername">
              <div className="key">
                <u>Username</u> :{" "}
              </div>
              <div className="value">{usernameData.username}</div>
            </div>
            <div className="profileNumber">
              <div className="key">
                <u>PhoneNumber</u> :{" "}
              </div>
              <div className="value">{usernameData.number}</div>
            </div>
            <div className="profileAddress">
              <div className="key">
                <u>Address</u> :{" "}
              </div>
              <div className="value">{usernameData.address}</div>
            </div>
            <div className="profileCity">
              <div className="key">
                <u>City</u> :{" "}
              </div>
              <div className="value">{usernameData.city}</div>
            </div>
            <div className="profilePin">
              <div className="key">
                <u>Pin</u> :{" "}
              </div>
              <div className="value">{usernameData.pin}</div>
            </div>
            <div className="message_go">
              <div className="message">
                <button
                  onClick={() => {
                    setCheckHome(false);
                    if (usernameData) {
                      setuserTochat(usernameData);
                      console.log(userTochat);
                    }
                    setCheckSingleChat(true);
                    setChecklogo(false);
                    setCheckProfile(false);
                    setCheckSearch(false);
                    setCheckmsg(true);
                  }}
                >
                  Message
                </button>
              </div>
              <div className="goHome">
                <button
                  onClick={() => {
                    setCheckHome(true);
                    if (prodata) {
                      setUsernameData(prodata);
                    }
                    setCheckProfile(false);
                    setCheckSearch(false);
                    setCheckmsg(false);
                  }}
                >
                  Go Back to Home
                </button>
              </div>
            </div>
          </div>
          {product &&
            product.map((data) => {
              const allimages = data.Productimages.map((img) => ({
                url: `${baseURL}/product/${img}`,
              }));

              return (
                <div className="middle">
                  <div className="slide-container">
                    <Slide>
                      {allimages.map((image, index) => (
                        <div key={index}>
                          <div>
                            <img src={image.url} alt="" />
                          </div>
                        </div>
                      ))}
                    </Slide>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
