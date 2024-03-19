import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

const EmojiButton = ({emojiHandler}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const clickHandler = (event) => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative select-none">
      {isOpen ? (
        <div
          className=" bg-white z-20 w-fit scale-90 transition-all duration-500 shadow absolute left-0 bottom-0"
          ref={dropdownRef}
        >
          <EmojiPicker onEmojiClick={emojiHandler} className="" />
        </div>
      ) : (
        <div></div>
      )}
      <RiEmojiStickerLine className="text-2xl" onClick={clickHandler} />
        
    </div>
  );
};

export default EmojiButton;
