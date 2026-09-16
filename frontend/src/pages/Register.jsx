import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register",
        {
          full_name: fullName.trim(),
          email: email.trim(),
          password: password,
          role: role
        }
      );

      console.log("Registration successful:", response.data);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {
      console.log("Registration error:", error.response);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Registration failed. Please check the backend.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#07111f] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-5xl bg-[#0f1b2d] border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="hidden md:flex relative bg-gradient-to-br from-teal-900 via-[#0b2630] to-[#07111f] p-12 flex-col justify-between overflow-hidden">

          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-teal-400/10" />

          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-green-400/10" />

          <div className="relative z-10">

            <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-400/20 flex items-center justify-center text-4xl mb-8">
              🐾
            </div>

            <p className="text-teal-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Wildlife Intelligence
            </p>

            <h1 className="text-4xl font-bold text-white mt-4 leading-tight">
              Start your journey with

              <span className="text-teal-400 block">
                Wildlife Intelligence
              </span>
            </h1>

            <p className="text-slate-400 mt-6 leading-relaxed max-w-md">
              Create an account to explore wildlife observations, habitat
              intelligence, population analytics and conservation insights.
            </p>

          </div>

          <div className="relative z-10">

            <div className="flex items-center gap-3 text-slate-400 text-sm">

              <span className="w-2 h-2 bg-teal-400 rounded-full" />

              Wildlife Population Monitoring

            </div>

            <div className="flex items-center gap-3 text-slate-400 text-sm mt-3">

              <span className="w-2 h-2 bg-green-400 rounded-full" />

              Habitat & Conservation Intelligence

            </div>

          </div>

        </div>


        {/* REGISTER SECTION */}
        <div className="p-8 sm:p-12 bg-[#111827]">

          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-6">

            <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center text-3xl">
              🐾
            </div>

          </div>


          <div className="max-w-md mx-auto">

            <div className="mb-7">

              <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider">
                Create Account
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                Join the platform
              </h2>

              <p className="text-slate-400 mt-2">
                Create your account to access wildlife monitoring tools.
              </p>

            </div>


            <form onSubmit={handleRegister}>

              {/* FULL NAME */}
              <div className="mb-4">

                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    👤
                  </span>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-600 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition"
                    required
                  />

                </div>

              </div>


              {/* EMAIL */}
              <div className="mb-4">

                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ✉️
                  </span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-600 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition"
                    required
                  />

                </div>

              </div>


              {/* PASSWORD */}
              <div className="mb-4">

                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-600 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition"
                    required
                  />

                </div>

              </div>


              {/* CONFIRM PASSWORD */}
              <div className="mb-4">

                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    🔐
                  </span>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-600 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition"
                    required
                  />

                </div>

              </div>


              {/* ROLE */}
              <div className="mb-6">

                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Select Your Role
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10">
                    🛡️
                  </span>

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full appearance-none bg-[#0b1120] border border-white/10 text-white pl-12 pr-10 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition cursor-pointer"
                  >

                    <option value="student" className="bg-[#0b1120]">
                      🎓 Student / Researcher
                    </option>

                    <option value="research_officer" className="bg-[#0b1120]">
                      🧑‍🔬 Research Officer
                    </option>

                    <option value="forest_officer" className="bg-[#0b1120]">
                      🛡️ Forest Officer
                    </option>

                  </select>

                </div>

                <p className="text-slate-500 text-xs mt-2">
                  Your role determines which wildlife modules you can access.
                </p>

              </div>


              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-[#06131c] font-bold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-teal-500/10"
              >
                Create Account
              </button>

            </form>


            {/* LOGIN LINK */}
            <div className="mt-7 text-center">

              <p className="text-slate-500 text-sm">

                Already have an account?{" "}

                <Link
                  to="/login"
                  className="text-teal-400 font-semibold hover:text-teal-300 transition"
                >
                  Sign in
                </Link>

              </p>

            </div>


            {/* FOOTER */}
            <div className="mt-6 pt-5 border-t border-white/10 text-center">

              <p className="text-slate-500 text-sm">
                Wildlife Population Intelligence System
              </p>

              <p className="text-slate-600 text-xs mt-2">
                Data-driven wildlife monitoring and conservation
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;