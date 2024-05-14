import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/List";
import PostPage from "./pages/Post";
import MainPage from "./pages/Main";
import AnswerPage from "./pages/Answer";
import AdminPage from "./pages/admin";
import NotFound from "./pages/NotFound";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/post/:id/answer" element={<AnswerPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}
