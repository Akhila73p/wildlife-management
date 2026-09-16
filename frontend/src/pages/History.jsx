import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/detect/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(response.data);
    } catch (error) {
      console.log(error);
      alert("Unable to load history");
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Wildlife Activity
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Detection History
          </h1>

          <p className="text-slate-400 mt-2">
            Review wildlife detection records stored in the system.
          </p>

        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

          {/* Total Records */}
          <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Total Records
                </p>

                <p className="text-4xl font-bold text-white mt-2">
                  {history.length}
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl">
                🕒
              </div>

            </div>

          </div>

          {/* Record Type */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Record Type
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  Wildlife Detection
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-2xl">
                🐾
              </div>

            </div>

          </div>

          {/* Status */}
          <div className="bg-green-500/10 border border-green-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  History Status
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  Available
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center text-2xl">
                ✓
              </div>

            </div>

          </div>

        </div>

        {/* History Table */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-xl">

          {/* Table Header */}
          <div className="p-7 border-b border-white/10">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl">
                🕒
              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Wildlife Detection Records
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Previously recorded detection activity.
                </p>

              </div>

            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="bg-white/5 border-b border-white/10">

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Image
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Wildlife
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Confidence
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Detection Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {history.length > 0 ? (

                  history.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >

                      {/* Image */}
                      <td className="p-4 text-slate-300">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                            🖼️
                          </div>

                          <span className="text-sm">
                            {item.image_name}
                          </span>

                        </div>

                      </td>

                      {/* Animal */}
                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                            🐾
                          </div>

                          <span className="text-white font-medium">
                            {item.animal}
                          </span>

                        </div>

                      </td>

                      {/* Confidence */}
                      <td className="p-4">

                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-400 text-sm font-semibold">
                          {item.confidence}%
                        </span>

                      </td>

                      {/* Date */}
                      <td className="p-4 text-slate-400 text-sm">
                        {item.detected_at}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="p-14 text-center"
                    >

                      <div className="text-5xl mb-4">
                        🕒
                      </div>

                      <p className="text-slate-400">
                        No detection history available.
                      </p>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* Information */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-2xl shrink-0">
              ℹ️
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                History Information
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">
                This section contains previously recorded wildlife
                detection activity, including the observed wildlife,
                confidence value and detection time.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default History;