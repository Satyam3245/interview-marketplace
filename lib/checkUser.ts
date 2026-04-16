import { auth, currentUser } from "@clerk/nextjs/server"
import prisma from "./prisma";

const getCurrentPlan = async ()=>{
    const { has } = await auth();
    if (has({plan : "pro"})) return "pro";
    if (has({plan : "starter"})) return "starter";
    return "free";
}

const PLAN_CREDITS = {
  pro: 15,
  starter: 5,
  free: 1,
};

const shouldAllocateCredits = (dbUser : any, currentPlan : any) => {
  // Always allocate if plan changed
  if (dbUser.currentPlan !== currentPlan) return true;

  // Allocate if never allocated before
  if (!dbUser.creditsLastAllocatedAt) return true;

  // Allocate if it's a new calendar month since last allocation
  const now = new Date();
  const last = new Date(dbUser.creditsLastAllocatedAt);
  const isNewMonth =
    now.getFullYear() > last.getFullYear() || now.getMonth() > last.getMonth();

  return isNewMonth;
};

export const checkUser = async ()=>{
    const user = await currentUser();
    if(!user) return null;

    try {
        const currentPlan = await getCurrentPlan();
        const credits = PLAN_CREDITS[currentPlan];

        const loggedInUser = await prisma.user.findUnique({
            where : {
                clerkUserId : user.id
            }
        });

        if(loggedInUser){
            if (loggedInUser.role === "INTERVIEWER") return loggedInUser;
            if (shouldAllocateCredits(loggedInUser, currentPlan)) {
                // Roll forward any remaining credits from the previous period
                const rolledCredits = credits + (loggedInUser.credits ?? 0);

                return await prisma.user.update({
                    where: { clerkUserId: user.id },
                    data: {
                        credits: rolledCredits,
                        currentPlan,
                        creditsLastAllocatedAt: new Date(),
                    },
                });
            }
            return loggedInUser;
        }


        const name = `${user.firstName} ${user.lastName}`;
        return await prisma.user.create({
            data : {
                clerkUserId : user.id,
                name,
                imageUrl : user.imageUrl,
                email : user.emailAddresses[0].emailAddress,
                credits,
                currentPlan,
                creditsLastAllocatedAt : new Date()
            }
        });

    } catch (error) {
        console.log(error);
        return null;
    }
}