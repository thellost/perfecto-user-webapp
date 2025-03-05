import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
    const handleCopy = () => {
        navigator.clipboard.writeText(user?.referral_code).then(() => {
            toast.success('Referral code copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const user = useSelector((state) => state.user.user);
    console.log(user);

    return (
        <div className="min-h-screen overflow-x-hidden bg-gray-100">
            <div className="w-full z-10 px-4 border-b bg-white shadow-sm">
                <Navbar />
            </div>
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
                {
                    Object.keys(user).length === 0 ? (
                        <div className="w-12 h-12 my-32 border-4 border-purple-500 border-dashed rounded-full animate-spin mx-auto" style={{ animationDuration: '3s' }}></div>
                    ) : (
                        <>

                            <div className="mb-4 flex justify-between items-center space-x-4">
                                <strong className="w-1/4 text-gray-800">Name:</strong>
                                <span className="w-3/4 text-gray-900 bg-gray-200 px-4 py-2 rounded-md">{user?.full_name}</span>
                            </div>
                            <div className="mb-4 flex justify-between items-center space-x-4">
                                <strong className="w-1/4 text-gray-800">Email:</strong>
                                <span className="w-3/4 text-gray-900 bg-gray-200 px-4 py-2 rounded-md">{user?.email}</span>
                            </div>
                            <div className="mb-4 flex justify-between items-center space-x-4">
                                <strong className="w-1/4 text-gray-800">Phone Number:</strong>
                                <span className={`w-3/4 text-gray-900 bg-gray-200 px-4 py-2 rounded-md ${!user?.phone_number ? "pt-8" : ""}`}>{user?.phone_number}</span>
                            </div>
                            <div className="mb-4 flex justify-between items-center space-x-4">
                                <strong className="w-1/4 text-gray-800">Referral Code:</strong>
                                <div className="flex items-center w-3/4">
                                    <span className="text-purple-600 bg-gray-200 px-4 py-2 rounded-md font-mono">{user?.referral_code}</span>
                                    <button
                                        onClick={handleCopy}
                                        className="ml-4 bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            <Footer />
        </div >
    );
};

export default Profile;