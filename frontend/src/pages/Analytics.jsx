import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Analytics() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://127.0.0.1:8000/analytics/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load analytics.");
    }
  };

  if (!analytics) {
    return (
      <div className="min-h-screen bg-[#0b1120]">
        <Sidebar />

        <main className="ml-64 p-8">

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-10 text-center">

            <div className="text-4xl mb-4 animate-pulse">
              📊
            </div>

            <p className="text-slate-300">
              Loading wildlife analytics...
            </p>

          </div>

        </main>
      </div>
    );
  }

  const colors = [
    "#14b8a6",
    "#3b82f6",
    "#f59e0b",
    "#ec4899",
    "#8b5cf6",
    "#06b6d4",
    "#22c55e",
    "#f97316",
  ];

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-pink-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Wildlife Data Analysis
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Biodiversity Analytics
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl">
            Explore wildlife detection patterns and species distribution
            using the observations recorded in the system.
          </p>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

          {/* Total Detections */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Total Detections
                </p>

                <p className="text-4xl font-bold text-white mt-2">
                  {analytics.total_detections}
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-2xl">
                🔎
              </div>

            </div>

          </div>

          {/* Species Types */}
          <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Species Types
                </p>

                <p className="text-4xl font-bold text-white mt-2">
                  {analytics.species_count.length}
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-teal-500 flex items-center justify-center text-2xl">
                🐾
              </div>

            </div>

          </div>

          {/* Analysis */}
          <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Analysis Status
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  Available
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center text-2xl">
                📈
              </div>

            </div>

          </div>

        </div>

        {/* Species Table */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-2xl">
              🐾
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Species Detection Summary
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Number of detection records for each wildlife type.
              </p>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10">

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Wildlife
                  </th>

                  <th className="text-right p-4 text-slate-400 text-sm font-semibold">
                    Detection Count
                  </th>

                </tr>

              </thead>

              <tbody>

                {analytics.species_count.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >

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

                    <td className="p-4 text-right">

                      <span className="text-amber-400 font-bold">
                        {item.count}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Bar Chart */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl">
              📊
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Species Distribution
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Comparison of wildlife detection counts.
              </p>

            </div>

          </div>

          <div className="w-full h-[380px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={analytics.species_count}
                margin={{
                  top: 20,
                  right: 20,
                  left: 10,
                  bottom: 60,
                }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="animal"
                  stroke="#94a3b8"
                  angle={-25}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                />

                <Bar
                  dataKey="count"
                  fill="#14b8a6"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Pie Chart */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-2xl">
              🥧
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Species Percentage
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                Proportion of each wildlife type within the recorded
                detection data.
              </p>

            </div>

          </div>

          <div className="w-full h-[420px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={analytics.species_count}
                  dataKey="count"
                  nameKey="animal"
                  outerRadius={145}
                  label
                >

                  {analytics.species_count.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={colors[index % colors.length]}
                    />

                  ))}

                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    color: "#cbd5e1",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Bottom Information */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-400/20 flex items-center justify-center text-2xl shrink-0">
              🌿
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Analytics Information
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">
                These visualizations summarize wildlife detection records
                available in the system. They can be used to compare
                species occurrence and understand the distribution of
                recorded observations.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Analytics;