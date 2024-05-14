import { useState } from "react";
import "../../../styles/AnswerInputForm.css";

export default function AnswerInputForm({
    data,
    isEdit,
    onPostAnswer,
    onEditAnswer,
    answerContent,
    setAnswerContent,
}) {
    const initialValue = answerContent || [];

    const [inputValue, setInputValue] = useState(initialValue);
    const [active, setActive] = useState(false);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        setActive(e.target.value.trim() !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = {
            content: inputValue,
            isRejected: false,
        };
        if (isEdit) {
            await onEditAnswer(data.answer?.id, formData);
        } else {
            formData = {
                ...formData,
                questionId: data.id,
                team: "6-12",
            };
            await onPostAnswer(data.id, formData);
        }
        setAnswerContent(inputValue);
    };

    return (
        <div className="feedCard-Answer">
            <form className="answer-inputForm" onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    placeholder="답변을 입력해주세요"
                    value={inputValue}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className={`answer-inputButton ${active && "active"}`}
                    disabled={!active}>
                    {isEdit ? "수정 완료" : "답변 완료"}
                </button>
            </form>
        </div>
    );
}
