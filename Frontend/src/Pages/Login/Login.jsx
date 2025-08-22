


// // // import React, { useState, useContext } from "react";
// // // import axios from "axios";
// // // import toast, { Toaster } from "react-hot-toast";
// // // import StoreContext from "../../Context/StoreContext.js";
// // // import { useNavigate } from "react-router-dom";
// // // import decode_token from "../../Data/index.js";

// // // const Login = () => {
// // //   const [state, setState] = useState({ email: "", password: "" });
// // //   const [loader, setLoader] = useState(false);
// // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // //   const { dispatch } = useContext(StoreContext);
// // //   const navigate = useNavigate();

// // //   const inputHandle = (e) => {
// // //     setState({
// // //       ...state,
// // //       [e.target.name]: e.target.value,
// // //     });
// // //   };

// // //   const Submit = async (e) => {
// // //     e.preventDefault();
// // //     setLoader(true);
// // //     try {
// // //       const res = await axios.post(
// // //         "http://localhost:4000/api/auth/loginWriter",
// // //         {
// // //           email: state.email,
// // //           password: state.password,
// // //         },
// // //         { withCredentials: true }
// // //       );

// // //       const token = res.data.token;
// // //       toast.success(res.data.message || "Login successful");
// // //       localStorage.setItem("newToken", token);
// // //       setIsLoggedIn(true);

// // //       dispatch({
// // //         type: "login_Successful",
// // //         payload: { token },
// // //       });

// // //       const userInfo = decode_token(token);

// // //       if (userInfo?.role === "admin") {
// // //         navigate("/dashboard/admin");
// // //       } else if (userInfo?.role === "writer") {
// // //         navigate("/dashboard/writer");
// // //       } else {
// // //         navigate("/dashboard");
// // //       }
// // //     } catch (error) {
// // //       toast.error(error.response?.data?.message || "Login failed");
// // //     } finally {
// // //       setLoader(false);
// // //     }
// // //   };

// // //   const handleLogout = async () => {
// // //     try {
// // //       await axios.post("http://localhost:4000/api/auth/logoutWriter", {}, { withCredentials: true });
// // //       toast.success("Logged out successfully");
// // //       setIsLoggedIn(false);
// // //       localStorage.removeItem("newToken");
// // //       dispatch({ type: "logout_Successful" });
// // //       setState({ email: "", password: "" });
// // //       navigate("/login");
// // //     } catch (error) {
// // //       toast.error("Logout failed");
// // //       console.error(error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 flex items-center justify-center px-4 py-6">
// // //       <Toaster />
// // //       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 sm:p-10 animiate">
// // //         <div className="text-center mb-6">
// // //           <h2 className="text-3xl font-bold text-yellow-500">MyStartUp News</h2>
// // //           <p className="text-sm text-gray-500 mt-1">Login to your account</p>
// // //         </div>

// // //         {!isLoggedIn ? (
// // //           <form onSubmit={Submit} className="space-y-5">
// // //             <div>
// // //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Email
// // //               </label>
// // //               <input
// // //                 type="email"
// // //                 placeholder="Enter your email"
// // //                 name="email"
// // //                 id="email"
// // //                 onChange={inputHandle}
// // //                 value={state.email}
// // //                 required
// // //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// // //                 Password
// // //               </label>
// // //               <input
// // //                 type="password"
// // //                 placeholder="Enter your password"
// // //                 name="password"
// // //                 id="password"
// // //                 onChange={inputHandle}
// // //                 value={state.password}
// // //                 required
// // //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
// // //               />
// // //             </div>

// // //             <button
// // //               type="submit"
// // //               disabled={loader}
// // //               className={`w-full py-2 font-semibold rounded-md text-white transition duration-200 ${
// // //                 loader
// // //                   ? "bg-gray-400 cursor-not-allowed"
// // //                   : "bg-purple-600 hover:bg-purple-700"
// // //               }`}
// // //             >
// // //               {loader ? "Logging in..." : "Login"}
// // //             </button>
// // //           </form>
// // //         ) : (
// // //           <div className="text-center">
// // //             <p className="text-lg font-medium text-green-600">
// // //               Logged in as {state.email}
// // //             </p>
// // //             <button
// // //               onClick={handleLogout}
// // //               className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-200"
// // //             >
// // //               Logout
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;





// // import React, { useState, useContext } from "react";
// // import axios from "axios";
// // import toast, { Toaster } from "react-hot-toast";
// // // import StoreContext from "../../Context/StoreContext.js";
// // import { useNavigate } from "react-router-dom";
// // // import decode_token from "../../Data/index.js"; // correct path

// // const Login = () => {
// //   const [state, setState] = useState({ email: "", password: "" });
// //   const [loader, setLoader] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   // const { dispatch } = useContext(StoreContext);
// //   const navigate = useNavigate();

// //   const inputHandle = (e) => {
// //     setState({
// //       ...state,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const Submit = async (e) => {
// //     e.preventDefault();
// //     setLoader(true);
// //     try {
// //       const res = await axios.post(
// //         "http://localhost:4000/api/auth/loginWriter",
// //         {
// //           email: state.email,
// //           password: state.password,
// //         },
// //         { withCredentials: true } // send cookies
// //       );

// //       // Store token if backend sends in JSON
// //       if (res.data?.token) {
// //         localStorage.setItem("newToken", res.data.token);
// //       }

// //       // Decode token from backend or localStorage
// //       const token = res.data?.token || localStorage.getItem("newToken");
// //       const userInfo = decode_token(token);

// //       if (!token || !userInfo?.role) {
// //         throw new Error("Invalid login response");
// //       }

// //       toast.success(res.data.message || "Login successful");
// //       setIsLoggedIn(true);

// //       dispatch({
// //         type: "login_Successful",
// //         payload: { token },
// //       });

// //       // Navigate based on role
// //       if (userInfo.role === "admin") {
// //         navigate("/dashboard/admin");
// //       } else if (userInfo.role === "writer") {
// //         navigate("/dashboard/writer");
// //       } else {
// //         navigate("/dashboard");
// //       }
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || error.message || "Login failed");
// //       localStorage.removeItem("newToken"); // remove bad token
// //     } finally {
// //       setLoader(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     try {
// //       await axios.post("http://localhost:4000/api/auth/logoutWriter", {}, { withCredentials: true });
// //       toast.success("Logged out successfully");
// //       setIsLoggedIn(false);
// //       localStorage.removeItem("newToken");
// //       dispatch({ type: "logout_Successful" });
// //       setState({ email: "", password: "" });
// //       navigate("/login");
// //     } catch (error) {
// //       toast.error("Logout failed");
// //       console.error(error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-purple-100 flex items-center justify-center px-4 py-6">
// //       <Toaster />
// //       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 sm:p-10">
// //         <div className="text-center mb-6">
// //           <h2 className="text-3xl font-bold text-yellow-500">MyStartUp News</h2>
// //           <p className="text-sm text-gray-500 mt-1">Login to your account</p>
// //         </div>

// //         {!isLoggedIn ? (
// //           <form onSubmit={Submit} className="space-y-5">
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 placeholder="Enter your email"
// //                 name="email"
// //                 id="email"
// //                 onChange={inputHandle}
// //                 value={state.email}
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
// //               />
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
// //                 Password
// //               </label>
// //               <input
// //                 type="password"
// //                 placeholder="Enter your password"
// //                 name="password"
// //                 id="password"
// //                 onChange={inputHandle}
// //                 value={state.password}
// //                 required
// //                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
// //               />
// //             </div>

// //             <button
// //               type="submit"
// //               disabled={loader}
// //               className={`w-full py-2 font-semibold rounded-md text-white transition duration-200 ${
// //                 loader
// //                   ? "bg-gray-400 cursor-not-allowed"
// //                   : "bg-purple-600 hover:bg-purple-700"
// //               }`}
// //             >
// //               {loader ? "Logging in..." : "Login"}
// //             </button>
// //           </form>
// //         ) : (
// //           <div className="text-center">
// //             <p className="text-lg font-medium text-green-600">
// //               Logged in as {state.email}
// //             </p>
// //             <button
// //               onClick={handleLogout}
// //               className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition duration-200"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// import React, { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import { images } from "../assets/assests";
// import axios from "axios";
// // import { AppContext } from "../context/AppContext";
// import { AppContext } from "../../Context/AppContext";
// import toast, { Toaster } from "react-hot-toast";
// import { motion } from "framer-motion";
// import { FaSpinner } from "react-icons/fa";
// import { Loader } from "lucide-react";
// import { Loader2 } from "lucide-react";
// import { BeatLoader } from "react-spinners";
// import img2 from "../../assets/navLogo.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showpassword, setShowPassword] = useState(false);
//   const { backendURL, setIsLoggedin, getUserData } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     // setIsLoading(true)
//     // setTimeout(() => {
//     //   console.log('Login attempt:', { email, password, rememberMe })
//     //   alert('Login attempted with email:' ${email})
//     //   setIsLoading(false)
//     //   navigate('/')
//     // }, 1000)
//     try {
      
//       const { data } = await axios.post(backendURL + "/api/auth/loginWriter", {
//         email,
//         password,
//       },{
//         withCredentials: true, // Ensure cookies are sent
//       });
//       if (data.success) {
//         // localStorage.setItem("newToken", data.token);
//         setIsLoggedin(true);
//         // getUserData();
//         navigate("/dashboard/writer");
//       } else {
//         toast.error(data.message);
//         console.log("error");
//       }
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
    
//     <motion.div
//       initial={{ opacity: 0, y: -100 }}
//       transition={{ duration: 1.5 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//     >
//       <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
//       {/* <Toaster/> */}
//         <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 flex flex-col items-center backdrop-blur-md bg-white/30 border border-white/20">
//           <h1 className="text-2xl font-bold text-black mb-2">Welcome</h1>
//           <img src={img2} alt="Logo" className="w-20 mb-2" />
//           <h2 className="text-xl font-semibold text-black mb-6">
//            MYSTARTUP NEWS
//           </h2>

//           <form onSubmit={handleSubmit} className="w-full">
//             {/* Email */}
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-black font-medium mb-1"
//               >
//                 Email
//               </label>
//               <div className="relative">
//                 <i className="fa fa-envelope absolute left-3 top-3.5 text-blue-500"></i>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="Enter your email"
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-black font-medium mb-1"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <i className="fa fa-lock absolute left-3 top-3.5 text-blue-500"></i>
//                 <input
//                   id="password"
//                   type={showpassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   placeholder="Enter your password"
//                 />
//                 <i
//                   className={`fa-solid ${
//                     showpassword ? "fa-eye-slash" : "fa-eye"
//                   } absolute right-3 top-3.5 text-blue-500 cursor-pointer`}
//                   onClick={() => setShowPassword(!showpassword)}
//                 ></i>
//               </div>
//             </div>

//             {/* Remember Me & Forgot */}
//             <div className="flex justify-between items-center text-sm mb-6 text-black">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="w-4 h-4"
//                 />
//                 Remember me
//               </label>
//               <button
//                 type="button"
//                 onClick={() => navigate("/forgot_password")}
//                 className="text-blue-600 hover:underline"
//               >
//                 Forgot Password?
//               </button>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-2 rounded-xl font-semibold text-white text-lg shadow-md bg-blue-600 hover:from-pink-600 hover:to-blue-600 transition-transform duration-300 ease-in-out transform hover:scale-105"
//             >
//               {isLoading ? (
//                 <span className="flex justify-center items-center">
//                   <BeatLoader color="#f1eaea" />
//                 </span>
//               ) : (
//                 "LOGIN"
//               )}
//             </button>
//           </form>

//           {/* Social Icons */}
//           <div class="mt-8 flex items-center justify-center gap-4">
//             {/* <!-- Instagram --> */}
//             <a
//               href="https://www.instagram.com/yourusername"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Instagram"
//             >
//               <div class="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 shadow-lg hover:scale-110 transition-transform duration-300">
//                 <svg
//                   class="w-6 h-6 text-white"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75A3.25 3.25 0 017.75 4.5h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5a3.25 3.25 0 01-3.25-3.25v-8.5zM12 8a4 4 0 100 8 4 4 0 000-8zm0 1.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm4.75-.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
//                 </svg>
//               </div>
//             </a>

//             {/* <!-- Facebook --> */}
//             <a
//               href="https://www.facebook.com/yourusername"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Facebook"
//             >
//               <div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-transform duration-300">
//                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.69v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
//                 </svg>
//               </div>
//             </a>

//             {/* <!-- LinkedIn --> */}
//             <a
//               href="https://www.linkedin.com/in/yourusername"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="LinkedIn"
//             >
//               <div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 text-white shadow-lg hover:bg-blue-200 hover:scale-110 transition-transform duration-300">
//                 <svg
//                   width="64px"
//                   height="64px"
//                   viewBox="0 0 32 32"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
//                   <g
//                     id="SVGRepo_tracerCarrier"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   ></g>
//                   <g id="SVGRepo_iconCarrier">
//                     {" "}
//                     <rect
//                       x="2"
//                       y="2"
//                       width="28"
//                       height="28"
//                       rx="14"
//                       fill="#1275B1"
//                     ></rect>{" "}
//                     <path
//                       d="M12.6186 9.69215C12.6186 10.6267 11.8085 11.3843 10.8093 11.3843C9.81004 11.3843 9 10.6267 9 9.69215C9 8.7576 9.81004 8 10.8093 8C11.8085 8 12.6186 8.7576 12.6186 9.69215Z"
//                       fill="white"
//                     ></path>{" "}
//                     <path
//                       d="M9.24742 12.6281H12.3402V22H9.24742V12.6281Z"
//                       fill="white"
//                     ></path>{" "}
//                     <path
//                       d="M17.3196 12.6281H14.2268V22H17.3196C17.3196 22 17.3196 19.0496 17.3196 17.2049C17.3196 16.0976 17.6977 14.9855 19.2062 14.9855C20.911 14.9855 20.9008 16.4345 20.8928 17.5571C20.8824 19.0244 20.9072 20.5219 20.9072 22H24V17.0537C23.9738 13.8954 23.1508 12.4401 20.4433 12.4401C18.8354 12.4401 17.8387 13.1701 17.3196 13.8305V12.6281Z"
//                       fill="white"
//                     ></path>{" "}
//                   </g>
//                 </svg>
//               </div>
//             </a>

//             {/* <!-- Twitter --> */}
//             <a
//               href="https://twitter.com/yourusername"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="Twitter"
//             >
//               <div class="w-10 h-10 flex items-center justify-center rounded-full bg-blue-400 text-white shadow-lg hover:bg-blue-500 hover:scale-110 transition-transform duration-300">
//                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775a4.935 4.935 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184A4.92 4.92 0 0016.616 3c-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.126 1.124-4.09-.205-7.719-2.166-10.148-5.144a4.822 4.822 0 00-.664 2.475c0 1.71.87 3.216 2.188 4.099a4.903 4.903 0 01-2.228-.616v.062a4.918 4.918 0 003.946 4.827 4.996 4.996 0 01-2.224.085 4.937 4.937 0 004.604 3.417A9.868 9.868 0 010 19.54a13.936 13.936 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646a9.935 9.935 0 002.46-2.534z" />
//                 </svg>
//               </div>
//             </a>

//             <a
//               href="https://youtube.com/yourchannel"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="YouTube"
//             >
//               <div class="w-10 h-10 flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 hover:scale-110 transition-transform duration-300">
//                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.498 6.186a2.946 2.946 0 00-2.075-2.08C19.633 3.5 12 3.5 12 3.5s-7.633 0-9.423.606a2.946 2.946 0 00-2.075 2.08C0 8.017 0 12 0 12s0 3.983.502 5.814a2.946 2.946 0 002.075 2.08C4.367 20.5 12 20.5 12 20.5s7.633 0 9.423-.606a2.946 2.946 0 002.075-2.08C24 15.983 24 12 24 12s0-3.983-.502-5.814zM9.75 15.5V8.5l6.5 3.5-6.5 3.5z" />
//                 </svg>
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Login;






// // import React, { useContext, useEffect, useState } from "react";
// // import axios from "axios";
// // import { AppContext } from "../../Context/AppContext"; 

// // const WriterDashboard = () => {
// //   const { userData, backendURL } = useContext(AppContext); // <-- use userData
// //   const [news, setNews] = useState([]);

// //   console.log("userData:", userData); // this should show the writer object
// //   console.log("writer ID:", userData?.id); // this should show the ID

// //   const newsData = async (writerId) => {
// //     if (!writerId) {
// //       console.error("Writer ID is missing!");
// //       return;
// //     }

// //     try {
// //       const { data } = await axios.get(
// //         `${backendURL}/api/user/get-newsby-writerid/${writerId}`,
// //         { withCredentials: true }
// //       );

// //       if (data.success) {
// //         setNews(data.news);
// //       } else {
// //         console.warn(data.message);
// //       }
// //     } catch (error) {
// //       console.error("newsError", error.response?.data?.message || error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     if (userData?.id) {
// //       newsData(userData.id); // fetch news when userData is available
// //     }
// //   }, [userData]);

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl font-bold mb-4">Writer Dashboard</h1>
// //       <p>Writer ID: {userData?.id || "loading..."}</p>

// //       {news.length === 0 ? (
// //         <p>No news uploaded yet.</p>
// //       ) : (
// //         <div className="grid gap-4">
// //           {news.map((item, i) => (
// //             <div key={i} className="p-4 border rounded-md shadow-sm">
// //               <h2 className="font-semibold">{item.title}</h2>
// //               <p>{item.description}</p>
// //               {item.image && (
// //                 <img
// //                   src={item.image}
// //                   alt="news"
// //                   className="w-full max-w-sm h-auto mt-2 rounded"
// //                 />
// //               )}
// //               <p className="text-sm text-gray-500 mt-1">Date: {item.date}</p>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default WriterDashboard;







import React, { useContext, useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { images } from "../../assets/assets";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Login= () => {
  const { backendUrl } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        `${backendUrl}/api/auth/loginWriter`,
        // { email, password },
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        toast.success("Login successful");
        // You can save token to localStorage or context if needed
        // localStorage.setItem("token", data.token);
        navigate("/bloglists"); // redirect to dashboard
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="rounded-2xl shadow-lg p-6 w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8 bg-gray-900">
        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src={images.loginimage}
            alt="MyStartup NEWS"
            className="w-[500px] h-[500px] rounded-xl object-contain border-4 border-yellow-400"
          />
        </div>

        {/* Form Section */}
        <form
          className="w-full max-w-sm bg-black p-6 rounded-xl shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-3xl font-bold text-yellow-400 mb-6">
            Login
          </h2>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src={images.navbarLogo}
              alt="MyStartup NEWS"
              className="w-[90px] h-[90px] object-contain"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4 relative">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-yellow-300 block"
            >
              Email
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black text-sm"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          {/* <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-yellow-300 block"
            >
              Password
            </label> */}
          {/* <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full pl-10 pr-3 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black text-sm"
                required
              />
            </div>
          </div> */}
          {/* Password Field */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-yellow-300 block"
            >
              Password
            </label>
            <div className="relative">
              <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full pl-10 pr-10 py-2 border border-yellow-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-400 text-lg focus:outline-none"
              >
                {showPassword ? (
                  <FaRegEye /> // Or use Eye icon
                ) : (
                  <FaEyeSlash /> // Or EyeOff icon
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 py-2 px-3 rounded-md text-black text-lg font-bold hover:bg-yellow-500 transition duration-200 cursor-pointer flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <SyncLoader color="#fff" size={8} />}
            {loading ? "" : "Login"}
          </button>

          {/* Extra */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Don’t have an account?{" "}
            <a
              href="/pages/signuppage"
              className="text-yellow-400 hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
