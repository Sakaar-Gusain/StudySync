"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InteractiveDots from "@/components/Dots"
import { HiOutlineSparkles } from "react-icons/hi";

export default function Register() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [type, setType] = useState("password");
    const [Icon, setIcon] = useState(() => FaEyeSlash);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    {/*Condition for eye switch*/ }
    const handleToggle = () => {

        if (type === 'password') {
            setIcon(() => FaEye);
            setType('text');
        }
        else {
            setIcon(() => FaEyeSlash);
            setType('password');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!email || !password || !name || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    gmail: email,
                    name: name,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.detail || "Registration failed.");
                return;
            }

            alert("Account created successfully!");

            router.push("/login");
        } catch (err) {
            setError("Cannot connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full relative overflow-hidden lg:flex-row min-h-screen bg-linear-to-br from-black via-[#090f0b] to-[#121d14] ">
            <InteractiveDots />
            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2  items-center justify-center p-10">
                <div className="relative text-center">

                    <HiOutlineSparkles className="hidden md:block absolute left-1/2 -top-25 -translate-x-1/2  text-emerald-500/10 text-[150px] md:text-[280px] animate-float pointer-events-none" />

                    <h2 className="text-3xl font-bold text-green-500 mt-8">
                        Track Smarter, Score Better
                    </h2>

                    <p className="text-gray-300 mt-4 max-w-md">
                        Log in to view your personalized analytics and exam score predictions.
                    </p>

                </div>
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2  ">
                <div className="flex items-center justify-center min-h-screen lg:min-h-full px-5 py-10">
                    <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 sm:p-8">

                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="mt-2 text-gray-300">
                            Register to continue using the application.
                        </p>

                        <form
                            onSubmit={handleRegister}
                            className="mt-8 space-y-5"
                        >
                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/*Name*/}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Name
                                </label>

                                <input
                                    type="name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="flex items-center gap-2 w-full rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                                    <input
                                        type={type}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-transparent text-white placeholder-gray-400 outline-none"
                                        required
                                    />
                                    <Icon size={22} onClick={handleToggle} className="cursor-pointer" />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
                                    Confirm Password
                                </label>
                                <div className="flex items-center gap-2 w-full rounded-xl border border-gray-300 dark:border-white/20 bg-white dark:bg-white/10 px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                                    <input
                                        type={type}
                                        placeholder="Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        className="w-full bg-transparent  dark:text-white placeholder-gray-400 outline-none"

                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-red-400 text-sm">
                                    {error}
                                </p>
                            )}

                            {/* Register Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-[#2e5838] py-3 text-white font-semibold shadow-lg hover:scale-[1.02] hover:bg-[#3c8a57] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                            {/* Login Link */}
                            <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-blue-600 dark:text-blue-300 hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    );
}