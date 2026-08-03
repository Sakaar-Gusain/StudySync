"use client";

import { useEffect, useState } from "react";
import InteractiveDots from "@/components/Dots";

export default function WelcomeOverlay() {
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const seen = sessionStorage.getItem("welcomeShown");

        if (!seen) {
            setShow(true);
        }
    }, []);

    const handleStart = () => {
        setHide(true);
        sessionStorage.setItem("welcomeShown", "true");
    };

    if (!show) return null;
    

    return (
        <div
            className={`fixed inset-0 z-100 flex items-center justify-center
            bg-linear-to-br from-[#000000] via-[#080d09] to-[#18281d]
            transition-all duration-1000
            ${
                hide
                    ? "translate-x-full -translate-y-full scale-50 opacity-0 pointer-events-none"
                    : ""
            }`}
        >
            <InteractiveDots/>
            <div className="text-center">
                <h1 className="text-6xl font-bold text-emerald-400">
                    Welcome to StudySync
                </h1>

                <button
                    onClick={handleStart}
                    className="mt-8 rounded-lg bg-emerald-500 px-6 py-3 text-white"
                >
                    Let's Begin
                </button>
            </div>
        </div>
    );
}