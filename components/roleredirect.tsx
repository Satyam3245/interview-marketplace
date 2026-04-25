"use effect";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


const INTERVIEWER_ONLY = ["/appointments"];
const INTERVIEWEE_ONLY = ["/dashboard"];

export default function RoleRedirect({role}:{role : string}){
    const pathName = usePathname();
    const router = useRouter();
    useEffect(()=>{
        if(role==="UNASSIGNED" && pathName !== "/onboarding")
            router.replace("/onboarding");
        if(role==="INTERVIEWER" && pathName.startsWith("/onboarding"))
            router.replace("/dashboard");
        if(role==="INTERVIEWEE" && pathName.startsWith("/onboarding"))
            router.replace("/explore");
        if(role==="INTERVIEWER" && pathName.startsWith("/onboarding"))
            router.replace("/dashboard");
        if (role === "INTERVIEWER" && INTERVIEWER_ONLY.some((p) => pathName.startsWith(p)))
            router.replace("/dashboard");
        if (role === "INTERVIEWEE" && INTERVIEWEE_ONLY.some((p) => pathName.startsWith(p)))
            router.replace("/appointments");
    },[role,pathName,router]);

    return null
} 