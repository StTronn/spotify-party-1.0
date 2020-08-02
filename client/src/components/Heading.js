import React from "react";

function Heading({ title, subtitle }) {
  return (
    <div className="flex flex-wrap border-b-2 pb-2 border-sp-green">
      <div className="flex flex-col h-full w-1/2 justify-start">
        <h2 className="text-white font-bold text-xl">{title}</h2>
        <p className="text-sp-gray-alt font-medium text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

export default Heading;
