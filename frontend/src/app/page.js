import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800">AI Resume Reviewer</h1>
      <p className="text-gray-600 mt-4">
        Upload your resume and get AI-powered feedback!
      </p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <input type="file" id="resumeUpload" className="border p-2 rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload Resume
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Feedback</h2>
        <p className="text-gray-500">Your AI-generated resume feedback will appear here.</p>
      </div>
    </div>
  );
}
