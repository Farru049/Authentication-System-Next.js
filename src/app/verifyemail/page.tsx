"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState<string | null>(null);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verifyUserEmail = async (token: string) => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: any) {
            setError(error?.response?.data?.message || "Error occurred during verification.");
        }
    }

    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get('token');
        setToken(urlToken);
    }, []);

    useEffect(() => {
        if (token) {
            verifyUserEmail(token);
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>

            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `Token: ${token}` : "No token found"}
            </h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        <a className="text-blue-500">Login</a>
                    </Link>
                </div>
            )}

            {error && (
                <div className="bg-red-500 text-white p-2">
                    <h2 className="text-2xl">Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
