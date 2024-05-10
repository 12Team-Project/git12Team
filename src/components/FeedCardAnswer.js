import { useEffect, useState } from "react";
import "../styles/FeedCard.css";
import "../styles/FeedCardAnswer.css";
import AnswerBadge from "./feed/AnswerBadge";
import likeIconOff from "../assets/icons/thumbs-up-gray.svg";
import dislikeIconOff from "../assets/icons/thumbs-down-gray.svg";
import likeIconOn from "../assets/icons/thumbs-up-blue.svg";
import dislikeIconOn from "../assets/icons/thumbs-down-blue.svg";
import moreIcon from "../assets/icons/More.svg";
import AnswerInputForm from "./AnswerInputForm";
import { deleteAnswer, editAnswer, postAnswer } from "../api/api";

const FeedCardAnswer = (props) => {
    function TimeString(time) {
        const currentDate = new Date();
        const createdDate = new Date(time);

        const timeDiff = currentDate - createdDate;

        const hoursDiff = timeDiff / (1000 * 60 * 60);
        const daysDiff = hoursDiff / 24;
        const weeksDiff = daysDiff / 7;
        const monthsDiff = daysDiff / 30;

        if (monthsDiff >= 1) {
            return Math.floor(monthsDiff) + "달 전";
        } else if (weeksDiff >= 1) {
            return Math.floor(weeksDiff) + "주 전";
        } else if (daysDiff >= 1) {
            return Math.floor(daysDiff) + "일 전";
        } else if (hoursDiff >= 1) {
            return Math.floor(hoursDiff) + "시간 전";
        } else {
            return "방금 전";
        }
    }

    const {
        id,
        content,
        like,
        dislike,
        createdAt,
        answer, //: initAnswer,
    } = props.data;
    const { name, imageSource } = props.userData;
    const { rendering, setRendering } = props;
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
    // let answerContent = answer?.content;

    // if (isRejected) {
    //     setAnswerContent("답변 거절");
    // }

    const [likeClicked, setLikeClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false);

    const handleLikeClick = () => {
        setLikeClicked(!likeClicked);
        setDislikeClicked(false);
    };

    const handleDislikeClick = () => {
        setDislikeClicked(!dislikeClicked);
        setLikeClicked(false);
    };

    const handleDropdownClick = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleDeleteAnswer = () => {
        deleteAnswer(answer.id);
        setHasAnswer(false);
        setIsEdit(false);
        setAnswerContent(null);
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

    const formattedDate = TimeString(createdAt);
    const answerFormattedDate = TimeString(answerCreatedAt);

    return (
        <div
            className="FeedCard"
            key={id}
            onClick={() => setDropdownOpen(false)}>
            <div className="FeedCard-answer-top">
                <AnswerBadge hasAnswer={hasAnswer} />
                <div
                    className="Answer-dropdown"
                    onClick={(e) => e.stopPropagation()}>
                    <button
                        className="Answer-dropdown-btn"
                        onClick={handleDropdownClick}>
                        <img src={moreIcon} alt={"더보기 아이콘"} />
                    </button>
                    <div
                        className={`Answer-dropdown-contents${isDropdownOpen === true ? " open" : ""}`}>
                        {hasAnswer && (
                            <>
                                <button
                                    className="edit-btn"
                                    onClick={handleEditClick}>
                                    {!isEdit ? "수정하기" : "취소하기"}
                                </button>
                            </>
                        )}

                        {hasAnswer && (
                            <button
                                className="delete-btn"
                                onClick={handleDeleteAnswer}>
                                삭제하기
                            </button>
                        )}
                        {!hasAnswer && (
                            <button
                                className="reject-btn"
                                onClick={handleRejectAnswer}>
                                거절하기
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="FeedCard-container">
                <div className="FeedCard-question">
                    <div className="FeedCard-CreatedAt">
                        질문 • {formattedDate}
                    </div>
                    <div>{content}</div>
                </div>

                <div className="FeedCard-answer">
                    <img
                        className="FeedCard-profileImage"
                        src={imageSource}
                        alt="profile"
                    />
                    <div className="FeedCard-content">
                        <div className="FeedCard-username">
                            {name}
                            {hasAnswer && (
                                <span className="FeedCard-CreatedAt">
                                    {answerFormattedDate}
                                </span>
                            )}
                        </div>
                        {hasAnswer ? ( //답변이 있으면
                            !isEdit ? ( //수정중이 아니라면
                                <div
                                    className={`feedCard-Answer ${isRejected ? "FeedCard-rejected" : ""}`}>
                                    {isRejected ? "답변거절" : answerContent}
                                </div>
                            ) : (
                                <div className="feedCard-Answer">
                                    <AnswerInputForm
                                        data={props.data}
                                        isEdit={isEdit}
                                        onPostAnswer={onPostAnswer}
                                        onEditAnswer={onEditAnswer}
                                        answerContent={answerContent}
                                        setAnswerContent={setAnswerContent}
                                    />
                                </div>
                            )
                        ) : (
                            <div className="feedCard-Answer">
                                <AnswerInputForm
                                    data={props.data}
                                    onPostAnswer={onPostAnswer}
                                    onEditAnswer={onEditAnswer}
                                    answerContent={answerContent}
                                    setAnswerContent={setAnswerContent}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="FeedCard-reactionContainer">
                <div
                    className={`FeedCard-reaction ${likeClicked ? "clicked" : ""}`}
                    onClick={handleLikeClick}>
                    <img
                        src={likeClicked ? likeIconOn : likeIconOff}
                        alt="likeIcon"
                        className="FeedCard-reactionIcon"
                    />
                    좋아요 {like > 0 && like}
                </div>
                <div
                    className={`FeedCard-reaction ${dislikeClicked ? "clicked" : ""}`}
                    onClick={handleDislikeClick}>
                    <img
                        src={dislikeClicked ? dislikeIconOn : dislikeIconOff}
                        alt="dislikeIcon"
                        className="FeedCard-reactionIcon"
                    />
                    싫어요 {dislike > 0 && dislike}
                </div>
            </div>
        </div>
    );
};

export default FeedCardAnswer;