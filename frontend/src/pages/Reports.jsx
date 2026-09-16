import { API_BASE_URL } from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function Reports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `${API_BASE_URL}/population/locations`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setReports(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load wildlife dataset.");
    }
  };

  const filteredReports = reports.filter((item) => {
    const searchText = search.toLowerCase();

    return (
      (item.scientific_name || "").toLowerCase().includes(searchText) ||
      (item.common_name || "").toLowerCase().includes(searchText) ||
      (item.iconic_taxon_name || "").toLowerCase().includes(searchText)
    );
  });

  // PDF Export
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Wildlife Dataset Report", 14, 20);

    doc.setFontSize(11);
    doc.text(
      `Total Records: ${filteredReports.length}`,
      14,
      30
    );

    const tableData = filteredReports.map((item) => [
      item.scientific_name || "—",
      item.common_name || "—",
      item.iconic_taxon_name || "—",
      item.latitude ?? "—",
      item.longitude ?? "—",
      item.observed_on || "—"
    ]);

    autoTable(doc, {
      startY: 38,
      head: [
        [
          "Scientific Name",
          "Common Name",
          "Group",
          "Latitude",
          "Longitude",
          "Observation Date"
        ]
      ],
      body: tableData,
      styles: {
        fontSize: 7
      }
    });

    doc.save("wildlife-dataset-report.pdf");
  };

  // Excel Export
  const downloadExcel = () => {
    const excelData = filteredReports.map((item) => ({
      "Scientific Name": item.scientific_name || "—",
      "Common Name": item.common_name || "—",
      "Wildlife Group": item.iconic_taxon_name || "—",
      Latitude: item.latitude ?? "—",
      Longitude: item.longitude ?? "—",
      "Observation Date": item.observed_on || "—"
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Wildlife Dataset"
    );

    XLSX.writeFile(
      workbook,
      "wildlife-dataset-report.xlsx"
    );
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Wildlife Data Management
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Wildlife Dataset Reports
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl">
            Review wildlife observations from the population dataset
            and export the available records for documentation and analysis.
          </p>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

          {/* Total Records */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Total Dataset Records
                </p>

                <p className="text-4xl font-bold text-white mt-2">
                  {reports.length}
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-2xl">
                📊
              </div>

            </div>

          </div>

          {/* Filtered Records */}
          <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Records Shown
                </p>

                <p className="text-4xl font-bold text-white mt-2">
                  {filteredReports.length}
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-teal-500 flex items-center justify-center text-2xl">
                🔎
              </div>

            </div>

          </div>

          {/* Export */}
          <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Export Formats
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  PDF + Excel
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center text-2xl">
                📥
              </div>

            </div>

          </div>

        </div>

        {/* Search & Export Panel */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 mb-7">

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative flex-1 max-w-xl">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                🔎
              </span>

              <input
                type="text"
                placeholder="Search by scientific name, common name or group..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0b1120] border border-white/10 text-white placeholder-slate-500 pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/20 transition"
              />

            </div>

            {/* Export Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">

              <button
                onClick={downloadPDF}
                className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-400/20 text-red-400 px-5 py-3 rounded-xl font-semibold hover:bg-red-500/20 transition"
              >
                📄
                Download PDF
              </button>

              <button
                onClick={downloadExcel}
                className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-400/20 text-green-400 px-5 py-3 rounded-xl font-semibold hover:bg-green-500/20 transition"
              >
                📊
                Download Excel
              </button>

            </div>

          </div>

        </div>

        {/* Dataset Table */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden">

          {/* Table Header */}
          <div className="p-7 border-b border-white/10">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center text-2xl">
                📋
              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Wildlife Dataset Records
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Observation records retrieved from the wildlife dataset.
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
                    Scientific Name
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Common Name
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Group
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Latitude
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Longitude
                  </th>

                  <th className="text-left p-4 text-slate-400 text-sm font-semibold">
                    Observation Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredReports.length > 0 ? (

                  filteredReports.map((item, index) => (

                    <tr
                      key={index}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >

                      <td className="p-4 text-white font-medium">
                        {item.scientific_name || "—"}
                      </td>

                      <td className="p-4 text-slate-300">
                        {item.common_name || "—"}
                      </td>

                      <td className="p-4">

                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-400 text-sm font-semibold">
                          {item.iconic_taxon_name || "—"}
                        </span>

                      </td>

                      <td className="p-4 text-slate-400 text-sm">
                        {item.latitude ?? "—"}
                      </td>

                      <td className="p-4 text-slate-400 text-sm">
                        {item.longitude ?? "—"}
                      </td>

                      <td className="p-4 text-slate-400 text-sm">
                        {item.observed_on || "—"}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      className="p-12 text-center"
                    >

                      <div className="text-5xl mb-4">
                        📄
                      </div>

                      <p className="text-slate-400">
                        No wildlife records found.
                      </p>

                      {search && (
                        <p className="text-slate-600 text-sm mt-2">
                          Try searching for a different wildlife name.
                        </p>
                      )}

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

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-2xl shrink-0">
              💡
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Report Information
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">
                Use the search field to filter wildlife dataset records.
                Reports can be exported as PDF or Excel files for
                documentation, analysis and conservation reporting.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Reports;