// import React, { useContext, useState, useEffect } from "react";
// import "../App.css";
// import ChatContext from "./ChatProvider";
// import ProfileContext from "../Home/ProfileContext";

// export default function CreategrpChat() {
//   const { setCreategrp } = useContext(ChatContext);
//   const {prodata} = useContext(ProfileContext);
//   const [user, setUser] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selected, setSelected] = useState([prodata]);
//   const [grpName, setGrpName] = useState();
//   let debounceTimeout;

//   const handleClick1 = () => {
//     setCreategrp(false);
//     groupCreation();
//   };

//   const handleClick2 = () => {
//     setCreategrp(false);
//   };

//   const groupCreation = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/group", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "auth-token": localStorage.getItem("token"),
//         },
//         body: JSON.stringify({
//           chatName: grpName,
//           users: JSON.stringify(selected),
//         }),
//       });
//       const data = await response.json();
//       console.log("Grp Chat created or retrieved:", data);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const searchAlluser = async () => {
//     if (!search) {
//       setUser([]);
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:5000/search/user?search=${search}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "auth-token": localStorage.getItem("token"),
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data);
//       } else {
//         console.error("Error:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   // Trigger search with debounce when `search` changes
//   useEffect(() => {
//     clearTimeout(debounceTimeout); // Clear previous timeout on each keystroke
//     debounceTimeout = setTimeout(() => {
//       searchAlluser();
//     }, 500); // 500ms debounce delay

//     return () => clearTimeout(debounceTimeout); // Clean up timeout on unmount
//   }, [search]);

//   const handleSelection = (u) => {
//     setSelected((prev) => {
//       const previousUsers = [...prev];
//       previousUsers.push(u);
//       return previousUsers;
//     });
//   };
//   const handleRemove = (id) => {
//     setSelected((prev) => prev.filter((u) => u._id !== id));
//   };

//   return (
//     <div className="create-grp">
//       <div className="grp-name">
//         <input
//           type="text"
//           placeholder="Enter Group Name"
//           value={grpName}
//           onChange={(e) => {
//             setGrpName(e.target.value);
//           }}
//         />
//       </div>
//       <div className="selected">
//         {selected.length > 0 ? (
//           <div className="selected-user search-results">
//             {selected.map((u, index) => (u != prodata &&
//               <div className="search-top" key={u.id}>
//                 <div className="search-top-data">
//                   {u.image && (
//                     <img
//                       src={`http://localhost:5000/images/${u.image}`}
//                       alt="Profile"
//                     />
//                   )}
//                   <div className="proname">
//                     <a href="#">{u.name}</a>
//                   </div>
//                 </div>
//                 <div className="remove" onClick={() => handleRemove(u._id)}>
//                   <img src="remove.png" alt="" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No users Selected</p>
//         )}
//       </div>
//       <div className="add-user">
//         <input
//           type="text"
//           placeholder="Search Username"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button className="sch-btn" onClick={searchAlluser}>
//           Search
//         </button>
//       </div>

//       <div className="search-results">
//         {user.length > 0 ? (
//           user.map((u, index) => (
//             <div
//               className="search-top"
//               key={u.id}
//               onClick={() => handleSelection(u)}
//             >
//               <div className="search-top-data">
//                 {u.image && (
//                   <img
//                     src={`http://localhost:5000/images/${u.image}`}
//                     alt="Profile"
//                   />
//                 )}
//                 <div className="proname">
//                   <a href="#">{u.name}</a>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No users found</p>
//         )}
//       </div>

//       <div className="grp-btn">
//         <div className="create">
//           <button onClick={handleClick1}>Create</button>
//         </div>
//         <div className="go-back">
//           <button onClick={handleClick2}>Go Back</button>
//         </div>
//       </div>
//     </div>
//   );
// }
