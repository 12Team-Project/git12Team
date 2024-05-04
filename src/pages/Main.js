import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoImg from "../assets/images/logo.svg";
import ArrowRightIcon from "../assets/icons/Arrow-right.svg";
import PersonIcon from "../assets/icons/Person.svg";
import "../styles/Main.css";

export default function MainPage() {
  let [inputName, setInputName] = useState(""); //사용자 이름 입력 상태관리
  // API : 이름입력 후 POST
  const postUser = async () => {
    try {
      const postReponse = await axios.post(
        "https://openmind-api.vercel.app/6-12/subjects/",
        {
          name: `${inputName}`,
        }
      );
      linkToUser(postReponse.data.id); // id파라미터를 업데이트 해 페이지 이동
    } catch (error) {
      alert("포스팅이 안되었어요.");
    }
  };

  // 질문받기 클릭 이벤트 핸들러 (API POST 진행)
  const postNewUser = () => {
    if (inputName !== "") {
      //입력창에 입력했을 때 새로운 유저 등록
      postUser();
    } else {
      alert("이름을 입력해주세요!");
    }
  };

  // 질문받기 클릭 이벤트 핸들러 (페이지 이동)
  const linkToUser = (userId) => {
    if (userId !== "") {
      window.location.href = `/post/${userId}/answer`;
    } else {
      alert("나의 페이지가 생성되지 않았어요.");
    }
  };

  return (
    <>
      <main className="main-main">
        <header className="main-header">
          <img className="main_header_logo" src={LogoImg} alt="로고이미지" />
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
                onChange={(e) => {
                  setInputName(e.target.value);
                }}
                value={inputName}
              />
            </div>
            <div className="input_button">
              <button onClick={postNewUser}>
                {/* <Link to={`/post/${newId}/answer`}> */}
                질문 받기
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
