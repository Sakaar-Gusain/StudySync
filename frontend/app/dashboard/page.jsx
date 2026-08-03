"use client"

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {useEffect } from "react";
import KPI_cards from "./components/KPI";
import ScoreTrendChart from "./components/ScoreLineChart";
import StudyHours from "./components/StudyHours";
import PieChartHrs from "./components/PieChart";
export default function ShowDashboard(){
    
    const router=useRouter();

    const {user,loading:authLoading} = useAuth();
    
   

    useEffect(() => {
    if (!authLoading && !user) {
        router.replace("/login");
    }
    }, [user, router,authLoading]);

     if (!user) {
        return <p>Redirecting...</p>;
        
    }

    return (
        <div>
            
            <div className="flex flex-col items-center py-4">
                <h1 className="flex items-center text-3xl semibold text-green-500">{user.name  ? `${user.name}'s`:"Test"  } Dashboard</h1>
            </div>
            <KPI_cards studentId={user.student_id} />
            
            <div className="w-full my-4 px-2 sm:px-4" >
                
                    <ScoreTrendChart studentId={user.student_id}/>
                
                
            </div>

            <div className="flex flex-col md:flex-row px-2 my-4">
                <div  className="md:w-1/2 w-full py-4  px-2">
                    <PieChartHrs studentId={user.student_id}/>
                </div>

                <div className="md:w-1/2 w-full py-4 px-2">
                    <StudyHours studentId={user.student_id}/>
                </div>
               
            </div>

        </div>
    );
}