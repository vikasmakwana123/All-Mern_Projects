import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UploadCloud, Music, Home, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MusicUploadForm = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // 🔴 LOGOUT HANDLER
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("authToken");

    // Expire authToken cookie (for non HTTP-only cookies)
    document.cookie =
      "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    toast.success("Logged out successfully");
    navigate("/"); // redirect to home/login
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "audio/mpeg") {
      toast.error("Only MP3 files are allowed");
      e.target.value = null;
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an MP3 file");
      return;
    }

    const formData = new FormData();
    formData.append("music", file); // must match multer field

    try {
      setIsUploading(true);

      const response = await axios.post(
        "/api/audio/upload-music",
        formData,
        { withCredentials: true }
      );

      toast.success(response.data.message || "Upload successful");
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-4">
      
      {/* 🔴 LOGOUT BUTTON (TOP RIGHT) */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>

      {/* MAIN CARD */}
      <div className="w-full max-w-lg bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center gap-2">
          <Music className="w-7 h-7 text-blue-500" />
          Upload Music
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Upload Box */}
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-blue-500 transition">
            <UploadCloud className="w-12 h-12 text-blue-500 mb-2" />
            <span className="text-gray-300 text-sm">
              {file ? "Change MP3 file" : "Click to upload MP3"}
            </span>
            <input
              type="file"
              accept=".mp3"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Selected File */}
          {file && (
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-gray-300">
              🎧 Selected:
              <span className="font-semibold text-white ml-1 break-all">
                {file.name}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-600 transition"
          >
            {isUploading ? "Uploading..." : "Upload Music"}
          </button>
        </form>

        {/* Back to Home */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5 text-blue-400" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default MusicUploadForm;
