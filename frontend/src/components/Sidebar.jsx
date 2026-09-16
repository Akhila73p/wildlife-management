import { NavLink, useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

import {
  FaHome,
  FaPaw,
  FaCamera,
  FaMusic,
  FaHistory,
  FaChartBar,
  FaTree,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const commonItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
      color: "text-amber-400",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaFileAlt />,
      color: "text-yellow-400",
    },
  ];

  const studentItems = [
    {
      name: "Wildlife",
      path: "/wildlife",
      icon: <FaPaw />,
      color: "text-orange-400",
    },
    {
      name: "Image Detection",
      path: "/detection",
      icon: <FaCamera />,
      color: "text-blue-400",
    },
    {
      name: "Audio Detection",
      path: "/audio",
      icon: <FaMusic />,
      color: "text-purple-400",
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory />,
      color: "text-cyan-400",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
      color: "text-pink-400",
    },
    {
      name: "Population",
      path: "/population",
      icon: <FaPaw />,
      color: "text-amber-400",
    },
    {
      name: "Habitat",
      path: "/habitat",
      icon: <FaTree />,
      color: "text-teal-400",
    },
  ];

  const researchOfficerItems = [
    {
      name: "Population Analysis",
      path: "/population",
      icon: <FaPaw />,
      color: "text-amber-400",
    },
    {
      name: "Habitat Analysis",
      path: "/habitat",
      icon: <FaTree />,
      color: "text-teal-400",
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
      color: "text-pink-400",
    },
    {
      name: "Conservation",
      path: "/conservation",
      icon: <FaShieldAlt />,
      color: "text-orange-400",
    },
    {
      name: "Ecosystem Health",
      path: "/ecosystem-health",
      icon: <FaHeartbeat />,
      color: "text-pink-400",
    },
  ];

  const forestOfficerItems = [
    {
      name: "Population Monitoring",
      path: "/population",
      icon: <FaPaw />,
      color: "text-amber-400",
    },
    {
      name: "Habitat / GIS",
      path: "/habitat",
      icon: <FaTree />,
      color: "text-teal-400",
    },
    {
      name: "Conservation",
      path: "/conservation",
      icon: <FaShieldAlt />,
      color: "text-orange-400",
    },
    {
      name: "Ecosystem Health",
      path: "/ecosystem-health",
      icon: <FaHeartbeat />,
      color: "text-pink-400",
    },
  ];

  let roleItems = [];

  if (role === "student") {
    roleItems = studentItems;
  } else if (role === "research_officer") {
    roleItems = researchOfficerItems;
  } else if (role === "forest_officer") {
    roleItems = forestOfficerItems;
  } else if (role === "admin") {
    roleItems = [
      ...studentItems,
      {
        name: "Conservation",
        path: "/conservation",
        icon: <FaShieldAlt />,
        color: "text-orange-400",
      },
      {
        name: "Ecosystem Health",
        path: "/ecosystem-health",
        icon: <FaHeartbeat />,
        color: "text-pink-400",
      },
    ];
  }

  const menuItems = [
    ...commonItems.slice(0, 1),
    ...roleItems,
    ...commonItems.slice(1),
  ];

  const roleName = {
    student: "Student / Researcher",
    research_officer: "Research Officer",
    forest_officer: "Forest Officer",
    admin: "Administrator",
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0f172a] border-r border-white/10 shadow-2xl z-50 flex flex-col">

      {/* LOGO */}
      <div className="px-6 py-6 border-b border-white/10 shrink-0">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center text-2xl shadow-lg">
            🌿
          </div>

          <div>
            <h1 className="text-white font-bold text-sm">
              WILDLIFE
            </h1>

            <p className="text-slate-400 text-xs tracking-widest">
              INTELLIGENCE
            </p>
          </div>

        </div>

      </div>

      {/* USER TYPE */}
      <div className="px-5 pt-5">

        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">

          <p className="text-slate-500 text-xs uppercase tracking-wider">
            Access
          </p>

          <p className="text-white text-sm font-semibold mt-1">
            {roleName[role] || "User"}
          </p>

        </div>

      </div>

      {/* MAIN MENU */}
      <div className="flex-1 overflow-y-auto px-4 py-5">

        <p className="text-slate-500 text-xs uppercase tracking-widest px-3 mb-4">
          Main Menu
        </p>

        <nav className="space-y-2">

          {menuItems.map((item) => (

            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-white/10 text-white shadow-lg border border-white/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >

              <span className={`text-lg ${item.color}`}>
                {item.icon}
              </span>

              <span className="font-medium text-sm">
                {item.name}
              </span>

            </NavLink>

          ))}

        </nav>

      </div>

      {/* BOTTOM SECTION */}
      <div className="shrink-0 border-t border-white/10 bg-[#0f172a] p-4">

        {/* PROFILE */}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 mb-2
            ${
              isActive
                ? "bg-white/10 text-white shadow-lg border border-white/10"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >

          <span className="text-lg text-violet-400">
            <FaUser />
          </span>

          <span className="font-medium text-sm">
            Profile
          </span>

        </NavLink>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition"
        >

          <FaSignOutAlt />

          <span className="font-medium text-sm">
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;