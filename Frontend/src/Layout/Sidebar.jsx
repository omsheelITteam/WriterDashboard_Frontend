
// import React, { useContext, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import profileDefault from "../assets/profileDefault.png";
// import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
// import { ImProfile } from "react-icons/im";
// import { BiNews } from "react-icons/bi";
// import { FiUsers, FiUpload, FiLogOut } from "react-icons/fi";
// import { FaPlus } from 'react-icons/fa6';
// import StoreContext from '../Context/StoreContext.js';
// import axios from 'axios';
// import toast from "react-hot-toast";

// const Sidebar = () => {
//   // const { store, dispatch } = useContext(StoreContext);
//   const { pathname, search } = useLocation();
//   const [state, setState] = useState({ email: "", password: "" });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Check if this is a shared view
//   const urlParams = new URLSearchParams(search);
//   const isSharedView = urlParams.get('shared') === 'true';

//   // Don't render sidebar in shared view
//   if (isSharedView) {
//     return null;
//   }

//   const handleLogout = async () => {
//     try {
//       await axios.post("http://localhost:4000/api/auth/logoutWriter", {}, { withCredentials: true });
//       toast.success("Logged out successfully");
//       setIsLoggedIn(false);
//       localStorage.removeItem("newToken");
//       dispatch({ type: "logout_Successful" });
//       setState({ email: "", password: "" });
//       navigate("/login");
//     } catch (error) {
//       toast.error("Logout failed");
//       console.error(error);
//     }
//   };

//   const navItemClass = (route) =>
//     `text-black ${pathname === route ? "bg-gray-200 font-semibold" : ""} px-3 py-4 hover:shadow-lg w-full rounded-sm flex gap-2 items-center hover:bg-gray-100`;

//   return (
//     <>
//       {/* Mobile Toggle Button */}
//       <div className="md:hidden fixed top-10 left-4 z-50">
//         <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-black">
//           <AiOutlineMenu />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div className={`fixed top-0 left-0 h-full w-[250px] bg-white text-black z-40 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
//         <div className='h-[70px] flex justify-center items-center p-6'>
//           <Link to="/" onClick={() => setSidebarOpen(false)}>
//             <img src={profileDefault} alt="MystartupNews" />
//           </Link>
//         </div>

//         <ul className='px-3 flex flex-col gap-y-2 font-medium'>

//           {/* Admin routes */}
//           {store.userInfo?.role === "admin" ? (
//             <>
//               <li>
//                 <Link to='/dashboard/admin' className={navItemClass('/dashboard/admin')} onClick={() => setSidebarOpen(false)}>
//                   <AiFillDashboard className='text-xl' />
//                   <span>Dashboard</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to='/dashboard/writers' className={navItemClass('/dashboard/writers')} onClick={() => setSidebarOpen(false)}>
//                   <FiUsers className='text-xl' />
//                   <span>Writers</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to='/dashboard/magazine' className={navItemClass('/dashboard/magazine')} onClick={() => setSidebarOpen(false)}>
//                   <FiUpload className='text-xl' />
//                   <span>Magazine</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/dashboard/live-video/upload" className={navItemClass('/dashboard/live-video/upload')} onClick={() => setSidebarOpen(false)}>
//                   <FiUpload className='text-xl' />
//                   <span>Live Video</span>
//                 </Link>
//               </li>
//             </>
//           ) : (
//             <>
//               {/* Writer routes */}
//               <li>
//                 <Link to='/dashboard/writer' className={navItemClass('/dashboard/writer')} onClick={() => setSidebarOpen(false)}>
//                   <AiFillDashboard className='text-xl' />
//                   <span>Dashboard</span>
//                 </Link>
//               </li>
//               <li>
//                 <Link to='/dashboard/news/create' className={navItemClass('/dashboard/news/create')} onClick={() => setSidebarOpen(false)}>
//                   <FaPlus className='text-xl' />
//                   <span>Add News</span>
//                 </Link>
//               </li>
//             </>
//           )}

//           <li>
//             <Link to='/dashboard/news' className={navItemClass('/dashboard/news')} onClick={() => setSidebarOpen(false)}>
//               <BiNews className='text-xl' />
//               <span>News</span>
//             </Link>
//           </li>

//           <li>
//             <Link to='/dashboard/profile' className={navItemClass('/dashboard/profile')} onClick={() => setSidebarOpen(false)}>
//               <ImProfile className='text-xl' />
//               <span>Profile</span>
//             </Link>
//           </li>

//           <li>
//             <div
//               onClick={() => {
//                 handleLogout();
//                 setSidebarOpen(false);
//               }}
//               className={navItemClass('/dashboard/logout') + " cursor-pointer"}
//             >
//               <FiLogOut className='text-xl' />
//               <span>Logout</span>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Sidebar;



import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profileDefault from "../assets/profileDefault.png";
import news from "../assets/News.png";
import { AiFillDashboard, AiOutlineMenu } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import { FaPlus } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { MdOutlineSettings } from "react-icons/md";

import axios from 'axios';
import toast from "react-hot-toast";
import { AppContext } from '../Context/AppContext';

const Sidebar = () => {
  const { pathname, search } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
const {backendUrl}=useContext(AppContext)
  // Check if this is a shared view
  const urlParams = new URLSearchParams(search);
  const isSharedView = urlParams.get('shared') === 'true';

  // Don't render sidebar in shared view
  if (isSharedView) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logoutWriter`, {}, { withCredentials: true });
      toast.success("Logged out successfully");
      localStorage.removeItem("newToken");
      setSidebarOpen(false);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const navItemClass = (route) =>
    `text-black ${pathname === route ? "bg-gray-200 font-semibold" : ""} px-3 py-4 hover:shadow-lg w-full rounded-sm flex gap-2 items-center hover:bg-gray-100`;

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-10 left-4 z-50">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl text-black">
          <AiOutlineMenu />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed top-0 mt-4 left-0 h-full w-[250px] bg-white text-black z-40 transition-transform duration-300 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className='h-[70px] flex justify-center items-center p-6'>
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src={news} alt="MystartupNews" />
          </Link>
        </div>

        <ul className='px-3 flex flex-col gap-y-2 font-medium'>
          {/* Writer routes */}
          <li>
            <Link to='/dashboard/writer' className={navItemClass('/dashboard/writer')} onClick={() => setSidebarOpen(false)}>
              <AiFillDashboard className='text-xl' />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li>
            <Link to='/dashboard/news/category' className={navItemClass('/dashboard/news/category')} onClick={() => setSidebarOpen(false)}>
              <FaPlus className='text-xl' />
              <span>Add Blog</span>
            </Link>
          </li>

          <li>
            <Link to='/dashboard/news' className={navItemClass('/dashboard/news')} onClick={() => setSidebarOpen(false)}>
              <BiNews className='text-xl' />
              <span>News</span>
            </Link>
          </li>

          <li>
            <Link to='/dashboard/profile' className={navItemClass('/dashboard/profile')} onClick={() => setSidebarOpen(false)}>
              <ImProfile className='text-xl' />
              <span>Profile</span>
            </Link>
          </li>
           <li>
            <Link to='/dashboard/settingpage' className={navItemClass('/dashboard/settingpage')} onClick={() => setSidebarOpen(false)}>
              <MdOutlineSettings className='text-xl' />
              <span>Setting</span>
            </Link>
          </li>

          <li>
            <div
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
              className={navItemClass('/dashboard/logout') + " cursor-pointer"}
            >
              <FiLogOut className='text-xl' />
              <span>Logout</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
