"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getInterviewProfile = async (interviewerId : string)=>{
    try {
        const interviewer = await prisma.user.findUnique({
            where : {
                id : interviewerId,
                role : "INTERVIEWER"
            },
            select : {
                id: true,
                name: true,
                imageUrl: true,
                title: true,
                company: true,
                yearsExp: true,
                bio: true,
                categories: true,
                creditRate: true,
                availabilities: {
                    where: { status: "AVAILABLE" },
                    select: { startTime: true, endTime: true },
                    take: 1,
                },
                bookingsAsInterviewer : {
                    where: { status: "SCHEDULED" },
                    select: { startTime: true, endTime: true },
                }
            }
        });
        return interviewer ?? null;
    } catch (error) {
        console.log("getInterviewProfile Error" , error);
        return null;
    }
}

export const bookSlot = async ({}) =>{
    const user = await currentUser();
    if(!user) throw new Error("Unauthorized");
    
}