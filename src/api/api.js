import axios from "axios";

const BASE_URL = "https://openmind-api.vercel.app/6-12";

export async function getListData() {
    try {
        const res = await axios.get(
            `${BASE_URL}/subjects/?limit=9999&offset=0`
        );
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getUserData(subjectId) {
    try {
        const res = await axios.get(`${BASE_URL}/subjects/${subjectId}/`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getQuestionList(subjectId, nextPage = "") {
    try {
        const url = nextPage || `${BASE_URL}/subjects/${subjectId}/questions/`;
        const res = await axios.get(url, {
            params: {
                limit: 5,
            },
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export async function getAllQuestionList(subjectId) {
    try {
        const url = `${BASE_URL}/subjects/${subjectId}/questions/`;
        const res = await axios.get(url, {
            params: {
                limit: 30,
            },
        });
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export async function addQuestion(subjectId, questionData) {
    try {
        const res = await axios.post(
            `${BASE_URL}/subjects/${subjectId}/questions/`,
            questionData
        );
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

//유저데이터 삭제
export async function deleteUserData(subjectId) {
    try {
        const res = await axios.delete(`${BASE_URL}/subjects/${subjectId}/`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

//질문 삭제
export async function deleteQuestion(questionId) {
    try {
        const res = await axios.delete(`${BASE_URL}/questions/${questionId}/`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

//답변하기
export async function postAnswer(questionId, answerData) {
    try {
        const res = await axios.post(
            `${BASE_URL}/questions/${questionId}/answers/`,
            answerData
        );
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

//답변삭제
export async function deleteAnswer(answerId) {
    try {
        const res = await axios.delete(`${BASE_URL}/answers/${answerId}/`);
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

//답변수정
export async function editAnswer(answerId, editAnswerData) {
    try {
        const res = await axios.put(
            `${BASE_URL}/answers/${answerId}/`,
            editAnswerData
        );
        return res.data;
    } catch (e) {
        console.error(e);
    }
}

export async function postNewSubject(inputName) {
    try {
        const res = await axios.post(
            `${BASE_URL}/subjects/`,
            {
                name: `${inputName}`,
            }
        );
        return res;
    } catch (error) {
        console.log(error);
        alert("포스팅이 안되었어요.");
    }
}

// 리액션
export async function postReaction(questionId, reaction) {
    try {
        const res = await axios.post(
            `${BASE_URL}/questions/${questionId}/reaction/`,
            {
                type: `${reaction}`,
            }
        );
        return res;
    } catch (e) {
        console.log(e);
    }
}