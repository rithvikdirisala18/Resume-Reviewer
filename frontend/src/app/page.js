"use client";
import { useState, useEffect } from "react";
import { auth, signOut } from "../../firebase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion"; // For animations

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [scrollY, setScrollY] = useState(0);

  // ✅ Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push("/login"); // Redirect if not logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  // ✅ Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage("Please select a file first.");
      return;
    }
    // TODO: Add backend API call to upload the file to AWS S3
    setUploadMessage("Upload successful!");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-[Poppins]">
      {/* 🚀 Welcome Section with Fading Effect */}
      <motion.div
        className="h-screen flex flex-col items-center justify-center text-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: Math.max(1 - scrollY / 300, 0) }} // Fades as you scroll
      >
        <h1 className="text-6xl font-bold leading-tight">
          Welcome,{" "}
          <span className="text-blue-400">
            {user?.displayName ? user.displayName.split(" ")[0] : "Guest"}
          </span>
        </h1>

        <p className="text-lg mt-4 opacity-80">
          Upload your resume and get AI-powered feedback.
        </p>
        <motion.div
          className="absolute bottom-10 text-gray-400 animate-bounce"
          initial={{ opacity: 1 }}
          animate={{ opacity: Math.max(1 - scrollY / 200, 0) }}
        >
          ⬇ Scroll down to continue
        </motion.div>
      </motion.div>

      {/* 🚀 Resume Upload Section */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center transition-opacity duration-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 100 ? 1 : 0 }} // Appears as you scroll
      >
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
          <div className="bg-gray-800 p-10 rounded-xl shadow-lg transition hover:shadow-2xl transform hover:scale-105">
            <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
              Upload Your Resume
            </h1>
            <input
              type="file"
              className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleFileChange}
            />
            <button
              onClick={handleUpload}
              className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-white font-semibold transition"
            >
              Upload Resume
            </button>
            {uploadMessage && (
              <p className="text-green-400 mt-4 text-center">{uploadMessage}</p>
            )}
          </div>
        </div>

        {/* 🚀 Improved FAQ Section */}
        <div className="mt-16 bg-gray-800 text-white py-12 px-6 w-full">
          <h2 className="text-4xl font-bold text-center mb-10 text-blue-400">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-gray-700 p-5 rounded-lg shadow-md">
              <summary className="cursor-pointer text-lg font-semibold">
                How does the AI analyze my resume?
              </summary>
              <p className="mt-2 text-gray-300">
                Our AI uses NLP to evaluate your resume's wording, impact, and
                formatting, giving tailored feedback.
              </p>
            </details>

            <details className="bg-gray-700 p-5 rounded-lg shadow-md">
              <summary className="cursor-pointer text-lg font-semibold">
                Is my data secure?
              </summary>
              <p className="mt-2 text-gray-300">
                Yes, we use Firebase Authentication and AWS S3 for secure
                storage, and we do not share your data.
              </p>
            </details>

            <details className="bg-gray-700 p-5 rounded-lg shadow-md">
              <summary className="cursor-pointer text-lg font-semibold">
                Can I edit my uploaded resume?
              </summary>
              <p className="mt-2 text-gray-300">
                Yes! You can re-upload a revised resume and get updated AI
                feedback anytime.
              </p>
            </details>
          </div>
        </div>
      </motion.div>

      {/* 🚀 Logout Button */}
      <div className="fixed bottom-5 right-5">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
