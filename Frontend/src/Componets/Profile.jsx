



// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// import { IoNewspaperOutline } from "react-icons/io5";
// import { FaCoins as FaCoinsV6 } from "react-icons/fa6";

// import { Toast } from "primereact/toast";
// import { ProgressBar } from "primereact/progressbar";

// import img1 from "../assets/profileDefault.png";
// import img2 from "../assets/check.png";
// import SharesButton from "./ShareButton";

// const Profile = () => {
//   const [writer, setWriter] = useState(null);
//   const [value, setValue] = useState(0);
//   const [redeeming, setRedeeming] = useState(false);

//   const toast = useRef(null);
//   const interval = useRef(null);

//   const fetchWriterProfile = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/api/user/get-Profile`, {
//         withCredentials: true, // Send cookies for auth
//       });
//       if (res.data.success) {
//         setWriter({
//           ...res.data.writerData,
//           coins: 1000, // Example coins
//           stats: res.data.writerData.stats || { total: 0, active: 0, pending: 0, deactive: 0 }
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching profile", error);
//     }
//   };

//   const handleRedeem = () => {
//     if (!writer.coins || writer.coins < 1000) {
//       toast.current.show({
//         severity: "error",
//         summary: "Redeem Failed",
//         detail: "You need at least 1000 coins",
//       });
//       return;
//     }

//     setRedeeming(true);
//     setValue(0);
//     let currentValue = 0;

//     interval.current = setInterval(() => {
//       currentValue += Math.floor(Math.random() * 10) + 5;

//       if (currentValue >= 100) {
//         currentValue = 100;

//         toast.current.show({
//           severity: "success",
//           summary: "Redeem Successful",
//           detail: `You have redeemed ${writer.coins} coins.`,
//         });

//         clearInterval(interval.current);

//         setTimeout(() => {
//           setWriter((prev) => ({ ...prev, coins: 0 }));
//           setRedeeming(false);
//           setValue(0);
//         }, 1000);
//       }

//       setValue(currentValue);
//     }, 500);
//   };

//   useEffect(() => {
//     fetchWriterProfile();
//     return () => {
//       if (interval.current) clearInterval(interval.current);
//     };
//   }, []);

//   if (!writer) return <p className="p-4">Loading writer profile...</p>;

//   const isWriterProfile = writer.role ===`${writer.role}`;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <Toast ref={toast} position="top-center" className="custom-toast" />

//       {/* Profile Info */}
//       <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
//         <img
//           src={writer.image ? `http://localhost:5000/uploads/${writer.image}` : img1}
//           alt="Writer"
//           className="w-28 h-28 rounded-full object-cover"
//         />
//         <div className="text-center sm:text-left">
//           <p className="text-lg"><strong>Name:</strong> {writer.writername}</p>
//           <p className="text-lg"><strong>WriterId:</strong> {writer.writeridcard}</p>
//           <p className="text-lg"><strong>Email:</strong> {writer.email}</p>
//           <p className="text-lg"><strong>Role:</strong> {writer.role}</p>
//           <div className="mt-4 flex flex-row gap-3">
//             <button
//               onClick={() => window.location.href = "/dashboard/profile/update"}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Update Profile
//             </button>
//             {isWriterProfile && (
//               <SharesButton
//                 text={`Check out ${writer.name}'s profile!`}
//                 url={`${window.location.origin}${window.location.pathname}?shared=true`}
//               />
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Writer Stats */}
//       {isWriterProfile && (
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <FaCoinsV6 className="text-yellow-500 text-4xl" />
//             <p className="text-xl font-bold">{writer.coins || 0}</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <IoNewspaperOutline className="text-blue-500 text-4xl" />
//             <p className="text-xl font-bold">{writer.stats.total}</p>
//             <p className="text-sm text-gray-600">Total Articles</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <img src={img2} className="w-10 h-10" alt="Check" />
//             <p className="text-xl font-bold">{writer.stats.active}</p>
//             <p className="text-sm text-gray-600">Published</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
//             <p className="text-xl font-bold">{writer.stats.pending}</p>
//             <p className="text-sm text-gray-600">Pending</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <span className="text-3xl">❌</span>
//             <p className="text-xl font-bold">{writer.stats.deactive}</p>
//             <p className="text-sm text-gray-600">Inactive</p>
//           </div>
//         </div>
//       )}

//       {/* Redeem Button */}
//       {isWriterProfile && (
//         <div className="mt-6">
//           <button
//             onClick={handleRedeem}
//             disabled={redeeming}
//             className={`bg-yellow-500 flex justify-center items-center text-white px-6 py-2 rounded transition ${
//               redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
//             }`}
//           >
//             Redeem Rewards Points
//           </button>

//           {redeeming && (
//             <div className="mt-4">
//               <ProgressBar value={value} />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Social Media */}
//       <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
//         <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaInstagram />
//         </a>
//         <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaFacebookF />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaTwitter />
//         </a>
//         <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-green-500 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaWhatsapp />
//         </a>
//         <a
//           href={`https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`}
//           target="_blank"
//           rel="noreferrer"
//           className="text-red-500 hover:scale-110 p-3 shadow-lg duration-200"
//         >
//           <FaEnvelope />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Profile;




// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// import { IoNewspaperOutline } from "react-icons/io5";
// import { FaCoins as FaCoinsV6 } from "react-icons/fa6";
// import { Toast } from "primereact/toast";
// import { ProgressBar } from "primereact/progressbar";
// import img1 from "../assets/profileDefault.png";
// import img2 from "../assets/check.png";
// import SharesButton from "./ShareButton";

// const Profile = () => {
//   const [writer, setWriter] = useState(null);
//   const [value, setValue] = useState(0);
//   const [redeeming, setRedeeming] = useState(false);
// const [news, setNews] = useState([]);
// const [statusCounts, setStatusCounts] = useState({ pending: 0, approved: 0, rejected: 0 });


//   const toast = useRef(null);
//   const interval = useRef(null);
//   const location = useLocation();
//   const isSharedView = new URLSearchParams(location.search).get("shared") === "true";

//   const fetchWriterProfile = async () => {
//     try {
//       const res = await axios.get(`http://localhost:4000/api/user/get-Profile`, {
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         setWriter({
//           ...res.data.writerData,
//           points: res.data.writerData.points || 0,
//           stats: res.data.writerData.stats || { total: 0, active: 0, pending: 0, deactive: 0 }
//         });
//         // setNews(writer.newsuploaded)
//       }
//     } catch (error) {
//       console.error("Error fetching profile", error);
//     }
//   };
// useEffect(() => {
//   if (news.length > 0) {
//     const pending = news.filter(n => n.status === "pending").length;
//     const approved = news.filter(n => n.status === "approved").length;
//     const rejected = news.filter(n => n.status === "rejected").length;

//     setStatusCounts({ pending, approved, rejected });
//   }
// }, [news]);

//   const handleRedeem = () => {
//     if (!writer.points || writer.points < 1000) {
//       toast.current.show({
//         severity: "error",
//         summary: "Redeem Failed",
//         detail: "You need at least 1000 coins",
//       });
//       return;
//     }

//     setRedeeming(true);
//     setValue(0);
//     let currentValue = 0;

//     interval.current = setInterval(() => {
//       currentValue += Math.floor(Math.random() * 10) + 5;

//       if (currentValue >= 100) {
//         currentValue = 100;

//         toast.current.show({
//           severity: "success",
//           summary: "Redeem Successful",
//           detail: `You have redeemed ${writer.points} coins.`,
//         });

//         clearInterval(interval.current);

//         setTimeout(() => {
//           setWriter((prev) => ({ ...prev, points: 0 }));
//           setRedeeming(false);
//           setValue(0);
//         }, 1000);
//       }

//       setValue(currentValue);
//     }, 500);
//   };

//   useEffect(() => {
//     fetchWriterProfile();
//     return () => {
//       if (interval.current) clearInterval(interval.current);
//     };
//   }, []);

//   if (!writer) return <p className="p-4">Loading writer profile...</p>;

//   const isWriterProfile = writer.role === `${writer.role}`;
// // console.log(writer,"writerdata");

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <Toast ref={toast} position="top-center" className="custom-toast" />

//       {/* Profile Info */}
//       <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
      
//      <img
//   src={writer.writerimage || img1}
//   alt="Writer"
//   className="w-[142px] h-[142px] rounded-full object-cover"
// />

//         <div className="text-center sm:text-left">
//           <p className="text-lg"><strong>Name:</strong> {writer.writername}</p>
//           <p className="text-lg"><strong>WriterId:</strong> {writer.writeridcard}</p>
//           <p className="text-lg"><strong>Email:</strong> {writer.email}</p>
//           <p className="text-lg"><strong>Role:</strong> {writer.role}</p>
//           <p className="text-lg"><strong>Bio:</strong> {writer.writerbio}</p>
//           <p className="text-lg"><strong>LinkedIn:</strong>         <a
//   href={writer.publicprofile?.startsWith("http") 
//     ? writer.publicprofile 
//     : `https://${writer.publicprofile}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="text-blue-600 hover:underline"
// >
//   {writer.publicprofile || "No LinkedIn profile"}
// </a></p>


//           {!isSharedView && (
//             <div className="mt-4 flex flex-row gap-3">
//               <button
//                 onClick={() => window.location.href = "/dashboard/profile/update"}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Update Profile
//               </button>
//               {isWriterProfile && (
//                 <SharesButton
//                   text={`Check out ${writer.writername}'s profile!`}
//                   url={`${window.location.origin}${window.location.pathname}?shared=true`}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Writer Stats */}
//       {isWriterProfile && (
//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <FaCoinsV6 className="text-yellow-500 text-4xl" />
//             <p className="text-xl font-bold">{writer.points || 0}</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <IoNewspaperOutline className="text-blue-500 text-4xl" />
//             <p className="text-xl font-bold">{writer.newsuploaded.length}</p>
//             <p className="text-sm text-gray-600">Total Articles</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <img src={img2} className="w-10 h-10" alt="Check" />
//             <p className="text-xl font-bold">{statusCounts.approved}</p>
//             <p className="text-sm text-gray-600">Published</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
//             <p className="text-xl font-bold">{statusCounts.pending}</p>
//             <p className="text-sm text-gray-600">Pending</p>
//           </div>
//           <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//             <span className="text-3xl">❌</span>
//             <p className="text-xl font-bold">{statusCounts.rejected}</p>
//             <p className="text-sm text-gray-600">Inactive</p>
//           </div>
//         </div>
//       )}

//       {/* Redeem Button */}
//       {!isSharedView && isWriterProfile && (
//         <div className="mt-6">
//           <button
//             onClick={handleRedeem}
//             disabled={redeeming}
//             className={`bg-yellow-500 flex justify-center items-center text-white px-6 py-2 rounded transition ${
//               redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
//             }`}
//           >
//             Redeem Rewards Points
//           </button>

//           {redeeming && (
//             <div className="mt-4">
//               <ProgressBar value={value} />
//             </div>
//           )}
//         </div>
//       )}

//       {/* Social Media */}
//       <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
//         <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaInstagram />
//         </a>
//         <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaFacebookF />
//         </a>
//         <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaTwitter />
//         </a>
//         <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-green-500 hover:scale-110 p-3 shadow-lg duration-200">
//           <FaWhatsapp />
//         </a>
//         <a
//           href={`https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`}
//           target="_blank"
//           rel="noreferrer"
//           className="text-red-500 hover:scale-110 p-3 shadow-lg duration-200"
//         >
//           <FaEnvelope />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaCoins as FaCoinsV6 } from "react-icons/fa6";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import img1 from "../assets/profileDefault.png";
import img2 from "../assets/check.png";
import SharesButton from "./ShareButton";
import { AppContext } from "../Context/AppContext";

const Profile = () => {
  const [writer, setWriter] = useState(null);
  const [news, setNews] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [value, setValue] = useState(0);
  const [redeeming, setRedeeming] = useState(false);

  const toast = useRef(null);
  const interval = useRef(null);
  const location = useLocation();
  const isSharedView = new URLSearchParams(location.search).get("shared") === "true";
  const {backendUrl}=useContext(AppContext)

  // Fetch writer profile and news
  const fetchWriterProfile = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/get-Profile`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const writerData = res.data.writerData;

        setWriter({
          ...writerData,
          points: writerData.points || 0,
          stats: writerData.stats || { total: 0, active: 0, pending: 0, deactive: 0 },
        });

        // Set news state from newsuploaded
        setNews(writerData.newsuploaded || []);
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  // Calculate news status counts dynamically
  useEffect(() => {
    if (news.length > 0) {
      const pending = news.filter(n => n.status === "pending").length;
      const approved = news.filter(n => n.status === "approved").length;
      const rejected = news.filter(n => n.status === "rejected").length; 

      setStatusCounts({ pending, approved, rejected });
    }
  }, [news]);

  const handleRedeem = () => {
    if (!writer.points || writer.points < 1000) {
      toast.current.show({
        severity: "error",
        summary: "Redeem Failed",
        detail: "You need at least 1000 coins",
      });
      return;
    }

    setRedeeming(true);
    setValue(0);
    let currentValue = 0;

    interval.current = setInterval(() => {
      currentValue += Math.floor(Math.random() * 10) + 5;

      if (currentValue >= 100) {
        currentValue = 100;

        toast.current.show({
          severity: "success",
          summary: "Redeem Successful",
          detail: `You have redeemed ${writer.points} coins.`,
        });

        clearInterval(interval.current);

        setTimeout(() => {
          setWriter(prev => ({ ...prev, points: 0 }));
          setRedeeming(false);
          setValue(0);
        }, 1000);
      }

      setValue(currentValue);
    }, 500);
  };

  useEffect(() => {
    fetchWriterProfile();
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  if (!writer) return <p className="p-4">Loading writer profile...</p>;

  const isWriterProfile = writer.role === `${writer.role}`;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <Toast ref={toast} position="top-center" className="custom-toast" />

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
        <img
          src={writer.writerimage || img1}
          alt="Writer"
          className="w-[142px] h-[142px] rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <p className="text-lg"><strong>Name:</strong> {writer.writername}</p>
          <p className="text-lg"><strong>WriterId:</strong> {writer.writeridcard}</p>
          <p className="text-lg"><strong>Email:</strong> {writer.email}</p>
          <p className="text-lg"><strong>Role:</strong> {writer.role}</p>
          <p className="text-lg"><strong>Bio:</strong> {writer.writerbio}</p>
          <p className="text-lg"><strong>LinkedIn:</strong>
            <a
              href={writer.publicprofile?.startsWith("http") ? writer.publicprofile : `https://${writer.publicprofile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {writer.publicprofile || "No LinkedIn profile"}
            </a>
          </p>

          {!isSharedView && (
            <div className="mt-4 flex flex-row gap-3 lg:mx-0 mx-auto w-fit">
              <button
                onClick={() => window.location.href = "/dashboard/profile/update"}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Update Profile
              </button>
              {isWriterProfile && (
                <SharesButton
                  text={`Check out ${writer.writername}'s profile!`}
                  url={`${window.location.origin}${window.location.pathname}?shared=true`}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Writer Stats */}
      {isWriterProfile && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <FaCoinsV6 className="text-yellow-500 text-4xl" />
            <p className="text-xl font-bold">{writer.points || 0}</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <IoNewspaperOutline className="text-blue-500 text-4xl" />
            <p className="text-xl font-bold">{news.length}</p>
            <p className="text-sm text-gray-600">Total Blogs</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <img src={img2} className="w-10 h-10" alt="Check" />
            <p className="text-xl font-bold">{statusCounts.approved}</p>
            <p className="text-sm text-gray-600">Published</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
            <p className="text-xl font-bold">{statusCounts.pending}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
          <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
            <span className="text-3xl">❌</span>
            <p className="text-xl font-bold">{statusCounts.rejected}</p>
            <p className="text-sm text-gray-600">Inactive</p>
          </div>
        </div>
      )}

      {/* Redeem Button */}
      {!isSharedView && isWriterProfile && (
        <div className="mt-6 lg:mx-0 mx-auto w-fit">
          <button
            onClick={handleRedeem}
            disabled={redeeming}
            className={`bg-yellow-500 flex justify-center items-center text-white px-6 py-2 rounded transition ${
              redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
            }`}
          >
            Redeem Rewards Points
          </button>

          {redeeming && (
            <div className="mt-4">
              <ProgressBar value={value} />
            </div>
          )}
        </div>
      )}

      {/* Social Media */}
      <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:scale-110 p-3 shadow-lg duration-200"><FaInstagram /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-700 hover:scale-110 p-3 shadow-lg duration-200"><FaFacebookF /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-sky-500 hover:scale-110 p-3 shadow-lg duration-200"><FaTwitter /></a>
        <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-green-500 hover:scale-110 p-3 shadow-lg duration-200"><FaWhatsapp /></a>
        <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`} target="_blank" rel="noreferrer" className="text-red-500 hover:scale-110 p-3 shadow-lg duration-200"><FaEnvelope /></a>
      </div>
    </div>
  );
};

export default Profile;
