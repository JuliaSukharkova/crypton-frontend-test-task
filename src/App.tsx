import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Profile } from "./features/profile/Profile";
import { NotFoundPage } from "./features/notFound/NotFoundPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Auth } from "./features/auth/Auth";

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
