import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        setUser({
          full_name: payload.full_name,
          email: payload.sub,
          role: payload.role,
        });
      } catch (error) {
        console.error("Unable to read user information:", error);
      }
    }
  }, []);

  const name = user?.full_name || "User";
  const email = user?.email || "Account email";
  const role = user?.role || "User";

  const roleName = role.replace(/_/g, " ");

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-violet-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Account Management
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            User Profile
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your account information and platform access.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-xl">

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-teal-500 flex items-center justify-center text-5xl shadow-lg">
              👤
            </div>

            {/* User Information */}
            <div className="flex-1">

              <p className="text-slate-500 text-sm uppercase tracking-wider">
                Welcome
              </p>

              {/* USER NAME */}
              <h2 className="text-3xl font-bold text-white mt-1">
                {name}
              </h2>

              {/* EMAIL */}
              <p className="text-slate-400 mt-2">
                {email}
              </p>

              {/* ROLE */}
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-400 text-sm font-semibold">

                  <span className="w-2 h-2 bg-violet-400 rounded-full"></span>

                  {roleName}

                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Account Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-7">

          {/* Personal Information */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-2xl">
                👤
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Personal Information
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Your registered account details
                </p>
              </div>

            </div>

            <div className="space-y-5">

              {/* Name */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">
                  Full Name
                </p>

                <p className="text-white font-medium mt-1">
                  {name}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">
                  Email Address
                </p>

                <p className="text-white font-medium mt-1 break-all">
                  {email}
                </p>
              </div>

              {/* Role */}
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider">
                  Account Role
                </p>

                <p className="text-white font-medium mt-1 capitalize">
                  {roleName}
                </p>
              </div>

            </div>

          </div>

          {/* Account Status */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-2xl">
                🛡️
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Account Status
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Current platform access
                </p>
              </div>

            </div>

            <div className="space-y-4">

              <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">

                <span className="text-slate-400">
                  Account
                </span>

                <span className="text-green-400 font-semibold flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-green-400"></span>

                  Active

                </span>

              </div>

              <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">

                <span className="text-slate-400">
                  Platform Access
                </span>

                <span className="text-teal-400 font-semibold">
                  Enabled
                </span>

              </div>

              <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">

                <span className="text-slate-400">
                  Role
                </span>

                <span className="text-violet-400 font-semibold capitalize">
                  {roleName}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Platform Information */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-2xl">
              🌿
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Wildlife Population Intelligence System
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Data-driven wildlife monitoring, population analysis,
                habitat mapping and conservation support.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;