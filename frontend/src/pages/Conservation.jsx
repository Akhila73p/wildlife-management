import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Conservation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecommendations();
  }, []);

  async function fetchRecommendations() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/conservation/recommendations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load conservation information.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-orange-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Conservation Intelligence
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Conservation Recommendations
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl">
            Review wildlife observation patterns and application detection
            records to support conservation monitoring.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-10 text-center">

            <div className="text-4xl animate-pulse mb-4">
              🛡️
            </div>

            <p className="text-slate-300">
              Analyzing conservation data...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-6">

            <p className="text-red-400 font-semibold">
              {error}
            </p>

          </div>
        )}

        {/* Main Data */}
        {!loading && !error && data && (
          <>

            {/* Wildlife Conservation Overview */}
            {data.wildlife_dataset && (
              <>

                <div className="mb-5">

                  <h2 className="text-2xl font-bold text-white">
                    Wildlife Conservation Overview
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    Summary of wildlife observations available for
                    conservation analysis.
                  </p>

                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                  {/* Total Observations */}
                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-6">

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Wildlife Observations
                        </p>

                        <p className="text-3xl font-bold text-white mt-2">
                          {data.wildlife_dataset.total_observations.toLocaleString()}
                        </p>

                      </div>

                      <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-xl">
                        🌍
                      </div>

                    </div>

                  </div>

                  {/* Species */}
                  <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Observed Species
                        </p>

                        <p className="text-3xl font-bold text-white mt-2">
                          {data.wildlife_dataset.species_count}
                        </p>

                      </div>

                      <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-xl">
                        🐾
                      </div>

                    </div>

                  </div>

                  {/* Birds */}
                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Bird Observations
                        </p>

                        <p className="text-3xl font-bold text-white mt-2">
                          {(
                            data.wildlife_dataset.groups?.Aves || 0
                          ).toLocaleString()}
                        </p>

                      </div>

                      <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-xl">
                        🐦
                      </div>

                    </div>

                  </div>

                  {/* Mammals */}
                  <div className="bg-orange-500/10 border border-orange-400/20 rounded-2xl p-6">

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Mammal Observations
                        </p>

                        <p className="text-3xl font-bold text-white mt-2">
                          {(
                            data.wildlife_dataset.groups?.Mammalia || 0
                          ).toLocaleString()}
                        </p>

                      </div>

                      <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-xl">
                        🐘
                      </div>

                    </div>

                  </div>

                </div>

                {/* Wildlife Groups */}
                <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-2xl">
                      🌿
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold text-white">
                        Wildlife Groups
                      </h2>

                      <p className="text-slate-400 text-sm">
                        Observation counts across the wildlife groups
                        included in the dataset.
                      </p>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {Object.entries(
                      data.wildlife_dataset.groups || {}
                    ).map(([group, count]) => (

                      <div
                        key={group}
                        className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center"
                      >

                        <span className="text-white font-semibold">
                          {group}
                        </span>

                        <span className="text-green-400 text-xl font-bold">
                          {count.toLocaleString()}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                {/* Frequently Observed Species */}
                <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

                  <div className="flex items-center gap-4 mb-6">

                    <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-2xl">
                      🔍
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold text-white">
                        Frequently Observed Species
                      </h2>

                      <p className="text-slate-400 text-sm">
                        Species with the highest observation frequency
                        in the connected wildlife dataset.
                      </p>

                    </div>

                  </div>

                  <div className="space-y-3">

                    {(data.wildlife_dataset.top_species || []).map(
                      (item, index) => (

                        <div
                          key={index}
                          className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
                        >

                          <div className="flex items-center gap-4">

                            <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                              {index + 1}
                            </div>

                            <span className="text-white font-medium">
                              {item.species}
                            </span>

                          </div>

                          <span className="text-pink-400 font-bold">
                            {item.observations.toLocaleString()}
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </>
            )}

            {/* Application Detection Summary */}
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6 mt-7">

              <p className="text-slate-400 text-sm">
                Application Detection Records Analyzed
              </p>

              <p className="text-4xl font-bold text-blue-400 mt-2">
                {data.total_detections}
              </p>

            </div>

            {/* Recommendations */}
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

              <div className="flex items-center gap-4 mb-7">

                <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-2xl">
                  🛡️
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Monitoring Recommendations
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Recommendations derived from application detection
                    records.
                  </p>

                </div>

              </div>

              {data.recommendations &&
              data.recommendations.length > 0 ? (

                <div className="space-y-5">

                  {data.recommendations.map((item, index) => (

                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-2xl p-6"
                    >

                      <div className="flex items-start gap-4">

                        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-xl shrink-0">
                          💡
                        </div>

                        <div className="flex-1">

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-xl font-bold text-white">
                              {item.type}
                            </h3>

                            {item.animal && (
                              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-sm font-semibold capitalize">
                                {item.animal}
                              </span>
                            )}

                          </div>

                          <p className="text-slate-400 mt-3 leading-relaxed">
                            {item.recommendation}
                          </p>

                          <p className="text-cyan-400 text-sm font-semibold mt-4">
                            Detection count: {item.detection_count}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-slate-400 text-center py-8">
                  No conservation recommendations are currently available.
                </p>

              )}

            </div>

          </>
        )}

      </main>

    </div>
  );
}

export default Conservation;