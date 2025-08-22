import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { AppContext } from "../Context/AppContext";
const DeleteNews = ({ newsId, fetchNews }) => {
  const {backendUrl}=useContext(AppContext)
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this news?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/user/remove-news/${newsId}`,
        { withCredentials: true } 
      );

      if (response.data.success) {
        toast.success("News deleted successfully ✅");
        if (fetchNews) fetchNews(); 
      } else {
        toast.error(response.data.message || "Failed to delete news ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting news ❌");
    }
  };

  return (
    <button
      onClick={handleDelete}
    
    ><FaTrash />
  
    </button>
  );
};

export default DeleteNews;
