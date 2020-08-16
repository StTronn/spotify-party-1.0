import React from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

const customStyles = {
  content: {
    display: "grid",
    background: "#131313",
    gridTemplateRows: "1fr auto 1fr",
    color: "white",
    height: "50vh",
    borderRadius: "10px",
    width: "25vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const ShareLinkModal = ({ modalIsOpen, setIsOpen, roomId }) => {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span style={{ justifySelf: "end" }} onClick={closeModal}>
          <FaTimes />
        </span>

        <div className="font-bold text-center text-1xl text-white mb-2">
          Join room using below id.
        </div>
        <div className="font-bold text-center text-2xl text-sp-green mb-2">
          {roomId}
        </div>
      </Modal>
    </div>
  );
};

export default ShareLinkModal;
