import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {useState} from "react";
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
import MembersLayout from "./pages/MembersLayout.tsx";
import MemberDashboard from "./pages/members /Memdash.tsx";
import MembersEvents from "./pages/members /MembersEvents.tsx";
import MembersDonations from "./pages/members /MembersDonation.tsx";
import MembersAnnouncements from "./pages/members /MembersAnnouncement.tsx";
import ProfilePage from "./pages/members /ProfilePage.tsx";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";


const App = ()=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigate("/dashboard");
    }


    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes (with Sidebar) */}
            <Route
                path="/dashboard"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MainLayout>
                        <Dashboard />
                    </MainLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/members"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MainLayout>
                        <Members />
                    </MainLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/events"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MainLayout>
                        <Events />
                    </MainLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/donations"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MainLayout>
                        <Donations />
                    </MainLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/reports"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MainLayout>
                        <Report />
                    </MainLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/settings"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MainLayout>
                        <Settings />
                    </MainLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/MemberDashboard"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MembersLayout>
                        <MemberDashboard />
                    </MembersLayout>
                </ProtectedRoute>

                }
            />
            <Route
                path="/MembersEvents"
                element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MembersLayout>
                        <MembersEvents />
                    </MembersLayout>
                </ProtectedRoute>

                }
            />
            <Route path="/MembersDonations" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}><MembersLayout><MembersDonations /></MembersLayout></ProtectedRoute> } />
            <Route path="/MembersAnnouncements" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MembersLayout><MembersAnnouncements /></MembersLayout>
                </ProtectedRoute>
                    } />
            <Route path="/ProfilePage" element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <MembersLayout><ProfilePage /></MembersLayout>
                </ProtectedRoute>
                } />
        </Routes>

    );
}

export default App;
