import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata = {
  title: "BALASANJEEV C | Full Stack Developer & ML Engineer",
  description: "I craft beautiful, functional, and user-centered digital experiences. Passionate about turning ideas into elegant solutions that make a difference.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <head>
        <link rel="icon" type="image/png" href="/image.png" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
