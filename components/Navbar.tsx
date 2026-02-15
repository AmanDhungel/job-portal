import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 tracking-tight">
              Elevate<span className="text-gray-900">Work</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/jobs"
              className="text-gray-600 hover:text-blue-600 font-medium transition">
              Find Jobs
            </Link>

            <SignedIn>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-blue-600 font-medium transition">
                Post a Job
              </Link>
            </SignedIn>
          </div>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition cursor-pointer">
                    Sign In / Sign Up
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 hidden sm:inline">
                  Employer Console
                </span>
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
