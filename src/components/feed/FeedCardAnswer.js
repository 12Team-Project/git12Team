import { useEffect, useState } from "react";
import "../../styles/FeedCard.css";
import "../../styles/FeedCardAnswer.css";
import AnswerBadge from "./AnswerBadge";
import timeString from "../../utils/timeString";
import AnswerInputForm from "./AnswerInputForm";
import { deleteAnswer, deleteQuestion, editAnswer, postAnswer } from "../../api/api";
import AnswerUserProfile from "./AnswerUserProfile";
import AnswerContent from "./AnswerContent";
import AnswerDropdown from "./AnswerDropdown";
import Reactions from "./Reactions";

const FeedCardAnswer = ({ data, userData, rendering, setRendering }) => {
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
    };

    const handleDropdownClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDeleteAnswer = () => {
        deleteQuestion(id);
        setRendering(!rendering);
    };

    const handleRejectAnswer = () => {
        postAnswer(id, {
            questionId: id,
            content: "rejected",
            isRejected: true,
            team: "6-12",
        });
        setHasAnswer(true);
        setIsEdit(false);
        setRendering(!rendering);
    };

    const onPostAnswer = (questionId, answerData) => {
        postAnswer(questionId, answerData);
        setHasAnswer(true);
        setIsEdit(false);
        setRendering(!rendering);
    };
    const onEditAnswer = (answerId, editAnswerData) => {
        editAnswer(answerId, editAnswerData);
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
                    handleDeleteAnswer={handleDeleteAnswer}
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
};

export default FeedCardAnswer;
