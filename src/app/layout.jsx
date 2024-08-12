import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Universidad Modelo",
  description: "Plataforma Académica De La Universidad Modelo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Toaster richColors closeButton={true} />
        {children}
      </body>
    </html>
  );
}
