import React from "react";
import { FaRecordVinyl, FaCommentAlt } from "react-icons/fa";

const selectedClass = "grid align-items-center text-sp-green";
const altClass = "grid align-items-center text-sp-gray-alt";
const BottomNav = ({ chatOpen, setChatOpen }) => {
  return (
    <div
      style={{ justifyItems: "center", alignItems: "center" }}
      className="bg-sp-gray-highlight px-16 text-sp-gray-alt md:hidden grid grid-cols-2  block fixed justify-items-center inset-x-0 bottom-0 z-10 bg-white shadow py-2"
    >
      <div
        onClick={() => {
          setChatOpen(false);
        }}
        style={{ justifyItems: "center", alignItems: "center" }}
        className={!chatOpen ? selectedClass : altClass}
      >
        <FaRecordVinyl textAnchor="" size={17} />
        <p className=" font-medium text-sm"> Room</p>
      </div>
      <div
        onClick={() => {
          setChatOpen(true);
        }}
        style={{ justifyItems: "center", alignItems: "center" }}
        className={chatOpen ? selectedClass : altClass}
      >
        <FaCommentAlt size={17} textAnchor="end" alignmentBaseline="middle" />
        <p className="text-sp-gray-alt font-medium text-sm"> Chat</p>
      </div>
    </div>
  );
};

export default BottomNav;
