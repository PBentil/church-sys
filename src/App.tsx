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
import MembersLayout from "./pages/MembersLayout.tsx";
import MemberDashboard from "./pages/members /Memdash.tsx";
import MembersEvents from "./pages/members /MembersEvents.tsx";
import MembersDonations from "./pages/members /MembersDonation.tsx";
import MembersAnnouncements from "./pages/members /MembersAnnouncement.tsx";
import ProfilePage from "./pages/members /ProfilePage.tsx";


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
                    <MembersLayout>
                        <MemberDashboard />
                    </MembersLayout>
                }
            />
            <Route
                path="/MembersEvents"
                element={
                    <MembersLayout>
                        <MembersEvents />
                    </MembersLayout>
                }
            />
            <Route path="/MembersDonations" element={<MembersLayout><MembersDonations /></MembersLayout>} />
            <Route path="/MembersAnnouncements" element={<MembersLayout><MembersAnnouncements /></MembersLayout>} />
            <Route path="/ProfilePage" element={<MembersLayout><ProfilePage /></MembersLayout>} />
        </Routes>

    );
}

export default App;
