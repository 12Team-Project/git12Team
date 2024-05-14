import moreIcon from "../../../assets/icons/More.svg";

export default function AnswerDropdown({
    handleDeleteQuestion,
    handleEditClick,
    handleRejectAnswer,
    handleDropdownClick,
    isDropdownOpen,
    hasAnswer,
    isRejected,
    isEdit,
}) {
    return (
        <div className="Answer-dropdown" onClick={(e) => e.stopPropagation()}>
            <button
                className="Answer-dropdown-btn"
                onClick={handleDropdownClick}>
                <img src={moreIcon} alt={"더보기 아이콘"} />
            </button>
            <div
                className={`Answer-dropdown-contents${isDropdownOpen === true ? " open" : ""}`}>
                {hasAnswer && !isRejected && (
                    <>
                        <button className="edit-btn" onClick={handleEditClick}>
                            {!isEdit ? "수정하기" : "취소하기"}
                        </button>
                    </>
                )}

                {!isEdit && (
                    <button
                        className="delete-btn"
                        onClick={handleDeleteQuestion}>
                        삭제하기
                    </button>
                )}
                {!hasAnswer && (
                    <button className="reject-btn" onClick={handleRejectAnswer}>
                        거절하기
                    </button>
                )}
            </div>
        </div>
    );
}
