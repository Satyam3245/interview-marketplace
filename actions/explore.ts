"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const getInterviewer = async ()=>{
    const user = await currentUser();
    if(!user){
        return null
    }

    try {
        const interviewers = await prisma.user.findMany({
            where : {role : "INTERVIEWER"},
            select : {
                id : true,
                name : true,
                imageUrl: true,
                title: true,
                company: true,
                yearsExp: true,
                bio: true,
                categories: true,
                creditRate: true,
                availabilities : {
                    where : {status : "AVAILABLE"},
                    select : {endTime:true,startTime : true},
                    take : 1
                }
            },
            orderBy : {
                createdAt : "desc"
            }
        });
        return interviewers;
    } catch (error) {
        console.log("Explore error",error);
        throw new Error("Something went wrong. Please try again");
    }
}