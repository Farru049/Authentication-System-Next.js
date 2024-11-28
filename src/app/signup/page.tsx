"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onSignup = async () => {
        setLoading(true);  // Start loading state
        try {
            const response = await axios.post("/api/users/signup", user);
            toast.success("Signup successful! Verification email sent.");
            // Only redirect if the signup was successful
            if (response.data.success) {
                router.push("/login");
            } else {
                toast.error("Signup failed. Please try again.");
            }
        } catch (error: any) {
            console.log(error.response?.data);  // Log the full error response
            toast.error(error?.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);  // Stop loading state
        }
    };

    useEffect(() => {
        setButtonDisabled(!user.email || !user.password || !user.username);
    }, [user]);

    if (!isClient) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                    {loading ? "Processing..." : "Signup"}
                </h1>
                <hr className="my-4" />
                <div className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-gray-600 font-medium">Username</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-800"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled || loading}
                        className={`w-full p-3 rounded-lg text-white font-semibold mt-4 ${buttonDisabled || loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        {loading ? "Signing up..." : "Signup"}
                    </button>
                    <div className="text-center mt-4">
                        <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
