import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <div className="ml-64 flex-1 px-8 py-7">

        <TopNavbar />

        <div className="mt-8">

          <div className="mb-8">

            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Wildlife Intelligence
            </p>

            <h1 className="text-4xl font-bold text-white mt-2">
              Command Dashboard
            </h1>

            <p className="text-slate-400 mt-2">
              Monitor wildlife observations, detections and conservation data.
            </p>

          </div>

          <DashboardCards />

          <div className="mt-8 bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-xl">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Wildlife Monitoring
                </h2>

                <p className="text-slate-400 mt-2">
                  Select a module from the sidebar to explore your project data.
                </p>
              </div>

              <div className="text-5xl">
                🐾
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;