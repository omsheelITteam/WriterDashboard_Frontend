// import decode_token from "../Data/index.js";

// const StoreReducer = (state, action) => {
//   const { type, payload } = action;

//   if (type === "login_Successful") {
//     state.token = payload.token;
//     state.userInfo = decode_token(payload.token);
//   }

//  if (type === "login_Successful") {
//   return {
//     ...state,
//     token: payload.token,
//     userInfo: decode_token(payload.token),
//   };
// }
//   return state;
// };

// export default StoreReducer;


// import decode_token from "../Data/index.js";

// const StoreReducer = (state, action) => {
//   const { type, payload } = action;

//   if (type === "login_Successful") {
//     return {
//       ...state,
//       token: payload.token,
//       userInfo: decode_token(payload.token),
//     };
//   }

//   if (type === "logout_Successful") {
//     localStorage.removeItem("newToken"); 
//     return {
//       ...state,
//       token: "",
//       userInfo: "",
//     };
//   }

//   return state;
// };

// export default StoreReducer;
