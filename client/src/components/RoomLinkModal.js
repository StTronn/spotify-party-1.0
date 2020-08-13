import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const LoginButton = styled.div`
  width: 250px;
  height: 35px;
`;

const customStyles = {
  content: {
    display: "grid",
    background: "#131313",
    gridTemplateRows: "1fr auto 1fr",
    color: "white",
    height: "50vh",
    borderRadius: "10px",
    width: "35vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const RoomLinkModal = ({ modalIsOpen, setIsOpen }) => {
  var subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span style={{ justifySelf: "end" }} onClick={closeModal}>
          <FaTimes />
        </span>
        <span className="flex items-center border-b border-sp-green py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter link of room"
            aria-label="Full name"
          />
        </span>
        <div style={{ justifySelf: "center" }}>
          <LoginButton className="bg-sp-green mt-8 pt-1 text-base leading-6 font-medium text-white rounded-full text-center">
            <a
              className="w-full flex items-center justify-center"
              href="http://localhost:8888/login"
            >
              Join Room{" "}
            </a>
          </LoginButton>
        </div>
      </Modal>
    </div>
  );
};

export default RoomLinkModal;
