import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Menu",
  description: "Get freshly curated menu items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#f9f9f9] md:max-w-[50%] lg:max-w-[30%]  h-[900px] mx-auto p-5 my-3 border rounded-lg shadow-md">
          <Suspense>{children}</Suspense>
        </div>
      </body>
    </html>
  );
}
