
// import React, { useContext, useEffect, useState } from "react";
// import profileDefault from "../assets/profileDefault.png";
// import StoreContext from "../Context/StoreContext";
// import Sidebar from "./Sidebar";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Header = () => {
//   const { store } = useContext(StoreContext);
//   const { id } = useParams();
//   const [writer, setWriter] = useState(null);

//   const fetchwriters = async () => {
//     try {
//       const userId = id || store?.userInfo?.id;
//       if (!userId) {
//         console.error("No User found");
//         return;
//       }
//       const res = await axios.get(
//         `http://localhost:5000/api/news/writers/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${store.token}`,
//           },
//         }
//       );
//       setWriter(res.data.writer);
//     } catch (error) {
//       console.error("Profile fetch failed", error);
//     }
//   };

//   useEffect(() => {
//     fetchwriters();
//   }, [id, store.userInfo]);

//   if (!writer) return <p className="p-4">Loading writer profile...</p>;

//   const isAdmin = store.userInfo?.role === "admin";

//   return (
//     <div>
//       <div
//         className={`fixed top-4 left-0 
//         w-full md:w-[calc(100vw-250px)] 
//         ${isAdmin ? "md:left-[230px]" : "md:left-[250px]"} 
//         z-50 px-2 sm:px-4`}
//       >
//         <div className="w-full h-[70px] rounded bg-white shadow-sm flex items-center justify-between px-2 sm:px-4">
          
//           {/* Sidebar button on left */}
//           <Sidebar />

//           {/* Right section: name + role + image aligned to end */}
//           <div className="flex items-center gap-2 sm:gap-4 ml-auto">
//             <div className="text-right truncate max-w-[120px] sm:max-w-none">
//               <span className=" text-xs sm:text-sm font-medium truncate">
//                 {store.userInfo?.name}/
//               </span>
//               <span className=" text-xs sm:text-sm font-medium text-black truncate">
//                 {store.userInfo?.role}
//               </span>
//             </div>

//             <img
//               src={
//                 writer.image
//                   ? `http://localhost:5000/uploads/${writer.image}`
//                   : profileDefault
//               }
//               alt="Writer"
//               className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;



// import React from "react";
// import profileDefault from "../assets/profileDefault.png";
// import Sidebar from "./Sidebar";
// import AuthContext from "../Context/AuthContext";
// const Header = () => {
  
//   const writer = {
//     name: "John Doe",
//     role: "writer",
//     image: null, 
//   };

//   // const isAdmin = writer.role === "admin";

//   return (
//     <div>
//       <div
//         className={`fixed top-4 left-0 
//         w-full md:w-[calc(100vw-250px)] 
//         ${isAdmin ? "md:left-[230px]" : "md:left-[250px]"} 
//         z-50 px-2 sm:px-4`}
//       >
//         <div className="w-full h-[70px] rounded bg-white shadow-sm flex items-center justify-between px-2 sm:px-4">
          
//           {/* Sidebar button on left */}
//           <Sidebar />

//           {/* Right section: name + role + image aligned to end */}
//           <div className="flex items-center gap-2 sm:gap-4 ml-auto">
//             <div className="text-right truncate max-w-[120px] sm:max-w-none">
//               <span className=" text-xs sm:text-sm font-medium truncate">
//                 {writer.name}/
//               </span>
//               <span className=" text-xs sm:text-sm font-medium text-black truncate">
//                 {writer.role}
//               </span>
//             </div>

//             <img
//               src={
//                 writer.image
//                   ? `http://localhost:5000/uploads/${writer.image}`
//                   : profileDefault
//               }
//               alt="Writer"
//               className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;



import React, { useContext } from "react";
import profileDefault from "../assets/profileDefault.png";
import Sidebar from "./Sidebar";
import {AppContext} from "../Context/AppContext"; 

const Header = () => {
  const { userData } = useContext(AppContext); 
// console.log(userData);
  // const isAdmin = userData?.role === "admin";

  return (
    <div>
      <div
        className={`fixed top-4 left-0 
        w-full md:w-[calc(100vw-250px)] 
        ${"" ? "md:left-[230px]" : "md:left-[250px]"} 
        z-50 px-2 sm:px-4`}
      >
        <div className="w-full h-[70px] rounded bg-white shadow-sm flex items-center justify-between px-2 sm:px-4">
          {/* Sidebar button on left */}
          <Sidebar />

          {/* Right section: name + role + image aligned to end */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <div className="text-right truncate max-w-[120px] sm:max-w-none">
              <span className=" text-xs sm:text-sm font-medium truncate">
                {userData?.writername || "Unknown"}/
              </span>
              <span className=" text-xs sm:text-sm font-medium text-black truncate">
                {userData?.role || "role"}
              </span>
            </div>

                <img
              src={userData?.writerimage || profileDefault}
              alt="Writer"
              className="w-[60px] h-[60px] rounded-full object-cover"
            />
            {/* <img
              src={
                userData?.writerimage
                  ? `http://localhost:4000/uploads/${userData.writerimage}`
                  : profileDefault
              }
              alt="Writer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
