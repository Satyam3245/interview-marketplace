"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { request } from "@arcjet/next";
import { StreamClient } from "@stream-io/node-sdk";

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

export const bookSlot = async ({ interviewerId, startTime, endTime } : any) =>{
    const user = await currentUser();
    if(!user) throw new Error("Unauthorized");
    
    const req = await request();
    // const rateLimitError = await



    const [dbUser, interviewer] = await Promise.all([
        prisma.user.findUnique({ where: { clerkUserId: user.id } }),
        prisma.user.findUnique({ where: { id: interviewerId } }),
    ]);

    if(!dbUser || dbUser.role === "INTERVIEWEE")
        throw new Error("Only interviewees can book session");
    if(!interviewer || interviewer.role !== "INTERVIEWER")
        throw new Error("Interviewer not Found")

    const credits = interviewer.creditRate ?? 1 ;

    if(dbUser.credits < credits)
        throw new Error("Insufficient credits. Please Upgrade Your Plan")

    const conflict = await prisma.booking.findFirst({
        where : {
            interviewerId,
            status : "SCHEDULED",
            startTime  : {lt : new Date(endTime)},
            endTime : {gt : new Date(startTime)}
        }
    });

    if(conflict)
        throw new Error("This Slot was just booked . Please pick another")


    let streamCallId;
    try {
        const streamClient = new StreamClient(
            process.env.NEXT_PUBLIC_STREAM_API_KEY ?? "",
            process.env.STREAM_SECRET_KEY ?? ""
        );
        await streamClient.upsertUsers([
            {
                id: dbUser.clerkUserId,
                name: dbUser.name ?? "Interviewee",
                image: dbUser.imageUrl ?? undefined,
                role: "user",
            },
            {
                id: interviewer.clerkUserId,
                name: interviewer.name ?? "Interviewer",
                image: interviewer.imageUrl ?? undefined,
                role: "user",
            },
        ]);

        streamCallId = `mock_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 7)}`;

        const call = streamClient.video.call("default", streamCallId);


        await call.getOrCreate({
            data : {
                created_by_id : dbUser.clerkUserId,
                members: [
                    { user_id: dbUser.clerkUserId, role: "host" },
                    { user_id: interviewer.clerkUserId, role: "host" },
                ],
                settings_override: {
                    recording: { mode: "available", quality: "1080p" },
                    screensharing: {
                        enabled: true,
                    },
                    transcription: {
                        mode: "auto-on", 
                    },
                 },
            }
        })

    } catch (error) {
        console.error("Stream call creation failed:", error);
        throw new Error("Failed to create video call. Please try again.");
    }

    
}