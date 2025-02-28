export const metadata = {
  title: "AI Resume Reviewer",
  description: "Upload resumes and receive AI-powered feedback.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
