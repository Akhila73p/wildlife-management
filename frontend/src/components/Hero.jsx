import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="min-h-screen bg-[#101820] relative overflow-hidden">

      {/* Decorative shapes */}

      <div className="absolute top-20 right-[-120px] w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-150px] left-[-100px] w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl"></div>


      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div className="max-w-5xl text-center">

          {/* Platform Label */}

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-5 py-2 mb-8">

            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>

            <span className="text-slate-300 text-sm tracking-wider">
              WILDLIFE MONITORING & CONSERVATION
            </span>

          </div>


          {/* Main Heading */}

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">

            Wildlife Population

            <span className="block text-amber-400 mt-2">
              Intelligence System
            </span>

          </h1>


          {/* Description */}

          <p className="max-w-2xl mx-auto mt-7 text-lg md:text-xl text-slate-300 leading-relaxed">

            A data-driven platform for wildlife detection, population
            monitoring, habitat mapping, analysis and conservation support
            in one unified system.

          </p>


          {/* Buttons */}

          <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

            {/* New Users */}

            <Link
              to="/register"
              className="px-8 py-4 bg-amber-400 text-[#101820] rounded-xl font-bold text-lg hover:bg-amber-300 transition shadow-lg"
            >
              Create Account →
            </Link>


            {/* Existing Users */}

            <Link
              to="/login"
              className="px-8 py-4 border border-slate-500 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition"
            >
              Already Registered? Sign In
            </Link>

          </div>


          {/* Small Guidance Text */}

          <p className="text-slate-500 text-sm mt-5">
            New to the platform? Create an account first.
          </p>


          {/* Feature Strip */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">


            {/* Wildlife Detection */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">

              <div className="text-3xl mb-2">
                🐾
              </div>

              <h3 className="text-white font-bold">
                Wildlife Detection
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Record and monitor wildlife observations
              </p>

            </div>


            {/* Population Analytics */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">

              <div className="text-3xl mb-2">
                📊
              </div>

              <h3 className="text-white font-bold">
                Population Analytics
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Analyze species and population observations
              </p>

            </div>


            {/* Conservation */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">

              <div className="text-3xl mb-2">
                🌍
              </div>

              <h3 className="text-white font-bold">
                Conservation Support
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                Support habitat and wildlife conservation
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;