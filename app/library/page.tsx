import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Catalog } from "@/components/catalog";
import { getSearchIndex } from "@/lib/notes";
export const metadata: Metadata = {
  title: "OSS図書館",
  alternates: { canonical: "/library/" },
};
export default function Library() {
  return (
    <main id="main" className="container page-section">
      <div className="page-intro">
        <span className="eyebrow">OSS LIBRARY</span>
        <h1>次に、何をひらく？</h1>
        <p>仕組みと設計から、学ぶOSSを選ぶ。</p>
      </div>
      <Catalog searchIndex={getSearchIndex()} />
      <Link className="guide-card" href="/guide/">
        <BookOpen size={36} />
        <div>
          <h2>初めて読む方へ</h2>
          <p>OSSの読み方と、学びの進め方を紹介します。</p>
        </div>
        <ArrowRight />
      </Link>
    </main>
  );
}
