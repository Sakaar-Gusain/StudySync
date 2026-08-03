"use client"

import Logout from "./Logout"
import { usePathname } from "next/navigation"
import { FaHouse } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import { BiBarChartSquare } from "react-icons/bi"

function NavBar() {
    const path = usePathname();
    const router =useRouter();
    const show=['/study-habits','/dashboard'].includes(path)
    
    
    
    return (
        <>
        {show && (
            <nav className="sticky top-0 z-50 flex w-full items-center justify-between border-b  px-4 py-3 shadow-xl backdrop-blur-lg transition-all duration-300 border-gray-800 bg-zinc-900/50 md:px-8">
            {/* Logo */}
            <div className="bg-linear-to-r from-emerald-400 via-[#2f6b44] to-[#345d3f] bg-clip-text text-xl sm:text-xs font-extrabold text-transparent md:text-2xl">
                StudySync - Sync your studies
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6">
                
                {path ==='/dashboard'?<FaHouse size={25} onClick={()=>router.push("/study-habits")} className="text-white cursor-pointer hover:text-gray-300"/>
                :
                <BiBarChartSquare size={30} onClick={()=>router.push('/dashboard')} className="text-white rounded-md cursor-pointer hover:text-gray-300"/>
                }
                <Logout/>
            </div>
        </nav>
        )}
        </>
    )
}

export default NavBar