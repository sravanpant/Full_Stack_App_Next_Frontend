import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
      <body
        className={cn(
          inter.className,
          "bg-[#f9f9f9] max-w-[70%] h-[900px] mx-auto p-5 my-3 border rounded-lg shadow-md"
        )}
      >
        <div>{children}</div>
      </body>
    </html>
  );
}
