import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import Link from "next/link";

export default async function JobListingPage() {
  await dbConnect();

  const jobs = await Job.find({}).sort({ createdAt: -1 });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Current Vacancies</h1>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job._id.toString()}
            className="border p-6 rounded-lg shadow-sm bg-white">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">
              {job.companyName} • {job.location}
            </p>
            <Link
              href={`/jobs/${job._id}`}
              className="mt-4 inline-block text-blue-600 font-medium">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
