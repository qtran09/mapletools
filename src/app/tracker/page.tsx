import ArcaneTracker from "@/components/ArcaneTracker"
import SacredTracker from "@/components/SacredTracker"
import React from "react"

const DailyTracker = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-[#2E2E2E]">        
            <ArcaneTracker/>
            <SacredTracker/>
        </div>
    )
}

export default DailyTracker