"use client"

import { useState } from "react"
import { Button } from "./ui/button";
import { Coins } from "lucide-react";
import UpgradeModel from "./UpgradeModal";

export default function CreditButton(role:string,credits:number){
    const [open ,setOpen] = useState(false);

    const handleClick = ()=>{
        if(role === "INTERVIEWER"){
            window.location.href = "/dashboard"
        }else {
            setOpen(true);
        }
    }
    return <>
        <Button
            variant="outline"
            className="border-amber-400/20 text-amber-400 cursor-pointer"
            onClick={handleClick}
        >
            <Coins size={14} />
            <span className=" opacity-70">
            {credits} {role === "INTERVIEWER" ? "Earned" : "Credits"}
            </span>
        </Button>

        <UpgradeModel open={open} onOpenChange={setOpen} reason="kjdn"/>
    </>
}