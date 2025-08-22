import React, { useContext, useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const { backendUrl } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const inputrefs = useRef([]);
  const navigate = useNavigate();
axios.defaults.withCredentials=true
  useEffect(() => {
    // Focus first input on mount
    if (inputrefs.current[0]) inputrefs.current[0].focus();
  }, []);

  const handleInput = (e, index) => {
    const val = e.target.value;
    if (/^\d$/.test(val)) { // only allow digits
      if (index < inputrefs.current.length - 1) {
        inputrefs.current[index + 1].focus();
      }
    } else {
      e.target.value = ""; // remove invalid character
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, ""); // digits only
    paste.split("").forEach((char, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = char;
      }
    });
    // Focus the next empty input
    const firstEmpty = inputrefs.current.findIndex((i) => i.value === "");
    if (firstEmpty !== -1) inputrefs.current[firstEmpty].focus();
  };

  const otpSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const otp = inputrefs.current.map((i) => i.value).join("");
      if (otp.length !== 6) {
        toast.error("Please enter a 6-digit OTP");
        setIsLoading(false);
        return;
      }
      const formData = new FormData();
      formData.append("code", otp);

      const { data } = await axios.post(
        `${backendUrl}/api/auth/verify-email`,
        // formData,
         { code: otp },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-yellow-400 rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-4 flex justify-center">
          <div className="bg-white p-4 rounded-full">
            <MdOutlineMail className="text-3xl text-black" />
          </div>
        </div>
        <h1 className="text-white text-xl">Email Verify OTP</h1>
        <p className="text-black mb-6 text-center">
          Enter the 6-digit code sent to your Email
        </p>
        <form
          className="p-8 rounded-lg shadow-lg bg-black w-96 text-sm"
          onSubmit={otpSubmitHandler}
        >
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength="1"
                  key={index}
                  className="w-12 h-12 border border-black rounded text-center text-lg font-semibold focus:ring-2 focus:ring-yellow-400"
                  ref={(el) => (inputrefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button
            disabled={isLoading}
            className="w-full py-3 bg-yellow-400 rounded text-white hover:bg-yellow-500 hover:scale-105 transition-all duration-150 font-semibold flex items-center justify-center"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin text-white" />
            ) : (
              <span>VERIFY EMAIL</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
