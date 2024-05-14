import FeedCardAnswer from "./FeedCardAnswer";
import "../../../styles/Feed.css";
import "../../../styles/AnswerList.css";
import messageIconBrown from "../../../assets/icons/Messages-brown.svg";
import NoQuestion from "../NoQuestion";
import { deleteQuestion, deleteUserData } from "../../../api/api";
import { useNavigate } from "react-router-dom";

export default function AnswerList({
    subjectId,
    userData,
    questionList,
    rendering,
    setRendering,
    loading,
    handleLoadMore,
    nextPage,
}) {
    const navigate = useNavigate();

    const handleDeleteFeed = async () => {
        try {
            await deleteUserData(subjectId);
        } catch (e) {
            console.log(e.message);
        }
        navigate("/");
    };
    const handleDeleteQuestion = async (questionId) => {
        try {
            await deleteQuestion(questionId);
        } catch (e) {
            console.log(e.message);
        }
        setRendering(!rendering);
    };

    return (
        <>
            {userData.questionCount > 0 ? (
                <>
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
                        {questionList.map((item) => {
                            return (
                                <FeedCardAnswer
                                    key={item.id}
                                    data={item}
                                    userData={userData}
                                    rendering={rendering}
                                    setRendering={setRendering}
                                    onDeleteQuestion={handleDeleteQuestion}
                                />
                            );
                        })}
                        {loading && <div className="LoadMore">...</div>}
                        {!loading && nextPage && (
                            <div
                                className="LoadMore button"
                                onClick={handleLoadMore}>
                                더보기
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="answer-top-wrapper">
                        <button onClick={handleDeleteFeed}>삭제하기</button>
                    </div>
                    <NoQuestion />
                </>
            )}
        </>
    );
}
