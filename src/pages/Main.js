import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoImg from "../assets/images/logo.svg";
import ArrowRightIcon from "../assets/icons/Arrow-right.svg";
import PersonIcon from "../assets/icons/Person.svg";
import { getListData, postNewSubject } from "../api/api";
import "../styles/Main.css";

export default function MainPage() {
    const [inputName, setInputName] = useState(""); //사용자 이름 입력 상태관리
    const [enrolledLists, setErolledLists] = useState(false); //등록된 이름 리스트 상태관리
    const navigate = useNavigate();

    //input onChange 관리
    const onChangeInput = (e) => {
        setInputName(e.target.value);
    };

    // API : 이름입력 후 POST
    const fetchPostSubject = async () => {
        try {
            const res = await postNewSubject(inputName);
            linkToUser(res.data.id); // id 페이지이동
        } catch (error) {
            console.log(error);
            alert("포스팅이 안되었어요.");
        }
    };

    // API : 전체 SUBJECT 리스트 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getListData();
                const enroledArr = res.results;
                const onlyName = enroledArr.map((subject) => {
                    //이름만 뽑아서 새로운 배열 생성
                    return subject.name;
                });
                setErolledLists(onlyName);
            } catch (error) {
                console.log(error);
                alert("다시 시도해주세요.");
            }
        };
        fetchData();
    }, []);

    // 질문받기 클릭 이벤트 핸들러 (API POST 진행)
    const postNewUser = () => {
        const isExist = enrolledLists.includes(inputName); //true false 반환
        console.log(inputName);
        if (inputName === "") {
            alert("이름을 입력해주세요!");
        } else if (isExist === true) {
            alert("이미 존재하는 이름입니다.");
        } else {
            fetchPostSubject();
        }
    };

    // 질문받기 클릭 이벤트 핸들러 (페이지 이동)
    const linkToUser = (userId) => {
        if (userId !== "") {
            navigate(`/post/${userId}/answer`);
            localStorage.setItem("userId", `${userId}`);
        } else {
            alert("나의 페이지가 생성되지 않았어요.");
        }
    };

    return (
        <main className="main-main">
            <header className="main-header">
                <img
                    className="main_header_logo"
                    src={LogoImg}
                    alt="로고이미지"
                />
                <button className="main_top_btn">
                    <Link to="/list">
                        질문하러 가기
                        <span>
                            <img src={ArrowRightIcon} alt="로고이미지" />
                        </span>
                    </Link>
                </button>
            </header>
            <div className="main_container">
                <div className="main_login_box">
                    <div className="input_form">
                        <span>
                            <img src={PersonIcon} alt="로고이미지" />
                        </span>
                        <input
                            type="text"
                            placeholder="이름을 입력하세요."
                            onChange={onChangeInput}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    postNewUser();
                                }
                            }}
                            value={inputName}
                        />
                    </div>
                    <div className="input_button">
                        <button onClick={postNewUser}>질문 받기</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
