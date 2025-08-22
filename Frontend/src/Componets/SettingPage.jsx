// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContext } from "../Context/AppContext";

// const SettingPage = () => {
//   const navigate = useNavigate();
//   const { backendURL, userData, getUserData } = useContext(AppContext);

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [errors, setErrors] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   // Live validation
//   useEffect(() => {
//     const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

//     if (oldPassword.length === 0) newErrors.oldPassword = "Old password is required";
//     if (newPassword.length > 0 && newPassword.length < 6) newErrors.newPassword = "New password must be at least 6 characters";
//     if (confirmPassword && confirmPassword !== newPassword) newErrors.confirmPassword = "Passwords do not match";

//     setErrors(newErrors);
//   }, [oldPassword, newPassword, confirmPassword]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check for validation errors before submit
//     if (errors.oldPassword || errors.newPassword || errors.confirmPassword) {
//       toast.error("Please fix the errors before submitting", { position: "top-center" });
//       return;
//     }

//     try {
//       const res = await axios.put(
//         `${backendURL}/api/auth/change-password`,
//         {
//           userId: userData?._id,
//           oldPassword,
//           newPassword,
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success("Password changed successfully", { position: "top-center" });
//         getUserData();
//         navigate("/dashboard/profile");
//       } else {
//         toast.error(res.data.error || "Password change failed", { position: "top-center" });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error changing password", { position: "top-center" });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-4 sm:mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md"
//     >
//       <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
//         Change Password
//       </h2>

//       <div className="mb-3">
//         <input
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           placeholder="Old Password"
//           className="w-full p-2 border rounded"
//         />
//         {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
//       </div>

//       <div className="mb-3">
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="New Password"
//           className="w-full p-2 border rounded"
//         />
//         {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
//       </div>

//       <div className="mb-3">
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           className="w-full p-2 border rounded"
//         />
//         {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//       </div>

//       <button
//         type="submit"
//         className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Change Password
//       </button>
//     </form>
//   );
// };

// export default SettingPage;
// import React, { useState, useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContext } from "../Context/AppContext";

// const SettingPage = () => {
//   const navigate = useNavigate();
//   const { backendURL, userData, getUserData } = useContext(AppContext);

//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [errors, setErrors] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [isValid, setIsValid] = useState(false);

//   // Live validation
//   useEffect(() => {
//     const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

//     if (!oldPassword) newErrors.oldPassword = "Old password is required";
//     if (newPassword && newPassword.length < 6) newErrors.newPassword = "New password must be at least 6 characters";
//     if (confirmPassword && confirmPassword !== newPassword) newErrors.confirmPassword = "Passwords do not match";

//     setErrors(newErrors);

//     // Enable submit button only if form is valid
//     setIsValid(
//       oldPassword &&
//       newPassword.length >= 6 &&
//       confirmPassword === newPassword
//     );
//   }, [oldPassword, newPassword, confirmPassword]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValid) {
//       toast.error("Please fix the errors before submitting", { position: "top-center" });
//       return;
//     }

//     try {
//       // Log payload for debugging
//       console.log({
//         // userId: userData?._id,
//         oldPassword,
//         newPassword,
//       });

//       const res = await axios.put(
//         `${backendURL}/api/auth/change-password`,
//         {
//           // userId: userData?._id,
//           oldPassword,
//           newPassword,
//         },
//         { withCredentials: true }
//       );

//       if (res.data.success) {
//         toast.success("Password changed successfully", { position: "top-center" });
//         getUserData(); // refresh user data if necessary
//         navigate("/dashboard/profile");
//       } else {
//         toast.error(res.data.error || "Password change failed", { position: "top-center" });
//       }
//     } catch (err) {
//       console.error(err);

//       // If backend sends an error message in response
//       if (err.response?.data?.error) {
//         toast.error(err.response.data.error, { position: "top-center" });
//       } else {
//         toast.error("Error changing password", { position: "top-center" });
//       }
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-4 sm:mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md"
//     >
//       <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
//         Change Password
//       </h2>

//       <div className="mb-3">
//         <input
//           type="password"
//           value={oldPassword}
//           onChange={(e) => setOldPassword(e.target.value)}
//           placeholder="Old Password"
//           className="w-full p-2 border rounded"
//         />
//         {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
//       </div>

//       <div className="mb-3">
//         <input
//           type="password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           placeholder="New Password"
//           className="w-full p-2 border rounded"
//         />
//         {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
//       </div>

//       <div className="mb-3">
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="Confirm Password"
//           className="w-full p-2 border rounded"
//         />
//         {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
//       </div>

//       <button
//         type="submit"
//         disabled={!isValid}
//         className={`w-full mt-4 text-white font-bold py-2 px-4 rounded ${
//           isValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
//         }`}
//       >
//         Change Password
//       </button>
//     </form>
//   );
// };

// export default SettingPage;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from "../Context/AppContext";

const SettingPage = () => {
  const navigate = useNavigate();
  const { backendUrl, getUserData } = useContext(AppContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isValid, setIsValid] = useState(false);

  // Live validation
  useEffect(() => {
    const newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

    if (!oldPassword) newErrors.oldPassword = "Old password is required";
    if (newPassword && newPassword.length < 6) newErrors.newPassword = "New password must be at least 6 characters";
    if (confirmPassword && confirmPassword !== newPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    setIsValid(
      oldPassword &&
      newPassword.length >= 6 &&
      confirmPassword === newPassword
    );
  }, [oldPassword, newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      toast.error("Please fix the errors before submitting", { position: "top-center" });
      return;
    }

    const payload = {
      oldPassword,
      newPassword,
      confirmPassword
    };

    console.log("Sending payload:", payload);

    try {
      const res = await axios.put(
        `${backendUrl}/api/auth/change-password`,
        payload,
        { withCredentials: true } // send cookies/JWT for auth
      );

      console.log("Response:", res.data);

      if (res.data.success) {
        toast.success("Password changed successfully", { position: "top-center" });
        // getUserData(); // refresh user data if needed
        navigate("/dashboard/profile");
      } else {
        toast.error(res.data.error || "Password change failed", { position: "top-center" });
      }
    } catch (err) {
      console.error("Axios error response:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Error changing password", { position: "top-center" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-4 sm:mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-md shadow-md"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Change Password
      </h2>

      <div className="mb-3">
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          className="w-full p-2 border rounded"
        />
        {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>}
      </div>

      <div className="mb-3">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full p-2 border rounded"
        />
        {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
      </div>

      <div className="mb-3">
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 border rounded"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full mt-4 text-white font-bold py-2 px-4 rounded ${
          isValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Change Password
      </button>
    </form>
  );
};

export default SettingPage;
