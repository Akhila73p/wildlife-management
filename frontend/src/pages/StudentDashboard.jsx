import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <div className="ml-64 flex-1 px-8 py-7">

        <TopNavbar />

        <div className="mt-8">

          {/* HEADER */}
          <div className="mb-8">

            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Student Portal
            </p>

            <h1 className="text-4xl font-bold text-white mt-2">
              Wildlife Research Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Explore wildlife observations, detections, population data and habitat information.
            </p>

          </div>

          {/* MODULE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🐾</div>

              <h2 className="text-xl font-bold text-white">
                Wildlife
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Explore wildlife species and observation records.
              </p>

            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📷</div>

              <h2 className="text-xl font-bold text-white">
                Image Detection
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Upload wildlife images and view detection results.
              </p>

            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🎵</div>

              <h2 className="text-xl font-bold text-white">
                Audio Detection
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Analyze wildlife audio recordings and observations.
              </p>

            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📊</div>

              <h2 className="text-xl font-bold text-white">
                Population
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Study wildlife population information and trends.
              </p>

            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🌳</div>

              <h2 className="text-xl font-bold text-white">
                Habitat
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Explore habitat information and environmental data.
              </p>

            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📈</div>

              <h2 className="text-xl font-bold text-white">
                Analytics
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                View wildlife data analysis and historical information.
              </p>

            </div>

          </div>

          {/* INFORMATION PANEL */}
          <div className="mt-8 bg-[#111827] border border-white/10 rounded-2xl p-8">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Student Research Workspace
                </h2>

                <p className="text-slate-400 mt-2">
                  Use the available modules to study wildlife observations,
                  detection results, population trends and habitat data.
                </p>
              </div>

              <div className="text-5xl">
                🔬
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;