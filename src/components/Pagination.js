import React from "react";
import arrow_left from "../assets/icons/Arrow-left.svg";
import arrow_right from "../assets/icons/Arrow-right.svg";
import arrow_left_gray from "../assets/icons/Arrow-left-gray.svg";
import arrow_right_gray from "../assets/icons/Arrow-right-gray.svg";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <div
        key={i}
        onClick={() => onPageChange(i)}
        className={`pageBtn ${currentPage === i ? "active" : ""}`}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="pagination">
      <img
        src={currentPage === 1 ? arrow_left_gray : arrow_left}
        className={`pageBtn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        alt="arrow_left"
      />
      {pageNumbers}
      <img
        src={currentPage === totalPages ? arrow_right_gray : arrow_right}
        className={`pageBtn ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        alt="arrow_right"
      />
    </div>
  );
};

export default Pagination;
