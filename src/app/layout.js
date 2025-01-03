import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppContextProvider } from "./context/AppContext";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
          <ReactQueryProvider>
            <AppContextProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
            </AppContextProvider>
          </ReactQueryProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
