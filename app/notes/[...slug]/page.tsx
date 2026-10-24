import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNotes } from "@/lib/notes";
import { MdxContent } from "@/components/mdx-content";
export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const p = await params;
  const n = getNotes().find((n) => n.slug === p.slug.join("/"));
  return {
    title: n?.title,
    description: n?.description,
    alternates: { canonical: n?.href },
  };
}
export default async function Note({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const p = await params;
  const n = getNotes().find((n) => n.slug === p.slug.join("/"));
  if (!n) notFound();
  return (
    <main id="main" className="container narrow page-section">
      <nav className="breadcrumb" aria-label="パンくず">
        <Link href="/library/">OSS図書館</Link>
        <span>/</span>
        <Link href="/notes/">関連ノート</Link>
      </nav>
      <article>
        <header className="note-header">
          <span className="eyebrow">FIELD NOTES / {n.category}</span>
          <h1>{n.title}</h1>
          <p className="lead">{n.description}</p>
          <p className="editor-note">
            Orifolioの公開済み記事から本文を保持して移行。本文中の過去の検証記述は移行元の記録です。今回の移行で各言語の実行試験を再実施したことを意味しません。
          </p>
        </header>
        {n.thumbnail && (
          <div className="note-image">
            <Image
              src={n.thumbnail}
              alt={`${n.title}の図解`}
              width={1536}
              height={1024}
            />
          </div>
        )}
        <MdxContent source={n.body} />
      </article>
      <nav className="chapter-pagination">
        <Link href="/notes/">← 関連ノートへ戻る</Link>
        <Link href="/library/">OSS図書館へ →</Link>
      </nav>
    </main>
  );
}
