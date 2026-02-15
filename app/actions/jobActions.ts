"use server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Application } from "@/lib/models/Application.model";

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
    salary: formData.get("salary"),
    category: formData.get("category"),
    clerkId: userId,
  };

  await Job.create(jobData);
  revalidatePath("/jobs");
}

export async function getPaginatedJobs(page: number, limit: number = 5) {
  await dbConnect();

  const skip = (page - 1) * limit;

  const [jobs, totalJobs] = await Promise.all([
    Job.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Job.countDocuments({}),
  ]);

  return {
    jobs: JSON.parse(JSON.stringify(jobs)),
    totalPages: Math.ceil(totalJobs / limit),
  };
}

export async function applyToJobAction(
  jobId: string,
  userDetails: { name: string; email: string },
) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await dbConnect();

  await Application.create({
    jobId,
    clerkUserId: userId,
    applicantName: userDetails.name,
    applicantEmail: userDetails.email,
  });

  revalidatePath(`/jobs/${jobId}`);
}
