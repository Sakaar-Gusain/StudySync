"use client"

import { usePathname } from "next/navigation"
import {useRouter} from "next/navigation"

export default function MainNav(){
    const path=usePathname()
    const router=useRouter()

    const show=['/home','/'].includes(path)

    return(
        <>
        {show && (
            <nav className="fixed top-0 z-50 flex w-full items-center b-blur justify-between border-b  px-4 py-3 shadow-xl backdrop-blur-lg transition-all duration-300 border-gray-800 bg-zinc-900/50 md:px-8">
            {/* Logo */}
            <div className="bg-linear-to-r from-emerald-400 via-[#2f6b44] to-[#345d3f]  bg-clip-text text-xl sm:text-xs font-extrabold text-transparent md:text-2xl py-3">
                StudySync - Sync your studies
            </div>

            {/* Right Side */}
            <div className="flex items-center text-white gap-4 md:gap-6 transition-smooth ">
                <button onClick={()=>router.push('/login')}
                className="px-2 py-2 md:text-md sm:text-xs bg-linear-to-r from-lime-500 to-emerald-500 hover:bg-emerald-700 rounded-md hover:scale-[1.05] transition-all"
                >
                    Login
                </button>
                
                <button onClick={()=>router.push('/register')}
                className="px-2 py-2 md:text-md sm:text-xs bg-linear-to-r from-lime-500 to-emerald-500 hover:bg-emerald-700 rounded-md hover:scale-[1.05] transition-all"
                >
                    Register
                </button>
            </div>
        </nav>
        )}
        </>
    )
}