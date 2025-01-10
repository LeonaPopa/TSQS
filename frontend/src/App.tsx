import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WritingStyleProfile from "./pages/ProfilePage";
import LearningPathsPage from "./pages/LearningPathsPage";
import CoursePage from "./pages/CoursePage";
import LessonPage from "./pages/LessonPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<WritingStyleProfile />} />
        <Route path="/learning-paths" element={<LearningPathsPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/lesson" element={<LessonPage />} />
      </Routes>
    </>
  );
}

export default App;
