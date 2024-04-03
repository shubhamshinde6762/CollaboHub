import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import EmojiButton from "../../GeneralPurposeComponents/EmojiButton";
import Attachments from "../../GeneralPurposeComponents/Attachments";
import Message from "./Message";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const Chat = ({ user, chat, newMessage, setChatSection }) => {
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();

  let isFirstRender = true;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("345678", newMessage.newMessage.chatId, chat);
        if (newMessage && chat._id && newMessage.newMessage.chatId === chat._id)
          setMessages((pre) => [...pre, newMessage.newMessage]);
      } catch (err) {}
    };

    fetchMessages();
  }, [newMessage]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.post(
          "https://collabo-hub-ten.vercel.app/api/v1/fetchMessages",
          {
            userId: user.data._id,
            chatId: chat._id,
            messageId: chat.messageId,
          }
        );

        if (response && response.data && response.data.messages)
          setMessages(response.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [chat]);

  useEffect(() => {
    const handleScrollHeight = () => {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    };

    const setupScrollListener = () => {
      // Wait for images and videos to load before setting scrollHeight
      const images = messagesRef.current.querySelectorAll("img");
      const videos = messagesRef.current.querySelectorAll("video");

      const imageLoadPromises = Array.from(images).map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
          })
      );

      const videoLoadPromises = Array.from(videos).map(
        (video) =>
          new Promise((resolve) => {
            video.onloadeddata = resolve;
          })
      );

      Promise.all([...imageLoadPromises, ...videoLoadPromises]).then(() => {
        handleScrollHeight();
      });

      return () => {
        images.forEach((img) => (img.onload = null));
        videos.forEach((video) => (video.onloadeddata = null));
      };
    };

    if (messagesRef.current) {
      setupScrollListener();
    }
  }, [messages]);

  const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
      setIsAtBottom(scrollHeight - scrollTop - 50 < clientHeight);
    };

    if (messagesRef.current) {
      messagesRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (messagesRef.current) {
        messagesRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);

  useEffect(() => {
    try {
      if (isAtBottom) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    } catch (err) {}
  }, [messages, isAtBottom]);

  // useEffect(() => {
  //   const scrollToBottom = () => {
  //     if (messagesRef.current) {
  //       const isScrolledDown =
  //         messagesRef.current.scrollHeight - messagesRef.current.scrollTop ===
  //         messagesRef.current.clientHeight;

  //       if (isScrolledDown || isFirstRender) {
  //         messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  //         isFirstRender = false;
  //       }
  //     }
  //   };

  //   scrollToBottom();
  // }, [messages]);

  const emojiHandler = (obj, event) => {
    setTextMessage((pre) => pre + obj.emoji);
  };

  const sendMessage = async () => {
    if (textMessage.trim()) {
      let person2 = null;
      if (!chat._id) person2 = chat.user;
      const response = await axios.post(
        "https://collabo-hub-ten.vercel.app/api/v1/sendMessage",
        {
          textMessage,
          chatId: chat._id,
          userId: user.data._id,
          person2,
        }
      );

      if (response) setTextMessage("");
    }
  };

  return (
    <div className="shadow h-[89vh] bg-[#fcf8ff] min-w-[70%] select-none p-2 text-black overflow-x-hidden custom-scrollbar rounded-3xl">
      {chat && (
        <div className="flex flex-col h-full">
          <div className="flex p-1 px-5 rounded-full items-center gap-x-1 text-xl font-bold bg-sky-100">
            <IoMdArrowRoundBack onClick={() => setChatSection(null)} />
            <img
              src={
                (chat.group && chat.group.profilePhoto) ||
                chat.user.profilePhoto
              }
              className="rounded-full w-16"
            />
            <p>{(chat.group && chat.group.chatName) || chat.user.username}</p>
          </div>
          <div
            ref={messagesRef}
            className="flex-grow overflow-y-scroll my-2 custom-scrollbar"
          >
            <AnimatePresence>
              {messages.map((obj, index) => (
                <motion.div
                  key={obj._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Message user={user} messageText={obj} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="w-full bg-slate-100 rounded-full  flex gap-x-3 items-center px-5">
            <EmojiButton emojiHandler={emojiHandler} />
            <Attachments user={user} chat={chat} />
            <textarea
              type="text"
              placeholder="Type a Message"
              className="flex-grow my-2 resize-none py-2 px-1 focus:outline-none h-11 bg-transparent text-start  overflow-x-hidden custom-scrollbar"
              onChange={(event) => setTextMessage(event.target.value)}
              value={textMessage}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) sendMessage();
              }}
            />
            <FaArrowUp
              onClick={sendMessage}
              className="text-3xl bg-green-500 text-white rounded-full p-2"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
