import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";

function ForestOfficerDashboard() {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <div className="ml-64 flex-1 px-8 py-7">

        <TopNavbar />

        <div className="mt-8">

          {/* HEADER */}
          <div className="mb-8">

            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Forest Officer Portal
            </p>

            <h1 className="text-4xl font-bold text-white mt-2">
              Wildlife Monitoring Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor wildlife populations, habitats, conservation activities and ecosystem conditions.
            </p>

          </div>

          {/* MODULE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🐾</div>

              <h2 className="text-xl font-bold text-white">
                Population Monitoring
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Monitor wildlife population records and population trends.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🌳</div>

              <h2 className="text-xl font-bold text-white">
                Habitat / GIS
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Monitor habitat information and geographic wildlife data.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🛡️</div>

              <h2 className="text-xl font-bold text-white">
                Conservation
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Monitor conservation activities and wildlife protection information.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">🌍</div>

              <h2 className="text-xl font-bold text-white">
                Ecosystem Health
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Monitor ecosystem conditions and environmental indicators.
              </p>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">
              <div className="text-3xl mb-4">📄</div>

              <h2 className="text-xl font-bold text-white">
                Reports
              </h2>

              <p className="text-slate-400 mt-2 text-sm">
                Review wildlife monitoring and conservation reports.
              </p>
            </div>

          </div>

          {/* INFORMATION PANEL */}
          <div className="mt-8 bg-[#111827] border border-white/10 rounded-2xl p-8">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Forest Monitoring Workspace
                </h2>

                <p className="text-slate-400 mt-2">
                  Use the available modules to monitor wildlife populations,
                  habitats, conservation activities and ecosystem conditions.
                </p>
              </div>

              <div className="text-5xl">
                🌲
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ForestOfficerDashboard;