import { useState, useEffect, useRef } from "react";
import arrow_down from "../../assets/icons/Stroke-down.svg";
import arrow_up from "../../assets/icons/Stroke-up.svg";

export default function Dropdown({ onChange }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [order, setOrder] = useState("time");
    const ORDER_KR = {
        time: "최신순",
        name: "이름순",
    };

    const dropdownContainerRef = useRef(null);

    const handleOrderChange = (order) => {
        setOrder(order);
        onChange(order);
        setDropdownOpen(false);
    };

    const handleDropdownClick = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownContainerRef.current &&
                !dropdownContainerRef.current.contains(e.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setDropdownOpen(false);
    }, [order]);

    return (
        <div className="dropdown-container" ref={dropdownContainerRef}>
            <div
                className={`dropdown ${isDropdownOpen ? "open" : ""}`}
                onClick={handleDropdownClick}>
                <div className="dropdown_button">
                    <div className="select">
                        <span>{ORDER_KR[order]}</span>
                        <img
                            src={isDropdownOpen ? arrow_up : arrow_down}
                            alt="arrow-icon"
                        />
                    </div>
                    {isDropdownOpen && (
                        <ul className="dropdown_contents">
                            <li
                                className={order === "name" ? "selected" : ""}
                                onClick={() => handleOrderChange("name")}>
                                이름순
                            </li>
                            <li
                                className={order === "time" ? "selected" : ""}
                                onClick={() => handleOrderChange("time")}>
                                최신순
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
