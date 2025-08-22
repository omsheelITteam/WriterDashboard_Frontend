// import React, { useContext, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Carousel, Image } from "react-bootstrap";
// import { images } from "../../assets/assets";

// // import {images} from '../../assets/assets'
// import { Link, useNavigate } from "react-router-dom";
// // import { AppContext } from "../context/AppContext";
// import { AppContext } from "../../Context/AppContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react"; // 👁 toggle icons
// import { SyncLoader } from "react-spinners";
// const RegsiterWriter = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👁 toggle state
//   const [publicProfile, setPublicProfile] = useState("");
//   const [bio, setWriterBio] = useState("");
//   const [writerImg, setwriterImg] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const { backendUrl } = useContext(AppContext);
  
//   const navigate = useNavigate();
//   // ✅ client-side validation
//   const validate = () => {
//     const newErrors = {};
//     if (!name.trim()) newErrors.name = "Name is required";
//     if (!email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email))
//       newErrors.email = "Enter a valid email";
//     if (!mobileNumber.trim())
//       newErrors.mobileNumber = "Mobile number is required";
//     else if (!/^\d{10}$/.test(mobileNumber))
//       newErrors.mobileNumber = "Enter a valid 10-digit number";
//     if (!role || role === "Select a role") newErrors.role = "Role is required";
//     if (!password.trim()) newErrors.password = "Password is required";
//     else if (password.length < 6)
//       newErrors.password = "Password must be at least 6 characters";
//     if (!publicProfile.trim())
//       newErrors.publicProfile = "LinkedIn profile is required";
//     if (!bio.trim()) newErrors.bio = "Bio is required";
//     if (!writerImg) newErrors.writerImg = "Profile image is required";

//     return newErrors;
//   };

//   // ✅ submit handler
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});

//     try {
//       const formData = new FormData();
//       formData.append("writerName", name);
//       formData.append("writerEmail", email);
//       formData.append("writerMobile", Number(mobileNumber));
//       formData.append("writerPassword", password);
//       formData.append("writerBio", bio);
//       formData.append("writerImage", writerImg);
//       formData.append("publicProfile", publicProfile);
//       formData.append("writerRole", role);

//       const { data } = await axios.post(
//         `${backendUrl}/api/auth/registerWriter`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (data.success) {
//         toast.success("Your registration was successful 🎉");
//         // clear form
//         setName("");
//         setEmail("");
//         setMobileNumber("");
//         setRole("");
//         setPassword("");
//         setPublicProfile("");
//         setWriterBio("");
//         setwriterImg("");
//         navigate("/verify-email");
//       } else {
//         toast.error(data.message || "Something went wrong");
//       }
//     } catch (error) {
//       if (error.response?.status === 409) {
//         toast.error("Email already exists ❌");
//       } else {
//         toast.error("Server error, please try again later");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col lg:flex-row w-full min-h-screen items-center gap-6 p-6 justify-center">
//         {/* Carousel Section */}
//         <div className="lg:w-2/6 rounded-lg">
//           <div className="w-full flex items-center justify-center rounded-lg">
//             <Carousel className="w-[540px] h-full">
//               <Carousel.Item>
//                 <Image
//                   src={images.signupImage1}
//                   alt="Slide 1"
//                   width={240}
//                   height={800}
//                   className="d-block w-full h-full object-contain rounded"
//                 />
//               </Carousel.Item>
//               <Carousel.Item>
//                 <Image
//                   src={images.signupImage2}
//                   alt="Slide 2"
//                   width={240}
//                   height={800}
//                   className="d-block w-full h-full object-contain rounded"
//                 />
//               </Carousel.Item>
//               <Carousel.Item>
//                 <Image
//                   src={images.signupImage3}
//                   alt="Slide 3"
//                   width={240}
//                   height={800}
//                   className="d-block w-full h-full object-contain rounded"
//                 />
//               </Carousel.Item>
//             </Carousel>
//           </div>
//         </div>

//         {/* Form Section */}
//         <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-center sm:text-left">
//             <Image
//               src={images.navbarLogo}
//               alt="MyStartup NEWS"
//               width={50}
//               height={50}
//             />
//             <h2 className="text-2xl font-bold">
//               Welcome To <span className="text-yellow-500">MyStartup</span>NEWS
//             </h2>
//           </div>

//           <form className="space-y-6" onSubmit={handleSubmit} noValidate>
//             {/* Upload Image */}
//             <div className="text-center">
//               <label
//                 htmlFor="writer-img"
//                 className="cursor-pointer inline-block"
//               >
//                 <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
//                   <img
//                     src={
//                       writerImg
//                         ? URL.createObjectURL(writerImg)
//                         : images.profileImg
//                     }
//                     alt="Upload"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </label>
//               <input
//                 type="file"
//                 id="writer-img"
//                 className="hidden"
//                 onChange={(e) => setwriterImg(e.target.files[0])}
//               />
//               <p className="mt-2 text-sm text-gray-600">Upload Your Image</p>
//               {errors.writerImg && (
//                 <p className="text-red-500 text-sm">{errors.writerImg}</p>
//               )}
//             </div>

//             {/* Grid Inputs */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter Your Name"
//                   className="w-full border rounded-lg px-4 py-2"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-sm">{errors.name}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Your Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="Enter Your Email"
//                   className="w-full border rounded-lg px-4 py-2"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm">{errors.email}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   placeholder="Enter Mobile Number"
//                   className="w-full border rounded-lg px-4 py-2"
//                   value={mobileNumber}
//                   onChange={(e) => setMobileNumber(e.target.value)}
//                 />
//                 {errors.mobileNumber && (
//                   <p className="text-red-500 text-sm">{errors.mobileNumber}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Contributor Role
//                 </label>
//                 <select
//                   className="w-full rounded-lg border px-4 py-2"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                 >
//                   <option>Select a role</option>
//                   <option value="Student Journalist">Student Journalist</option>
//                   <option value="Journalist">Journalist</option>
//                   <option value="Incubator">Incubator</option>
//                   <option value="Thought Leader">Thought Leader</option>
//                   <option value="Founder">Founder</option>
//                 </select>
//                 {errors.role && (
//                   <p className="text-red-500 text-sm">{errors.role}</p>
//                 )}
//               </div>
//             </div>

//             {/* Password + LinkedIn */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="relative">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter Your Password"
//                   className="w-full border rounded-lg px-4 py-2 pr-10"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {/* 👁 password toggle */}
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-9 cursor-pointer text-gray-500"
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </span>
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">{errors.password}</p>
//                 )}
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   LinkedIn
//                 </label>
//                 <input
//                   type="url"
//                   placeholder="Your LinkedIn Profile"
//                   className="w-full border rounded-lg px-4 py-2"
//                   value={publicProfile}
//                   onChange={(e) => setPublicProfile(e.target.value)}
//                 />
//                 {errors.publicProfile && (
//                   <p className="text-red-500 text-sm">{errors.publicProfile}</p>
//                 )}
//               </div>
//             </div>

//             {/* About */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 About You
//               </label>
//               <textarea
//                 rows={4}
//                 placeholder="Tell us about yourself..."
//                 className="w-full border rounded-lg px-4 py-2 resize-none"
//                 value={bio}
//                 onChange={(e) => setWriterBio(e.target.value)}
//               />
//               {errors.bio && (
//                 <p className="text-red-500 text-sm">{errors.bio}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               className="w-full bg-yellow-500 rounded-lg py-2 text-white font-semibold hover:bg-yellow-600 transition flex items-center justify-center gap-2"
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? (
//                 <SyncLoader color="#fffafa" className="py-2" size={8} />
//               ) : (
//                 "Register"
//               )}
//             </button>

//             {/* Already have account */}
//             <p className="text-center text-sm text-gray-600 mt-4">
//               Already Have an Account?{" "}
//               <Link
//                 to="/loginpage"
//                 className="text-yellow-500 font-semibold hover:underline"
//               >
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       <ToastContainer position="top-right" autoClose={4000} />
//     </div>
//   );
// };

// export default RegsiterWriter;
import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel, Image } from "react-bootstrap";
import { images } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { SyncLoader } from "react-spinners";

const RegisterWriter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [publicProfile, setPublicProfile] = useState("");
  const [bio, setWriterBio] = useState("");
  const [writerImg, setwriterImg] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  // ✅ validation function
  const validate = (fieldValues = {}) => {
    const newErrors = { ...errors };

    if ("name" in fieldValues) {
      newErrors.name = fieldValues.name.trim() ? "" : "Name is required";
    }

    if ("email" in fieldValues) {
      if (!fieldValues.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(fieldValues.email))
        newErrors.email = "Enter a valid email";
      else newErrors.email = "";
    }

    if ("mobileNumber" in fieldValues) {
      if (!fieldValues.mobileNumber.trim())
        newErrors.mobileNumber = "Mobile number is required";
      else if (!/^\d{10}$/.test(fieldValues.mobileNumber))
        newErrors.mobileNumber = "Enter a valid 10-digit number";
      else newErrors.mobileNumber = "";
    }

    if ("role" in fieldValues) {
      newErrors.role =
        !fieldValues.role || fieldValues.role === "Select a role"
          ? "Role is required"
          : "";
    }

    if ("password" in fieldValues) {
      if (!fieldValues.password.trim())
        newErrors.password = "Password is required";
      else if (fieldValues.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      else newErrors.password = "";
    }

    if ("publicProfile" in fieldValues) {
      newErrors.publicProfile = fieldValues.publicProfile.trim()
        ? ""
        : "LinkedIn profile is required";
    }

    if ("bio" in fieldValues) {
      newErrors.bio = fieldValues.bio.trim() ? "" : "Bio is required";
    }

    if ("writerImg" in fieldValues) {
      newErrors.writerImg = fieldValues.writerImg ? "" : "Profile image is required";
    }

    setErrors(newErrors);
  };

  // ✅ Check overall form validity
  useEffect(() => {
    const noErrors = Object.values(errors).every((err) => err === "");
    const allFilled =
      name &&
      email &&
      mobileNumber &&
      role &&
      password &&
      publicProfile &&
      bio &&
      writerImg;
    setIsFormValid(noErrors && allFilled);
  }, [errors, name, email, mobileNumber, role, password, publicProfile, bio, writerImg]);

  // ✅ submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // final check
    validate({
      name,
      email,
      mobileNumber,
      role,
      password,
      publicProfile,
      bio,
      writerImg,
    });

    if (!isFormValid) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("writerName", name);
      formData.append("writerEmail", email);
      formData.append("writerMobile", Number(mobileNumber));
      formData.append("writerPassword", password);
      formData.append("writerBio", bio);
      formData.append("writerImage", writerImg);
      formData.append("publicProfile", publicProfile);
      formData.append("writerRole", role);

      const { data } = await axios.post(
        `${backendUrl}/api/auth/registerWriter`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Your registration was successful 🎉");
        // clear form
        setName("");
        setEmail("");
        setMobileNumber("");
        setRole("");
        setPassword("");
        setPublicProfile("");
        setWriterBio("");
        setwriterImg("");
        navigate("/verify-email");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email already exists ❌");
      } else {
        toast.error("Server error, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full min-h-screen items-center gap-6 p-6 justify-center">
        
        {/* Carousel Section */}
        <div className="lg:w-2/6 rounded-lg">
          <div className="w-full flex items-center justify-center rounded-lg">
            <Carousel className="w-[540px] h-full">
              <Carousel.Item>
                <Image src={images.signupImage1} alt="Slide 1" className="d-block w-full h-full object-contain rounded" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={images.signupImage2} alt="Slide 2" className="d-block w-full h-full object-contain rounded" />
              </Carousel.Item>
              <Carousel.Item>
                <Image src={images.signupImage3} alt="Slide 3" className="d-block w-full h-full object-contain rounded" />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 text-center sm:text-left">
            <Image src={images.navbarLogo} alt="MyStartup NEWS" width={50} height={50} />
            <h2 className="text-2xl font-bold">
              Welcome To <span className="text-yellow-500">MyStartup</span>NEWS
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            
            {/* Upload Image */}
            <div className="text-center">
              <label htmlFor="writer-img" className="cursor-pointer inline-block">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={writerImg ? URL.createObjectURL(writerImg) : images.profileImg}
                    alt="Upload"
                    className="w-full h-full object-cover"
                  />
                </div>
              </label>
              <input
                type="file"
                id="writer-img"
                className="hidden"
                onChange={(e) => {
                  setwriterImg(e.target.files[0]);
                  validate({ writerImg: e.target.files[0] });
                }}
              />
              <p className="mt-2 text-sm text-gray-600">Upload Your Image</p>
              {errors.writerImg && <p className="text-red-500 text-sm">{errors.writerImg}</p>}
            </div>

            {/* Grid Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="w-full border rounded-lg px-4 py-2"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    validate({ name: e.target.value });
                  }}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full border rounded-lg px-4 py-2"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validate({ email: e.target.value });
                  }}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  className="w-full border rounded-lg px-4 py-2"
                  value={mobileNumber}
                  onChange={(e) => {
                    setMobileNumber(e.target.value);
                    validate({ mobileNumber: e.target.value });
                  }}
                />
                {errors.mobileNumber && <p className="text-red-500 text-sm">{errors.mobileNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contributor Role</label>
                <select
                  className="w-full rounded-lg border px-4 py-2"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                    validate({ role: e.target.value });
                  }}
                >
                  <option>Select a role</option>
                  <option value="Student Journalist">Student Journalist</option>
                  <option value="Journalist">Journalist</option>
                  <option value="Incubator">Incubator</option>
                  <option value="Thought Leader">Thought Leader</option>
                  <option value="Founder">Founder</option>
                </select>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>
            </div>

            {/* Password + LinkedIn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full border rounded-lg px-4 py-2 pr-10"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validate({ password: e.target.value });
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                <input
                  type="url"
                  placeholder="Your LinkedIn Profile"
                  className="w-full border rounded-lg px-4 py-2"
                  value={publicProfile}
                  onChange={(e) => {
                    setPublicProfile(e.target.value);
                    validate({ publicProfile: e.target.value });
                  }}
                />
                {errors.publicProfile && <p className="text-red-500 text-sm">{errors.publicProfile}</p>}
              </div>
            </div>

            {/* About */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full border rounded-lg px-4 py-2 resize-none"
                value={bio}
                onChange={(e) => {
                  setWriterBio(e.target.value);
                  validate({ bio: e.target.value });
                }}
              />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
            </div>

            {/* Submit */}
            <button
              className={`w-full rounded-lg py-2 text-white font-semibold transition flex items-center justify-center gap-2 ${
                isFormValid ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-400 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!isFormValid || loading}
            >
              {loading ? <SyncLoader color="#fffafa" className="py-2" size={8} /> : "Register"}
            </button>

            {/* Already have account */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already Have an Account?{" "}
              <Link to="/loginpage" className="text-yellow-500 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={4000} />
    </div>
  );
};

export default RegisterWriter;
