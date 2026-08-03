"use client"

import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";
import MainNav from "@/app/home/component/MainNav";
import Architecture from "./component/Architecture";
import Footer from "@/components/Footer";
import Demo from "./component/Demo";
import InteractiveDots from "@/components/Dots";
import { FaGraduationCap,FaBookOpen } from "react-icons/fa";

const Box = ({ title, tech }) => {
    return (
        <div className="p-6 w-full rounded-2xl
          bg-black/30
          backdrop-blur-lg
          border border-green-500/20
          shadow-xl shadow-emerald-300/10 transition-transform duration-300 ease-in-out hover:cursor-pointer hover:-translate-y-1.5">
            <h3 className="flex items-center gap-2 font-bold text-green-400 mb-4 text-lg">
                {title}
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 list-disc list-inside text-white/90 text-sm">
                {tech.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

export default function MainHome() {

    const router = useRouter();

    return (
        <>
            {/*Mainpage Nav Bar*/}
            <MainNav />
            {/*First Header*/}
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-linear-to-br from-black via-[#090f0b] to-[#121d14]">
                
                {/*Floating Animations of book*/}
                 <FaBookOpen className=" hidden md:block absolute left-10 md:left-20 top-1/2 -translate-y-1/2 text-emerald-500/10 text-[150px] 
                 md:text-[280px] animate-float pointer-events-none" />

                <div className="flex flex-col  items-center text-center px-6">
                    
                    <TypeAnimation
                        sequence={[
                            "StudySync",
                            3000,
                            "",
                            1500,
                        ]}
                        wrapper="h1"
                        speed={30}
                        repeat={Infinity}
                        className="mb-6 md:text-7xl text-5xl pb-7 font-bold bg-linear-to-r from-emerald-600 via-emerald-300 to-lime-400 bg-clip-text text-transparent"
                    />

                    <h2 className="mb-5 md:text-3xl text-md bg-linear-to-r text-green-600 ">
                        Sync your learning. Track your growth.
                    </h2>

                    <p className="max-w-2xl md:text-lg text-sm mb-10 text-green-200">
                        Predict your exam score range based on your daily habits - such as study hours, sleep, attendance, social media usage, and more - and track your progress through a personalized analytics dashboard over time.
                    </p>

                    <div className="flex gap-6">
                        <button
                            className="rounded-lg bg-linear-to-r from-emerald-600 via-green-500 to-lime-500 px-6 py-3 font-semibold text-white shadow-md  transition-all duration-300 hover:-translate-y-1"
                            onClick={() => router.push("/login")}
                        >
                            Login
                        </button>

                        <button
                            className="rounded-lg bg-linear-to-r from-emerald-600 via-green-500 to-lime-500 px-6 py-3 font-semibold text-white shadow-md  transition-all duration-300 hover:bg-green-900/30 hover:border-green-300 hover:-translate-y-1"
                            onClick={() => router.push("/register")}
                        >
                            Register
                        </button>
                    </div>

                </div>

                {/*Floadting animations of cap*/}
                <FaGraduationCap className=" hidden md:block absolute right-10 md:right-20 top-1/2 -translate-y-1/2 text-emerald-500/10 
                text-[150px] md:text-[280px] animate-float-delayed pointer-events-none" />


            </div>

            {/*Technical Skills*/}
            <div className="bg-black/30 relative w-full min-h-screen overflow-hidden">
                <InteractiveDots/>
                <h2 className="text-center md:text-5xl text-3xl py-10 font-bold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                    Project Demo Field
                </h2>
                
                <Demo />

                <div className=" w-full my-6 px-6 md:px-16">
                    <h2 className="text-center md:text-5xl text-3xl py-10 font-bold bg-linear-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
                        TechStack Used
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 pb-10">
                        <Box title="🌐 Frontend" tech={["React", "Javascript", "NextJS", "TailwindCSS"]} />
                        <Box title="💻 Backend" tech={["Python", "PostgreSQL", "FastAPI"]} />
                        <Box title="📊 Data Science" tech={["Python", "Numpy, Pandas", "Scikit-learn", "Linear Regression"]} />
                    </div>
                </div>


            </div>

            {/*Architecture*/}
            <Architecture />



            {/*Footer import*/}
            <Footer />
        </>
    );
}