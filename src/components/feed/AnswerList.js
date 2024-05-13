import FeedCardAnswer from "./FeedCardAnswer";
import "../../styles/Questions.css";
import "../../styles/AnswerList.css";
import messageIconBrown from "../../assets/icons/Messages-brown.svg";
import emptyMessageIcon from "../../assets/icons/Empty-message.svg";
import { deleteUserData } from "../../api/api";
import { useNavigate } from "react-router-dom";

export const AnswerList = ({
    subjectId,
    userData,
    questionList,
    rendering,
    setRendering,
}) => {
    const navigate = useNavigate();

    const handleDeleteFeed = () => {
        deleteUserData(subjectId);
        navigate("/");
    };

    return (
        <>
            {userData.questionCount > 0 ? (
                <div className="answer-container">
                    <div className="answer-top-wrapper">
                        <button onClick={handleDeleteFeed}>삭제하기</button>
                    </div>
                    <div className="Questions-container">
                        <span className="Questions-numberOfQuestions">
                            <img
                                src={messageIconBrown}
                                alt="messageIconBrown"
                            />{" "}
                            {userData.questionCount}개의 질문이 있습니다
                        </span>
                        {questionList.results.map((item) => {
                            return (
                                <FeedCardAnswer
                                    key={item.id}
                                    data={item}
                                    userData={userData}
                                    rendering={rendering}
                                    setRendering={setRendering}
                                />
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="answer-container">
                    <div className="answer-top-wrapper">
                        <button onClick={handleDeleteFeed}>삭제하기</button>
                    </div>
                    <div className="Questions-container noQuestion">
                        <span className="Questions-numberOfQuestions">
                            <img
                                src={messageIconBrown}
                                alt="messageIconBrown"
                            />{" "}
                            아직 질문이 없습니다
                        </span>
                        <img
                            className="Questions-emptyMessageIcon"
                            src={emptyMessageIcon}
                            alt="emptyMessageIcon"
                        />
                    </div>
                </div>
            )}
        </>
    );
};
