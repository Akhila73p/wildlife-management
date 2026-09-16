import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/login",
        {
          email: email.trim(),
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("LOGIN SUCCESS:", response.data);

      const token = response.data.access_token;

      if (!token) {
        alert("Login failed: Token not received");
        return;
      }

      // Save token
      localStorage.setItem("token", token);

      // Decode JWT
      const payload = JSON.parse(atob(token.split(".")[1]));

      const role = payload.role;
      const userEmail = payload.sub;

      // Save role
      localStorage.setItem("role", role);

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: userEmail,
          role: role,
        })
      );

      alert("Login Successful");

      // Redirect according to role
      if (role === "student") {
        window.location.href = "/student-dashboard";
      } else if (role === "research_officer") {
        window.location.href = "/research-officer-dashboard";
      } else if (role === "forest_officer") {
        window.location.href = "/forest-officer-dashboard";
      } else if (role === "admin") {
        window.location.href = "/dashboard";
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");

        alert("Invalid user role");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(
          `Login failed (${error.response.status}): ${
            error.response.data?.detail || "Invalid request"
          }`
        );
      } else {
        alert("Cannot connect to backend: " + error.message);
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
              Welcome back to
              <span className="text-teal-400 block">
                Wildlife Intelligence
              </span>
            </h1>

            <p className="text-slate-400 mt-6 leading-relaxed max-w-md">
              Monitor wildlife observations, explore habitat intelligence,
              analyze populations and support conservation decisions through
              data-driven insights.
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

        {/* RIGHT LOGIN SECTION */}
        <div className="p-8 sm:p-12 bg-[#111827]">

          {/* MOBILE LOGO */}
          <div className="md:hidden flex justify-center mb-6">

            <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center text-3xl">
              🐾
            </div>

          </div>

          <div className="max-w-md mx-auto">

            <div className="mb-8">

              <p className="text-teal-400 text-sm font-semibold uppercase tracking-wider">
                Secure Access
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                Sign in
              </h2>

              <p className="text-slate-400 mt-2">
                Access your wildlife intelligence dashboard.
              </p>

            </div>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="mb-5">

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
                    required
                    className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-600 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition"
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="mb-7">

                <label className="block text-slate-300 text-sm font-medium mb-2">
                  Password
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    🔒
                  </span>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-600 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/30 transition"
                  />

                </div>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-400 text-[#06131c] font-bold py-3.5 rounded-xl transition duration-200 shadow-lg shadow-teal-500/10"
              >
                Sign In
              </button>

            </form>

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t border-white/10 text-center">

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

export default Login;