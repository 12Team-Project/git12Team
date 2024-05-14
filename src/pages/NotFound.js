import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <>
            <div class="snowflakes">
                <div class="snowflake">🙀</div>
                <div class="snowflake">🙀</div>
                <div class="snowflake">🙀</div>
                <div class="snowflake">🙀</div>
                <div class="snowflake">🙀</div>
                <div class="snowflake">🙀</div>
                <div class="snowflake">🙀</div>
            </div>
            <div className="not_found">
                <div className="notice">
                    <h2>
                        4<span>😿</span>4 page
                    </h2>
                    <h1>Page Not Found</h1>
                    <button
                        onClick={() => {
                            navigate("/");
                        }}>
                        메인으로 돌아가기
                    </button>
                </div>
            </div>
        </>
    );
}
