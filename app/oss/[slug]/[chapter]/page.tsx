import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, GitBranch, ArrowUpRight } from "lucide-react";
import { dossiers, getDossier, chapterKinds, sourceUrl } from "@/lib/catalog";
import { Code } from "@/components/code";
import {
  ChapterControls,
  FlowDiagram,
  QueueExperiment,
} from "@/components/reader-controls";
export function generateStaticParams() {
  return dossiers.flatMap((d) =>
    d.chapters.map((c) => ({ slug: d.id, chapter: c.id })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const p = await params;
  const d = getDossier(p.slug);
  const c = d?.chapters.find((c) => c.id === p.chapter);
  return {
    title: `${d?.title} / ${c?.title}`,
    description: c?.lead,
    alternates: { canonical: `/oss/${p.slug}/${p.chapter}/` },
  };
}
export default async function Reader({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const p = await params;
  const d = getDossier(p.slug);
  const c = d?.chapters.find((c) => c.id === p.chapter);
  if (!d || !c) notFound();
  const index = d.chapters.indexOf(c);
  return (
    <main id="main" className="reader-shell">
      <div className="reader-topbar">
        <Link href={`/oss/${d.id}/`}>
          <ArrowLeft size={18} />
          <span>{d.title}の全体像へ</span>
        </Link>
        <span>
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="muted">/ 06</span>
        </span>
        <a href="#chapter-map">章一覧</a>
      </div>
      <div className="reader-layout">
        <aside className="chapter-sidebar" id="chapter-map">
          <Link href={`/oss/${d.id}/`} className="reader-book-name">
            {d.title}
            <small>{d.version} · 解剖の地図</small>
          </Link>
          <ol>
            {d.chapters.map((ch, i) => (
              <li key={ch.id}>
                <Link
                  aria-current={c.id === ch.id ? "page" : undefined}
                  href={`/oss/${d.id}/${ch.id}/`}
                >
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{chapterKinds[i]}</small>
                    {ch.title}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <Link className="sidebar-library" href="/library/">
            ← OSS図書館へ
          </Link>
        </aside>
        <article className="reader-article">
          <header className="chapter-header">
            <span className="eyebrow">
              {d.title.toUpperCase()} / {chapterKinds[index]}
            </span>
            <h1>{c.title}</h1>
            <p className="lead">{c.lead}</p>
            <div className="reading-meta">
              <span>CHAPTER {String(index + 1).padStart(2, "0")}</span>
              <span>{d.version}</span>
              <span>約5分</span>
            </div>
          </header>
          <div className="chapter-prose">
            {c.paragraphs.slice(0, 2).map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <FlowDiagram flow={c.flow} />
          <h2 className="section-title">説明とコードを、ひとつずつ。</h2>
          <Code code={c.code} language={c.language} />
          <div className="chapter-prose">
            <p>{c.paragraphs[2]}</p>
          </div>
          <section className="design-insight">
            <span className="insight-mark">◇</span>
            <div>
              <h2>なぜこの設計？</h2>
              <p>{c.design}</p>
            </div>
          </section>
          {d.id === "react" && c.id === "experiment" && <QueueExperiment />}
          <section className="source-reference">
            <GitBranch size={21} />
            <div>
              <h2>参照バージョン・ソース</h2>
              <p>
                {d.title} {d.version} · MIT License
              </p>
              <a href={sourceUrl(d, c)}>
                {c.sourcePath} <ArrowUpRight size={15} />
              </a>
              <code>commit {d.commit}</code>
              <small>
                原本はこのcommitに固定。上のコードは説明用で、原本の抜粋ではありません。内部APIは版によって変わります。
              </small>
            </div>
          </section>
          <ChapterControls dossier={d} chapter={c} />
        </article>
        <aside className="reader-margin">
          <span className="eyebrow">IN THIS CHAPTER</span>
          <a href="#chapter-map">解剖の地図</a>
          <p>
            外側の動作と
            <br />
            コードの間を、
            <br />
            行き来しよう。
          </p>
          <div className="margin-line" />
          <small>いま見ている範囲</small>
          <p>{d.scope}</p>
        </aside>
      </div>
    </main>
  );
}
