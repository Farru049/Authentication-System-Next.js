"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error);
            if (error.response) {
                console.log("Server response:", error.response.data);
                toast.error(error.response.data?.error || error.message);
            } else {
                console.log("Error:", error.message);
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6 text-blue-600">
                    {loading ? "Processing..." : "Login"}
                </h1>
                <hr className="mb-4" />
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                            id="email"
                            type="text"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                        />
                    </div>
                    <button
                        onClick={onLogin}
                        disabled={buttonDisabled || loading}
                        className="w-full p-2 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></span>
                        ) : (
                            "Login"
                        )}
                    </button>
                </div>
                <hr className="my-4" />
                <div className="text-center">
                    <Link
                        href="/signup"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
