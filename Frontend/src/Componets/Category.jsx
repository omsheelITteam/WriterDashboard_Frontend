



import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Toaster } from "react-hot-toast";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { AppContext } from "../Context/AppContext";

const Category = () => {
  const [selected, setSelected] = useState("Select News Category");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const {backendUrl}=useContext(AppContext)
  const navigate = useNavigate();

  // categories must match backend "allowedCategories"
  const categories = [
    { value: "article", label: "Article", icon: "📰" },
    { value: "Press Release", label: "Press Release", icon: "📢" },
    { value: "featurewritten", label: "Feature Written", icon: "✍️" },
    { value: "Technology", label: "Technology", icon: "💻" },
    { value: "health", label: "Health", icon: "💊" },
    { value: "videos", label: "Videos", icon: "🎥" },
    { value: "awards", label: "Awards", icon: "🏆" },
    { value: "incubator", label: "Incubator", icon: "🚀" },
    { value: "msme", label: "MSME", icon: "🏢" },
    {value:"education", label:"Education", icon:"📖"},
    {value:"travel",label:"Travel",icon:"✈️📚"},
    {value:"sports" , label:"Sports",icon:"🏆"},
    {value:"insights" , label:"Insights",icon:"📖"},
  ];

  // Submit selected category to backend
  const addBlog = async () => {
    if (selected === "Select News Category") {
      toast.error("Please select a category first!");
      return;
    }

    try {
      // send category as object { categoryName: true }
      const res = await axios.post(
        `${backendUrl}/api/user/select-news-category`,
        { category: { [selected]: true } },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message,{ position: "top-center" });
        navigate(`/dashboard/news/create?category=${selected}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!",{ position: "top-center" });
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
       
      <div className="w-96 h-56 bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between text-center">
         <Toaster position="top-center" />
        {/* Category Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Select News Category
          </label>

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="w-full bg-white border-2 border-gray-200 hover:border-yellow-300 
                         rounded-lg px-4 py-3 text-left transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500
                         shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium text-gray-700">
                  {categories.find((c) => c.value === selected)?.icon}{" "}
                  {categories.find((c) => c.value === selected)?.label ||
                    "Select News Category"}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {isOpen && (
              <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl">
                <div className="py-1 max-h-40 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => {
                        setSelected(category.value);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 transition-colors duration-150
                                hover:bg-yellow-50 focus:bg-yellow-50 focus:outline-none
                                ${
                                  selected === category.value
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "text-gray-700"
                                }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.label}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden 
                     text-sm font-medium text-gray-900 rounded-lg group 
                     focus:ring-4 focus:outline-none focus:ring-yellow-100 dark:focus:ring-amber-400
                     transition-all duration-300 hover:bg-black bg-yellow-300"
          onClick={addBlog}
        >
          <span
            className="relative px-5 py-2.5 transition-all duration-300 
                       group-hover:bg-transparent group-hover:text-white"
          >
            Submit
          </span>
        </button>
      </div>
    </div>
  );
};

export default Category;
