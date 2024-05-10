import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/Header.css";

import Toast from "./Toast";
import headerBackgroundImage from "../assets/images/Image2.svg";
import headerLogo from "../assets/images/logo.svg";
import shareCopy from "../assets/icons/Link.svg";
import shareKakao from "../assets/icons/Kakao.svg";
import shareFacebook from "../assets/icons/Facebook.svg";

const Header = ({ userData }) => {
    const [isToasting, setIsToasting] = useState(false);

    const currentUrl = window.location.href;

    const copyUrl = () => {
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                setIsToasting(true);
            })
            .catch((e) => {
                console.error("Failed to copy URL:", e);
            });
    };

    return (
        <header>
            <div className="Header-container">
                <img
                    src={headerBackgroundImage}
                    className="Header-backgroundImage"
                    alt="header-backgroundImage"
                />
            </div>

            <div className="Header-wrapper">
                <Link to="/">
                    <img className="Header-logo" src={headerLogo} alt="logo" />
                </Link>
                <img
                    className="Header-profileImage"
                    src={userData.imageSource}
                    alt="header-profileImage"
                />
                <p className="Header-userName">{userData.name}</p>
                <div className="Header-shareLink">
                    <img
                        className="Header-shareIcon"
                        src={shareCopy}
                        alt="shareCopy"
                        onClick={() => copyUrl()}
                    />
                    <img
                        className="Header-shareIcon"
                        src={shareKakao}
                        alt="shareKakao"
                    />
                    <img
                        className="Header-shareIcon"
                        src={shareFacebook}
                        alt="shareFacebook"
                        onClick={() => {
                            window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
                                "페이스북 공유하기",
                                "location=no,status=no,scrollbars=yes"
                            );
                        }}
                    />
                </div>
                {isToasting && <Toast setIsToasting={setIsToasting} />}
            </div>
        </header>
    );
};

export default Header;
