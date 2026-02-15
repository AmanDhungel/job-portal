// components/EditJobForm.tsx
"use client";
import { updateJob } from "@/app/actions/jobActions";
import { useRouter } from "next/navigation";

export default function EditJobForm({
  job,
}: {
  job: { _id: string; title: string; description: string; location: string };
}) {
  const router = useRouter();

  async function handleUpdate(formData: FormData) {
    await updateJob(job._id, formData);
    router.push("/dashboard");
  }

  return (
    <form
      action={handleUpdate}
      className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Job Title
        </label>
        <input
          name="title"
          defaultValue={job.title}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Location
        </label>
        <input
          name="location"
          defaultValue={job.location}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={job.description}
          rows={6}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 border rounded-lg font-bold hover:bg-gray-50 transition">
          Cancel
        </button>
      </div>
    </form>
  );
}
