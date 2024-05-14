import "../../../styles/FeedButton.css";

export default function FeedButton({ onClick }) {
    return (
        <button className="FeedButton" onClick={onClick}>
            질문 작성하기
        </button>
    );
}
