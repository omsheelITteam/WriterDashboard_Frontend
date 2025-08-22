

// import React, { useState ,useRef, useContext, useEffect} from "react";
// import { Link, useParams } from "react-router-dom";
// import {MdCloudUpload} from "react-icons/md";
// import JoditEditor from "jodit-react";
// // import Gallary from "./Gallary";
// import axios from "axios";
// import {AppContext} from "../Context/AppContext";
// import toast from "react-hot-toast";

// const EditNews = () => {
//   const {news_id}=useParams()
//   const { store } = useContext(AppContext);
//   const [show, setShow] = useState(false);
//   const editor = useRef(null);

//   const [old_image,set_old_image]=useState("")
//   const [title, setTitle] = useState("");
//   const [image, setImage] = useState("");
//   const [img, setImg] = useState("");
//   const [description, setDescription] = useState();
//   const [loader, setLoader] = useState(false);

//   const handleImage = (e) => {
//     const { files } = e.target;
//     if (files.length > 0) {
//       setImg(URL.createObjectURL(files[0]));
//       setImage(files[0]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("new_image", image);
//     formData.append("old_image",old_image)

//     try {
//       setLoader(true);
//       const { data } = await axios.put(`http://localhost:4000/api/user/update-news/${news_id}`, formData, {
//        withCredentials:true
//       });
//       setLoader(false);
//       toast.success(data.message);
//     } catch (error) {
//       setLoader(false);
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   const [images, setImages] = useState([]);
//   const [imagesLoader, setImagesLoader] = useState(false);

//   const get_images = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/images", {
//         headers: {
//           Authorization: `Bearer ${store.token}`,
//         },
//       });
//       setImages(data.images);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     get_images();
//   }, []);

//   const imageHandle = async (e) => {
//     const files = e.target.files;

//     try {
//       const formData = new FormData();
//       for (let i = 0; i < files.length; i++) {
//         formData.append("images", files[i]);
//       }
//       setImagesLoader(true);

//       const { data } = await axios.post("http://localhost:5000/api/images/add", formData, {
//         headers: {
//           Authorization: `Bearer ${store.token}`,
//         },
//       });

//       setImagesLoader(false);
//       setImages([...images, ...data.images]);
//       toast.success(data.message);
//     } catch (error) {
//       setImagesLoader(false);
//       toast.error(error.response?.data?.message || "Upload failed");
//     }
//   };

//   const get_news=async()=>{
//     try {
//         const {data}=await axios.get(`http://localhost:5000/api/news/${news_id}`,{
//             headers:{
//                 Authorization:`Bearer ${store.token}`
//             }

//         })
//         setTitle(data?.news?.title)
//         setDescription(data?.news?.description)
//         setImg(data?.news?.image)
//         set_old_image(data?.news?.image)
//     } catch (error) {
//         console.log(error.message)

//     }
//   }

//   useEffect(()=>{
//     get_news()

//   },[])

//   return (
//     <div className="bg-white shadow-lg rounded-md max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
//       <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-0">
//         <h2 className="text-xl sm:text-2xl font-medium mb-3 sm:mb-0">Add News</h2>
//         <Link
//           className="px-3 py-[6px] bg-white rounded-sm text-black hover:bg-purple-600 hover:text-white transition"
//           to="/dashboard/news"
//         >
//           News
//         </Link>
//       </div>
//       <div className="p-4 sm:p-6">
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-col gap-y-2 mb-6">
//             <label className="text-md font-medium text-black" htmlFor="title">
//               Headline
//             </label>
//             <input
//               type="text"
//               placeholder="News Title"
//               name="title"
//               value={title}
//               required
//               onChange={(e) => setTitle(e.target.value)}
//               className="px-3 py-2 rounded-md outline-0 border border-black focus:border-green-500 h-10 text-sm sm:text-base"
//               id="title"
//             />
//           </div>
//           <div className="mb-6">
//             <div>
//               <label
//                 htmlFor="mainImg"
//                 className="w-full max-h-[460px] sm:max-h-[500px] md:max-h-[600px] outline outline-1 outline-dashed rounded text-slate-700 gap-2 justify-center flex items-center cursor-pointer border-2 border-dashed overflow-hidden"
//               >
//                 {img ? (
//                   <img
//                     src={img}
//                     className="w-full h-full object-cover"
//                     alt="image"
//                   />
//                 ) : (
//                   <div className="flex justify-center items-center flex-col gap-y-2 p-6">
//                     <span className="text-4xl sm:text-5xl">
//                       <MdCloudUpload />
//                     </span>
//                     <span className="text-base sm:text-lg">Select Image</span>
//                   </div>
//                 )}
//               </label>
//               <input
//                 onChange={handleImage}
//                 className="hidden"
//                 type="file"
//                 id="mainImg"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col gap-y-2 mb-6">
//             <div className="flex justify-start items-center gap-x-2">
//               <h2 className="text-lg sm:text-xl font-semibold">Description</h2>
//               <div onClick={() => setShow(true)}>
//                 <span className="text-3xl sm:text-4xl cursor-pointer">
//                   <MdCloudUpload />
//                 </span>
//               </div>
//             </div>
//             <div>
//               <JoditEditor
//                 ref={editor}
//                 value={description}
//                 tabIndex={1}
//                 onBlur={(value) => setDescription(value)}
//                 onChange={() => {}}
//               />
//             </div>
//           </div>
//           <div className="mt-4">
//             <button
//               disabled={loader}
//               className="px-3 py-[6px] bg-white rounded-sm text-black hover:bg-purple-800 hover:text-white transition"
//             >
//               {loader ? "Loading..." : "Update News"}
//             </button>
//           </div>
//         </form>
//       </div>
//       <input onChange={imageHandle} type="file" multiple id="images" className="hidden" />
//       {show && <Gallary setShow={setShow} images={images} imageHandle={imageHandle} />}
//     </div>
//   );
// };

// export default EditNews;



import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const EditNews = () => {
  const { news_id } = useParams(); // from route /dashboard/edit/:news_id
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);

  const [form, setForm] = useState({
    Title: "",
    description: "",
    newsImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/user/get-news/${news_id}`, {
          withCredentials: true,
        });

        if (data.success) {
          setForm({
            Title: data.news.title || "",
            description: data.news.description || "",
            newsImage: data.news.newsImage || "",
          });
        } else {
          toast.error("Failed to load news");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading news");
      }
    };

    fetchNews();
  }, [backendUrl, news_id]);

  // Handle text input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Title", form.Title);
      formData.append("description", form.description);

      if (selectedFile) {
        formData.append("newsImg", selectedFile);
      }

      const { data } = await axios.put(
        `${backendUrl}/api/user/update-news/${news_id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success("✅ News updated successfully!");
        navigate("/dashboard/writer");
      } else {
        toast.error("❌ Update failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="Title"
            value={form.Title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Current Image */}
        {form.newsImage && !selectedFile && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Image:</p>
            <img
              src={form.newsImage}
              alt="News"
              className="w-64 rounded mb-2 border"
            />
          </div>
        )}

        {/* New Image */}
        <div>
          <label className="block font-medium">Upload New Image</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {selectedFile && (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Preview"
              className="w-64 rounded mt-2 border"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update News"}
        </button>
      </form>
    </div>
  );
};

export default EditNews;



