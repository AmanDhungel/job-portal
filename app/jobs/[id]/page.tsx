// app/jobs/[id]/page.tsx
import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { userId } = await auth();

  await dbConnect();
  const job = await Job.findById(id).lean();

  if (!job) {
    notFound();
  }

  const jobData = JSON.parse(JSON.stringify(job));

  return (
    <div className="max-w-4xl mx-auto p-8 my-10">
      <Link
        href="/jobs"
        className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to All Jobs
      </Link>

      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {jobData.title}
            </h1>
            <p className="text-xl text-blue-600 mt-2 font-medium">
              {jobData.companyName}
            </p>
            <div className="flex gap-4 mt-4 text-gray-500">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {jobData.location}
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                Full-time
              </span>
            </div>
          </div>

          <ApplyButton jobId={jobData._id} jobTitle={jobData.title} />
        </div>

        <hr className="my-8" />

        <div className="prose max-w-none">
          <h3 className="text-xl font-bold mb-4">Job Description</h3>
          <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {jobData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
