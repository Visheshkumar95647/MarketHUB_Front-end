import React, { useState } from "react";
import "react-awesome-button/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseURL } from "../../URL";
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false); // To handle loading state

  const validateuser = async (e) => {
    e.preventDefault(); // Prevent form submission refresh

    if (!username || !password) {
      toast.error("Please fill in both username and password.");
      return;
    }
    try {
      const response = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();
     
      if (response.ok) {
        localStorage.setItem("token", result.token);
        toast.success("Login Successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(result.error || "Invalid credentials");
      }
    } catch (error) { // Reset loading state on error
      console.error("Error fetching profile data:", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-credentials">
          <div className="logo">
            <img
              loading="lazy"
              src="/l-markethub.png"
              alt="Market Logo"
              className="image"
            />
          </div>

          <br />
          <main>
            <form onSubmit={validateuser}> {/* Added form submission */}
              <div className="input">
                <div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter Username"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="btn">
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <button className="sign-btn">
                    <Link to="/signup">SignUp</Link>
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
