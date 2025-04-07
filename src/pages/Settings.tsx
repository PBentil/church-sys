
const SettingsPage = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>

            {/* Profile Settings */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Profile</h2>
                <form className="grid gap-4 max-w-md">
                    <input type="text" placeholder="Full Name" className="border p-2 rounded" />
                    <input type="email" placeholder="Email" className="border p-2 rounded" />
                    <input type="text" placeholder="Phone Number" className="border p-2 rounded" />
                    <button type="submit" className="bg-sky-700 text-white py-2 px-4 rounded hover:bg-sky-800">
                        Save Changes
                    </button>
                </form>
            </section>

            {/* Security Settings */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Security</h2>
                <button className="bg-red-600 text-white p-2 rounded hover:underline">Change Password</button>
            </section>

            {/* Notifications */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" /> Email Notifications
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" /> SMS Notifications
                    </label>
                </div>
            </section>

            {/* Account Settings */}
            <section className="mb-8 mt-auto">
                <h2 className="text-xl font-semibold mb-4">Account</h2>
                <button className="bg-red-600 text-white p-2 rounded hover:underline">Delete Account</button>
            </section>
        </div>
    );
};

export default SettingsPage;
