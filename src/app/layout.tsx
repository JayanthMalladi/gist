import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/brand";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], style: ["normal", "italic"], axes: ["opsz"] });

export const metadata: Metadata = {
  title: `${BRAND.name}: speak a recap, get a decision board`,
  description:
    "One spoken paragraph per meeting → a finished decision board of decisions, actions, owners and open questions — shareable with one zero-signup link.",
  openGraph: {
    title: `${BRAND.name}: speak a recap, get a decision board`,
    description:
      "One spoken paragraph per meeting → a finished decision board of decisions, actions, owners and open questions — shareable with one zero-signup link.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF8F2",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="relative z-10 flex min-h-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
