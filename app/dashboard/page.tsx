// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import { Application } from "@/lib/models/Application.model";
import Link from "next/link";
import DeleteJobButton from "@/components/DeleteJobButton"; // Client component

type Applicant = {
  _id: string;
  applicantName: string;
  applicantEmail: string;
  appliedAt: Date;
};

type JobWithApplicants = {
  _id: string;
  title: string;
  location: string;
  category: string;
  applicants: Applicant[];
};

export default async function CompanyDashboard() {
  const { userId } = await auth();
  await dbConnect();

  const myJobs = await Job.find({ clerkId: userId })
    .sort({ createdAt: -1 })
    .lean();

  const jobsWithApplicants = await Promise.all(
    myJobs.map(
      async (job: {
        _id: string;
        title: string;
        location: string;
        category: string;
      }) => {
        const applicants = await Application.find({ jobId: job._id }).lean();
        return { ...job, applicants } as JobWithApplicants;
      },
    ),
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Employer Dashboard</h1>
        {/* ADD NEW BUTTON */}
        <Link
          href="/dashboard/new"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
          + Post New Vacancy
        </Link>
      </div>

      <div className="space-y-6">
        {jobsWithApplicants.map((job: JobWithApplicants) => (
          <div
            key={job._id.toString()}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start border-b pb-4 mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{job.title}</h2>
                <p className="text-sm text-gray-500">
                  {job.location} • {job.category}
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/dashboard/edit/${job._id.toString()}`}
                  className="text-sm bg-amber-50 text-amber-700 px-4 py-2 rounded-md border border-amber-200 hover:bg-amber-100 transition">
                  Edit
                </Link>
                <DeleteJobButton id={job._id.toString()} />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">
                Applications Received ({job.applicants.length})
              </h3>
              {job.applicants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {job.applicants.map((app: Applicant) => (
                    <div
                      key={app._id.toString()}
                      className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          {app.applicantName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {app.applicantEmail}
                        </p>
                      </div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  No applicants yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
