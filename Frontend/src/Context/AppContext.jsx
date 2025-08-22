// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backendURL = "http://localhost:4000";

//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(null);

//   // Ensure cookies are sent with every request
//   axios.defaults.withCredentials = true;

//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(backendURL + "/api/auth/loginWriter");
//       if (data.success) {
//         setUserData(data.user);
//       } else {
//         toast.error(data.message || "Failed to fetch user data");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   // const getAuthState = async () => {
//   //   try {
//   //     const { data } = await axios.get(backendURL + "/api/auth/is-auth");
//   //     if (data.success) {
//   //       await getUserData(); 
//   //       setIsLoggedin(true);
//   //     } else {
//   //       setIsLoggedin(false);
//   //     }
//   //   } catch (error) {
//   //     toast.error(error.response?.data?.message || error.message);
//   //   }
//   // };

//   // useEffect(() => {
//   //   getAuthState(); 
//   // }, []);
// useEffect(() => {
//   const checkAuth = async () => {
//     try {
//       const { data } = await axios.get(backendURL + "/api/auth/is-auth");
//       if (data.success) {
//         setIsLoggedin(true);
//         await getUserData();
//       } else {
//         setIsLoggedin(false);
//       }
//     } catch (error) {
//       console.error("Auth check error:", error);
//       setIsLoggedin(false);
//     }
//   };
//   checkAuth();
// }, []);

//   return (
//     <AppContext.Provider
//       value={{
//         isLoggedin,
//         setIsLoggedin,
//         userData,
//         setUserData,
//         // getAuthState,
//         backendURL,
//         getUserData
//       }}
//     >
//       {props.children}
//     </AppContext.Provider>
//   );
// };

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_URL

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  axios.defaults.withCredentials = true;

  const getWriterProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-Profile`);
      if (data.success) {
        setUserData(data.writerData);
        // console.log(data.writerData.id);
        
        setIsLoggedin(true);
      } else {
        setIsLoggedin(false);
      }
    } catch (error) {
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    getWriterProfile(); 
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedin,
        setIsLoggedin,
        userData,
        setUserData,
        backendUrl,
        getWriterProfile
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
