"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getPaginatedJobs } from "@/app/actions/jobActions";

export default function JobListingClient() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await getPaginatedJobs(currentPage, ITEMS_PER_PAGE);
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    fetchJobs();
  }, [currentPage]);

  if (loading) return <div className="text-center p-10">Loading jobs...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Current Vacancies</h1>

      <div className="grid gap-6 mb-8">
        {jobs.length > 0 ? (
          jobs.map(
            (job: {
              _id: string;
              title: string;
              companyName: string;
              location: string;
            }) => (
              <div
                key={job._id}
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
            ),
          )
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded bg-white disabled:opacity-50">
          Previous
        </button>

        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded bg-white disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
