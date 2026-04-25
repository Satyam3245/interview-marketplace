"use server";

import prisma from "@/lib/prisma";

export const getInterviewer = async ()=>{

    try {
        const interviewers = await prisma.user.findMany({
            where : {role : "INTERVIEWER"}
        });
        return interviewers;
    } catch (error) {
        console.log("Explore error",error);
        throw new Error("Something went wrong. Please try again");
    }
}