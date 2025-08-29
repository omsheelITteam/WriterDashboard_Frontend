
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
  const { userData, backendUrl } = useContext(AppContext);

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
      const { data } = await axios.get(`${backendUrl}/api/user/get-all-news`, {
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
  // const filterType = (e) => {
  //   const type = e.target.value;
  //   if (!type) return setNews(allNews);
  //   const filtered = allNews.filter(n => n.status === type);
  //   setNews(filtered);
  //   setPage(1);
  // };

  // // Search news by title
  // const searchNews = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   const filtered = allNews.filter(n => n.title.toLowerCase().includes(query));
  //   setNews(filtered);
  //   setPage(1);
  // };

    const type_filter = (e) => {
  const val = e.target.value;
  const filtered = val ? allNews.filter(n => n.status.toLowerCase() === val.toLowerCase()) : allNews;
  setNews(filtered);
  setPage(1);
};

// Search by title
const search_news = (e) => {
  const val = e.target.value.toLowerCase();
  const filtered = allNews.filter(n => n.title?.toLowerCase().includes(val) ||
  n.category?.toLowerCase().includes(val) ||
  n.writerName?.toLowerCase().includes(val) 

);
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
        <select onChange={type_filter} className="px-3 py-2 border rounded-md">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input type="text" onChange={search_news} placeholder="Search News" className="px-3 py-2 border rounded-md" />
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
