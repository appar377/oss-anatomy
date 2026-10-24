import Link from "next/link";
import { notFound } from "next/navigation";
import { fields, dossiers } from "@/lib/catalog";
import { DossierCard } from "@/components/catalog";
export function generateStaticParams() {
  return fields.map((f) => ({ field: f.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ field: string }>;
}) {
  const { field } = await params;
  return {
    title: fields.find((f) => f.id === field)?.name,
    alternates: { canonical: `/fields/${field}/` },
  };
}
export default async function Field({
  params,
}: {
  params: Promise<{ field: string }>;
}) {
  const { field } = await params;
  const item = fields.find((f) => f.id === field);
  if (!item) notFound();
  return (
    <main id="main" className="container page-section">
      <nav className="breadcrumb" aria-label="パンくず">
        <Link href="/fields/">分野の地図</Link>
        <span>/</span>
        <span>{item.name}</span>
      </nav>
      <div className="page-intro">
        <span className="eyebrow">FIND YOUR INTEREST</span>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
      <div className="catalog-grid">
        {dossiers
          .filter((d) => d.domain === field)
          .map((d) => (
            <DossierCard key={d.id} dossier={d} />
          ))}
      </div>
      <p className="editor-note">
        この分類は学習の入口です。OSS同士の実際の依存関係を表すものではありません。
      </p>
    </main>
  );
}
