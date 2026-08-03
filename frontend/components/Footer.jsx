"use client"
import Link from "next/link";

export default function Footer() {
    
    
  return (
    <>
    
      <footer className=" border-t border-gray-800 bg-[#0b0f19] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              StudySync
            </h2>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Predict your expected exam score using Machine Learning by
              analyzing your daily study habits, attendance, sleep,
              extracurricular activities, and more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-2">
              

              <li>
                <Link href="/login" className="hover:text-emerald-400 transition">
                  Login
                </Link>
              </li>

              <li>
                <Link href="/register" className="hover:text-emerald-400 transition">
                  Register
                </Link>
              </li>

              
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StudySync. Built with Next.js, FastAPI,
          Python Libraries & Tailwind CSS.
        </div>

      </div>
    </footer>
    
    </>
  );
}