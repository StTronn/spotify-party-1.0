import React from "react";

const Message = ({ message }) => {
  return (
    <div className="clearfix">
      <div className="bg-sp-gray-light w-3/4 mx-4 my-2 p-2 rounded-lg">
        {message.text}
      </div>
    </div>
  );
};

export default Message;
