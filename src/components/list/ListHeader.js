import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import arrow from "../../assets/icons/Arrow-right-brown.svg";

export default function ListHeader({ userId }) {
    return (
        <div className="list-header">
            <Link to="/">
                <img src={logo} alt="logo" className="list-logo" />
            </Link>
            <Link
                to={userId ? `/post/${userId}/answer` : "/"}
                className="list-answer-button">
                <span>답변하러 가기</span>
                <img src={arrow} alt="arrow" />
            </Link>
        </div>
    );
}
