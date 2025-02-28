import "./globals.css";

export const metadata = {
  title: "AI Resume Reviewer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

