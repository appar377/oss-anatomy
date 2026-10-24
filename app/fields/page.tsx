import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fields, dossiers } from "@/lib/catalog";
export const metadata = {
  title: "分野の地図",
  alternates: { canonical: "/fields/" },
};
export default function Fields() {
  return (
    <main id="main" className="container page-section">
      <div className="page-intro">
        <span className="eyebrow">FIELDS & CONNECTIONS</span>
        <h1>仕組みの地図をひらく。</h1>
        <p>分野から選び、関連するOSSへ進みます。</p>
      </div>
      <div className="field-grid">
        {fields.map((f) => (
          <Link href={`/fields/${f.id}/`} key={f.id}>
            <span className="eyebrow">
              {dossiers.filter((d) => d.domain === f.id).length} OSS
            </span>
            <h2>{f.name}</h2>
            <p>{f.description}</p>
            <ArrowRight />
          </Link>
        ))}
      </div>
      <section className="relationship-panel">
        <h2>「関連」と「依存」は別の線。</h2>
        <div className="relationship-row">
          <span>Rails</span>
          <span className="dashed-line">学習上の関連</span>
          <span>Devise / RSpec</span>
        </div>
        <p>
          Railsを学んだあとに認証やテストへ進む、という学びのつながりです。RailsがDeviseやRSpecを必須依存に持つことを示しません。
        </p>
        <div className="relationship-row">
          <span>Devise 4.9.4</span>
          <span className="solid-line">gemspec上の依存 →</span>
          <span>Warden / bcrypt / railties</span>
        </div>
        <p>
          こちらはDeviseのgemspecに記載された実際の依存の一部です。各巻の原本リンクで確認できます。
        </p>
      </section>
    </main>
  );
}
