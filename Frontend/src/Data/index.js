
// import { jwtDecode } from "jwt-decode";

// const decode_token = (token) => {
//   if (token) {
//     try {
//       const decoded_token = jwtDecode(token); 
//       const exp = new Date(decoded_token.exp * 1000); 
//       if (new Date() > exp) {
//         localStorage.removeItem("newToken");
//         return "";
//       } else {
//         return decoded_token;
//       }
//     } catch (error) {
//       console.error("Token decoding failed:", error);
//       return "";
//     }
//   } else {
//     return "";
//   }
// };

// export default decode_token;



// import {jwtDecode} from "jwt-decode";  

// const decode_token = (token) => {
//   if (token) {
//     try {
//       const decoded_token = jwtDecode(token); 
//       const exp = new Date(decoded_token.exp * 1000); 
//       if (new Date() > exp) {
//         localStorage.removeItem("newToken");
//         return "";
//       } else {
//         return decoded_token;
//       }
//     } catch (error) {
//       console.error("Token decoding failed:", error);
//       return "";
//     }
//   } else {
//     return "";
//   }
// };

// export default decode_token;



import { jwtDecode } from "jwt-decode";

const decode_token = (token) => {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return {};
  }

  try {
    const decoded_token = jwtDecode(token);

    if (decoded_token?.exp) {
      const exp = new Date(decoded_token.exp * 1000);
      if (Date.now() > exp.getTime()) {
        localStorage.removeItem("newToken");
        return {};
      }
    }

    return decoded_token || {};
  } catch (error) {
    console.error("Token decoding failed:", error);
    localStorage.removeItem("newToken");
    return {};
  }
};

export default decode_token;
