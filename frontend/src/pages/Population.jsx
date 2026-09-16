import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Population() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    fetchPopulationData();
  }, []);

  async function fetchPopulationData() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/population/summary",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setData(response.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load population data.");
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // SEARCH SPECIES FROM WILDLIFE DATASET
  // =====================================================

  async function handleSearch() {
    const query = searchTerm.trim();

    if (!query) {
      setSearchResults([]);
      setSearchMessage("");
      return;
    }

    try {
      setSearchLoading(true);
      setSearchMessage("");

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/population/species-search",
        {
          params: {
            query: query
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSearchResults(response.data.results || []);

      if (!response.data.results || response.data.results.length === 0) {
        setSearchMessage(`No species found for "${query}".`);
      }
    } catch (err) {
      console.error(err);
      setSearchResults([]);
      setSearchMessage("Unable to search the wildlife dataset.");
    } finally {
      setSearchLoading(false);
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6">

          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Wildlife Analytics
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Population Intelligence
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl">
            Population and species analysis based on application detections
            and wildlife observation data.
          </p>

        </div>


        {/* =====================================================
            SPECIES SEARCH - TOP
        ===================================================== */}

        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 mb-7">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
                Wildlife Dataset Search
              </p>

              <h2 className="text-2xl font-bold text-white mt-1">
                Search Species
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Search the wildlife dataset by common name or scientific name.
              </p>

            </div>


            <div className="flex w-full lg:w-[500px] gap-2">

              <div className="relative flex-1">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  🔍
                </span>

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search Tiger, Lion, Panthera..."
                  className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-500 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition"
                />

              </div>

              <button
                type="button"
                onClick={handleSearch}
                disabled={searchLoading}
                className="px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-[#06131c] font-bold rounded-xl transition"
              >
                {searchLoading ? "Searching..." : "Search"}
              </button>

            </div>

          </div>


          {/* =====================================================
              SEARCH RESULTS
          ===================================================== */}

          {searchResults.length > 0 && (

            <div className="mt-6 border-t border-white/10 pt-6">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <h3 className="text-lg font-bold text-white">
                    Search Results
                  </h3>

                  <p className="text-slate-500 text-sm mt-1">
                    {searchResults.length} matching species found
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                {searchResults.map((item, index) => (

                  <div
                    key={index}
                    className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-cyan-400/30 transition"
                  >

                    {/* Species name */}

                    <div className="flex items-start gap-3 mb-4">

                      <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-xl">
                        🐾
                      </div>

                      <div className="min-w-0">

                        <p className="text-white font-bold text-lg">
                          {item.common_name || "Unknown Species"}
                        </p>

                        <p className="text-cyan-400 text-sm italic break-words">
                          {item.scientific_name || "Scientific name unavailable"}
                        </p>

                      </div>

                    </div>


                    {/* Wildlife group */}

                    <div className="flex items-center justify-between py-2 border-b border-white/5">

                      <span className="text-slate-400 text-sm">
                        Wildlife Group
                      </span>

                      <span className="text-white font-medium">
                        {item.wildlife_group || "Unknown"}
                      </span>

                    </div>


                    {/* Dataset observations */}

                    <div className="flex items-center justify-between py-2 border-b border-white/5">

                      <span className="text-slate-400 text-sm">
                        Dataset Observations
                      </span>

                      <span className="text-emerald-400 font-bold">
                        {item.dataset_observations.toLocaleString()}
                      </span>

                    </div>


                    {/* Application detections */}

                    <div className="flex items-center justify-between py-2">

                      <span className="text-slate-400 text-sm">
                        Application Detections
                      </span>

                      <span className="text-amber-400 font-bold">
                        {item.application_detections}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )}


          {/* Search no result */}

          {searchMessage && (

            <div className="mt-5 bg-red-500/10 border border-red-400/20 rounded-xl p-4">

              <p className="text-red-400">
                🔍 {searchMessage}
              </p>

            </div>

          )}

        </div>


        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-10 text-center">

            <div className="text-4xl mb-4 animate-pulse">
              🐾
            </div>

            <p className="text-slate-300">
              Loading population data...
            </p>

          </div>

        )}


        {/* =====================================================
            ERROR
        ===================================================== */}

        {!loading && error && (

          <div className="bg-red-500/10 border border-red-400/20 rounded-2xl p-6">

            <p className="text-red-400 font-semibold">
              {error}
            </p>

          </div>

        )}


        {/* =====================================================
            MAIN DATA
        ===================================================== */}

        {!loading && !error && data && (

          <>

            {/* Application Summary */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Total Detections */}

              <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-400 text-sm">
                      Application Detections
                    </p>

                    <p className="text-4xl font-bold text-white mt-2">
                      {data.total_detections}
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-2xl">
                    🔎
                  </div>

                </div>

              </div>


              {/* Species Richness */}

              <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-slate-400 text-sm">
                      Detected Species
                    </p>

                    <p className="text-4xl font-bold text-white mt-2">
                      {data.species_richness}
                    </p>

                  </div>

                  <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center text-2xl">
                    🐾
                  </div>

                </div>

              </div>

            </div>


            {/* =====================================================
                WILDLIFE DATASET
            ===================================================== */}

            {data.wildlife_dataset && (

              <div className="mt-7">

                <div className="mb-5">

                  <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
                    Wildlife Observation Dataset
                  </p>

                  <h2 className="text-2xl font-bold text-white mt-1">
                    Dataset Insights
                  </h2>

                  <p className="text-slate-400 text-sm mt-1">
                    Wildlife observations used for broader species and
                    distribution analysis.
                  </p>

                </div>


                {/* Dataset Summary Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                  {/* Total Observations */}

                  <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

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

                  <div className="bg-pink-500/10 border border-pink-400/20 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-slate-400 text-sm">
                          Dataset Species
                        </p>

                        <p className="text-3xl font-bold text-white mt-2">
                          {data.wildlife_dataset.species_count}
                        </p>

                      </div>

                      <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center text-xl">
                        🧬
                      </div>

                    </div>

                  </div>


                  {/* Birds */}

                  <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

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

                      <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-xl">
                        🐦
                      </div>

                    </div>

                  </div>


                  {/* Mammals */}

                  <div className="bg-orange-500/10 border border-orange-400/20 rounded-2xl p-6">

                    <div className="flex items-center justify-between">

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


                {/* Wildlife Group Distribution */}

                <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-6">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-11 h-11 rounded-xl bg-emerald-500 flex items-center justify-center text-xl">
                      🌿
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold text-white">
                        Wildlife Group Distribution
                      </h2>

                      <p className="text-slate-400 text-sm">
                        Observation distribution across major wildlife groups.
                      </p>

                    </div>

                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {Object.entries(
                      data.wildlife_dataset.groups || {}
                    ).map(([group, count]) => (

                      <div
                        key={group}
                        className="bg-white/5 border border-white/10 rounded-xl p-5"
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-white font-semibold">
                              {group}
                            </p>

                            <p className="text-slate-500 text-sm mt-1">
                              Wildlife observations
                            </p>

                          </div>

                          <p className="text-emerald-400 text-xl font-bold">
                            {count.toLocaleString()}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>


                {/* Top Observed Species */}

                <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-6">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-11 h-11 rounded-xl bg-fuchsia-500 flex items-center justify-center text-xl">
                      ⭐
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold text-white">
                        Top Observed Species
                      </h2>

                      <p className="text-slate-400 text-sm">
                        Species with the highest number of observations in
                        the dataset.
                      </p>

                    </div>

                  </div>


                  <div className="space-y-3">

                    {(
                      data.wildlife_dataset.top_species || []
                    ).map((item, index) => (

                      <div
                        key={index}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                      >

                        <div className="flex items-center gap-4">

                          <div className="w-9 h-9 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 font-bold">
                            {index + 1}
                          </div>

                          <span className="text-white font-medium">
                            {item.species}
                          </span>

                        </div>

                        <span className="text-fuchsia-400 font-bold">
                          {item.observations.toLocaleString()}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>
            )}


            {/* =====================================================
                APPLICATION SPECIES DETECTION COUNT
            ===================================================== */}

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-amber-500 flex items-center justify-center text-xl">
                  🐾
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Species Detection Count
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Counts calculated from wildlife detections recorded by
                    the application.
                  </p>

                </div>

              </div>


              {data.species && data.species.length > 0 ? (

                <div className="space-y-4">

                  {data.species.map((item, index) => (

                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                    >

                      <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          🐾
                        </div>

                        <span className="text-white font-semibold capitalize">
                          {item.animal}
                        </span>

                      </div>

                      <span className="text-amber-400 font-bold">
                        {item.detection_count}
                      </span>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="text-center py-10">

                  <p className="text-slate-400">
                    No species detection records available.
                  </p>

                </div>

              )}

            </div>


            {/* =====================================================
                DAILY TREND
            ===================================================== */}

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

              <div className="flex items-center gap-3 mb-6">

                <div className="w-11 h-11 rounded-xl bg-cyan-500 flex items-center justify-center text-xl">
                  📈
                </div>

                <div>

                  <h2 className="text-2xl font-bold text-white">
                    Detection Trend
                  </h2>

                  <p className="text-slate-400 text-sm">
                    Daily detection records from the application database.
                  </p>

                </div>

              </div>


              {data.daily_trend && data.daily_trend.length > 0 ? (

                <div className="space-y-3">

                  {data.daily_trend.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4"
                    >

                      <div className="w-28 text-slate-400 text-sm">
                        {item.date}
                      </div>

                      <div className="flex-1 bg-slate-800 rounded-full h-4 overflow-hidden">

                        <div
                          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-4 rounded-full"
                          style={{
                            width: `${Math.min(
                              item.detection_count * 10,
                              100
                            )}%`
                          }}
                        />

                      </div>

                      <div className="w-12 text-right text-cyan-400 font-bold">
                        {item.detection_count}
                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="text-center py-10">

                  <p className="text-slate-400">
                    No daily detection trend available.
                  </p>

                </div>

              )}

            </div>

          </>
        )}

      </main>

    </div>
  );
}

export default Population;