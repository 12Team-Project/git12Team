import { useEffect, useState } from "react";
import "../../../styles/FeedCard.css";
import "../../../styles/FeedCardAnswer.css";
import AnswerBadge from "../AnswerBadge";
import timeString from "../../../utils/timeString";
import AnswerInputForm from "./AnswerInputForm";
import { editAnswer, postAnswer } from "../../../api/api";
import AnswerUserProfile from "./AnswerUserProfile";
import AnswerContent from "./AnswerContent";
import AnswerDropdown from "./AnswerDropdown";
import Reactions from "../Reactions";

export default function FeedCardAnswer({
    data,
    userData,
    rendering,
    setRendering,
    onDeleteQuestion,
}) {
    const {
        id,
        content,
        like,
        dislike,
        createdAt,
        answer, //: initAnswer,
    } = data;
    const { name, imageSource } = userData;

    const { isRejected, createdAt: answerCreatedAt } = answer || {};
    const [isEdit, setIsEdit] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [answerContent, setAnswerContent] = useState(null);
    const [hasAnswer, setHasAnswer] = useState(!!answer);
    useEffect(() => {
        answer ? setAnswerContent(answer.content) : setAnswerContent(null);
    }, [answer]);

    const handleEditClick = () => {
        setIsEdit(!isEdit);
        setDropdownOpen(false);
    };

    const handleDropdownClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDeleteQuestion = () => {
        onDeleteQuestion(id);
    };

    const handleRejectAnswer = async () => {
        try {
            await postAnswer(id, {
                questionId: id,
                content: "rejected",
                isRejected: true,
                team: "6-12",
            });
        } catch (e) {
            console.log(e.message);
        }
        setHasAnswer(true);
        setIsEdit(false);
        setRendering(!rendering);
        setDropdownOpen(false);
    };

    const onPostAnswer = async (questionId, answerData) => {
        try {
            await postAnswer(questionId, answerData);
        } catch (e) {
            console.log(e.message);
        }
        setHasAnswer(true);
        setIsEdit(false);
        setRendering(!rendering);
    };

    const onEditAnswer = async (answerId, editAnswerData) => {
        try {
            await editAnswer(answerId, editAnswerData);
        } catch (e) {
            console.log(e.message);
        }
        setHasAnswer(true);
        setIsEdit(false);
        setRendering(!rendering);
    };

    const formattedDate = timeString(createdAt);

    return (
        <div
            className="FeedCard"
            key={id}
            onClick={() => setDropdownOpen(false)}>
            <div className="FeedCard-answer-top">
                <AnswerBadge hasAnswer={hasAnswer} />
                <AnswerDropdown
                    handleDeleteQuestion={handleDeleteQuestion}
                    handleEditClick={handleEditClick}
                    handleRejectAnswer={handleRejectAnswer}
                    handleDropdownClick={handleDropdownClick}
                    isDropdownOpen={isDropdownOpen}
                    hasAnswer={hasAnswer}
                    isRejected={isRejected}
                    isEdit={isEdit}
                />
            </div>
            <div className="FeedCard-container">
                <div className="FeedCard-question">
                    <div className="FeedCard-CreatedAt">
                        질문 • {formattedDate}
                    </div>
                    <div className="FeedCard-head">{content}</div>
                </div>

                <AnswerUserProfile
                    imageSource={imageSource}
                    name={name}
                    answerCreatedAt={answerCreatedAt}
                    hasAnswer={hasAnswer}>
                    {hasAnswer ? ( //답변이 있으면
                        !isEdit ? ( //수정중이 아니라면
                            <AnswerContent
                                isRejected={isRejected}
                                answerContent={answerContent}
                            />
                        ) : (
                            <AnswerInputForm
                                data={data}
                                isEdit={isEdit}
                                onPostAnswer={onPostAnswer}
                                onEditAnswer={onEditAnswer}
                                answerContent={answerContent}
                                setAnswerContent={setAnswerContent}
                            />
                        )
                    ) : (
                        <AnswerInputForm
                            data={data}
                            onPostAnswer={onPostAnswer}
                            onEditAnswer={onEditAnswer}
                            answerContent={answerContent}
                            setAnswerContent={setAnswerContent}
                        />
                    )}
                </AnswerUserProfile>
            </div>
            <Reactions like={like} dislike={dislike} />
        </div>
    );
}
