"use client";
import { deleteJob } from "@/app/actions/jobActions";

export default function DeleteJobButton({ id }: { id: string }) {
  return (
    <button
      onClick={async () => {
        if (confirm("Are you sure you want to delete this listing?")) {
          await deleteJob(id);
        }
      }}
      className="text-red-600 hover:underline">
      Delete
    </button>
  );
}
