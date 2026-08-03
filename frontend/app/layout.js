import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import NavBar from "@/components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudySync",
  description: "App to keep track of habits and exam scores",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased` } suppressHydrationWarning
    >
        
        <body className="bg-gray-950">
        <AuthProvider>
          <NavBar/>
          {children}
          
      </AuthProvider>
      </body>
    </html>
  );
}
