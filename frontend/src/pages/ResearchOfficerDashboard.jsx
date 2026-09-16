import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

function ResearchOfficerDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <div className="ml-64 flex-1 px-8 py-7">

        <TopNavbar />

        <div className="mt-8">

          {/* HEADER */}
          <div className="mb-8">

            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Research Officer Portal
            </p>

            <h1 className="text-4xl font-bold text-white mt-2">
              Wildlife Analysis Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Analyze population, habitat, conservation and ecosystem data.
            </p>

          </div>

          {/* MODULE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📊</div>

              <h2 className="text-xl font-bold text-white">
                Population Analysis
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Analyze wildlife population trends and distribution data.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🌳</div>

              <h2 className="text-xl font-bold text-white">
                Habitat Analysis
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Study habitat conditions and environmental information.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📈</div>

              <h2 className="text-xl font-bold text-white">
                Analytics
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Review wildlife data analysis and statistical trends.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🛡️</div>

              <h2 className="text-xl font-bold text-white">
                Conservation
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Review conservation information and wildlife protection data.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🌍</div>

              <h2 className="text-xl font-bold text-white">
                Ecosystem Health
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Examine ecosystem indicators and environmental conditions.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📄</div>

              <h2 className="text-xl font-bold text-white">
                Reports
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Prepare and review wildlife research reports.
              </p>
            </div>

          </div>

          {/* INFORMATION PANEL */}
          <div className="mt-8 bg-[#111827] border border-white/10 rounded-2xl p-8">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Research Analysis Workspace
                </h2>

                <p className="text-slate-400 mt-2">
                  Use the available modules to analyze wildlife population,
                  habitat, conservation and ecosystem information.
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

export default ResearchOfficerDashboard;