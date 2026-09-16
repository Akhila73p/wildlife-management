import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaPaw,
  FaDatabase,
  FaChartBar,
  FaLeaf,
} from "react-icons/fa";

function DashboardCards() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/population/summary`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.log("Unable to load dashboard data");
    }
  }

  const dataset = data?.wildlife_dataset;

  const cards = [
    {
      title: "Total Wildlife Observations",
      value: dataset ? dataset.total_observations : "—",
      icon: <FaDatabase />,
      iconBg: "bg-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-400/20",
      text: "text-blue-400",
    },
    {
      title: "Total Species",
      value: dataset ? dataset.species_count : "—",
      icon: <FaPaw />,
      iconBg: "bg-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-400/20",
      text: "text-amber-400",
    },
    {
      title: "Wildlife Groups",
      value: dataset
        ? Object.keys(dataset.groups || {}).length
        : "—",
      icon: <FaChartBar />,
      iconBg: "bg-purple-500",
      bg: "bg-purple-500/10",
      border: "border-purple-400/20",
      text: "text-purple-400",
    },
    {
      title: "Top Species",
      value:
        dataset?.top_species?.length > 0
          ? dataset.top_species[0].species
          : "—",
      icon: <FaLeaf />,
      iconBg: "bg-cyan-500",
      bg: "bg-cyan-500/10",
      border: "border-cyan-400/20",
      text: "text-cyan-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.bg} ${card.border}
          border rounded-2xl p-6 shadow-xl
          hover:-translate-y-1 transition-all duration-300`}
        >

          <div className="flex items-center justify-between">

            <div
              className={`${card.iconBg}
              w-12 h-12 rounded-xl
              flex items-center justify-center
              text-white text-xl shadow-lg`}
            >
              {card.icon}
            </div>

          </div>

          <p className="text-slate-400 text-sm mt-6">
            {card.title}
          </p>

          <h2
            className={`text-3xl font-bold ${card.text} mt-2`}
          >
            {card.value}
          </h2>

        </div>
      ))}

    </div>
  );
}

export default DashboardCards;