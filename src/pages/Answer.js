import Header from "../components/feed/Header";

import { getQuestionList } from "../api/api";
import { getUserData } from "../api/api";
import { useState, useEffect } from "react";
import AnswerList from "../components/feed/answer/AnswerList";
import { useParams } from "react-router-dom";

export default function AnswerPage() {
    const [userData, setUserData] = useState({});
    const [questionList, setQuestionList] = useState([]);
    const [rendering, setRendering] = useState(false);
    const [nextPage, setNextPage] = useState("");
    const [loading, setLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const userData = await getUserData(id);
            const data = await getQuestionList(id);
            setUserData(userData);
            setQuestionList(data.results);
            setNextPage(data.next);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rendering, questionList.count]);

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            const data = await getQuestionList(id, nextPage);

            setQuestionList([...questionList, ...data.results]);
            setNextPage(data.next);
        } catch (e) {
            console.error("Error fetching more data", e);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Header userData={userData} />
            <div className="Post-background">
                <div className="answer-container">
                    <AnswerList
                        subjectId={id}
                        userData={userData}
                        questionList={questionList}
                        rendering={rendering}
                        setRendering={setRendering}
                        loading={loading}
                        nextPage={nextPage}
                        handleLoadMore={handleLoadMore}
                    />
                </div>
            </div>
        </>
    );
}
