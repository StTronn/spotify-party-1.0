import React from "react";

const Message = ({ message }) => {
  console.log(message);
  return (
    <div className="clearfix">
      <div className="bg-sp-gray-light w-3/4 mx-4 my-2 p-2 rounded-lg">
        {message.username && (
          <>
            <p className="text-sp-green text-xs">{message.username}</p>
          </>
        )}
        {message.text}
      </div>
    </div>
  );
};

export default Message;
