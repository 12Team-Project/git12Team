import { useEffect, useState } from "react";
import {
    deleteUserData,
    getAllQuestionList,
    getListData,
    postNewSubject,
} from "../api/api";
import { Link } from "react-router-dom";
import "./AdminPage.css";

export default function AdminPage() {
    const [userList, setUserList] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUserQuestions, setSelectedUserQuestions] = useState([]);

    const fetchData = async () => {
        try {
            const res = await getListData();
            setUserList(res.results);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeleteButton = async (id) => {
        try {
            await deleteUserData(id);
            setUserList((prev) =>
                prev.filter((user) => user.id !== id)
            );
        } catch (e) {
            console.log(e);
        }
    };

    const handleCreateUser = async () => {
        try {
            await postNewSubject(newUserName);
            fetchData();
            setNewUserName("");
        } catch (e) {
            console.log(e);
        }
    };

    const handleQuestionView = async (id) => {
        try {
            const questions = await getAllQuestionList(id);
            setSelectedUserQuestions(questions.results);
            setModalOpen(true);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="admin-container">
            <h1 className="admin-header">User List</h1>

            <div style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder="닉네임"
                    style={{ marginRight: "10px" }}
                />
                <button onClick={handleCreateUser}>만들기</button>
            </div>

            <div className="user-list">
                {userList.map((user) => (
                    <div key={user.id} className="user-card">
                        <Link to={`/post/${user.id}`}>
                            <img
                                src={user.imageSource}
                                alt={user.name}
                            />
                        </Link>
                        <div className="user-info">
                            <p>
                                <strong>ID:</strong> {user.id}
                            </p>
                            <p>
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Question Count:</strong>{" "}
                                {user.questionCount}
                            </p>
                            <div className="action-buttons">
                                <button onClick={() => handleDeleteButton(user.id)}>
                                    삭제하기
                                </button>
                                <button
                                    className="question-button"
                                    onClick={() => handleQuestionView(user.id)}>
                                    질문보기
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalOpen && (
                <div className="modal-background" onClick={() => setModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>질문 리스트</h2>
                        <ul>
                            {selectedUserQuestions.map((question) => (
                                <li key={question.id}>
                                    {question.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
