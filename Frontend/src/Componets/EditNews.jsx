




// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AppContext } from "../Context/AppContext";
// import { toast } from "react-toastify";

// const EditNews = () => {
//   const { news_id } = useParams(); // from route /dashboard/edit/:news_id
//   const navigate = useNavigate();
//   const { backendUrl } = useContext(AppContext);

//   const [form, setForm] = useState({
//     Title: "",
//     description: "",
//     newsImage: "",
//   });

//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch existing news data
//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const { data } = await axios.get(`${backendUrl}/api/user/get-news/${news_id}`, {
//           withCredentials: true,
//         });

//         if (data.success) {
//           setForm({
//             Title: data.news.title || "",
//             description: data.news.description || "",
//             newsImage: data.news.newsImage || "",
//           });
//         } else {
//           toast.error("Failed to load news");
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Error loading news");
//       }
//     };

//     fetchNews();
//   }, [backendUrl, news_id]);

//   // Handle text input changes
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // Submit update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("Title", form.Title);
//       formData.append("description", form.description);

//       if (selectedFile) {
//         formData.append("newsImg", selectedFile);
//       }

//       const { data } = await axios.put(
//         `${backendUrl}/api/user/update-news/${news_id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true,
//         }
//       );

//       if (data.success) {
//         toast.success("✅ News updated successfully!");
//         navigate("/dashboard/writer");
//       } else {
//         toast.error("❌ Update failed: " + data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Edit News</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Title */}
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             name="Title"
//             value={form.Title}
//             onChange={handleChange}
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block font-medium">Description</label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             rows="6"
//             className="w-full border px-3 py-2 rounded"
//             required
//           />
//         </div>

//         {/* Current Image */}
//         {form.newsImage && !selectedFile && (
//           <div>
//             <p className="text-sm text-gray-600 mb-1">Current Image:</p>
//             <img
//               src={form.newsImage}
//               alt="News"
//               className="w-64 rounded mb-2 border"
//             />
//           </div>
//         )}

//         {/* New Image */}
//         <div>
//           <label className="block font-medium">Upload New Image</label>
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//           {selectedFile && (
//             <img
//               src={URL.createObjectURL(selectedFile)}
//               alt="Preview"
//               className="w-64 rounded mt-2 border"
//             />
//           )}
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           {loading ? "Updating..." : "Update News"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditNews;





import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu } from "@tiptap/react/menus";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontSize } from "tiptap-extension-font-size";
import { CiImageOn } from "react-icons/ci";
import { FaVideo } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { convert } from "html-to-text";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaLink,
  FaQuoteLeft,
} from "react-icons/fa";
import { Node, mergeAttributes } from "@tiptap/core";

const Video = Node.create({
  name: "video",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      width: { default: 540 },
      height: { default: 300 }
    }
  },
  parseHTML() {
    return [{ tag: "video" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ node }) => {
      const { src, controls, width, height } = node.attrs;

      const video = document.createElement("video");
      video.setAttribute("src", src);
      video.setAttribute("width", width);
      video.setAttribute("height", height);
      if (controls) video.setAttribute("controls", "true");

      return { dom: video };
    };
  },
});

const EditNews = () => {
  const { news_id } = useParams();
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const titleRef = useRef(null);

  // Rich Editor States (same as RichEditor)
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [mediaInserted, setMediaInserted] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [title, setTitle] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [titleConfirmed, setTitleConfirmed] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(false);
  const [currentLineEmpty, setCurrentLineEmpty] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, line: 0 });
  const [description, setDescription] = useState('');
  
  // Edit specific states
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingImage, setExistingImage] = useState("");
  const [originalContent, setOriginalContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Youtube.configure({
        width: 640,
        height: 360,
        allowFullscreen: true,
        HTMLAttributes: {
          class: "rounded-md mx-auto max-w-full",
        },
      }),
      Underline,
      Image,
      Video,
      TextStyle,
      FontSize,
      Placeholder.configure({
        placeholder: "",
        emptyEditorClass: "is-empty",
      }),
    ],
    content: "",
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === 'Backspace') {
          const { state } = view;
          const { selection, doc } = state;
          
          const isEmpty = doc.textContent.trim() === '';
          const isAtStart = selection.from === 0 || selection.from === 1;
          
          if (isEmpty && isAtStart) {
            event.preventDefault();
            setShowAddIcon(false);
            setIsOpen(false);
            setShowImageUpload(false);
            setShowYoutubeInput(false);
            if (titleRef.current) {
              titleRef.current.focus();
              const titleLength = titleRef.current.value.length;
              titleRef.current.setSelectionRange(titleLength, titleLength);
            }
            return true;
          }
        }
        return false;
      },
    },

    onUpdate({ editor }) {
      let html = editor.getHTML();
      html = html.replace(/<img[^>]*>/g, '');
      html = html.replace(/<iframe[^>]*><\/iframe>/g, '');
      const descriptionText = convert(html, { wordwrap: 130 });
      setDescription(descriptionText);

      const { state } = editor;
      const { selection } = state;
      const currentNode = selection.$from.parent;
      const currentLineContent = currentNode ? currentNode.textContent : "";
      
      if (titleConfirmed) {
        const isEmpty = currentLineContent.trim() === "";
        setShowAddIcon(isEmpty);
        setCurrentLineEmpty(isEmpty);
        if (!isEmpty) {
          setIsOpen(false);
          setShowImageUpload(false);
          setShowYoutubeInput(false);
        }
      }
    },
  });

  // Fetch existing news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4000/api/user/get-news/${news_id}`, {
          withCredentials: true,
        });

        if (data.success) {
          setTitle(data.news.title || "");
          setExistingImage(data.news.newsImage || "");
          setOriginalContent(data.news.description || "");
          setTitleConfirmed(true);
          
          // Set editor content after a brief delay to ensure editor is ready
          setTimeout(() => {
            if (editor) {
              editor.commands.setContent(data.news.description || "");
            }
          }, 100);
        } else {
          toast.error("Failed to load news");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error loading news");
      }
    };

    if (news_id) {
      fetchNews();
    }
  }, [news_id, editor]);

  // Handle editor focus and cursor position changes (same as RichEditor)
  useEffect(() => {
    if (editor && titleConfirmed) {
      const handleSelectionUpdate = () => {
        const { state, view } = editor;
        const { selection } = state;

        const currentNode = selection.$from.parent;
        const currentLineContent = currentNode ? currentNode.textContent : "";

        const coords = view.coordsAtPos(selection.from);
        const editorRect = view.dom.getBoundingClientRect();
        const lineTop = coords.top - editorRect.top;

        const isEmpty = currentLineContent.trim() === "";
        setShowAddIcon(isEmpty);
        setCurrentLineEmpty(isEmpty);
        setCursorPosition({
          top: lineTop,
          line: selection.from
        });

        if (!isEmpty) {
          setIsOpen(false);
          setShowImageUpload(false);
          setShowYoutubeInput(false);
        }
      };

      const unsubscribe = editor.on('selectionUpdate', handleSelectionUpdate);
      const unsubscribeTransaction = editor.on('transaction', handleSelectionUpdate);

      return () => {
        // Cleanup listeners if needed
      };
    }
  }, [editor, titleConfirmed]);

  // Handle title input keydown (same as RichEditor)
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" && title.trim()) {
      setTitleConfirmed(true);
      setShowAddIcon(true);
      e.preventDefault();
      setTimeout(() => {
        if (editor) {
          editor.commands.focus();
        }
      }, 100);
    }
  };

  // Handle title input focus (same as RichEditor)
  const handleTitleFocus = () => {
    setShowAddIcon(false);
    setIsOpen(false);
    setShowImageUpload(false);
    setShowYoutubeInput(false);
  };

  // Handle media upload (same as RichEditor)
  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const fileType = file.type.split('/')[0];

    if (fileType === "image") {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (!editor) return;

        const { state, view } = editor;
        const { tr, schema } = state;
        const pos = state.selection.to;

        const imageNode = schema.nodes.image.create({
          src: reader.result,
        });
        const paragraphNode = schema.nodes.paragraph.create();

        const transaction = tr
          .insert(pos, imageNode)
          .insert(pos + 1, paragraphNode)
          .setSelection(state.selection.constructor.near(tr.doc.resolve(pos + 2)));

        view.dispatch(transaction);
        view.focus();

        setMediaInserted(true);
        setMediaType("image");

        setIsOpen(false);
        setShowImageUpload(false);
        setShowYoutubeInput(false);
        setShowAddIcon(false);
      };

      reader.readAsDataURL(file);
    } else if (fileType === "video") {
      try {
        const videoUrl = URL.createObjectURL(file);

        editor.commands.insertContent({
          type: "video",
          attrs: {
            src: videoUrl,
            controls: true,
            width: 540,
            height: 300,
          },
        });

        setMediaInserted(true);
        setMediaType("video");

        setIsOpen(false);
        setShowImageUpload(false);
        setShowYoutubeInput(false);
        setShowAddIcon(false);

      } catch (error) {
        console.error("Video insert failed:", error);
      }
    }
  };

  // Insert YouTube (same as RichEditor)
  const insertYoutube = () => {
    if (videoUrl.trim()) {
      if (!editor) return;

      const { state, view } = editor;
      const { tr, schema } = state;
      const pos = state.selection.to;

      const youtubeNode = schema.nodes.youtube.create({
        src: videoUrl,
        width: 540,
        height: 300,
      });

      const paragraphNode = schema.nodes.paragraph.create();

      const transaction = tr
        .insert(pos, youtubeNode)
        .insert(pos + 1, paragraphNode)
        .setSelection(
          state.selection.constructor.near(tr.doc.resolve(pos + 2))
        );

      view.dispatch(transaction);
      view.focus();

      setMediaInserted(true);
      setMediaType("youtube");
      setVideoUrl("");

      setIsOpen(false);
      setShowYoutubeInput(false);
      setShowImageUpload(false);
      setShowAddIcon(false);
    }
  };

  // Handle YouTube input changes (same as RichEditor)
  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  // Handle YouTube input key events (same as RichEditor)
  const handleVideoUrlKeyDown = (e) => {
    if (e.key === "Enter" && videoUrl.trim()) {
      insertYoutube();
    } else if (e.key === "Escape") {
      setShowYoutubeInput(false);
      setIsOpen(false);
      setVideoUrl("");
    }
  };

  // Handle image icon click (same as RichEditor)
  const handleImageClick = () => {
    setShowImageUpload(true);
    setShowYoutubeInput(false);
  };

  // Handle video icon click (same as RichEditor)
  const handleVideoClick = () => {
    setShowYoutubeInput(true);
    setShowImageUpload(false);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!editor) {
      toast.error("Editor not ready");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("description", editor.getHTML());

      if (selectedFile) {
        formData.append("newsImg", selectedFile);
      }

      const { data } = await axios.put(
        `http://localhost:4000/api/user/update-news/${news_id}`,
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
    <div
      className="w-full max-w-4xl mx-0 sm:mx-8 md:mx-16 lg:mx-32 px-2 sm:px-4 py-6 sm:py-8 md:py-12 rounded-md"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      {/* Header Section */}
      <div className="flex flex-row w-full lg:mx-0 mx-auto lg:justify-between justify-center items-center gap-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Edit News</h2>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-white text-center bg-green-800 font-semibold rounded-full text-xs sm:text-sm md:text-base px-4 py-2 h-[32px] sm:h-[36px] md:h-[40px] flex items-center justify-center hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>

      {/* Current Image Display */}
      {existingImage && !selectedFile && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Current Image:</p>
          <img
            src={existingImage}
            alt="Current news"
            className="w-64 rounded border shadow-sm"
          />
        </div>
      )}

      {/* New Image Preview */}
      {selectedFile && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">New Image Preview:</p>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="w-64 rounded border shadow-sm"
          />
        </div>
      )}

      {/* Title Input */}
      <input
        type="text"
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={handleTitleKeyDown}
        onFocus={handleTitleFocus}
        placeholder="Title"
        className="text-xl sm:text-xl md:text-xl lg:text-xl text-black outline-none w-full mb-4 sm:mb-6 font-semibold mx-1 sm:mx-2 my-3 sm:my-5"
        required
      />

      {editor && (
        <>
          {/* Bubble Menu - Same as RichEditor */}
          <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }}>
            <div className="flex flex-wrap gap-1 sm:gap-2 px-2 sm:px-4 py-2 rounded-xl shadow-lg border border-gray-700 items-center justify-center bg-gradient-to-r from-neutral-900 via-black to-neutral-950 text-gray-200 backdrop-blur-sm animate-slideUpFadeIn max-w-[90vw]">
              {[
                {
                  label: (
                    <span className="font-bold text-sm sm:text-base">
                      <FaBold />
                    </span>
                  ),
                  action: () => editor.chain().focus().toggleBold().run(),
                  active: editor.isActive("bold"),
                  title: "Bold",
                },
                {
                  label: (
                    <span className="italic text-sm sm:text-base">
                      <FaItalic />
                    </span>
                  ),
                  action: () => editor.chain().focus().toggleItalic().run(),
                  active: editor.isActive("italic"),
                  title: "Italic",
                },
                {
                  label: (
                    <span className="underline text-sm sm:text-base">
                      <FaUnderline />
                    </span>
                  ),
                  action: () => editor.chain().focus().toggleUnderline().run(),
                  active: editor.isActive("underline"),
                  title: "Underline",
                },
                {
                  label: (
                    <span className="line-through text-sm sm:text-base">
                      <FaStrikethrough />
                    </span>
                  ),
                  action: () => editor.chain().focus().toggleStrike().run(),
                  active: editor.isActive("strike"),
                  title: "Strikethrough",
                },
                {
                  label: <FaLink className="hyperlink text-sm sm:text-base" />,
                  action: () => {
                    const isLinkActive = editor.isActive("link");

                    if (isLinkActive) {
                      editor.chain().focus().unsetLink().run();
                    } else {
                      const url = window.prompt("Enter URL", "https://");
                      if (!url) return;

                      editor
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({ href: url })
                        .run();
                    }
                  },
                  active: editor.isActive("link"),
                  title: "Insert or Remove Link",
                },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  onClick={btn.action}
                  title={btn.title}
                  className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-md transition-all font-medium ${
                    btn.active
                      ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-inner"
                      : "hover:text-blue-400 hover:bg-neutral-800 text-gray-300"
                  }`}
                >
                  {btn.label}
                </button>
              ))}

              <button
                onClick={() => {
                  const { state } = editor;
                  const { from, to } = state.selection;
                  const selectedText = state.doc.textBetween(from, to, " ");
                  if (selectedText) {
                    editor
                      .chain()
                      .focus()
                      .insertContentAt({ from, to }, `"${selectedText}"`)
                      .run();
                  }
                }}
                title="Wrap in quotes"
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-sm sm:text-lg text-gray-300 hover:text-blue-400 hover:bg-neutral-800 rounded-md transition-all"
              >
                <FaQuoteLeft />
              </button>

              <button
                onClick={() => editor.chain().focus().setFontSize("20px").run()}
                title="Medium font"
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-xs sm:text-sm text-gray-300 hover:text-blue-400 hover:bg-neutral-800 rounded-md transition-all font-semibold"
              >
                A
              </button>
              <button
                onClick={() => editor.chain().focus().setFontSize("32px").run()}
                title="Large font"
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-lg sm:text-xl text-gray-300 hover:text-blue-400 hover:bg-neutral-800 rounded-md transition-all font-bold"
              >
                A
              </button>
            </div>
          </BubbleMenu>

          {/* Editor Container */}
          <div className="flex flex-col items-center gap-4 px-0 sm:px-4 md:px-8">
            <div className="w-full flex justify-center px-2 sm:px-4 md:px-8 relative">
              <EditorContent
                editor={editor}
                className={`text-black w-full mx-auto text-sm sm:text-base min-h-[50vh] sm:min-h-screen px-2 sm:px-4 outline-none border-none ring-0 
                  ${!titleConfirmed
                    ? "pointer-events-auto opacity-40"
                    : ""
                  }
                  [&_p]:outline-none [&_div]:outline-none 
                  [&_p]:border-none [&_div]:border-none 
                  [&_.is-empty:first-child]:before:content-[attr(data-placeholder)]
                  [&_.is-empty:first-child]:before:text-gray-400 
                  [&_.is-empty:first-child]:before:absolute 
                  [&_.is-empty:first-child]:before:pointer-events-none
                  [&_img]:max-w-full [&_img]:h-auto
                  [&_video]:max-w-full [&_video]:h-auto
                  [&_iframe]:max-w-full [&_iframe]:h-auto`}
              />

              {/* Add icon positioned at cursor line - Same as RichEditor */}
              {titleConfirmed && showAddIcon && currentLineEmpty && (
                <div
                  className="absolute left-0 flex items-center z-10"
                  style={{
                    top: `${cursorPosition.top + 8}px`,
                    transform: 'translateX(-30px) sm:translateX(-40px)'
                  }}
                >
                  <button
                    className="text-lg sm:text-xl font-bold border border-gray-400 rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center text-gray-700 bg-white shadow-sm hover:bg-gray-100 transition-all duration-200"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <IoMdAdd
                      className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    />
                  </button>

                  {/* Show media options next to the add button */}
                  {isOpen && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center bg-gray-50 p-2 sm:p-3 rounded-lg border ml-1 sm:ml-2 shadow-lg min-w-[120px] sm:min-w-auto">
                      {(!showImageUpload) && (
                        <div className="flex flex-col sm:flex-row items-center gap-2 flex-1">
                          {/* Image Upload */}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMediaUpload}
                            className="hidden"
                            id="imageUploadInput"
                          />
                          <label
                            htmlFor="imageUploadInput"
                            className="cursor-pointer flex flex-col sm:flex-row items-center gap-1"
                            title="Upload Image"
                          >
                            <CiImageOn className="text-xl sm:text-2xl cursor-pointer hover:text-blue-600 text-gray-600" />
                            <span className="text-xs sm:hidden">Image</span>
                          </label>

                          {/* Local Video Upload */}
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleMediaUpload}   
                            className="hidden"
                            id="videoUploadInput"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EditNews;