import React from "react";
import Message from "./Message";

const ChatProto = ({ messages, message, setMessage, sendMessage }) => {
  console.log("messages", messages);
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };
  return (
    <div>
      <div>
        {/* HEADING */}
        <div
          className=" bg-sp-gray-dark  h-16 w-1/4 xl:w-2/8 text-center pt-2 text-white flex justify-between "
          style={{ top: "0px", position: "fixed" }}
        >
          {/* back button */}
          <span className="mx-auto my-3 text-white text-center font-bold text-lg ">
            Chat
          </span>
          {/* 3 dots */}
        </div>
        {/* MESSAGES */}
        <div className="mt-20 mb-16 h-50 overflow-auto">
          {messages.map((item, i) => (
            <Message message={item} key={i} />
          ))}
        </div>
      </div>
      {/* MESSAGE INPUT AREA */}
      <div
        className="flex absolute w-1/4 xl:w-2/8  bg-sp-gray-light items-center border-b-2 border-sp-green py-2"
        style={{ bottom: "0px" }}
      >
        <input
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
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
