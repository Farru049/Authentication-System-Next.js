"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";  // Icons for user actions

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false); // Loading state for user details

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message || "An error occurred during logout.");
        }
    };

    const getUserDetails = async () => {
        setLoading(true); // Start loading
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data);
            setUserDetails(res.data.data);  // Set full user data
            setData(res.data.data._id);  // Set the user ID
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message || "Failed to fetch user details.");
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                {/* Profile Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center text-4xl text-gray-600 mb-4">
                        <FaUserCircle />
                    </div>
                    <h1 className="text-3xl font-semibold text-center mb-2 text-gray-800">Hello, {userDetails?.username || "User"}</h1>
                    <p className="text-center text-gray-600">{userDetails?.email || "No email available"}</p>
                </div>

                <hr className="my-4" />

                {/* User Details */}
                <p className="text-center text-gray-600 mb-4">Welcome to your profile page! Here is your information:</p>

                <div className="mb-6 text-center">
                    <h2
                        className={`p-2 rounded-lg text-white font-semibold ${data === "nothing" ? "bg-gray-400" : "bg-green-500"}`}
                    >
                        {data === "nothing" ? (
                            "No data available"
                        ) : (
                            <Link href={`/profile/${data}`} className="text-white hover:underline">
                                View Your Profile Details ({data})
                            </Link>
                        )}
                    </h2>
                </div>

                {/* Action Buttons with Icons */}
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center space-x-2 w-32"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>

                    <button
                        onClick={getUserDetails}
                        className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg flex items-center space-x-2 w-32"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <FaInfoCircle />
                                <span>Get Details</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Optional Bio Section */}
                {userDetails && (
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">Bio:</h3>
                        <p className="text-gray-600">{userDetails?.bio || "No bio available."}</p>
                    </div>
                )}

                {/* Footer Section */}
                <footer className="text-center text-gray-600 mt-6">
                    <p>© 2024 Your App. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
