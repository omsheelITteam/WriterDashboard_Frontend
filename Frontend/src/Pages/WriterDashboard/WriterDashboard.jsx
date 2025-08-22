// // // import React, { useEffect, useState, useRef } from "react";
// // // import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
// // // import axios from "axios";

// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// // // import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// // // import { IoNewspaperOutline } from "react-icons/io5";
// // // import { FaCoins as FaCoinsV6 } from "react-icons/fa6";
// // // import { convert } from "html-to-text";
// // // import { Toast } from "primereact/toast";
// // // import { ProgressBar } from "primereact/progressbar";
// // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// // // import toast from "react-hot-toast";
// // // import img2 from "../../assets/check.png";
// // // import "../../App.css"

// // // const WriterDashboard = ({ userInfo, token }) => {
// // //   const { id } = useParams();
// // //   const { pathname } = useLocation();
// // //   const navigate = useNavigate();

// // //   const [writer, setWriter] = useState(null);
// // //   const [value, setValue] = useState(0);
// // //   const [redeeming, setRedeeming] = useState(false);
// // //   const [news, setNews] = useState([]);
// // //   const [allNews, setAllNews] = useState([]);
// // //   const [parPage, setParPage] = useState(10);
// // //   const [pages, setPages] = useState(0);
// // //   const [page, setPage] = useState(1);

// // //   const toastRef = useRef(null);
// // //   const interval = useRef(null);

// // //   const getAll_news = async () => {
// // //     try {
// // //       const { data } = await axios.get("http://localhost:5000/api/news", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setAllNews(data.news);
// // //       setNews(data.news);
// // //     } catch (error) {
// // //       console.log(error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     getAll_news();
// // //   }, []);

// // //   useEffect(() => {
// // //     if (news.length > 0) {
// // //       const calculate_page = Math.ceil(news.length / parPage);
// // //       setPages(calculate_page);
// // //     }
// // //   }, [news, parPage]);

// // //   const type_filter = (e) => {
// // //     if (e.target.value === "") {
// // //       setNews(allNews);
// // //       setPage(1);
// // //       setParPage(10);
// // //     } else {
// // //       const tempNews = allNews.filter((n) => n.status === e.target.value);
// // //       setNews(tempNews);
// // //       setPage(1);
// // //       setParPage(10);
// // //     }
// // //   };

// // //   const search_news = (e) => {
// // //     const tempNews = allNews.filter((n) =>
// // //       n.title.toLowerCase().includes(e.target.value.toLowerCase())
// // //     );
// // //     setNews(tempNews);
// // //     setPage(1);
// // //     setParPage(10);
// // //   };

// // //   const fetchWriter = async () => {
// // //     try {
// // //       const userId = id || userInfo?.id;
// // //       if (!userId) return;

// // //       const res = await axios.get(`http://localhost:5000/api/news/writers/${userId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       const newsRes = await axios.get(`http://localhost:5000/api/news?createdBy=${userId}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });

// // //       const newsData = newsRes.data.news || [];
// // //       const total = newsData.length;
// // //       const active = newsData.filter((n) => n.status === "active").length;
// // //       const pending = newsData.filter((n) => n.status === "pending").length;
// // //       const deactive = newsData.filter((n) => n.status === "deactive").length;

// // //       const writerData = {
// // //         ...res.data.writer,
// // //         coins: 250,
// // //         stats: { total, active, pending, deactive },
// // //       };

// // //       setWriter(writerData);
// // //     } catch (error) {
// // //       console.error("Profile fetch failed", error);
// // //     }
// // //   };

// // //   const handleRedeem = () => {
// // //     if (!writer.coins || writer.coins < 200) {
// // //       toastRef.current.show({
// // //         severity: "error",
// // //         summary: "Redeem Failed",
// // //         detail: "You need at least 200 coins",
// // //       });
// // //       return;
// // //     }

// // //     setRedeeming(true);
// // //     setValue(0);
// // //     let currentValue = 0;

// // //     interval.current = setInterval(() => {
// // //       currentValue += Math.floor(Math.random() * 10) + 5;

// // //       if (currentValue >= 100) {
// // //         currentValue = 100;

// // //         toastRef.current.show({
// // //           severity: "success",
// // //           summary: "Redeem Successful",
// // //           detail: `You have redeemed ${writer.coins} coins.`,
// // //         });

// // //         clearInterval(interval.current);

// // //         setTimeout(() => {
// // //           setWriter((prev) => ({ ...prev, coins: 0 }));
// // //           setRedeeming(false);
// // //           setValue(0);
// // //         }, 1000);
// // //       }

// // //       setValue(currentValue);
// // //     }, 500);
// // //   };

// // //   useEffect(() => {
// // //     fetchWriter();
// // //     return () => {
// // //       if (interval.current) clearInterval(interval.current);
// // //     };
// // //   }, [id, userInfo]);

// // //   if (!writer) return <p className="p-4">Loading writer profile...</p>;

// // //   const isCurrentUser = !id || id === userInfo?.id;
// // //   const isWriterProfile = writer.role === "writer";

// // //   return (
// // //     // <>
// // //     //   <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md  scrollbar-hide">
// // //     //     <Toast ref={toastRef} position="top-center" className="custom-toast" />

// // //     //     {/* Writer Stats */}
// // //     //     {isWriterProfile && (
// // //     //       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// // //     //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //     //           <FaCoinsV6 className="text-yellow-500 text-4xl" />
// // //     //           <p className="text-xl font-bold">{writer.coins || 0}</p>
// // //     //         </div>
// // //     //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //     //           <IoNewspaperOutline className="text-blue-500 text-4xl" />
// // //     //           <p className="text-xl font-bold">{writer.stats.total}</p>
// // //     //         </div>
// // //     //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //     //           <img src={img2} className="w-10 h-10" alt="Check" />
// // //     //           <p className="text-xl font-bold">{writer.stats.active}</p>
// // //     //         </div>
// // //     //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //     //           <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
// // //     //           <p className="text-xl font-bold">{writer.stats.pending}</p>
// // //     //         </div>
// // //     //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //     //           <span className="text-3xl">❌</span>
// // //     //           <p className="text-xl font-bold">{writer.stats.deactive}</p>
// // //     //         </div>
// // //     //       </div>
// // //     //     )}

// // //     //     {/* Redeem */}
// // //     //     {isCurrentUser && isWriterProfile && (
// // //     //       <div className="mt-6">
// // //     //         <button
// // //     //           onClick={handleRedeem}
// // //     //           disabled={redeeming}
// // //     //           className={`bg-yellow-500 flex justify-center items-center text-white px-6 py-2 rounded transition ${
// // //     //             redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
// // //     //           }`}
// // //     //         >
// // //     //           Redeem Rewards Points
// // //     //         </button>

// // //     //         {redeeming && (
// // //     //           <div className="mt-4">
// // //     //             <ProgressBar value={value} />
// // //     //           </div>
// // //     //         )}
// // //     //       </div>
// // //     //     )}

// // //     //     {/* Social */}
// // //     //     <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
// // //     //       {[
// // //     //         ["https://instagram.com", <FaInstagram />, "text-pink-600"],
// // //     //         ["https://facebook.com", <FaFacebookF />, "text-blue-700"],
// // //     //         ["https://twitter.com", <FaTwitter />, "text-sky-500"],
// // //     //         ["https://wa.me/", <FaWhatsapp />, "text-green-500"],
// // //     //         [
// // //     //           `https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`,
// // //     //           <FaEnvelope />,
// // //     //           "text-red-500",
// // //     //         ],
// // //     //       ].map(([url, icon, color]) => (
// // //     //         <a
// // //     //           key={url}
// // //     //           href={url}
// // //     //           target="_blank"
// // //     //           rel="noreferrer"
// // //     //           className={`${color} hover:scale-110 p-3 shadow-lg duration-200`}
// // //     //         >
// // //     //           {icon}
// // //     //         </a>
// // //     //       ))}
// // //     //     </div>
// // //     //   </div>

// // //     //   {/* Table */}
// // //     //   <div className="shadow-lg mx-6 overflow-x-hidden scrollbar-hide max-w-full">
// // //     //     <div className="px-4 py-1 flex flex-col sm:flex-row gap-2 sm:gap-x-2 mt-6">
// // //     //       <select
// // //     //         onChange={type_filter}
// // //     //         className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 p-4 w-full sm:w-auto"
// // //     //       >
// // //     //         <option value="">----select type----</option>
// // //     //         <option value="pending">Pending</option>
// // //     //         <option value="active">Approved</option>
// // //     //         <option value="deactive">Rejected</option>
// // //     //       </select>
// // //     //       <input
// // //     //         type="text"
// // //     //         onChange={search_news}
// // //     //         placeholder="Search News"
// // //     //         className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 w-full sm:w-auto"
// // //     //       />
// // //     //     </div>

// // //     //     <div className="relative overflow-x-auto p-4 max-w-full">
// // //     //       <table className="w-full text-sm text-left text-slate-600 min-w-max">
// // //     //         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
// // //     //           <tr>
// // //     //             <th className="px-4 sm:px-7 py-3">No</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Title</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Image</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Category</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Description</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Date</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Status</th>
// // //     //             <th className="px-4 sm:px-7 py-3">Actions</th>
// // //     //           </tr>
// // //     //         </thead>
// // //     //         <tbody>
// // //     //           {news.length > 0 &&
// // //     //             news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
// // //     //               <tr key={n._id} className="bg-white border-b">
// // //     //                 <td className="px-6 p-4">{i + 1}</td>
// // //     //                 <td className="px-6 p-4 break-words whitespace-normal">{n.title.slice(0, 15)}</td>
// // //     //                 <td className="px-6 p-4">
// // //     //                   <img className="w-[40px] h-[40px]" src={n.image} alt="news" />
// // //     //                 </td>
// // //     //                 <td className="px-6 p-4">{n.category}</td>
// // //     //                 <td className="px-6 p-4 break-words whitespace-normal">{convert(n.description).slice(0, 15)}</td>
// // //     //                 <td className="px-6 p-4">{n.date}</td>
// // //     //                 <td className="px-6 p-4">
// // //     //                   <span
// // //     //                     className={`px-2 py-[2px] rounded-lg text-xs ${
// // //     //                       n.status === "pending"
// // //     //                         ? "bg-blue-100 text-blue-800"
// // //     //                         : n.status === "active"
// // //     //                         ? "bg-green-100 text-green-800"
// // //     //                         : "bg-red-100 text-red-800"
// // //     //                     }`}
// // //     //                   >
// // //     //                     {n.status}
// // //     //                   </span>
// // //     //                 </td>
// // //     //                 <td className="px-6 p-4">
// // //     //                   <div className="flex gap-2 items-center flex-wrap">
// // //     //                     <Link
// // //     //                       to={`/news/view/${n._id}`}
// // //     //                       className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
// // //     //                     >
// // //     //                       <FaEye />
// // //     //                     </Link>
// // //     //                     {userInfo?.role === "writer" && (
// // //     //                       <>
// // //     //                         <Link
// // //     //                           to={`/dashboard/news/edit/${n._id}`}
// // //     //                           className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 text-white"
// // //     //                         >
// // //     //                           <FaEdit />
// // //     //                         </Link>
// // //     //                         <div className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 text-white">
// // //     //                           <FaTrash />
// // //     //                         </div>
// // //     //                       </>
// // //     //                     )}
// // //     //                   </div>
// // //     //                 </td>
// // //     //               </tr>
// // //     //             ))}
// // //     //         </tbody>
// // //     //       </table>
// // //     //     </div>

// // //     //     {/* Pagination */}
// // //     //     <div className="flex flex-wrap items-center justify-end px-4 gap-3 text-slate-600">
// // //     //       <div className="flex gap-x-3 justify-center items-center w-full sm:w-auto">
// // //     //         <p className="px-4 py-3 font-semibold text-sm whitespace-nowrap">
// // //     //           News Pages
// // //     //         </p>
// // //     //         <select
// // //     //           value={parPage}
// // //     //           onChange={(e) => {
// // //     //             setParPage(parseInt(e.target.value));
// // //     //             setPage(1);
// // //     //           }}
// // //     //           className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
// // //     //         >
// // //     //           <option value="10">10</option>
// // //     //           <option value="20">20</option>
// // //     //           <option value="30">30</option>
// // //     //           <option value="40">40</option>
// // //     //         </select>
// // //     //       </div>
// // //     //       <p className="px-6 py-3 font-semibold text-sm whitespace-nowrap">
// // //     //         {(page - 1) * parPage + 1}/{news.length} - of {pages}
// // //     //       </p>
// // //     //       <div className="flex items-center gap-x-3">
// // //     //         <IoIosArrowBack
// // //     //           onClick={() => page > 1 && setPage(page - 1)}
// // //     //           className="w-5 h-5 cursor-pointer"
// // //     //         />
// // //     //         <IoIosArrowForward
// // //     //           onClick={() => page < pages && setPage(page + 1)}
// // //     //           className="w-5 h-5 cursor-pointer"
// // //     //         />
// // //     //       </div>
// // //     //     </div>
// // //     //   </div>
// // //     // </>
// // //     <>
// // //   <div className="w-full mx-auto mt-10 bg-white p-6 rounded-lg shadow-md scrollbar-hide">
// // //     <Toast ref={toastRef} position="top-center" className="custom-toast" />

// // //     {/* Writer Stats */}
// // //     {isWriterProfile && (
// // //       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// // //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //           <FaCoinsV6 className="text-yellow-500 text-4xl" />
// // //           <p className="text-xl font-bold">{writer.coins || 0}</p>
// // //         </div>
// // //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //           <IoNewspaperOutline className="text-blue-500 text-4xl" />
// // //           <p className="text-xl font-bold">{writer.stats.total}</p>
// // //         </div>
// // //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //           <img src={img2} className="w-10 h-10" alt="Check" />
// // //           <p className="text-xl font-bold">{writer.stats.active}</p>
// // //         </div>
// // //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //           <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
// // //           <p className="text-xl font-bold">{writer.stats.pending}</p>
// // //         </div>
// // //         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// // //           <span className="text-3xl">❌</span>
// // //           <p className="text-xl font-bold">{writer.stats.deactive}</p>
// // //         </div>
// // //       </div>
// // //     )}

// // //     {/* Redeem Button */}
// // //     {isCurrentUser && isWriterProfile && (
// // //       <div className="mt-6">
// // //         <button
// // //           onClick={handleRedeem}
// // //           disabled={redeeming}
// // //           className={`bg-yellow-500 flex justify-center items-center text-white px-6 py-2 rounded transition ${
// // //             redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
// // //           }`}
// // //         >
// // //           Redeem Rewards Points
// // //         </button>

// // //         {redeeming && (
// // //           <div className="mt-4">
// // //             <ProgressBar value={value} />
// // //           </div>
// // //         )}
// // //       </div>
// // //     )}

// // //     {/* Social Icons */}
// // //     <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
// // //       {[
// // //         ["https://instagram.com", <FaInstagram />, "text-pink-600"],
// // //         ["https://facebook.com", <FaFacebookF />, "text-blue-700"],
// // //         ["https://twitter.com", <FaTwitter />, "text-sky-500"],
// // //         ["https://wa.me/", <FaWhatsapp />, "text-green-500"],
// // //         [
// // //           `https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`,
// // //           <FaEnvelope />,
// // //           "text-red-500",
// // //         ],
// // //       ].map(([url, icon, color]) => (
// // //         <a
// // //           key={url}
// // //           href={url}
// // //           target="_blank"
// // //           rel="noreferrer"
// // //           className={`${color} hover:scale-110 p-3 shadow-lg duration-200`}
// // //         >
// // //           {icon}
// // //         </a>
// // //       ))}
// // //     </div>
// // //   </div>

// // //   {/* Table container */}
// // //   <div className="shadow-lg mx-6 mt-6 overflow-x-auto max-w-full">
// // //     <div className="px-4 py-1 flex flex-col sm:flex-row gap-2 sm:gap-x-2">
// // //       <select
// // //         onChange={type_filter}
// // //         className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 p-4 w-full sm:w-auto"
// // //       >
// // //         <option value="">----select type----</option>
// // //         <option value="pending">Pending</option>
// // //         <option value="active">Approved</option>
// // //         <option value="deactive">Rejected</option>
// // //       </select>
// // //       <input
// // //         type="text"
// // //         onChange={search_news}
// // //         placeholder="Search News"
// // //         className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 w-full sm:w-auto"
// // //       />
// // //     </div>

// // //     <div className="relative w-full p-4 overflow-x-auto">
// // //       <table className="w-full text-sm text-left text-slate-600">
// // //         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
// // //           <tr>
// // //             <th className="px-4 sm:px-7 py-3">No</th>
// // //             <th className="px-4 sm:px-7 py-3">Title</th>
// // //             <th className="px-4 sm:px-7 py-3">Image</th>
// // //             <th className="px-4 sm:px-7 py-3">Category</th>
// // //             <th className="px-4 sm:px-7 py-3">Description</th>
// // //             <th className="px-4 sm:px-7 py-3">Date</th>
// // //             <th className="px-4 sm:px-7 py-3">Status</th>
// // //             <th className="px-4 sm:px-7 py-3">Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {news.length > 0 &&
// // //             news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
// // //               <tr key={n._id} className="bg-white border-b">
// // //                 <td className="px-6 p-4">{i + 1}</td>
// // //                 <td className="px-6 p-4 break-words whitespace-normal">{n.title.slice(0, 15)}</td>
// // //                 <td className="px-6 p-4">
// // //                   <img className="w-[40px] h-[40px]" src={n.image} alt="news" />
// // //                 </td>
// // //                 <td className="px-6 p-4">{n.category}</td>
// // //                 <td className="px-6 p-4 break-words whitespace-normal">{convert(n.description).slice(0, 15)}</td>
// // //                 <td className="px-6 p-4">{n.date}</td>
// // //                 <td className="px-6 p-4">
// // //                   <span
// // //                     className={`px-2 py-[2px] rounded-lg text-xs ${
// // //                       n.status === "pending"
// // //                         ? "bg-blue-100 text-blue-800"
// // //                         : n.status === "active"
// // //                         ? "bg-green-100 text-green-800"
// // //                         : "bg-red-100 text-red-800"
// // //                     }`}
// // //                   >
// // //                     {n.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="px-6 p-4">
// // //                   <div className="flex gap-2 items-center flex-wrap">
// // //                     <Link
// // //                       to={`/news/view/${n._id}`}
// // //                       className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
// // //                     >
// // //                       <FaEye />
// // //                     </Link>
// // //                     {userInfo?.role === "writer" && (
// // //                       <>
// // //                         <Link
// // //                           to={`/dashboard/news/edit/${n._id}`}
// // //                           className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 text-white"
// // //                         >
// // //                           <FaEdit />
// // //                         </Link>
// // //                         <div className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 text-white">
// // //                           <FaTrash />
// // //                         </div>
// // //                       </>
// // //                     )}
// // //                   </div>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //         </tbody>
// // //       </table>
// // //     </div>

// // //     {/* Pagination */}
// // //     <div className="flex flex-wrap items-center justify-end px-4 gap-3 text-slate-600">
// // //       <div className="flex gap-x-3 justify-center items-center w-full sm:w-auto">
// // //         <p className="px-4 py-3 font-semibold text-sm whitespace-nowrap">News Pages</p>
// // //         <select
// // //           value={parPage}
// // //           onChange={(e) => {
// // //             setParPage(parseInt(e.target.value));
// // //             setPage(1);
// // //           }}
// // //           className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
// // //         >
// // //           <option value="10">10</option>
// // //           <option value="20">20</option>
// // //           <option value="30">30</option>
// // //           <option value="40">40</option>
// // //         </select>
// // //       </div>
// // //       <p className="px-6 py-3 font-semibold text-sm whitespace-nowrap">
// // //         {(page - 1) * parPage + 1}/{news.length} - of {pages}
// // //       </p>
// // //       <div className="flex items-center gap-x-3">
// // //         <IoIosArrowBack
// // //           onClick={() => page > 1 && setPage(page - 1)}
// // //           className="w-5 h-5 cursor-pointer"
// // //         />
// // //         <IoIosArrowForward
// // //           onClick={() => page < pages && setPage(page + 1)}
// // //           className="w-5 h-5 cursor-pointer"
// // //         />
// // //       </div>
// // //     </div>
// // //   </div>
// // // </>

// // //   );
// // // };

// // // export default WriterDashboard;

// // import React, { useEffect, useState, useRef, useContext } from "react";
// // import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
// // import axios from "axios";

// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// // import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
// // import { IoNewspaperOutline } from "react-icons/io5";
// // import { FaCoins as FaCoinsV6 } from "react-icons/fa6";
// // import { convert } from "html-to-text";
// // import { Toast } from "primereact/toast";
// // import { ProgressBar } from "primereact/progressbar";
// // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// // import toast from "react-hot-toast";
// // import img2 from "../../assets/check.png";
// // import { AppContext } from "../../Context/AppContext";
// // const WriterDashboard = () => {
// //   const { id } = useParams();
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const { userInfo } = useContext(AppContext)
// //   const { backendURL } = useContext(AppContext);
// //   const [writer, setWriter] = useState(null);
// //   const [value, setValue] = useState(0);
// //   const [redeeming, setRedeeming] = useState(false);
// //   const [news, setNews] = useState([]);
// //   const [allNews, setAllNews] = useState([]);
// //   const [parPage, setParPage] = useState(10);
// //   const [pages, setPages] = useState(0);
// //   const [page, setPage] = useState(1);

// //   const toastRef = useRef(null);
// //   const interval = useRef(null);

// //   const getAll_news = async () => {
// //     try {
// //       const { data } = await axios.get(`${backendURL}/api/user/get-all-news`, {
// //         withCredentials: true,
// //       });
// //       setAllNews(data.news);
// //       setNews(data.news);
// //       console.log(data.news)
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     getAll_news();
// //   }, []);

// //   useEffect(() => {
// //     if (news.length > 0) {
// //       const calculate_page = Math.ceil(news.length / parPage);
// //       setPages(calculate_page);
// //     }
// //   }, [news, parPage]);

// //   const type_filter = (e) => {
// //     if (e.target.value === "") {
// //       setNews(allNews);
// //       setPage(1);
// //       setParPage(10);
// //     } else {
// //       const tempNews = allNews.filter((n) => n.status === e.target.value);
// //       setNews(tempNews);
// //       setPage(1);
// //       setParPage(10);
// //     }
// //   };

// //   const search_news = (e) => {
// //     const tempNews = allNews.filter((n) =>
// //       n.title.toLowerCase().includes(e.target.value.toLowerCase())
// //     );
// //     setNews(tempNews);
// //     setPage(1);
// //     setParPage(10);
// //   };

// //   const fetchWriter = async () => {
// //     try {
// //       const userId = id || userInfo?.id;
// //       if (!userId) return;
// //       const writerId="08eb30ac-ab5a-4afc-8a79-8e55cbcf56cc";

// //       // const res = await axios.get(`http://localhost:5000/api/news/writers/${userId}`, {
// //       //   headers: { Authorization: `Bearer ${token}` },
// //       // });

// //       // const newsRes = await axios.get(`http://localhost:5000/api/news?createdBy=${userId}`, {
// //       //   headers: { Authorization: `Bearer ${token}` },
// //       // });
// //       const { data } = await axios.get(`http:localhost:4000/api/user/get-newsby-writerid:/${writerId}`,
// //         { withCredentials: true }
// //       )

// //       if (data.success) {
// //         toast.success("news fetched successfully")
// //         console.log(data,"newsResult");


// //       }
// //       else {
// //         toast.error(error.message)
// //       }

// //       const newsData = newsRes.data.news || [];
// //       const total = newsData.length;
// //       const active = newsData.filter((n) => n.status === "active").length;
// //       const pending = newsData.filter((n) => n.status === "pending").length;
// //       const deactive = newsData.filter((n) => n.status === "deactive").length;

// //       const writerData = {
// //         ...res.data.writer,
// //         coins: 250,
// //         stats: { total, active, pending, deactive },
// //       };

// //       setWriter(writerData);
// //     } catch (error) {
// //       console.error("Profile fetch failed", error);
// //     }
// //   };

// //   const handleRedeem = () => {
// //     if (!writer.coins || writer.coins < 200) {
// //       toastRef.current.show({
// //         severity: "error",
// //         summary: "Redeem Failed",
// //         detail: "You need at least 200 coins",
// //       });
// //       return;
// //     }

// //     setRedeeming(true);
// //     setValue(0);
// //     let currentValue = 0;

// //     interval.current = setInterval(() => {
// //       currentValue += Math.floor(Math.random() * 10) + 5;

// //       if (currentValue >= 100) {
// //         currentValue = 100;

// //         toastRef.current.show({
// //           severity: "success",
// //           summary: "Redeem Successful",
// //           detail: `You have redeemed ${writer.coins} coins.`,
// //         });

// //         clearInterval(interval.current);

// //         setTimeout(() => {
// //           setWriter((prev) => ({ ...prev, coins: 0 }));
// //           setRedeeming(false);
// //           setValue(0);
// //         }, 1000);
// //       }

// //       setValue(currentValue);
// //     }, 500);
// //   };

// //   useEffect(() => {
// //     fetchWriter();
// //     return () => {
// //       if (interval.current) clearInterval(interval.current);
// //     };
// //   }, [id, userInfo]);

// //   if (!writer) return <p className="p-4">Loading writer profile...</p>;

// //   const isCurrentUser = !id || id === userInfo?.id;
// //   const isWriterProfile = writer.role === "writer";

// //   return (
// //     <>
// //       <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md overflow-x-hidden scrollbar-hide">
// //         <Toast ref={toastRef} position="top-center" className="custom-toast" />

// //         {/* Writer Stats */}
// //         {isWriterProfile && (
// //           <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// //             <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// //               <FaCoinsV6 className="text-yellow-500 text-4xl" />
// //               <p className="text-xl font-bold">{writer.coins || 0}</p>
// //             </div>
// //             <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// //               <IoNewspaperOutline className="text-blue-500 text-4xl" />
// //               <p className="text-xl font-bold">{writer.stats.total}</p>
// //             </div>
// //             <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// //               <img src={img2} className="w-10 h-10" alt="Check" />
// //               <p className="text-xl font-bold">{writer.stats.active}</p>
// //             </div>
// //             <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// //               <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
// //               <p className="text-xl font-bold">{writer.stats.pending}</p>
// //             </div>
// //             <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
// //               <span className="text-3xl">❌</span>
// //               <p className="text-xl font-bold">{writer.stats.deactive}</p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Redeem */}
// //         {isCurrentUser && isWriterProfile && (
// //           <div className="mt-6">
// //             <button
// //               onClick={handleRedeem}
// //               disabled={redeeming}
// //               className={`bg-yellow-500 flex justify-center items-center text-white px-6 py-2 rounded transition ${redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
// //                 }`}
// //             >
// //               Redeem Rewards Points
// //             </button>

// //             {redeeming && (
// //               <div className="mt-4">
// //                 <ProgressBar value={value} />
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Social */}
// //         <div className="mt-8 flex justify-center p-4 gap-6 text-xl">
// //           {[
// //             ["https://instagram.com", <FaInstagram />, "text-pink-600"],
// //             ["https://facebook.com", <FaFacebookF />, "text-blue-700"],
// //             ["https://twitter.com", <FaTwitter />, "text-sky-500"],
// //             ["https://wa.me/", <FaWhatsapp />, "text-green-500"],
// //             [
// //               `https://mail.google.com/mail/?view=cm&fs=1&to=${writer.email}`,
// //               <FaEnvelope />,
// //               "text-red-500",
// //             ],
// //           ].map(([url, icon, color]) => (
// //             <a
// //               key={url}
// //               href={url}
// //               target="_blank"
// //               rel="noreferrer"
// //               className={`${color} hover:scale-110 p-3 shadow-lg duration-200`}
// //             >
// //               {icon}
// //             </a>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="shadow-lg mx-6 overflow-x-hidden scrollbar-hide max-w-full">
// //         <div className="px-4 py-1 flex flex-col sm:flex-row gap-2 sm:gap-x-2 mt-6">
// //           <select
// //             onChange={type_filter}
// //             className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 p-4 w-full sm:w-auto"
// //           >
// //             <option value="">----select type----</option>
// //             <option value="pending">Pending</option>
// //             <option value="active">Approved</option>
// //             <option value="deactive">Rejected</option>
// //           </select>
// //           <input
// //             type="text"
// //             onChange={search_news}
// //             placeholder="Search News"
// //             className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10 w-full sm:w-auto"
// //           />
// //         </div>

// //         <div className="relative overflow-x-auto p-4 max-w-full">
// //           <table className="w-full text-sm text-left text-slate-600 min-w-max">
// //             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
// //               <tr>
// //                 <th className="px-4 sm:px-7 py-3">No</th>
// //                 <th className="px-4 sm:px-7 py-3">Title</th>
// //                 <th className="px-4 sm:px-7 py-3">Image</th>
// //                 <th className="px-4 sm:px-7 py-3">Category</th>
// //                 <th className="px-4 sm:px-7 py-3">Description</th>
// //                 <th className="px-4 sm:px-7 py-3">Date</th>
// //                 <th className="px-4 sm:px-7 py-3">Status</th>
// //                 <th className="px-4 sm:px-7 py-3">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {news.length > 0 &&
// //                 news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
// //                   <tr key={n._id} className="bg-white border-b">
// //                     <td className="px-6 p-4">{i + 1}</td>
// //                     <td className="px-6 p-4 break-words whitespace-normal">{n.title.slice(0, 15)}</td>
// //                     <td className="px-6 p-4">
// //                       <img className="w-[40px] h-[40px]" src={n.image} alt="news" />
// //                     </td>
// //                     <td className="px-6 p-4">{n.category}</td>
// //                     <td className="px-6 p-4 break-words whitespace-normal">{convert(n.description).slice(0, 15)}</td>
// //                     <td className="px-6 p-4">{n.date}</td>
// //                     <td className="px-6 p-4">
// //                       <span
// //                         className={`px-2 py-[2px] rounded-lg text-xs ${n.status === "pending"
// //                             ? "bg-blue-100 text-blue-800"
// //                             : n.status === "active"
// //                               ? "bg-green-100 text-green-800"
// //                               : "bg-red-100 text-red-800"
// //                           }`}
// //                       >
// //                         {n.status}
// //                       </span>
// //                     </td>
// //                     <td className="px-6 p-4">
// //                       <div className="flex gap-2 items-center flex-wrap">
// //                         <Link
// //                           to={`/news/view/${n._id}`}
// //                           className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 text-white"
// //                         >
// //                           <FaEye />
// //                         </Link>
// //                         {userInfo?.role === "writer" && (
// //                           <>
// //                             <Link
// //                               to={`/dashboard/news/edit/${n._id}`}
// //                               className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 text-white"
// //                             >
// //                               <FaEdit />
// //                             </Link>
// //                             <div className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 text-white">
// //                               <FaTrash />
// //                             </div>
// //                           </>
// //                         )}
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         <div className="flex flex-wrap items-center justify-end px-4 gap-3 text-slate-600">
// //           <div className="flex gap-x-3 justify-center items-center w-full sm:w-auto">
// //             <p className="px-4 py-3 font-semibold text-sm whitespace-nowrap">
// //               News Pages
// //             </p>
// //             <select
// //               value={parPage}
// //               onChange={(e) => {
// //                 setParPage(parseInt(e.target.value));
// //                 setPage(1);
// //               }}
// //               className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
// //             >
// //               <option value="10">10</option>
// //               <option value="20">20</option>
// //               <option value="30">30</option>
// //               <option value="40">40</option>
// //             </select>
// //           </div>
// //           <p className="px-6 py-3 font-semibold text-sm whitespace-nowrap">
// //             {(page - 1) * parPage + 1}/{news.length} - of {pages}
// //           </p>
// //           <div className="flex items-center gap-x-3">
// //             <IoIosArrowBack
// //               onClick={() => page > 1 && setPage(page - 1)}
// //               className="w-5 h-5 cursor-pointer"
// //             />
// //             <IoIosArrowForward
// //               onClick={() => page < pages && setPage(page + 1)}
// //               className="w-5 h-5 cursor-pointer"
// //             />
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default WriterDashboard;





// import React, { useEffect, useState, useRef, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { convert } from "html-to-text";
// import { AppContext } from "../../Context/AppContext";
// import { Toast } from "primereact/toast";
// import { ProgressBar } from "primereact/progressbar";
// import { FaCoins } from "react-icons/fa6";
// import { IoNewspaperOutline } from "react-icons/io5";
// import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaEnvelope, FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// import imgCheck from "../../assets/check.png";

// const WriterDashboard = () => {
//   const { userData, backendURL } = useContext(AppContext);
//   const [news, setNews] = useState([]);
//   const [allNews, setAllNews] = useState([]);
//   const [parPage, setParPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(0);
//   const [redeeming, setRedeeming] = useState(false);
//   const [value, setValue] = useState(0);
//   const [writerStats, setWriterStats] = useState({ total: 0, active: 0, pending: 0, deactive: 0 });
//   const [coins, setCoins] = useState(0);

//   const toastRef = useRef(null);
//   const interval = useRef(null);



//   const fetchNews = async (writerId) => {
//     if (!writerId) return;

//     try {
//       const { data } = await axios.get(`${backendURL}/api/user/get-newsby-writerid/${writerId}`, {
//         withCredentials: true,
//       });
//       if (data.success) {
//         setNews(data.news);
//         setAllNews(data.news);
//       // console.log(data.news)
//         // Calculate stats
//         const total = data.news.length;
//         const active = data.news.filter(n => n.status === "active").length;
//         const pending = data.news.filter(n => n.status === "pending").length;
//         const deactive = data.news.filter(n => n.status === "deactive").length;

//         setWriterStats({ total, active, pending, deactive });

//         // Set default coins
//         setCoins(data.points || 250);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (userData?.id) {
//       fetchNews(userData.id);
//     }
//   }, [userData]);

//   // Pagination
//   useEffect(() => {
//     setPages(Math.ceil(news.length / parPage));
//   }, [news, parPage]);

//   const handleRedeem = () => {
//     if (coins < 200) {
//       toastRef.current.show({ severity: "error", summary: "Redeem Failed", detail: "You need at least 200 coins" });
//       return;
//     }

//     setRedeeming(true);
//     setValue(0);
//     let currentValue = 0;

//     interval.current = setInterval(() => {
//       currentValue += Math.floor(Math.random() * 10) + 5;

//       if (currentValue >= 100) {
//         currentValue = 100;
//         toastRef.current.show({ severity: "success", summary: "Redeem Successful", detail: `You have redeemed ${coins} coins.` });
//         clearInterval(interval.current);
//         setTimeout(() => {
//           setCoins(0);
//           setRedeeming(false);
//           setValue(0);
//         }, 1000);
//       }

//       setValue(currentValue);
//     }, 500);
//   };

//   const filterType = (e) => {
//     const type = e.target.value;
//     if (!type) return setNews(allNews);

//     const filtered = allNews.filter(n => n.status === type);
//     setNews(filtered);
//     setPage(1);
//   };

//   const searchNews = (e) => {
//     const query = e.target.value.toLowerCase();
//     const filtered = allNews.filter(n => n.title.toLowerCase().includes(query));
//     setNews(filtered);
//     setPage(1);
//   };
// const get_news = async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/user/get-all-news`, {
//        withCredentials: true,
//       });
//       setAllNews(data.news);
//       setNews(data.news);
//       // console.log(data.news)
//       // console.log("hello");

//     } catch (error) {
//       console.log(error);
//     }
//   };
// console.log(news);


//   useEffect(() => {
//     get_news();
//   }, []);
// // useEffect(() => {
// //   console.log("News state updated:", news);
// // }, [news]);
//   if (!userData) return <p className="p-4">Loading writer profile...</p>;
// // console.log(writerStats.total)
//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <Toast ref={toastRef} position="top-center" className="custom-toast" />
//       <h1 className="text-2xl font-bold mb-4 text-center">Writer Dashboard</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <FaCoins className="text-yellow-500 text-4xl" />
//           <p className="text-xl font-bold">{userData.points}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <IoNewspaperOutline className="text-blue-500 text-4xl" />
//           <p className="text-xl font-bold">{writerStats.total}</p>

//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <img src={imgCheck} className="w-10 h-10" alt="Check" />
//           <p className="text-xl font-bold">{writerStats.active}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
//           <p className="text-xl font-bold">{writerStats.pending}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <span className="text-3xl">❌</span>
//           <p className="text-xl font-bold">{writerStats.deactive}</p>
//         </div>
//       </div>

//       {/* Redeem */}
//       <div className="mb-6">
//         <button
//           onClick={handleRedeem}
//           disabled={redeeming}
//           className={`bg-yellow-500 text-white px-6 py-2 rounded transition ${redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"}`}
//         >
//           Redeem Rewards Points
//         </button>
//         {redeeming && <ProgressBar value={value} className="mt-4" />}
//       </div>

//       {/* Filter/Search */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         <select onChange={filterType} className="px-3 py-2 border rounded-md">
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="active">Approved</option>
//           <option value="deactive">Rejected</option>
//         </select>
//         <input type="text" onChange={searchNews} placeholder="Search News" className="px-3 py-2 border rounded-md" />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="w-full text-sm text-left text-gray-600">
//           <thead className="text-xs text-gray-700 uppercase bg-yellow-300">
//             <tr>
//               <th className="px-4 py-2">No</th>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Image</th>
//               <th className="px-4 py-2">Category</th>
//               <th className="px-4 py-2">Description</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//          <tbody>
//   {news.map((n, i) => (
//     <tr key={i} className="bg-white border-b">
//       <td className="px-4 py-2">{i + 1}</td>
//       <td className="px-4 py-2">{n.title || "No title"}</td>
//       <td className="px-4 py-2">
//         <img src={n.imageUrl} alt="news" className="w-10 h-10" />
//       </td>
//       <td className="px-4 py-2">{n.category || "No category"}</td>
//       <td className="px-4 py-2">
//         {n.description && n.description !== "undefined" ? n.description.slice(0, 20) : "No description"}
//       </td>
//       <td className="px-4 py-2">{n.createdAt ? new Date(n.createdAt).toLocaleDateString() : "No date"}</td>
//       <td className="px-4 py-2">
//         <span className={`px-2 py-1 rounded text-xs ${
//           n.status === "pending" ? "bg-blue-100 text-blue-800" :
//           n.status === "active" ? "bg-green-100 text-green-800" :
//           "bg-red-100 text-red-800"
//         }`}>
//           {n.status}
//         </span>
//       </td>
//       <td className="px-4 py-2 flex gap-2">
//         <Link to={`/news/view/${n.news_id}`} className="p-1 bg-green-500 text-white rounded"><FaEye /></Link>
//         <Link to={`/dashboard/news/edit/${n.news_id}`} className="p-1 bg-yellow-500 text-white rounded"><FaEdit /></Link>
//         <div className="p-1 bg-red-500 text-white rounded"><FaTrash /></div>
//       </td>
//     </tr>
//   ))}
// </tbody>

//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between mt-4 items-center">
//         <select value={parPage} onChange={(e) => { setParPage(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded-md">
//           {[10, 20, 30, 40].map(num => <option key={num} value={num}>{num}</option>)}
//         </select>
//         <div className="flex gap-2 items-center">
//           <button onClick={() => page > 1 && setPage(page - 1)} className="px-3 py-1 border rounded">Prev</button>
//           <span>{page} / {pages}</span>
//           <button onClick={() => page < pages && setPage(page + 1)} className="px-3 py-1 border rounded">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WriterDashboard;

// import React, { useContext, useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { AppContext } from "../../Context/AppContext";
// import { FaEye, FaEdit, FaTrash, FaCoins } from "react-icons/fa";
// import { IoNewspaperOutline } from "react-icons/io5";
// import { Toast } from "primereact/toast";
// import { ProgressBar } from "primereact/progressbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
// import imgCheck from "../../assets/check.png";
// import toast from "react-hot-toast";

// // import DeleteNews from "../../Componets/DeleteNews";

// const WriterDashboard = () => {
//   const { userData, backendURL } = useContext(AppContext);

//   const [news, setNews] = useState([]);
//   const [allNews, setAllNews] = useState([]);
//   const [parPage, setParPage] = useState(10);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(0);
//   const [redeeming, setRedeeming] = useState(false);
//   const [value, setValue] = useState(0);
//   const [writerStats, setWriterStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
//   const [coins, setCoins] = useState(0);

//   const toastRef = useRef(null);
//   const interval = useRef(null);

//   // Fetch news from backend
//   const fetchNews = async () => {
//     if (!userData?.id) return;

//     try {
//       const { data } = await axios.get(`${backendURL}/api/user/get-all-news`, {
//         withCredentials: true,
//       });

//       if (data.success) {
//         setNews(data.news);
//         setAllNews(data.news);

//         // Stats calculation
//         const total = data.news.length;
//         const approved = data.news.filter(n => n.status === "approved").length;
//         const pending = data.news.filter(n => n.status === "pending").length;
//         const rejected = data.news.filter(n => n.status === "rejected").length;
//         setWriterStats({ total, approved, pending, rejected });

//         // Set default coins
//         setCoins(data.points || 1000);
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchNews();
//   }, [userData]);

//   // Pagination calculation
//   useEffect(() => {
//     setPages(Math.ceil(news.length / parPage));
//   }, [news, parPage]);

//   // Redeem coins
//   const handleRedeem = () => {
//     if (coins < 200) {
//       toastRef.current.show({ severity: "error", summary: "Redeem Failed", detail: "You need at least 1000 coins" });
//       return;
//     }

//     setRedeeming(true);
//     setValue(0);
//     let currentValue = 0;

//     interval.current = setInterval(() => {
//       currentValue += Math.floor(Math.random() * 10) + 5;

//       if (currentValue >= 100) {
//         currentValue = 100;
//         toastRef.current.show({ severity: "success", summary: "Redeem Successful", detail: `You have redeemed ${coins} coins.` });
//         clearInterval(interval.current);
//         setTimeout(() => {
//           setCoins(0);
//           setRedeeming(false);
//           setValue(0);
//         }, 1000);
//       }

//       setValue(currentValue);
//     }, 500);
//   };

//   // Filter by status
//   const filterType = (e) => {
//     const type = e.target.value;
//     if (!type) return setNews(allNews);
//     const filtered = allNews.filter(n => n.status === type);
//     setNews(filtered);
//     setPage(1);
//   };

//   // Search news by title
//   const searchNews = (e) => {
//     const query = e.target.value.toLowerCase();
//     const filtered = allNews.filter(n => n.title.toLowerCase().includes(query));
//     setNews(filtered);
//     setPage(1);
//   };

//   if (!userData) return <p className="p-4">Loading writer profile...</p>;

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       <Toast ref={toastRef} position="top-center" className="custom-toast" />
//       <h1 className="text-2xl font-bold mb-4 text-center">Writer Dashboard</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <FaCoins className="text-yellow-500 text-4xl" />
//           <p className="text-xl font-bold">{userData.points}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <IoNewspaperOutline className="text-blue-500 text-4xl" />
//           <p className="text-xl font-bold">{writerStats.total}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <img src={imgCheck} className="w-10 h-10" alt="Check" />
//           <p className="text-xl font-bold">{writerStats.approved}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
//           <p className="text-xl font-bold">{writerStats.pending}</p>
//         </div>
//         <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
//           <span className="text-3xl">❌</span>
//           <p className="text-xl font-bold">{writerStats.rejected}</p>
//         </div>
//       </div>

//       {/* Redeem */}
//       <div className="mb-6">
//         <button
//           onClick={handleRedeem}
//           disabled={redeeming}
//           className={`bg-yellow-500 text-white px-6 py-2 rounded transition ${redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"}`}
//         >
//           Redeem Rewards Points
//         </button>
//         {redeeming && <ProgressBar value={value} className="mt-4" />}
//       </div>

//       {/* Filter/Search */}
//       <div className="flex flex-wrap gap-2 mb-4">
//         <select onChange={filterType} className="px-3 py-2 border rounded-md">
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="rejected">Rejected</option>
//         </select>
//         <input type="text" onChange={searchNews} placeholder="Search News" className="px-3 py-2 border rounded-md" />
//       </div>

//       {/* News Table */}
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="w-full text-sm text-left text-gray-600">
//           <thead className="text-xs text-gray-700 uppercase bg-yellow-300">
//             <tr>
//               <th className="px-4 py-2">No</th>
//               <th className="px-4 py-2">Title</th>
//               <th className="px-4 py-2">Image</th>
//               <th className="px-4 py-2">Category</th>
//               <th className="px-4 py-2">Description</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {news.slice().slice((page - 1) * parPage, page * parPage).reverse().map((n, i) => (
//               <tr key={n.news_id} className="bg-white border-b">
//                 <td className="px-4 py-2">{i + 1}</td>
//                 <td className="px-4 py-2">{n.title || "No title"}</td>
//                 <td className="px-4 py-2">
//                   <img src={n.imageUrl} alt="news" className="w-10 h-10" />
//                 </td>
//                 <td className="px-4 py-2">{n.category || "No category"}</td>

//                 <td className="px-4 py-2">{n.description && n.description !== "undefined" ? n.description.slice(0, 20) : "No description"}</td>
//                 <td className="px-4 py-2">{new Date(n.createdAt).toLocaleDateString()}</td>
//                 <td className="px-4 py-2">
//                   <span className={`px-2 py-1 rounded text-xs ${n.status === "pending" ? "bg-blue-100 text-blue-800" :
//                       n.status === "Approved" ? "bg-green-100 text-green-800" :
//                         "bg-red-100 text-red-800"
//                     }`}>
//                     {n.status}
//                   </span>
//                 </td>
//                 {/* <td className=" flex justify-center items-center gap-3 mt-2">
//                   <Link to={`/dashboard/news/view/${n.news_id}`} className="p-1 bg-green-500 text-white rounded"><FaEye /></Link>
//                   <Link to={`/dashboard/news/edit/${n.news_id}`} className="p-1 bg-yellow-500 text-white rounded"><FaEdit /></Link>
                 
//                     <button className="p-1 bg-red-500 text-white rounded flex justify-center items-center"><FaTrash /><DeleteNews newsId={n.news_id} fetchNews={fetchNews}/></button>
                    

//                 </td> */}
//                 <td className="flex justify-center items-center gap-3 mt-2">
//                   {/* 👁 View button */}
//                   <Link
//                     to={`/dashboard/news/view/${n.news_id}`}
//                     className="p-1 bg-green-500 text-white rounded"
//                   >
//                     <FaEye />
//                   </Link>

//                   {/* ✏️ Edit button */}
//                   <button
//                     className={`p-1 rounded text-white ${n.status === "pending" ? "bg-yellow-500" : "bg-yellow-200"
//                       }`}
//                     onClick={() => {
//                       if (n.status === "pending") {
//                         window.location.href = `/dashboard/news/edit/${n.news_id}`;
//                       } else {
//                         toast.error("You can't edit once news is approved or rejected");
//                       }
//                     }}
//                   >
//                     <FaEdit />
//                   </button>

//                   {/* 🗑 Delete button */}
//                   <button
//                     className={`p-1 rounded text-white flex justify-center items-center ${n.status === "pending" ? "bg-red-500" : "bg-red-200"
//                       }`}
//                     onClick={async () => {
//                       if (n.status !== "pending") {
//                         toast.error("You can't delete once news is approved or rejected");
//                         return;
//                       }

//                       const confirmDelete = window.confirm("Are you sure you want to delete this news?");
//                       if (!confirmDelete) return;

//                       try {
//                         const response = await axios.delete(
//                           `http://localhost:4000/api/user/remove-news/${n.news_id}`,
//                           { withCredentials: true }
//                         );

//                         if (response.data.success) {
//                           toast.success("News deleted successfully ");
//                           fetchNews();
//                         } else {
//                           toast.error(response.data.message || "Failed to delete news ❌");
//                         }
//                       } catch (error) {
//                         console.error("Delete error:", error);
//                         toast.error("Something went wrong while deleting news ❌");
//                       }
//                     }}
//                   >
//                     <FaTrash />
//                   </button>
//                 </td>


//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between mt-4 items-center">
//         <select value={parPage} onChange={(e) => { setParPage(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded-md">
//           {[10, 20, 30, 40].map(num => <option key={num} value={num}>{num}</option>)}
//         </select>
//         <div className="flex gap-2 items-center">
//           <button onClick={() => page > 1 && setPage(page - 1)} className="px-3 py-1 border rounded">Prev</button>
//           <span>{page} / {pages}</span>
//           <button onClick={() => page < pages && setPage(page + 1)} className="px-3 py-1 border rounded">Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WriterDashboard;



import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { FaEye, FaEdit, FaTrash, FaCoins } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { Toast } from "primereact/toast";
import { ProgressBar } from "primereact/progressbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import imgCheck from "../../assets/check.png";
import toast from "react-hot-toast";

const WriterDashboard = () => {
  const { userData, backendURL } = useContext(AppContext);

  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [parPage, setParPage] = useState(10);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [redeeming, setRedeeming] = useState(false);
  const [value, setValue] = useState(0);
  const [writerStats, setWriterStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [coins, setCoins] = useState(0);

  const toastRef = useRef(null);
  const interval = useRef(null);

  // Fetch news from backend
  const fetchNews = async () => {
    if (!userData?.id) return;

    try {
      const { data } = await axios.get(`${backendURL}/api/user/get-all-news`, {
        withCredentials: true,
      });

      if (data.success) {
       
        const sortedNews = data.news.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setNews(sortedNews);
        setAllNews(sortedNews);

        // Stats calculation
        const total = sortedNews.length;
        const approved = sortedNews.filter(n => n.status === "approved").length;
        const pending = sortedNews.filter(n => n.status === "pending").length;
        const rejected = sortedNews.filter(n => n.status === "rejected").length;
        setWriterStats({ total, approved, pending, rejected });

       
        setCoins(data.points || 0);
      }
    } catch (error) {
      console.error("Error fetching news:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [userData]);

  // Pagination calculation
  useEffect(() => {
    setPages(Math.ceil(news.length / parPage));
  }, [news, parPage]);

  // Auto-scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Redeem coins
  const handleRedeem = () => {
    if (coins < 1000) {
      toastRef.current.show({ severity: "error", summary: "Redeem Failed", detail: "You need at least 1000 coins" });
      return;
    }

    setRedeeming(true);
    setValue(0);
    let currentValue = 0;

    interval.current = setInterval(() => {
      currentValue += Math.floor(Math.random() * 10) + 5;

      if (currentValue >= 100) {
        currentValue = 100;
        toastRef.current.show({ severity: "success", summary: "Redeem Successful", detail: `You have redeemed ${coins} coins.` });
        clearInterval(interval.current);
        setTimeout(() => {
          setCoins(0);
          setRedeeming(false);
          setValue(0);
        }, 1000);
      }

      setValue(currentValue);
    }, 500);
  };

  // Filter by status
  const filterType = (e) => {
    const type = e.target.value;
    if (!type) return setNews(allNews);
    const filtered = allNews.filter(n => n.status === type);
    setNews(filtered);
    setPage(1);
  };

  // Search news by title
  const searchNews = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = allNews.filter(n => n.title.toLowerCase().includes(query));
    setNews(filtered);
    setPage(1);
  };

  if (!userData) return <p className="p-4">Loading writer profile...</p>;

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <Toast ref={toastRef} position="top-center" className="custom-toast" />
      <h1 className="text-2xl font-bold mb-4 text-center">Writer Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
          <FaCoins className="text-yellow-500 text-4xl" />
          <p className="text-xl font-bold">{userData.points}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
          <IoNewspaperOutline className="text-blue-500 text-4xl" />
          <p className="text-xl font-bold">{writerStats.total}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
          <img src={imgCheck} className="w-10 h-10" alt="Check" />
          <p className="text-xl font-bold">{writerStats.approved}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
          <FontAwesomeIcon icon={faHourglassHalf} className="text-purple-600 text-3xl" />
          <p className="text-xl font-bold">{writerStats.pending}</p>
        </div>
        <div className="flex flex-col items-center bg-gray-50 p-4 rounded shadow">
          <span className="text-3xl">❌</span>
          <p className="text-xl font-bold">{writerStats.rejected}</p>
        </div>
      </div>

      {/* Redeem */}
      <div className="mb-6">
        <button
          onClick={handleRedeem}
          disabled={redeeming}
          className={`bg-yellow-500 text-white px-6 py-2 rounded transition ${redeeming ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"}`}
        >
          Redeem Rewards Points
        </button>
        {redeeming && <ProgressBar value={value} className="mt-4" />}
      </div>

      {/* Filter/Search */}
      <div className="flex flex-wrap gap-2 mb-4">
        <select onChange={filterType} className="px-3 py-2 border rounded-md">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input type="text" onChange={searchNews} placeholder="Search News" className="px-3 py-2 border rounded-md" />
      </div>

      {/* News Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-yellow-300">
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
              <tr key={n.news_id} className="bg-white border-b">
                {/* Continuous numbering across pages */}
                <td className="px-4 py-2">{(page - 1) * parPage + i + 1}</td>
                <td className="px-4 py-2">{n.title.slice(0,15) || "No title"}</td>
                <td className="px-4 py-2">
                  <img src={n.imageUrl} alt="news" className="w-10 h-10" />
                </td>
                <td className="px-4 py-2">{n.category || "No category"}</td>
                <td className="px-4 py-2">{n.description && n.description !== "undefined" ? n.description.slice(0, 20) : "No description"}</td>
                <td className="px-4 py-2">{new Date(n.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${n.status === "pending" ? "bg-blue-100 text-blue-800" :
                      n.status === "approved" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                    }`}>
                    {n.status}
                  </span>
                </td>
                <td className="flex justify-center items-center gap-3 mt-2">
                  {/* View */}
                  <Link to={`/dashboard/news/view/${n.news_id}`} className="p-1 bg-green-500 text-white rounded">
                    <FaEye />
                  </Link>

                  {/* Edit */}
                  <button
                    className={`p-1 rounded text-white ${n.status === "pending" ? "bg-yellow-500" : "bg-yellow-200"}`}
                    onClick={() => {
                      if (n.status === "pending") {
                        window.location.href = `/dashboard/news/edit/${n.news_id}`;
                      } else {
                        toast.error("You can't edit once news is approved or rejected");
                      }
                    }}
                  >
                    <FaEdit />
                  </button>

                  {/* Delete */}
                  <button
                    className={`p-1 rounded text-white flex justify-center items-center ${n.status === "pending" ? "bg-red-500" : "bg-red-200"}`}
                    onClick={async () => {
                      if (n.status !== "pending") {
                        toast.error("You can't delete once news is approved or rejected");
                        return;
                      }

                      const confirmDelete = window.confirm("Are you sure you want to delete this news?");
                      if (!confirmDelete) return;

                      try {
                        const response = await axios.delete(
                          `http://localhost:4000/api/user/remove-news/${n.news_id}`,
                          { withCredentials: true }
                        );

                        if (response.data.success) {
                          toast.success("News deleted successfully ");
                          fetchNews();
                        } else {
                          toast.error(response.data.message || "Failed to delete news ❌");
                        }
                      } catch (error) {
                        console.error("Delete error:", error);
                        toast.error("Something went wrong while deleting news ❌");
                      }
                    }}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4 items-center">
        <select value={parPage} onChange={(e) => { setParPage(Number(e.target.value)); setPage(1); }} className="px-3 py-2 border rounded-md">
          {[10, 20, 30, 40].map(num => <option key={num} value={num}>{num}</option>)}
        </select>
        <div className="flex gap-2 items-center">
          <button onClick={() => page > 1 && setPage(page - 1)} className="px-3 py-1 border rounded">Prev</button>
          <span>{page} / {pages}</span>
          <button onClick={() => page < pages && setPage(page + 1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default WriterDashboard;
