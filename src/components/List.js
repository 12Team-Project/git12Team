import "../styles/List.css";
import logo from "../assets/images/logo.svg";
import arrow from "../assets/icons/Arrow-right-brown.svg";
import message from "../assets/icons/Messages.svg";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import { useEffect, useState } from "react";
import { getListData } from "../api/api";
import { useMediaQuery } from "react-responsive";
import Pagination from "./Pagination";

export default function List() {
  const [order, setOrder] = useState("time");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const TABLET_WIDTH = 1024;
  const MOBILE_WIDTH = 768;

  const userId = localStorage.getItem("userId");

  const isTablet = useMediaQuery({
    query: `(max-width: ${TABLET_WIDTH}px)`,
  });

  const isMobile = useMediaQuery({
    query: `(max-width: ${MOBILE_WIDTH}px)`,
  });

  function renderPageButtons(length, isTablet, isMobile) {
    const size = isTablet || isMobile ? 6 : 8;
    setItemsPerPage(size);
    setTotalPages(Math.ceil(length / size));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListData();
        setData(res.results);
        renderPageButtons(res.count, isTablet, isMobile);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    renderPageButtons(data.length, isTablet, isMobile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet, isMobile]);

  const handleSortOrderChange = (selectedOrder) => {
    setOrder(selectedOrder);
  };

  const sortData = (data, order) => {
    if (order === "time") {
      return data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (order === "name") {
      return data.slice().sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      (page === 1 && currentPage === 1) ||
      (page === totalPages && currentPage === totalPages)
    )
      return;
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortData(data, order).slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <div className="list-header">
        <Link to="/">
          <img src={logo} alt="logo" className="list-logo" />
        </Link>
        <Link
          to={userId ? `/post/${userId}/answer` : "/"}
          className="list-answer-button"
        >
          <span>답변하러 가기</span>
          <img src={arrow} alt="arrow" />
        </Link>
      </div>
      <div className="list-main">
        <div className="list-main-header">
          <h1 className="list-main-text">누구에게 질문할까요?</h1>
          <Dropdown onChange={handleSortOrderChange} />
        </div>
        <div className="list-subjects">
          {currentItems.map((item) => (
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
          ))}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
