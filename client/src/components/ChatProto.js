import React from "react";

const ChatProto = () => {
  return (
    <div>
      <div style={{ overscrollBehavior: "none" }}>
        {/* HEADING */}
        <div
          className=" bg-sp-gray-dark  h-16 text-center pt-2 text-white flex justify-between "
          style={{ top: "0px", overscrollBehavior: "none" }}
        >
          {/* back button */}
          <span className="mx-auto my-3 text-white text-center font-bold text-lg ">
            Chat
          </span>
          {/* 3 dots */}
        </div>
        {/* MESSAGES */}
        <div className="mt-20 mb-16">
          {/* SINGLE MESSAGE */}
          <div className="clearfix">
            <div className="bg-sp-gray-light w-3/4 mx-4 my-2 p-2 rounded-lg">
              Tell me Why?
            </div>
          </div>

          <div className="clearfix">
            <div className="bg-sp-gray-light w-3/4 mx-4 my-2 p-2 rounded-lg">
              Ain't nothing but a mistake
            </div>
          </div>
        </div>
      </div>
      {/* MESSAGE INPUT AREA */}
      <div
        className="flex absolute w-1/4 xl:w-2/8  bg-sp-gray-light items-center border-b-2 border-sp-green py-2"
        style={{ bottom: "0px" }}
      >
        <textarea
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          rows={1}
          placeholder="Message..."
          style={{ outline: "none" }}
          defaultValue={""}
        />
      </div>
    </div>
  );
};

export default ChatProto;
