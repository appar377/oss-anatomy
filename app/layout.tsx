import type { Metadata } from "next";
import { Navigation, Footer } from "@/components/navigation";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://oss-anatomy.vercel.app"),
  title: {
    default: "OSS解剖学 — コードをたどる。設計が見える。",
    template: "%s | OSS解剖学",
  },
  description:
    "React、Rails、Devise、RSpec。固定した版のソースコードを、外側の動作から設計の工夫まで図解とともに読むOSS図書館。",
  openGraph: {
    locale: "ja_JP",
    type: "website",
    siteName: "OSS解剖学",
    images: ["/images/og.png"],
  },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
