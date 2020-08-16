import React from "react";
import { FaTimes, FaShareAlt } from "react-icons/fa";

function Heading({ title, subtitle }) {
  return (
    <div className="flex flex-wrap border-b-2 pb-2 border-sp-green">
      <div className="flex flex-col h-full w-1/2 justify-start">
        <h2 className="text-white font-bold text-xl">{title}</h2>
        <p className="text-sp-gray-alt font-medium text-sm">{subtitle}</p>
      </div>
      <div className="flex flex-col h-full w-1/2 justify-start">
        <span className="grid justify-end">
          <span className="grid grid-cols-2 w-16 pt-6 justify-end">
            <FaTimes size={17} textAnchor="middle" alignmentBaseline="middle" />
            <FaShareAlt
              size={15}
              textAnchor="middle"
              alignmentBaseline="middle"
            />
          </span>
        </span>
      </div>
    </div>
  );
}

export default Heading;
