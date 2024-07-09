import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
// import {NextUIProvider} from "@nextui-org/system";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Universidad Modelo",
  description: "Plataforma Academica De La Universidad Modelo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body className={inter.className}>{children}</body>
    </html>
  );
}
