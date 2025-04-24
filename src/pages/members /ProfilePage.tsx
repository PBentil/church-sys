import Sidebar from "../../components/Sidebar.tsx";
import Topbar from "../../components/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";

const ProfilePage = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <Sidebar role="member" />
            <div className="flex-1 w-full">
                <Topbar toggleSidebar={function(): void {
                    throw new Error("Function not implemented.");
                }} />
                <Breadcrumbs />

                <div className="p-2 sm:p-4 md:p-8 mt-16 md:mt-24">

                <div className="max-w-4xl mx-auto px-4 py-8 w-full">
            <h2 className="text-2xl font-bold mb-6">Profile Management</h2>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-2xl shadow mb-8">
                <div className="flex items-center gap-6">
                    <img
                        src=""
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-sky-700"
                    />
                    <div>
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-gray-500">Member ID: CHR-12345</p>
                        <p className="text-gray-500">Joined: Jan 2023</p>
                    </div>
                </div>
            </div>

            {/* Editable Form */}
            <form className="space-y-6">
                {/* Personal Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="input border border-sky-800 p-2 rounded-md" />
                        <input type="text" placeholder="Last Name" className="input border border-sky-800  p-2 rounded-md" />
                        <input type="text" placeholder="Gender" className="input border border-sky-800  p-2 rounded-md" />
                        <input type="date" placeholder="Date of Birth" className="input border border-sky-800  p-2 rounded-md" />
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="email" placeholder="Email Address" className="input border border-sky-800 p-2 rounded-md"  />
                        <input type="tel" placeholder="Phone Number"  className="input border border-sky-800 p-2 rounded-md"  />
                        <input type="text" placeholder="Location"  className="input border border-sky-800 p-2 rounded-md"  />
                        <input type="text" placeholder="Branch"  className="input border border-sky-800 p-2 rounded-md"  />
                    </div>
                </div>

                {/* Church Info */}
                <div>
                    <h4 className="text-lg font-semibold mb-2">Church Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Ministry/Department */}
                        <select className="input border border-sky-800 p-2 rounded-md">
                            <option value="">Select Ministry/Department</option>
                            <option value="choir">Choir</option>
                            <option value="ushers">Ushers</option>
                            <option value="youth">Youth Ministry</option>
                            <option value="media">Media Team</option>
                            <option value="prayer">Prayer Team</option>
                            <option value="none">Not Assigned</option>
                        </select>

                        {/* Membership Status */}
                        <select className="input border border-sky-800 p-2 rounded-md">
                            <option value="">Select Membership Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="new">New Member</option>
                            <option value="visitor">Visitor</option>
                        </select>

                        {/* Baptized */}
                        <select className="input border border-sky-800 p-2 rounded-md">
                            <option value="">Baptized?</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                            <option value="not-sure">Not Sure</option>
                        </select>

                        <select className="input border border-sky-800 p-2 rounded-md">
                            <option value="">Select Position</option>
                            <option value="pastor">Pastor</option>
                            <option value="elder">Elder</option>
                            <option value="deacon">Deacon</option>
                            <option value="deaconess">Deaconess</option>
                            <option value="member">Member</option>
                            <option value="leader">Department Leader</option>
                        </select>
                    </div>
                </div>

                {/* Submit */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-sky-700 text-white font-semibold rounded-xl hover:bg-sky-800 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
                </div>
            </div>
        </div>
    );
}
export default ProfilePage;