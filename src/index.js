import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";

const siteUrl = process.env.REACT_APP_SITE_URL;

const setMetaTags = () => {
    document
        .querySelector('meta[property="og:image"]')
        .setAttribute("content", `${siteUrl}/favicon.ico`);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

setMetaTags();

root.render(
    <Router>
        <App />
    </Router>
);
