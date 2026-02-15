import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EditJobForm from "@/components/EditJobForm";

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = await auth();
  const { id } = params;

  await dbConnect();

  const job = await Job.findOne({ _id: id, clerkId: userId });

  if (!job) {
    redirect("/dashboard");
  }

  const serializedJob = JSON.parse(JSON.stringify(job));

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Vacancy</h1>
      <EditJobForm job={serializedJob} />
    </div>
  );
}
