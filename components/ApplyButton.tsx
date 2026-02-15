"use client";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function ApplyButton({
  jobId,
  userId,
  jobTitle,
}: {
  jobId: string;
  userId: string | null;
  jobTitle: string;
}) {
  const { isSignedIn } = useUser();

  const handleApply = async () => {
    alert(
      `Success! Your application for Job ${jobTitle} has been sent to the employer.`,
    );
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

  return (
    <button
      onClick={handleApply}
      className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition">
      Apply Now
    </button>
  );
}
