"use server"
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { InterviewCategory, UserRole } from "@/lib/generated/prisma/enums";

interface InterviewerData {
    role : UserRole,
    title : string,
    company : string,
    yearsExp : string,
    bio : string,
    categories : string[]
}

export const completeOnboarding = async (data:InterviewerData)=>{
    const user = await currentUser();

    if(!user){
        throw new Error("Unauthorized")
    }

    const { role, title, company, yearsExp, bio, categories } = data;

    if(!role || !["INTERVIEWEE", "INTERVIEWER"].includes(role)){
        throw new Error("Invalid role");
    }

    if (role == UserRole.INTERVIEWER) {
        if (!title || !company || !yearsExp || !bio || !categories?.length) {
            throw new Error("Please fill in all required fields");
        }
    }

    try {
        await prisma.user.update({
            where : {clerkUserId : user.id},
            data : {
                role,
                ...(role===UserRole.INTERVIEWER&&{
                    title,
                    company,
                    yearsExp : Number(yearsExp),
                    bio,
                    categories: {
                        set: categories as InterviewCategory[], 
                    },
                })
            }
        })
        return {success:true}
    } catch (error) {
        console.log("Onboarding Error:",error)
        throw new Error("Something went wrong. Please try again")
    }
}