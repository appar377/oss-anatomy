import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, GitBranch } from "lucide-react";
import { dossiers, getDossier, sourceUrl, chapterKinds } from "@/lib/catalog";
import { LayersArt } from "@/components/logo";
import { SaveButton, DossierCard } from "@/components/catalog";
export function generateStaticParams() {
  return dossiers.map((d) => ({ slug: d.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDossier(slug);
  return {
    title: `${d?.title}をひらく`,
    description: d?.summary,
    alternates: { canonical: `/oss/${slug}/` },
  };
}
export default async function DossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDossier(slug);
  if (!d) notFound();
  return (
    <main id="main">
      <div className="container">
        <nav className="breadcrumb" aria-label="パンくず">
          <Link href="/">ホーム</Link>
          <span>/</span>
          <Link href="/library/">OSS図書館</Link>
          <span>/</span>
          <span>{d.title}</span>
        </nav>
        <section className="dossier-hero">
          <div>
            <span className="eyebrow">OSS / {d.title.toUpperCase()}</span>
            <h1>
              {d.title}を、
              <br />
              ひらく。
            </h1>
            <p>{d.tagline}</p>
            <div className="version-badges">
              <span>{d.version}</span>
              <span>{d.language}</span>
              <span>全6章</span>
            </div>
            <Link className="button coral" href={`/oss/${d.id}/outside/`}>
              解剖をはじめる <ArrowRight size={19} />
            </Link>
          </div>
          <LayersArt
            large
            symbol={
              d.id === "react"
                ? "⚛"
                : d.id === "rspec"
                  ? "✓"
                  : d.id === "devise"
                    ? "⌑"
                    : "</>"
            }
          />
          <div className="hero-save">
            <SaveButton id={d.id} title={d.title} />
          </div>
        </section>
        <div className="dossier-layout">
          <section className="chapters">
            <span className="eyebrow">TABLE OF CONTENTS</span>
            <h2>どこから読み解く？</h2>
            <p>{d.summary}</p>
            <ol className="chapter-list">
              {d.chapters.map((c, i) => (
                <li key={c.id}>
                  <Link href={`/oss/${d.id}/${c.id}/`}>
                    <span className="chapter-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <small>{chapterKinds[i]}</small>
                      <h3>{c.title}</h3>
                      <p>{c.lead}</p>
                    </div>
                    <ArrowRight size={22} />
                  </Link>
                </li>
              ))}
            </ol>
          </section>
          <aside className="dossier-aside">
            <section>
              <h2>この巻で学ぶこと</h2>
              <ul>
                {d.learning.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <h3>読む前に</h3>
              <p>{d.prerequisite}</p>
              <h3>観察する範囲</h3>
              <p>{d.scope}</p>
            </section>
            <section className="source-card">
              <GitBranch size={23} />
              <h2>原本と一緒に読む</h2>
              <p>
                {d.repo}
                <br />
                {d.version}
              </p>
              <code>{d.commit.slice(0, 12)}</code>
              <a href={sourceUrl(d)}>
                固定commitをひらく <ArrowUpRight size={15} />
              </a>
              <small>
                原本コード：MIT License
                <br />
                各章のリンクは固定commitを参照します。
              </small>
            </section>
          </aside>
        </div>
        <section className="section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">KEEP EXPLORING</span>
              <h2>次の一冊へ。</h2>
              <p>学習上の関連です。依存関係を示す線ではありません。</p>
            </div>
          </div>
          <div className="catalog-grid">
            {d.related
              .slice(0, 2)
              .map((id) => dossiers.find((x) => x.id === id))
              .filter((x) => !!x)
              .map((x) => (
                <DossierCard key={x.id} dossier={x} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
