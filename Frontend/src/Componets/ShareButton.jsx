import React, { useState } from "react";
import {
  FaWhatsapp,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaShare,
  FaRegClipboard,
  FaClipboardCheck,
  FaTimes,
} from "react-icons/fa";

const SharesButton = ({ text = "Check this out!", url = "https://example.com" }) => {
  const [shareNow, setShareNow] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = encodeURIComponent(`${text} ${url}`);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleLinkedInShare = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/", "_blank");
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    alert("Link copied! Paste it in your Instagram bio, story, or DM.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative">
      {/* Main Share Button */}
      <button
        onClick={() => setShareNow(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2"
      >
        <FaShare size={16} />
        Share
      </button>

      {/* Popup Overlay */}
      {shareNow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative">
            {/* Close Button */}
            <button
              onClick={() => setShareNow(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={18} />
            </button>

            {/* Popup Content */}
            <h3 className="text-lg font-semibold mb-4 text-center">Share this profile</h3>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="p-3 text-green-600 hover:text-green-600 transition-colors duration-200 hover:bg-gray-100 rounded-full"
                title="WhatsApp"
              >
                <FaWhatsapp size={24} />
              </button>

              {/* Twitter */}
              <button
                onClick={handleTwitterShare}
                className="p-3 text-blue-500 hover:text-blue-500 transition-colors duration-200 hover:bg-gray-100 rounded-full"
                title="Twitter"
              >
                <FaTwitter size={24} />
              </button>

              {/* LinkedIn */}
              <button
                onClick={handleLinkedInShare}
                className="p-3 text-blue-700 hover:text-blue-700 transition-colors duration-200 hover:bg-gray-100 rounded-full"
                title="LinkedIn"
              >
                <FaLinkedin size={24} />
              </button>

              {/* Instagram */}
              <button
                onClick={handleInstagramClick}
                className="p-3 text-pink-600 hover:text-pink-600 transition-colors duration-200 hover:bg-gray-100 rounded-full"
                title="Instagram"
              >
                <FaInstagram size={24} />
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopy}
                className={`p-3 transition-colors duration-200 hover:bg-gray-100 rounded-full ${
                  copied 
                    ? "text-green-600" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
                title="Copy URL"
              >
                {copied ? <FaClipboardCheck size={24} /> : <FaRegClipboard size={24} />}
              </button>
            </div>

            {copied && (
              <p className="text-green-600 text-sm text-center mt-2">Link copied to clipboard!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharesButton;