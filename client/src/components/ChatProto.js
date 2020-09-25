import React, { useEffect, useRef } from "react";
import Message from "./Message";

const ChatProto = ({ messages, message, setMessage, sendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };
  const bottom = window.innerWidth < 768 ? "53px" : "0px";
  return (
    <div>
      <div>
        {/* HEADING */}
        <div
          className=" bg-sp-gray-dark  h-16 w-full md:w-1/4 xl:w-2/8 text-center pt-2 text-white flex justify-between "
          style={{ top: "0px", position: "fixed" }}
        >
          {/* back button */}
          <span className="mx-auto my-3 text-white text-center font-bold text-lg ">
            Chat
          </span>
          {/* 3 dots */}
        </div>
        {/* MESSAGES */}
        <div className="mt-20 mb-24 md:mb-12 h-50 overflow-auto">
          {messages.map((item, i) => (
            <Message message={item} key={i} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      {/* MESSAGE INPUT AREA */}
      <div
        style={{ bottom }}
        className="flex fixed w-full md:w-1/4 xl:w-2/8  bg-sp-gray-light items-center border-b-2 border-sp-green py-2 md:bottom-0"
      >
        <input
          className="appearance-none bg-transparent border-none w-full  md:mb-0 text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          rows={1}
          placeholder="say something"
          style={{ outline: "none" }}
          defaultValue={""}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={handleEnter}
        />
      </div>
    </div>
  );
};

export default ChatProto;
