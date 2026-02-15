"use server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteJob(jobId: string) {
  const { userId } = await auth();
  await dbConnect();

  await Job.findOneAndDelete({ _id: jobId, clerkId: userId });

  revalidatePath("/dashboard");
}

export async function updateJob(jobId: string, formData: FormData) {
  const { userId } = await auth();
  await dbConnect();

  const updateData = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
  };

  await Job.findOneAndUpdate({ _id: jobId, clerkId: userId }, updateData);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

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
