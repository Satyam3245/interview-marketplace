"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  return prisma.user.findUnique({
    where: { clerkUserId: user.id },
    select: {
      role: true,
      name: true,
      title: true,
      company: true,
      imageUrl: true,
    },
  });
};