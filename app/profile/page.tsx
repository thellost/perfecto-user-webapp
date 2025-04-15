'use client'
import Navbar from "../../components/Navbar/Navbar";
//import { useAppSelector} from '@/app/hook'
import { toast } from "react-toastify";
import Footer from "../../components/Footer/Footer";
import { signOut, useSession } from "next-auth/react";

import { authOptions } from "../api/auth/[...nextauth]/option";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { redirect } from "next/navigation";

function Profile()  {
     const {data: session} = useSession({
        required: false,
        onUnauthenticated() {
            
            redirect("/login")
        }})
    console.log(session)
    const user = session
    return (
        <div className="min-h-screen overflow-x-hidden">
            
                  
            <main className="gap-4 p-4 flex ">
                  <Sidebar />
                  
            <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
                {
                    user === null ? (
                        <div className="w-12 h-12 my-32 border-4 border-purple-500 border-dashed rounded-full animate-spin mx-auto" style={{ animationDuration: '3s' }}></div>
                    ) : (
                        <>

                            <div className="mb-4 flex justify-between items-center space-x-4">
                                <strong className="w-1/4 text-gray-800">Name:</strong>
                                <span className="w-3/4 text-gray-900 bg-gray-200 px-4 py-2 rounded-md">{user?.user?.name}</span>
                            </div>
                            <div className="mb-4 flex justify-between items-center space-x-4">
                                <strong className="w-1/4 text-gray-800">Email:</strong>
                                <span className="w-3/4 text-gray-900 bg-gray-200 px-4 py-2 rounded-md">{user?.user?.email}</span>
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
                                        onClick={() => {
                                            navigator.clipboard.writeText(user?.referral_code ?? "").then(() => {
                                                toast.success('Referral code copied to clipboard!');
                                            }).catch(err => {
                                                console.error('Failed to copy: ', err);
                                            });
                                          }}
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
                </main>
            <Footer />
        </div >
    );
};

export default Profile;