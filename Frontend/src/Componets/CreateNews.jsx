



import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { useSearchParams } from "react-router-dom";
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

})


const RichEditor = () => {
  const titleRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const videoInputRef = useRef(null)
  const [mediaInserted, setMediaInserted] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [title, setTitle] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [titleConfirmed, setTitleConfirmed] = useState(false);
  const [showAddIcon, setShowAddIcon] = useState(false);
  const [currentLineEmpty, setCurrentLineEmpty] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, line: 0 });
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null)
  const [description, setDescription] = useState('')
  const [source, setSource] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate()
  
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
    description: "",
    editorProps: {
      handleKeyDown: (view, event) => {
        // Move focus to title field when editor is empty and backspace is pressed
        if (event.key === 'Backspace') {
          const { state } = view;
          const { selection, doc } = state;
          
          // Check if the document is empty or nearly empty
          const isEmpty = doc.textContent.trim() === '';
          const isAtStart = selection.from === 0 || selection.from === 1;
          
          // If we're at the start of an empty document, move focus to title
          if (isEmpty && isAtStart) {
            event.preventDefault();
            // Hide add icon and close any open menus
            setShowAddIcon(false);
            setIsOpen(false);
            setShowImageUpload(false);
            setShowYoutubeInput(false);
            // Focus the title field
            if (titleRef.current) {
              titleRef.current.focus();
              // Position cursor at the end of title
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

      // Remove <img> and <iframe> (YouTube) tags
      html = html.replace(/<img[^>]*>/g, '');
      html = html.replace(/<iframe[^>]*><\/iframe>/g, '');

      // Convert to plain text
      const descriptionText = convert(html, { wordwrap: 130 });
      setDescription(descriptionText);

      // Cursor & add icon logic
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

  const navItemClass = (route) =>
    `text-black ${pathname === route ? "bg-gray-200 font-semibold" : ""
    } px-2 sm:px-3 py-2 sm:py-4 hover:shadow-lg flex gap-1 sm:gap-2 items-center `;

  useEffect(() => {
    if (titleConfirmed && !mediaInserted) {
      setIsOpen(false);
    }
  }, [titleConfirmed, mediaInserted]);

  // Handle editor focus and cursor position changes
  useEffect(() => {
    if (editor && titleConfirmed) {
      const handleSelectionUpdate = () => {
        const { state, view } = editor;
        const { selection } = state;

        // Get the current node at cursor position
        const currentNode = selection.$from.parent;
        const currentLineContent = currentNode ? currentNode.textContent : "";

        // Calculate cursor position
        const coords = view.coordsAtPos(selection.from);
        const editorRect = view.dom.getBoundingClientRect();

        // Get line number/position
        const lineTop = coords.top - editorRect.top;

        // Show add icon only if current line is empty
        const isEmpty = currentLineContent.trim() === "";
        setShowAddIcon(isEmpty);
        setCurrentLineEmpty(isEmpty);
        setCursorPosition({
          top: lineTop,
          line: selection.from
        });

        // Close any open menus if user starts typing
        if (!isEmpty) {
          setIsOpen(false);
          setShowImageUpload(false);
          setShowYoutubeInput(false);
        }
      };

      // Listen to selection changes
      const unsubscribe = editor.on('selectionUpdate', handleSelectionUpdate);
      const unsubscribeTransaction = editor.on('transaction', handleSelectionUpdate);

      return () => {
        // Cleanup listeners if needed
      };
    }
  }, [editor, titleConfirmed]);

  // Handle title input keydown (Enter key)
  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter" && title.trim()) {
      setTitleConfirmed(true);
      setShowAddIcon(true);
      e.preventDefault();
      // Focus the editor
      setTimeout(() => {
        if (editor) {
          editor.commands.focus();
        }
      }, 100);
    }
  };

  // Handle title input focus
  const handleTitleFocus = () => {
    // Hide add icon when title is focused
    setShowAddIcon(false);
    setIsOpen(false);
    setShowImageUpload(false);
    setShowYoutubeInput(false);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    const fileType = file.type.split('/')[0]; // "image" or "video" or others

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
    } else {
      console.warn("Unsupported file type:", file.type);
    }
  };

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

      // Hide all add options after inserting
      setIsOpen(false);
      setShowYoutubeInput(false);
      setShowImageUpload(false);
      setShowAddIcon(false);
    }
  };

  // Handle clicking on image icon
  const handleImageClick = () => {
    setShowImageUpload(true);
    setShowYoutubeInput(false);
  };

  // Handle clicking on video icon
  const handleVideoClick = () => {
    setShowYoutubeInput(true);
    setShowImageUpload(false);
  };

  // Handle YouTube input changes
  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  // Handle YouTube input key events
  const handleVideoUrlKeyDown = (e) => {
    if (e.key === "Enter" && videoUrl.trim()) {
      insertYoutube();
    } else if (e.key === "Escape") {
      // Close on Escape
      setShowYoutubeInput(false);
      setIsOpen(false);
      setVideoUrl("");
    }
  };

  return (
    <>
      <div
        className="w-full max-w-4xl mx-0 sm:mx-8 md:mx-16 lg:mx-32 px-2 sm:px-4 py-6 sm:py-8 md:py-12 rounded-md"
        style={{
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
        {/* Header Section */}
        {/* <div className="flex flex-row lg:mx-0 mx-auto w-fit ">
          <p className="text-center font-semibold bg-yellow-300 px-2 py-2 rounded-full text-xs sm:text-sm md:text-base w-[100px] sm:w-[120px] md:w-[140px] h-[32px] sm:h-[36px] md:h-[40px] flex items-center justify-center">
            {category}
          </p>
          
          <Link
            to="/dashboard/preview"
            state={{
              title,
              description,
              category,
              source,
              selectedFile
            }}
            className={`${navItemClass('/dashboard/preview')} text-white text-center items-en bg-green-800 font-semibold rounded-full text-xs sm:text-sm md:text-base w-[70px] sm:w-[75px] md:w-[80px] h-[32px] sm:h-[36px] md:h-[40px] flex items-center justify-center`}
          >
            Publish
          </Link>
        </div> */}

        <div className="flex flex-row w-full lg:mx-0 mx-auto lg:justify-between justify-center items-center gap-2">
  {/* Category */}
  <p className="text-center font-semibold bg-yellow-300 px-2 py-2 rounded-full text-xs sm:text-sm md:text-base w-[100px] sm:w-[120px] md:w-[140px] h-[32px] sm:h-[36px] md:h-[40px] flex items-center justify-center">
    {category}
  </p>

  {/* Publish */}
  <Link
    to="/dashboard/preview"
    state={{ title, description, category, source, selectedFile }}
    className="text-white text-center bg-green-800 font-semibold rounded-full text-xs sm:text-sm md:text-base w-[70px] sm:w-[75px] md:w-[80px] h-[32px] sm:h-[36px] md:h-[40px] flex items-center justify-center"
  >
    Publish
  </Link>
</div>


        {/* Title Input */}
        <input
          type="text"
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleTitleKeyDown}
          onFocus={handleTitleFocus}
          placeholder="Title "
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black outline-none w-full mb-4 sm:mb-6 font-semibold mx-1 sm:mx-2 my-3 sm:my-5"
        />

        {editor && (
          <>
            {/* Bubble Menu - Made responsive */}
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
                    className={`w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-md transition-all font-medium ${btn.active
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

                {/* Add icon positioned at cursor line - Made responsive */}
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
                        className={`transform transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"
                          }`}
                      />
                    </button>

                    {/* Show media options next to the add button - Made responsive */}
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
                            <label
                              htmlFor="videoUploadInput"
                              className="cursor-pointer flex flex-col sm:flex-row items-center gap-1"
                              title="Upload Video"
                            >
                              <FaVideo className="text-xl sm:text-2xl cursor-pointer hover:text-blue-600 text-gray-600" />
                              <span className="text-xs sm:hidden">Video</span>
                            </label>
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
    </>
  );
};

export default RichEditor;