import { useState } from "react";

import "../styles/Modal.css";
import messageIconBlack from "../assets/icons/Messages.svg";
import closeIcon from "../assets/icons/Close.svg";

const Modal = ({ setIsModalOpen, modalBackgroundRef, userData }) => {
  const [question, setQuestion] = useState("");

  const handleTextareaChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleQuestionSubmit = () => {};

  const handleModal = (e) => {
    if (e.target === modalBackgroundRef.current) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div
        className="modal-background"
        ref={modalBackgroundRef}
        onClick={handleModal}
      >
        <div className="modal-container">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-notice">
                <img
                  className="modal-icon"
                  src={messageIconBlack}
                  alt="messageIconBlack"
                />
                질문을 작성하세요
              </span>
              <img
                className="modal-icon close"
                src={closeIcon}
                alt="closeIcon"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <p className="modal-addressee">
              To.
              <img
                className="modal-icon profile"
                src={userData.imageSource}
                alt="profile"
              />
              {userData.name}
            </p>
            <textarea
              className="modal-input"
              type="text"
              placeholder="질문을 입력해주세요"
              value={question}
              onChange={handleTextareaChange}
            ></textarea>
            <button
              className="modal-btn"
              onClick={handleQuestionSubmit}
              disabled={!question}
            >
              질문 보내기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;