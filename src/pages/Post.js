import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserData, getQuestionList, addQuestion } from "../api/api";

import "../styles/Post.css";

import Feed from "../components/feed/Feed";
import FeedButton from "../components/feed/FeedButton";
import Modal from "../components/Modal";
import Header from "../components/Header";

export default function PostPage() {
    const [userData, setUserData] = useState({});
    const [questionList, setQuestionList] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalBackgroundRef = useRef();
    const { id } = useParams();

    async function fetchUserData() {
        try {
            const userData = await getUserData(id);
            setUserData(userData);
        } catch (e) {
            console.e("Failed to fetch user data", e);
        }
    }

    async function fetchQuestionList() {
        try {
            const questionList = await getQuestionList(id);
            setQuestionList(questionList);
        } catch (e) {
            console.error("Failed to fetch question list", e);
        }
    }

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        fetchQuestionList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [questionList]);

    const openModal = () => setIsModalOpen(true);

    const onSubmit = async (input) => {
        try {
            await addQuestion(userData.id, input);
            fetchQuestionList();
            setIsModalOpen(false);
        } catch (e) {
            console.error("Failed to add question:", e);
            alert("질문을 추가하는 중에 오류가 발생했어요");
        }
    };

    return (
        <>
            <Header userData={userData} />
            <div className="Post-background">
                <Feed userData={userData} questionList={questionList} id={id} />
                <FeedButton onClick={openModal} />
                {isModalOpen && (
                    <Modal
                        userData={userData}
                        setIsModalOpen={setIsModalOpen}
                        modalBackgroundRef={modalBackgroundRef}
                        onSubmit={onSubmit}
                    />
                )}
            </div>
        </>
    );
}
