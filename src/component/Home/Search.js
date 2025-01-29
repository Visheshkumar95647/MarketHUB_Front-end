import React, { useContext, useEffect, useState } from "react";
import checkingComponent from "./CheckComponent";
import ChatContext from "../Chat/ChatProvider";
import { baseURL } from "../../URL";
// Import the loading gif
import loadingGif from "../Home/Animation/loading.gif";

export default function Search() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const { setCheckSearch , setCheckHome , setUsernameData , setCheckProfile , setCheckmsg } = useContext(checkingComponent);
  const { setuserTochat , userTochat } = useContext(ChatContext);
  let debounceTimeout;
  
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
        setuserTochat(result); 
      } else if (response.status === 404) {
        console.log("User not found");
      } else {
        console.log("Failed to fetch profile data");
      }
    } catch (error) {
      console.log("Error fetching profile data:", error);
    }
  };

  const handleClick = (id) => {
    getProfileByUsername(id);
    setCheckSearch(false);
    setCheckHome(false);
    setCheckmsg(false);
    setCheckProfile(true);
  }

  const searchUser = async () => {
    try {
      if (!search) {
        setUser([]);
        return;
      } else {
        setLoading(true);
        const response = await fetch(
          `${baseURL}/search/user?search=${search}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error("Error:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false when search completes
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      searchUser();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  return (
    <>
      <div className="searching">
        <div className="search-bar">
          <div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Username"
            />
          </div>
          <div>
            <button onClick={searchUser}>Search</button>
          </div>
        </div>

        <div className="search-results">
          <br />
        
          {loading ? (
            <div className="loading">
              <img src={loadingGif} alt="Loading..." />
            </div>
          ) : user.length > 0 ? (
            user.map((u, index) => (
              <div className="search-top" key={index}>
                <div className="search-top-data">
                  <div>
                    {u.image && (
                      <img
                        src={`${baseURL}/images/${u.image}`}
                        alt="Profile"
                      />
                    )}
                  </div>
                  <div className="proname">
                    <a href="#" onClick={() => handleClick(u._id)}>{u.name}</a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-user">
              <div><p>No User Found</p></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
