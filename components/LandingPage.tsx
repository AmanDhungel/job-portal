"use client";
import Link from "next/link";
import { Search, Users, ShieldCheck } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn } = useUser();
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Connecting Top Talent <br />
            with Nepal`s Leading Companies
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Digitizing the recruitment journey for Elevate Workforce Solutions.
            Find your dream job or hire the best professionals today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/jobs"
              className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
              Browse Jobs
            </Link>
            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white border border-blue-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition shadow-lg">
                Post a Vacancy
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white border border-blue-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition shadow-lg">
                  Post a Vacancy
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Elevate Workforce?
            </h2>
            <p className="text-gray-600 mt-2">
              The most trusted recruitment platform in the region.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            {/* Feature 1 */}
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Search</h3>
              <p className="text-gray-600 leading-relaxed">
                Filter jobs by location, category, and salary to find the
                perfect match in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Employer Dashboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Robust tools for companies to manage listings, track
                applications, and hire faster.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
              <p className="text-gray-600 leading-relaxed">
                Secure authentication powered by Clerk ensuring a safe community
                for all users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-gray-50 py-12 border-y">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center opacity-50 grayscale">
          <span className="text-2xl font-bold text-gray-400 uppercase">
            Himalayan Bank
          </span>
          <span className="text-2xl font-bold text-gray-400 uppercase">
            NTC
          </span>
          <span className="text-2xl font-bold text-gray-400 uppercase">
            Chaudhary Group
          </span>
          <span className="text-2xl font-bold text-gray-400 uppercase">
            Daraz
          </span>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">
              Ready to take the next step?
            </h2>
            <p className="mb-8 text-blue-100">
              Join thousands of others building their career with Elevate.
            </p>
            <Link
              href="/sign-up"
              className="bg-white text-blue-600 px-10 py-3 rounded-full font-bold hover:bg-gray-100 transition">
              Create Free Account
            </Link>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-50"></div>
        </div>
      </section>
    </div>
  );
}
