"use server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import { revalidatePath } from "next/cache";

export async function createJobAction(formData: FormData) {
  await dbConnect();
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const jobData = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    companyName: formData.get("companyName"),
    clerkId: userId,
  };

  await Job.create(jobData);
  revalidatePath("/jobs");
}
