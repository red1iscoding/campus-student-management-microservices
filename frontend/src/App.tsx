import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { StudentsPage } from "./pages/StudentsPage";
import { CoursesPage } from "./pages/CoursesPage";
import { UniversitiesPage } from "./pages/UniversitiesPage";
import { ExplorerPage } from "./pages/ExplorerPage";
import { ChatbotPage } from "./pages/ChatbotPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route
          path="/universities"
          element={<UniversitiesPage />}
        />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}