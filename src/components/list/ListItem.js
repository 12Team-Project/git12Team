import React from "react";
import { Link } from "react-router-dom";
import message from "../../assets/icons/Messages.svg";

export default function ListItem({ item }) {
    return (
        <Link to={`/post/${item.id}`} key={item.id}>
            <div className="list-subject-container">
                <div className="list-profile-container">
                    <div className="list-profile">
                        <img
                            className="list-profile-img"
                            src={item.imageSource}
                            alt="profile-img"
                        />
                    </div>
                    <p className="list-profile-name">{item.name}</p>
                </div>
                <div className="list-info-container">
                    <div className="list-info">
                        <img
                            src={message}
                            className="list-info-img"
                            alt="message"
                        />
                        <p className="list-info-text">받은 질문</p>
                    </div>
                    <p className="list-info-count">{item.questionCount}개</p>
                </div>
            </div>
        </Link>
    );
}
