import { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AudioDetection() {
  const [audio, setAudio] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setAudio(selectedFile);
    setAudioUrl(URL.createObjectURL(selectedFile));
    setResult(null);
  };

  const handleUpload = async () => {
    if (!audio) {
      alert("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", audio);

    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/audio/detect",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Audio detection error:", error);
      alert("Audio detection failed.");
    } finally {
      setLoading(false);
    }
  };

  const confidence = result?.confidence
    ? Number(result.confidence).toFixed(2)
    : "0.00";

  return (
    <div className="flex min-h-screen bg-[#0b1120]">

      <Sidebar />

      <main className="ml-64 flex-1 p-8">

        {/* Header */}
        <div className="mb-8">

          <p className="text-purple-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Wildlife Sound Monitoring
          </p>

          <h1 className="text-4xl font-bold text-white mt-2">
            Audio Detection
          </h1>

          <p className="text-slate-400 mt-2 max-w-3xl">
            Upload a wildlife audio recording to identify the associated
            animal sound and view its detection confidence.
          </p>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

          <div className="bg-purple-500/10 border border-purple-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Supported Formats
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  WAV + MP3
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-purple-500 flex items-center justify-center text-2xl">
                🎵
              </div>

            </div>

          </div>

          <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Detection Method
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  Audio Analysis
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl">
                🔊
              </div>

            </div>

          </div>

          <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-400 text-sm">
                  Current Status
                </p>

                <p className="text-2xl font-bold text-white mt-2">
                  {loading ? "Processing" : result ? "Completed" : "Ready"}
                </p>

              </div>

              <div className="w-14 h-14 rounded-xl bg-teal-500 flex items-center justify-center text-2xl">
                {loading ? "⏳" : result ? "✓" : "🎧"}
              </div>

            </div>

          </div>

        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">

          {/* Upload Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 shadow-xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center text-2xl">
                🎵
              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Upload Wildlife Audio
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Select a WAV or MP3 wildlife recording.
                </p>

              </div>

            </div>

            {/* Upload Area */}
            <label
              htmlFor="audio-file"
              className="block border-2 border-dashed border-purple-400/30 bg-purple-500/5 rounded-2xl p-10 text-center cursor-pointer hover:bg-purple-500/10 hover:border-purple-400/50 transition"
            >

              <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center text-5xl mb-5">
                🎧
              </div>

              <p className="text-lg font-semibold text-white">
                Select an audio recording
              </p>

              <p className="text-slate-500 mt-2">
                Click here to browse your computer
              </p>

              <div className="mt-5 flex justify-center gap-2">

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs">
                  WAV
                </span>

                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs">
                  MP3
                </span>

              </div>

            </label>

            <input
              id="audio-file"
              type="file"
              accept=".wav,.mp3,audio/wav,audio/mpeg"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Selected Audio */}
            {audio && (

              <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    🎵
                  </div>

                  <div className="min-w-0">

                    <p className="text-slate-500 text-xs uppercase tracking-wider">
                      Selected File
                    </p>

                    <p className="text-white font-semibold truncate mt-1">
                      {audio.name}
                    </p>

                  </div>

                </div>

                {audioUrl && (

                  <audio
                    controls
                    src={audioUrl}
                    className="w-full mt-5"
                  />

                )}

              </div>

            )}

            {/* Detect Button */}
            <button
              onClick={handleUpload}
              disabled={!audio || loading}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition ${
                !audio || loading
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-400 shadow-lg shadow-purple-500/10"
              }`}
            >

              {loading
                ? "Processing Audio..."
                : "🔍 Detect Animal Sound"}

            </button>

          </div>

          {/* Result Card */}
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 shadow-xl">

            <div className="flex items-center gap-4 mb-6">

              <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl">
                🔊
              </div>

              <div>

                <h2 className="text-2xl font-bold text-white">
                  Detection Result
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Result from the uploaded audio recording.
                </p>

              </div>

            </div>

            {/* Empty State */}
            {!result && !loading && (

              <div className="h-[400px] flex flex-col items-center justify-center text-center">

                <div className="w-24 h-24 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-6xl mb-6">
                  🎶
                </div>

                <h3 className="text-xl font-semibold text-white">
                  No detection yet
                </h3>

                <p className="text-slate-500 mt-2 max-w-sm">
                  Upload an audio recording and click Detect Animal Sound
                  to view the result.
                </p>

              </div>

            )}

            {/* Loading State */}
            {loading && (

              <div className="h-[400px] flex flex-col items-center justify-center text-center">

                <div className="w-24 h-24 rounded-2xl bg-purple-500/10 flex items-center justify-center text-6xl animate-pulse mb-6">
                  🔊
                </div>

                <h3 className="text-xl font-semibold text-white">
                  Processing Audio
                </h3>

                <p className="text-slate-500 mt-2">
                  Please wait while the recording is processed...
                </p>

              </div>

            )}

            {/* Result */}
            {result && !loading && (

              <div>

                <div className="bg-teal-500/10 border border-teal-400/20 rounded-2xl p-6">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-xl text-white">
                      ✓
                    </div>

                    <div>

                      <p className="text-sm text-teal-400 font-semibold uppercase tracking-wider">
                        Detection Successful
                      </p>

                      <h3 className="text-3xl font-bold text-white capitalize mt-1">
                        {result.species || "Unknown Sound"}
                      </h3>

                    </div>

                  </div>

                  {/* Confidence */}
                  <div className="mt-7">

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold text-slate-300">
                        Confidence
                      </span>

                      <span className="font-bold text-teal-400">
                        {confidence}%
                      </span>

                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

                      <div
                        className="bg-gradient-to-r from-teal-400 to-cyan-400 h-3 rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.min(
                            Number(confidence),
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                {/* File Information */}
                <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-5">

                  <p className="text-slate-500 text-xs uppercase tracking-wider">
                    Audio File
                  </p>

                  <p className="text-white font-semibold truncate mt-1">
                    {audio?.name}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">

            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-2xl">
              🎧
            </div>

            <h3 className="font-bold text-white text-lg mt-5">
              Audio Analysis
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Process wildlife sound recordings through the connected
              audio detection service.
            </p>

          </div>

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">

            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-2xl">
              📊
            </div>

            <h3 className="font-bold text-white text-lg mt-5">
              Confidence Score
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              View the confidence value returned by the audio detection
              service.
            </p>

          </div>

          <div className="bg-[#111827] border border-white/10 rounded-2xl p-6">

            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-center text-2xl">
              🌿
            </div>

            <h3 className="font-bold text-white text-lg mt-5">
              Wildlife Monitoring
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              Support wildlife observation using recorded sound data.
            </p>

          </div>

        </div>

        {/* Information Panel */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-7 mt-7">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-2xl shrink-0">
              ℹ️
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Audio Monitoring Information
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">
                Upload a supported wildlife audio recording, preview the
                selected file and submit it for detection. The returned
                species and confidence value are displayed in the result
                section.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default AudioDetection;