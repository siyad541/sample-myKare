import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sample Mykare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-primaryBg justify-center">
        <div className="w-full max-w-max self-center">{children}</div>
      </body>
    </html>
  );
}
