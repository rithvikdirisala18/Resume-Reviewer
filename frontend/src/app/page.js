import AuthGuard from "./components/AuthGuard";

export default function Home() {
  return (
    <AuthGuard>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold">Welcome to AI Resume Reviewer</h1>
        <p className="text-lg mt-4">Upload your resume and get AI-powered feedback.</p>
      </div>
    </AuthGuard>
  );
}
