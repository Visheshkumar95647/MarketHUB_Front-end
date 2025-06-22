import React, { useContext, useEffect, useState } from "react";
import checkingComponent from "../Home/CheckComponent";
import "../App.css";
import ProfileContext from "../Home/ProfileContext";
import ChatContext, { ChatProvider } from "./ChatProvider";
import ChatHome from "./ChatHome";
import CreategrpChat from "./CreategrpChat";
import { baseURL } from "../../URL";
import { imgURL } from "../../imgURL";
export default function GetAllchat() {
  const [allChatuser, setAllchatuser] = useState([]);
  const { prodata } = useContext(ProfileContext);
  const {
    checkMsg,
    setCheckHome,
    setUsernameData,
    setCheckProfile,
    setCheckSearch,
    setCheckmsg,
  } = useContext(checkingComponent);

  const {
    userTochat,
    setuserTochat,
    checkLogo,
    setChecklogo,
    checkSinglechat,
    setCheckSingleChat,
    setCreategrp,
    createGrp,
  } = useContext(ChatContext);

  // Fetch all chat data
  const getAllchat = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseURL}/allchats`, {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });

    if (response.ok) {
      const result = await response.json();
      setAllchatuser(result);
      console.log(result);
    }
  };

  useEffect(() => {
    getAllchat();
  }, [checkMsg]);

  // Handle chat selection
  const handleClick = (chatUser) => {
    setCreategrp(false);
    setCheckSingleChat(true);
    setChecklogo(false);
    setuserTochat(chatUser);
  };

  // Determine which user's information to render in the chat list
  const getChatUser = (chat) => {
    const loggedInUserId = prodata._id;

    // If the first user is not the logged-in user, display their information
    if (chat.users[0] && chat.users[0]._id !== loggedInUserId) {
      return chat.users[0];
    }
    // If the second user is not the logged-in user, display their information
    else if (chat.users[1] && chat.users[1]._id !== loggedInUserId) {
      return chat.users[1];
    }
    return null; // Return null if neither condition is met
  };

  return (
    <>
      {/* {createGrp && (
        <div className="grp-char-creation">{<CreategrpChat />}</div>
      )} */}
      <div className="all-chats-data">
        {checkMsg && checkLogo && !checkSinglechat ?  (
          <div className="left-all-chats">
            <div className="getallChat">
              {allChatuser &&
                allChatuser.map((chat) => {
                  const chatUser = getChatUser(chat);
                  if (chatUser) {
                    return (
                      <div key={chat._id} className="all-chats">
                        <div className="chat-profile-img">
                          {chatUser.image && (
                            <img
                              src={`${imgURL}/${chatUser.image}`}
                              alt={chatUser.name || "User image"}
                             
  loading="lazy"
                            />
                          )}
                        </div>
                        <div className="chat-profile-username">
                          <a onClick={() => handleClick(chatUser)}>
                            {chatUser.name}
                          </a>
                        </div>
                      </div>
                    );
                  }
                  return null; // Skip rendering if no valid user to display
                })}
            </div>
            <div className="goHome">
              <button
                onClick={() => {
                  setCheckHome(true);
                  if (prodata) {
                    setUsernameData(prodata);
                  }
                  setChecklogo(true);
                  setCheckSingleChat(false);
                  setCheckProfile(false);
                  setCheckSearch(false);
                  setCheckmsg(false);
                }}
              >
                Go Back to Home
              </button>
            </div>
          </div>
        ) : <ChatHome /> }
      </div>
    </>
  );
}
