import { useEffect } from "react";

import "../../styles/Toast.css";

export default function Toast({ setIsToasting }) {
    useEffect(() => {
        let timer = setTimeout(() => {
            setIsToasting(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [setIsToasting]);

    return (
        <div className="toast">
            <p>URL이 복사되었습니다</p>
        </div>
    );
}
