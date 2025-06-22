import React, { useContext, useEffect, useState, useRef } from "react";
import ChatContext from "./ChatProvider";
import "../App.css";
import ProfileContext from "../Home/ProfileContext";
import io from "socket.io-client";
import { baseURL } from "../../URL";
import { imgURL } from "../../imgURL";
export default function ChatHome() {
  const { userTochat, setChecklogo, setCheckSingleChat } =
    useContext(ChatContext);

  const { prodata } = useContext(ProfileContext);

  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [socketConnected, setScocketConnected] = useState(false);
  const chatContainerRef = useRef(null);
  var socket, selectedChatCompare;
  const ENDPOINT = `${baseURL}`;

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", prodata);
    socket.on("connection", () => setScocketConnected(true));
  });
  const createSingleChat = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${baseURL}/createchat/${userTochat._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({
          chatName: userTochat.name,
        }),
      }
    );

    const data = await response.json();

    if (data._id) {
      setChatId(data._id);
      fetchMessages(data._id);
    }
  };

  const fetchMessages = async (chatId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseURL}/allMessage/${chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const data = await response.json();
    setChatMessages(data);
    socket.emit("join chat", chatId);
  };

  const sendMessage = async (messageContent) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseURL}/createmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({
        content: messageContent,
        chatId: chatId,
      }),
    });

    const data = await response.json();
    return data;
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() && chatId) {
      console.log("Hlo Vishesh kya haal chaal")
      const newMessage = await sendMessage(message);
      console.log(newMessage);
      socket.emit("new message", newMessage);
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    createSingleChat();
    selectedChatCompare = userTochat;
  }, [userTochat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      console.log("MSGing recieveding");
      if (newMessageReceived) {
        console.log("New message received:", newMessageReceived);
      }else{
        console.log("NO new msg")
      }
  
      if (selectedChatCompare) {
        console.log("Selected Chat Compare:", selectedChatCompare);
      }
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.sender._id
      ) {
        // This is a message from a different chat, you can show a notification or alert
        console.log("New message in a different chat. Show notification.");
      } else {
        // This message belongs to the selected chat, so we add it to the chat messages
        console.log("Message received for the selected chat. Adding to chat.");
        setChatMessages((prevMessages) => [
          ...prevMessages,
          newMessageReceived,
        ]);
        console.log(chatMessages);
      }
    });
  
    // Cleanup socket listener on component unmount
    return () => {
      socket.off("message received");
    };
  }, [true]); // The effect runs whenever selectedChatCompare changes
  
  const handleClick = () => {
    setChecklogo(true);
    setCheckSingleChat(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Helper function to format timestamps
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Helper function to format date labels
  const getDateLabel = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      <div className="chats">
        <div className="top-part">
          <div className="profile">
            <div className="arrow-back" onClick={handleClick}>
              <img src="back-arrow.png" alt="Preview"
  loading="lazy" />
            </div>
            <div className="chat-profile-img">
              <img
                src={`${imgURL}/${userTochat.image}`}
                alt="Preview"
  loading="lazy"
              />
            </div>
            <div className="chat-profile-username">
              <p>{userTochat.name}</p>
            </div>
          </div>
        </div>
        {/* Chat container with ref */}
        <div className="middle-part" ref={chatContainerRef}>
          {chatMessages.map((msg, index) => {
            const dateLabel = (index === 0 ||
              getDateLabel(msg.createdAt) !==
                getDateLabel(chatMessages[index - 1].createdAt)) && (
              <div className="parent-date-div">
                <div className="date-label">
                  <p>{getDateLabel(msg.createdAt)}</p>
                </div>
              </div>
            );

            return (
              <div key={index}>
                {dateLabel && <div className="date-label">{dateLabel}</div>}
                {msg.sender._id.toString() === prodata._id.toString() ? (
                  <div className="right-msg">
                    <div className="pro">
                      <img
                        src={`${imgURL}/${msg.sender.image}`}
                        alt="Preview"
  loading="lazy"
                      />
                    </div>
                    <div>
                      <p>{msg.content}</p>
                      <small className="timestamp">
                        {formatTime(msg.createdAt)}
                      </small>
                    </div>
                  </div>
                ) : (
                  <div className="left-msg">
                    <div className="pro">
                      <img
                        src={`${imgURL}/${msg.sender.image}`}
                        alt="Preview"
  loading="lazy"
                      />
                    </div>
                    <div>
                      <p>{msg.content}</p>
                      <small className="timestamp">
                        {formatTime(msg.createdAt)}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lower-part">
          <input
            type="text"
            className="chats-input"
            placeholder="Message..."
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleEnter}
          />
          <div className="send" onClick={handleSendMessage}>
            <img src="send.png" alt="Preview"
  loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
}
