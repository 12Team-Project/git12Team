import "../../styles/AnswerBadge.css";

export default function AnswerBadge({ hasAnswer }) {
    return (
        <>
            {hasAnswer ? (
                <div className="AnswerBadge AnswerBadge-Complete">답변완료</div>
            ) : (
                <div className="AnswerBadge AnswerBadge-NoAnswer">미답변</div>
            )}
        </>
    );
}
