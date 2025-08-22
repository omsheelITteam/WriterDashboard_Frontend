



// import React, { useContext, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AppContext } from "../Context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PreviewPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { backendUrl } = useContext(AppContext);

//   // Destructure data from location.state
//   const { title, description, category, source, selectedFile  } = location.state || {};
//   const [loading, setLoading] = useState(false);

//   // Function to submit blog
//   const addBlog = async () => {
//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("Title", title);
//       formData.append("description", description);
//       formData.append("slug", title ? title.toLowerCase().replace(/\s+/g, "-") : "");
//       formData.append("status", "pending");
//       formData.append("newssource", source || "");

//       // Append image if exists
//       if (selectedFile) {
//         formData.append("newsImg", selectedFile);
//       }

//       const { data } = await axios.post(
//         `http://localhost:4000/api/user/add-news`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (data.success) {
//         toast.success("✅ Blog submitted successfully!");
//         navigate("/dashboard/writer");
//       } else {
//         toast.error("❌ Failed: " + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback if no blog data
//   if (!title && !description) {
//     return (
//       <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">
//         No blog data to preview.
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 ">
//       <h1 className="text-3xl font-bold mb-4 flex justify-center items-center">{title}</h1>
//       {category && <p className="text-sm text-gray-600 mb-2 flex justify-center items-center">Category: {category}</p>}

//       {source && <p className="text-sm text-gray-600 mb-6 flex justify-center items-center">Source: {source}</p>}

//       {/* Image preview */}
//       {selectedFile ? (
//         <img
//           src={URL.createObjectURL(selectedFile)}
//           alt={title || "Blog Image"}
//           className="w-full max-w-md  rounded mb-4 object-fit flex justify-center items-center"
//         />
//       ) : (
//         <div className="w-full max-w-md h-64 rounded bg-gray-200 flex items-center justify-center mb-4">
//           No Image Selected
//         </div>
//       )}

//       {/* Description */}
//       <div
//         className="prose max-w-none border p-4 rounded"
//         dangerouslySetInnerHTML={{ __html: description }}
//       />

//       {/* Submit Button */}
//       <button
//         onClick={addBlog}
//         disabled={loading}
//         className="mt-6 px-4 py-2 bg-green-800 text-white rounded-md"
//       >
//         {loading ? "Submitting..." : "Submit Blog"}
//       </button>
//     </div>
//   );
// };

// export default PreviewPage;




// import React, { useContext, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AppContext } from "../Context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const PreviewPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { backendUrl } = useContext(AppContext);

//   // Destructure data from location.state
//   const { title, description, category, source, selectedFile } = location.state || {};
//   const [loading, setLoading] = useState(false);
//   const [imageSource, setImageSource] = useState(source || "");

//   // Function to submit blog
//   const addBlog = async () => {
//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("Title", title);
//       formData.append("description", description);
//       formData.append("slug", title ? title.toLowerCase().replace(/\s+/g, "-") : "");
//       formData.append("status", "pending");
//       formData.append("newssource", imageSource || "");

//       // Append image if exists
//       if (selectedFile) {
//         formData.append("newsImg", selectedFile);
//       }

//       const { data } = await axios.post(
//         `http://localhost:4000/api/user/add-news`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (data.success) {
//         toast.success("✅ Blog submitted successfully!");
//         navigate("/dashboard/writer");
//       } else {
//         toast.error("❌ Failed: " + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback if no blog data
//   if (!title && !description) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center p-8 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">No Preview Available</h2>
//           <p className="text-gray-500">No blog data to preview.</p>
//           <button
//             onClick={() => navigate(-1)}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="bg-white rounded-lg shadow-lg p-8">
//           <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
//           {category && <p className="text-sm text-blue-600 font-medium mb-4">Category: {category}</p>}

//           {/* Centered Image Section */}
//           <div className="mb-6">
//             {selectedFile ? (
//               <div className="flex justify-center mb-4">
//                 <img
//                   src={URL.createObjectURL(selectedFile)}
//                   alt="Preview"
//                   className="max-w-full h-auto max-h-96 rounded-lg shadow-md object-contain"
//                 />
//               </div>
//             ) : (
//               <div className="flex justify-center mb-4">
//                 <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center">
//                   <span className="text-gray-500 text-lg">No Image Selected</span>
//                 </div>
//               </div>
//             )}

//             {/* Source Input Below Image - Only for pressrelease and sports */}
//             {(category === "pressrelease" || category === "sports") && (
//               <div className="max-w-md mx-auto">
//                 <label htmlFor="imageSource" className="block text-sm font-medium text-gray-700 mb-2">
//                   Image Source
//                 </label>
//                 <input
//                   type="text"
//                   id="imageSource"
//                   value={imageSource}
//                   onChange={(e) => setImageSource(e.target.value)}
//                   placeholder="Enter image source or credit"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-3">Content:</h3>
//             <div className="prose max-w-none text-gray-700 leading-relaxed">
//               {description?.split('\n').map((paragraph, index) => (
//                 <p key={index} className="mb-4">{paragraph}</p>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={addBlog}
//               disabled={loading}
//               className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {loading ? "Submitting..." : "Submit Blog"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PreviewPage;




import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  // Destructure data from location.state
  const { title, description, category, source, selectedFile } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [imageSource, setImageSource] = useState(source || "");

  // Function to submit blog
  const addBlog = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("Title", title);
      formData.append("description", description);
      formData.append("slug", title ? title.toLowerCase().replace(/\s+/g, "-") : "");
      formData.append("status", "pending");
      formData.append("newssource", imageSource || "");

      // Append image if exists
      if (selectedFile) {
        formData.append("newsImg", selectedFile);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/add-news`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("Blog submitted successfully!");
        navigate("/dashboard/writer");
      } else {
        toast.error("❌ Failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Fallback if no blog data
  if (!title && !description) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">No Preview Available</h2>
          <p className="text-gray-500">No blog data to preview.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
          {category && <p className="text-sm text-blue-600 font-medium mb-4">Category: {category}</p>}

          {/* Centered Image Section */}
          <div className="mb-6">
            {selectedFile ? (
              <div className="flex justify-center mb-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="max-w-full h-auto max-h-96 rounded-lg shadow-md object-contain"
                />
              </div>
            ) : (
              <div className="flex justify-center mb-4">
                <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 text-lg">No Image Selected</span>
                </div>
              </div>
            )}

            {/* Source Input Below Image - Only for pressrelease and sports */}
            {(category?.toLowerCase().includes("press") || 
              category?.toLowerCase() === "sports" || 
              category?.toLowerCase() === "pressrelease") && (
              <div className="max-w-md mx-auto flex justify-center items-center gap-6">
                {/* <label htmlFor="imageSource" className="inline-block  text-lg  font-medium text-gray-700 mb-2">
                  Source
                </label> */}
                <input
                  type="text"
                  id="imageSource"
                  value={imageSource}
                  onChange={(e) => setImageSource(e.target.value)}
                  placeholder="Enter source "
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Content:</h3>
            {/* <div className="prose max-w-none text-gray-700 leading-relaxed">
              {description?.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div> */}
   <div className="prose max-w-none text-gray-700 leading-relaxed">
  <p>{description}</p>
</div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={addBlog}
              disabled={loading}
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Submitting..." : "Submit Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;