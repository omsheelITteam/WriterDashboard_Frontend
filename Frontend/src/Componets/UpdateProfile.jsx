import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const UpdateProfileForm = () => {
  const { backendUrl, userData, getUserData } = useContext(AppContext);

  // Initialize states from current userData
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [profile, setProfile] = useState(userData?.profile || "");
  const [writerBio, setwriterBio] = useState(userData?.writerBio || "");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    // formData.append("email", email);
    formData.append("writerBio", writerBio);
  formData.append("publicProfile", profile); 

    // formData.append("", category);
   if (image) formData.append("writerImg", image);

    try {
      const res = await axios.put(`${backendUrl}/api/user/update-your-profile`, formData, {
        withCredentials: true, 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        toast.success("Profile updated successfully", { position: "top-center" });
        // getUserData(); // refresh context with updated data
      } else {
        toast.error(res.data.message || "Profile update failed", { position: "top-center" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating profile", { position: "top-center" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-lg mx-auto bg-white p-6 shadow rounded mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Update Profile</h2>

      {/* <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
      /> */}
      <input
        type="text"
        value={profile}
        onChange={(e) => setProfile(e.target.value)}
        required
        placeholder="LinkedIn Profile"
        className="w-full mb-3 p-2 border rounded"
      />

      {/* <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="LinkedIn Profile"
        className="w-full mb-3 p-2 border rounded"
      /> */}

      <textarea
        type="text"
        value={writerBio}
        onChange={(e) => setwriterBio(e.target.value)}
        placeholder="Bio"
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full mb-3"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;
