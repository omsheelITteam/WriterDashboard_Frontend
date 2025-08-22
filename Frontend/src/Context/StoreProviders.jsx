// import React from "react";
// import { useReducer } from "react";
// import StoreReducer from "./StoreReducer.js";
// import StoreContext from "./StoreContext.js";
// import decode_token from "../Data/index.js";

// const StoreProviders = ({ children }) => {
//   const [store, dispatch] = useReducer(StoreReducer, {
//     userInfo: decode_token(localStorage.getItem("newToken")),
//     token:localStorage.getItem("newToken") || "",
//   });

//   return <StoreContext.Provider value={{ store, dispatch }}>
//     {children}
//     </StoreContext.Provider>;
// };

// export default StoreProviders;


// import React, { useReducer } from "react";
// import StoreReducer from "./StoreReducer.js";
// import StoreContext from "./StoreContext.js";
// import decode_token from "../Data/index.js";

// const StoreProviders = ({ children }) => {
//   const token = localStorage.getItem("newToken");
//   const [store, dispatch] = useReducer(StoreReducer, {
//     token: token || "",
//     userInfo: decode_token(token),
//   });

//   return (
//     <StoreContext.Provider value={{ store, dispatch }}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreProviders;
