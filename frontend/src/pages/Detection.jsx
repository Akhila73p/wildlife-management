import { API_BASE_URL } from "../config";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function Detection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_BASE_URL}/detect/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Image detection failed.");
    } finally {
      setLoading(false);
    }
  };

  const getAnimalName = () => {
    if (!result || !result.detections || result.detections.length === 0) {
      return "No Animal Detected";
    }

    return result.detections[0].animal || "Unknown Animal";
  };

  const getConfidence = () => {
    if (!result || !result.detections || result.detections.length === 0) {
      return 0;
    }

    const value = result.detections[0].confidence ?? 0;
    return Number(value).toFixed(2);
  };

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* HEADER */}
        <div className="mb-8">

          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Wildlife Vision Module
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Wildlife Image Detection
          </h1>

          <p className="text-slate-400 mt-2">
            Upload an image to analyze the wildlife present in it.
          </p>

        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

          {/* UPLOAD CARD */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 shadow-2xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white text-2xl shadow-lg">
                📷
              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  Upload Wildlife Image
                </h2>

                <p className="text-slate-400 text-sm">
                  JPG, JPEG or PNG
                </p>

              </div>

            </div>

            {/* IMAGE AREA */}
            <label
              htmlFor="wildlife-image"
              className="block border-2 border-dashed border-blue-400/40 rounded-2xl min-h-[350px] p-6 text-center cursor-pointer bg-blue-500/5 hover:bg-blue-500/10 hover:border-blue-400 transition"
            >

              {preview ? (

                <div className="h-full flex items-center justify-center">

                  <img
                    src={preview}
                    alt="Selected wildlife"
                    className="w-full h-[310px] object-contain rounded-xl"
                  />

                </div>

              ) : (

                <div className="min-h-[310px] flex flex-col items-center justify-center">

                  <div className="w-20 h-20 rounded-full bg-amber-400/10 flex items-center justify-center text-5xl mb-5">
                    🐾
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    Select a wildlife image
                  </h3>

                  <p className="text-slate-400 mt-2">
                    Click here to browse your computer
                  </p>

                  <span className="mt-5 px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm">
                    Choose Image
                  </span>

                </div>

              )}

            </label>

            <input
              id="wildlife-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* FILE NAME */}
            {file && (

              <div className="mt-4 bg-slate-800/70 border border-white/10 rounded-xl p-4">

                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Selected file
                </p>

                <p className="font-semibold text-slate-200 truncate mt-1">
                  {file.name}
                </p>

              </div>

            )}

            {/* BUTTON */}
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition ${
                loading || !file
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 shadow-lg shadow-blue-500/20"
              }`}
            >

              {loading ? (

                <span className="flex items-center justify-center gap-3">

                  <span className="animate-spin">
                    ◌
                  </span>

                  Analyzing Image...

                </span>

              ) : (

                "🔍 Detect Animal"

              )}

            </button>

          </div>

          {/* RESULT CARD */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 shadow-2xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-white text-2xl shadow-lg">
                🔬
              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  Detection Result
                </h2>

                <p className="text-slate-400 text-sm">
                  Wildlife analysis output
                </p>

              </div>

            </div>

            {/* NO RESULT */}
            {!result && !loading && (

              <div className="min-h-[350px] flex flex-col items-center justify-center text-center">

                <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center text-5xl mb-6">
                  🔎
                </div>

                <h3 className="text-xl font-bold text-white">
                  Waiting for detection
                </h3>

                <p className="text-slate-400 mt-2 max-w-sm">
                  Upload an image and start detection to view the result.
                </p>

              </div>

            )}

            {/* LOADING */}
            {loading && (

              <div className="min-h-[350px] flex flex-col items-center justify-center">

                <div className="w-24 h-24 rounded-full bg-cyan-500/10 flex items-center justify-center text-5xl animate-pulse mb-6">
                  🔬
                </div>

                <h3 className="text-xl font-bold text-white">
                  Analyzing Image
                </h3>

                <p className="text-slate-400 mt-2">
                  Processing your wildlife image...
                </p>

              </div>

            )}

            {/* RESULT */}
            {result && !loading && (

              <div>

                <div className="bg-gradient-to-br from-amber-400/10 to-orange-500/10 border border-amber-400/20 rounded-2xl p-6">

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center text-2xl text-[#111827]">
                      ✓
                    </div>

                    <div>

                      <p className="text-sm text-amber-400 font-semibold uppercase tracking-wider">
                        Detection Successful
                      </p>

                      <h3 className="text-3xl font-bold text-white capitalize mt-1">
                        {getAnimalName()}
                      </h3>

                    </div>

                  </div>

                  {/* CONFIDENCE */}
                  <div className="mt-7">

                    <div className="flex justify-between mb-3">

                      <span className="font-semibold text-slate-300">
                        Confidence
                      </span>

                      <span className="font-bold text-cyan-400">
                        {getConfidence()}%
                      </span>

                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">

                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(
                            Number(getConfidence()),
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                {/* ANALYZED IMAGE */}
                {preview && (

                  <div className="mt-6">

                    <h3 className="font-semibold text-slate-300 mb-3">
                      Analyzed Image
                    </h3>

                    <div className="bg-slate-900 border border-white/10 rounded-xl p-3">

                      <img
                        src={preview}
                        alt="Detected wildlife"
                        className="w-full h-64 object-contain rounded-lg"
                      />

                    </div>

                  </div>

                )}

              </div>

            )}

          </div>

        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🎯
            </div>

            <h3 className="font-bold text-white">
              Animal Identification
            </h3>

            <p className="text-slate-400 text-sm mt-2">
              Identifies wildlife from uploaded images.
            </p>

          </div>

          <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              📊
            </div>

            <h3 className="font-bold text-white">
              Confidence Score
            </h3>

            <p className="text-slate-400 text-sm mt-2">
              View the confidence level returned by the detection model.
            </p>

          </div>

          <div className="bg-amber-500/10 border border-amber-400/20 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🐾
            </div>

            <h3 className="font-bold text-white">
              Wildlife Monitoring
            </h3>

            <p className="text-slate-400 text-sm mt-2">
              Support wildlife observation and biodiversity monitoring.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Detection;