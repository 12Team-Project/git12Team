import { useState } from "react";

import "../../../styles/Modal.css";

import messageIconBlack from "../../../assets/icons/Messages.svg";
import closeIcon from "../../../assets/icons/Close.svg";

export default function Modal({
    userData,
    setIsModalOpen,
    modalBackgroundRef,
    onSubmit,
}) {
    const [input, setInput] = useState({
        createdDate: new Date(),
        content: "",
    });

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const handleQuestionSubmit = async () => {
        try {
            const questionData = {
                createdDate: new Date(),
                content: input.content,
            };

            await onSubmit(questionData);
            setIsModalOpen(false);
            window.scrollTo(0, 0);
        } catch (e) {
            console.error("Failed to add question", e);
        }
    };

    const handleModal = (e) => {
        if (e.target === modalBackgroundRef.current) {
            setIsModalOpen(false);
        }
    };

    return (
        <div
            className="Modal-background"
            ref={modalBackgroundRef}
            onClick={handleModal}>
            <div className="Modal-container">
                <div className="Modal-content">
                    <div className="Modal-header">
                        <span className="Modal-notice">
                            <img
                                className="Modal-icon"
                                src={messageIconBlack}
                                alt="messageIconBlack"
                            />
                            질문을 작성하세요
                        </span>
                        <img
                            className="Modal-icon close"
                            src={closeIcon}
                            alt="closeIcon"
                            onClick={() => setIsModalOpen(false)}
                        />
                    </div>
                    <p className="Modal-addressee">
                        To.
                        <img
                            className="Modal-icon profile"
                            src={userData.imageSource}
                            alt="profile"
                        />
                        {userData.name}
                    </p>
                    <textarea
                        className="Modal-input"
                        placeholder="질문을 입력해주세요"
                        type="text"
                        name="content"
                        value={input.content}
                        onChange={onChangeInput}></textarea>
                    <button
                        className="Modal-btn"
                        onClick={handleQuestionSubmit}
                        disabled={!input.content}>
                        질문 보내기
                    </button>
                </div>
            </div>
        </div>
    );
}
