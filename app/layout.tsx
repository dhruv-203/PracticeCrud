import Sidebar from "@/app/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./global.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRUD Application",
  description: "Developed by Dhruv Patel",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <div
          id="modal-root"
          className="flex w-full h-dvh flex-col md:flex-row "
        >
          <ToastContainer position="top-right" />
          <div className="md:basis-1/4 basis-1 p-4">
            <Sidebar />
          </div>
          <div className="flex flex-col md:basis-3/4 basis-1 p-4">
            {props.modal}
            {props.children}
          </div>
        </div>
      </body>
    </html>
  );
}
