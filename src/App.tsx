// App.tsx
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Member";
import Events from "./pages/admin/event";
import Donations from "./pages/admin/Donations";
import Report from "./pages/admin/Report";
import Settings from "./pages/Settings";
import MainLayout from "./pages/MainLayout.tsx";
import MemberDashboard from "./pages/members /Memdash.tsx";

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes (with Sidebar) */}
            <Route
                path="/dashboard"
                element={
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                }
            />
            <Route
                path="/members"
                element={
                    <MainLayout>
                        <Members />
                    </MainLayout>
                }
            />
            <Route
                path="/events"
                element={
                    <MainLayout>
                        <Events />
                    </MainLayout>
                }
            />
            <Route
                path="/donations"
                element={
                    <MainLayout>
                        <Donations />
                    </MainLayout>
                }
            />
            <Route
                path="/reports"
                element={
                    <MainLayout>
                        <Report />
                    </MainLayout>
                }
            />
            <Route
                path="/settings"
                element={
                    <MainLayout>
                        <Settings />
                    </MainLayout>
                }
            />
            <Route
                path="/MemberDashboard"
                element={
                    <MainLayout>
                        <MemberDashboard />
                    </MainLayout>
                }
            />
        </Routes>
    );
}

export default App;
