import timeString from "../../../utils/timeString";

export default function AnswerUserProfile({
    imageSource,
    name,
    answerCreatedAt,
    children,
    hasAnswer,
}) {
    const answerFormattedDate = timeString(answerCreatedAt);

    return (
        <div className="FeedCard-answer">
            <img
                className="FeedCard-profileImage"
                src={imageSource}
                alt="profile"
            />
            <div className="FeedCard-content">
                <div className="FeedCard-username">
                    {name}
                    {hasAnswer && (
                        <span className="FeedCard-CreatedAt">
                            {answerFormattedDate}
                        </span>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}
