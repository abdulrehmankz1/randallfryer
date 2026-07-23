import { Plus_Jakarta_Sans, Figtree } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import MotionProvider from "@/animations/MotionProvider";
import SiteChrome from "@/components/ui/SiteChrome";

// Heading typeface — Randall Fryer brand (Op1776 CI-0216)
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Body typeface — Randall Fryer brand (Op1776 CI-0216)
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

// Micro-label / eyebrow typeface — Switzer (Fontshare, self-hosted variable font)
const switzer = localFont({
  src: [
    {
      path: "../assets/fonts/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Switzer-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://randallfryer.example"),
  title: {
    default: "Randall Fryer for Oregon House District 28",
    template: "%s · Randall Fryer",
  },
  description:
    "Randall Fryer is running for the Oregon House to restore educational excellence, reduce the burden on working families, strengthen Oregon's business climate, support safer communities, and bring greater accountability to Salem.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${figtree.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
      </body>
    </html>
  );
}
