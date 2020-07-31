import React from "react";

function Heading({ title, subtitle }) {
  return (
    <div className="flex flex-wrap border-b-2 pb-2 border-gray-700">
      <div className="flex flex-col h-full w-1/2 justify-start">
        <h2 className="text-white font-bold text-xl">{title}</h2>
        <p className="text-gray-400 font-medium text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default Heading;
