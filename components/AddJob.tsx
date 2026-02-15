"use client";
import { useUser } from "@clerk/nextjs";
import { createJobAction } from "@/app/actions/jobActions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddJobPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!isLoaded)
    return <div className="p-10 text-center">Loading session...</div>;

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    try {
      await createJobAction(formData);
      router.push("/dashboard");
    } catch (error) {
      alert("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-10 border border-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Post a New Vacancy
      </h1>

      <form action={handleSubmit} className="space-y-4">
        {/* Row 1: Title & Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Frontend Developer"
              className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              name="companyName"
              required
              placeholder="Elevate Workforce"
              className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Row 2: Location & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              name="location"
              required
              placeholder="Kathmandu, Nepal"
              className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">Select Category</option>
              <option value="IT & Technology">IT & Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Banking">Banking</option>
              <option value="Education">Education</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>

        {/* Salary Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salary Range
          </label>
          <input
            name="salary"
            required
            placeholder="e.g. Rs. 50,000 - 80,000 per month"
            className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <textarea
            name="description"
            required
            rows={5}
            placeholder="Outline the responsibilities and requirements..."
            className="w-full p-2 border rounded-md mt-1 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition disabled:bg-gray-400">
          {loading ? "Posting..." : "Post Job Listing"}
        </button>
      </form>
    </div>
  );
}
