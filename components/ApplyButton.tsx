"use client";
import { SignInButton, useUser } from "@clerk/nextjs";
import { applyToJobAction } from "@/app/actions/jobActions";
import { useState } from "react";

export default function ApplyButton({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const { isSignedIn, user } = useUser();
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleApply = async () => {
    setIsPending(true);
    try {
      const result = (await applyToJobAction(jobId, {
        name: user?.fullName ?? "",
        email: user?.emailAddresses[0].emailAddress ?? "",
      })) as { error?: string } | undefined;
      if (result?.error) {
        alert(result.error);
        setStatus("error");
      } else {
        setStatus("success");
      }
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
          Sign in to Apply
        </button>
      </SignInButton>
    );
  }

  if (status === "success") {
    return (
      <button
        disabled
        className="bg-gray-400 text-white px-8 py-3 rounded-xl font-bold cursor-not-allowed">
        Application Sent ✓
      </button>
    );
  }

  return (
    <button
      onClick={handleApply}
      disabled={isPending}
      className={`px-8 py-3 rounded-xl font-bold transition text-white ${
        isPending ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
      }`}>
      {isPending ? "Processing..." : "Apply Now"}
    </button>
  );
}
