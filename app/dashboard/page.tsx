// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import Job from "@/lib/models/Job.model";
import Link from "next/link";
import DeleteJobButton from "@/components/DeleteJobButton";

export default async function DashboardPage() {
  const { userId } = await auth();
  await dbConnect();

  const myJobs = await Job.find({ clerkId: userId }).sort({ createdAt: -1 });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Job Listings</h1>
        <Link
          href="/dashboard/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add New Job
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 border-b">Job Title</th>
              <th className="p-4 border-b">Date Posted</th>
              <th className="p-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myJobs.map((job) => (
              <tr key={job._id.toString()} className="hover:bg-gray-50">
                <td className="p-4 border-b font-medium">{job.title}</td>
                <td className="p-4 border-b text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 border-b text-right space-x-3">
                  <Link
                    href={`/dashboard/edit/${job._id}`}
                    className="text-amber-600 hover:underline">
                    Edit
                  </Link>
                  <DeleteJobButton id={job._id.toString()} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myJobs.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            You haven`t posted any jobs yet.
          </p>
        )}
      </div>
    </div>
  );
}
