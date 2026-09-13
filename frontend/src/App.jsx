import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Wildlife from "./pages/Wildlife";
import Detection from "./pages/Detection";
import Habitat from "./pages/Habitat";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import History from "./pages/History";
import AudioDetection from "./pages/AudioDetection";
import Analytics from "./pages/Analytics";
import Population from "./pages/Population";
import Conservation from "./pages/Conservation";
import EcosystemHealth from "./pages/EcosystemHealth";

import ProtectedRoute from "./components/ProtectedRoute";

// Role dashboards
import StudentDashboard from "./pages/StudentDashboard";
import ResearchOfficerDashboard from "./pages/ResearchOfficerDashboard";
import ForestOfficerDashboard from "./pages/ForestOfficerDashboard";


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= ROLE DASHBOARDS ================= */}

        {/* Student */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Research Officer */}
        <Route
          path="/research-officer-dashboard"
          element={
            <ProtectedRoute>
              <ResearchOfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Forest Officer */}
        <Route
          path="/forest-officer-dashboard"
          element={
            <ProtectedRoute>
              <ForestOfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= COMMON PAGES ================= */}

        <Route
          path="/wildlife"
          element={
            <ProtectedRoute>
              <Wildlife />
            </ProtectedRoute>
          }
        />

        <Route
          path="/detection"
          element={
            <ProtectedRoute>
              <Detection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audio"
          element={
            <ProtectedRoute>
              <AudioDetection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/habitat"
          element={
            <ProtectedRoute>
              <Habitat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/population"
          element={
            <ProtectedRoute>
              <Population />
            </ProtectedRoute>
          }
        />

        <Route
          path="/conservation"
          element={
            <ProtectedRoute>
              <Conservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ecosystem-health"
          element={
            <ProtectedRoute>
              <EcosystemHealth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;