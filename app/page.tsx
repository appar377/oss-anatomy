import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Layers3,
  ScanLine,
} from "lucide-react";
import { dossiers, fields } from "@/lib/catalog";
import { DossierCard } from "@/components/catalog";
import { LayersArt } from "@/components/logo";
export default function Home() {
  return (
    <main id="main">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="coral-dot" /> OPEN SOURCE, OPEN UNDERSTANDING
          </span>
          <h1>
            使っている、その先へ。
            <br />
            <em>コードの奥</em>をひらこう。
          </h1>
          <p>
            いつものOSSは、どう動いている？
            <br />
            ひとつの処理をたどりながら、
            <br className="mobile-only" />
            設計の理由を見つける図書館。
          </p>
          <div className="hero-actions">
            <Link className="button coral" href="/library/">
              OSS図書館をひらく <ArrowRight size={19} />
            </Link>
            <Link className="text-link" href="/guide/">
              初めての方へ <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hero-meta">
            <span>4 OSS</span>
            <span>24 の解剖</span>
            <span>原本とつながる学び</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-grid" />
          <span className="visual-label top">ANATOMY 001 / CODE LAYERS</span>
          <LayersArt large />
          <span className="annotation a">01　公開API</span>
          <span className="annotation b">02　呼び出しの流れ</span>
          <span className="annotation c">03　データと状態</span>
          <span className="visual-label bottom">
            一層ずつ、しくみが見えてくる。
          </span>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE LIBRARY</span>
            <h2>次に、何をひらく？</h2>
            <p>大きなOSSから、気になる部品へ。</p>
          </div>
          <Link href="/library/" className="text-link">
            すべてのOSS <ArrowRight size={17} />
          </Link>
        </div>
        <div className="catalog-grid">
          {[dossiers[1], dossiers[0], dossiers[2], dossiers[3]].map((d) => (
            <DossierCard key={d.id} dossier={d} />
          ))}
        </div>
      </section>
      <section className="field-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FIND YOUR INTEREST</span>
              <h2>知りたい仕組みから。</h2>
            </div>
            <Link href="/fields/" className="text-link">
              分野の地図へ <ArrowRight size={17} />
            </Link>
          </div>
          <div className="field-grid">
            {fields.map((f, i) => (
              <Link key={f.id} href={`/fields/${f.id}/`}>
                <span className="field-number">0{i + 1}</span>
                <h3>{f.name}</h3>
                <p>{f.description}</p>
                <ArrowRight size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="container section method-section">
        <div>
          <span className="eyebrow">FROM THE OUTSIDE, IN</span>
          <h2>
            大きなコードも、
            <br />
            ひとつの道から。
          </h2>
          <p>
            すべてを一度に理解しなくて大丈夫。
            <br />
            外側の動作から入り、小さな実験で確かめます。
          </p>
          <Link href="/guide/" className="text-link">
            この図書館の歩き方 <ArrowRight size={17} />
          </Link>
        </div>
        <ol className="method-list">
          <li>
            <BookOpen />
            <div>
              <strong>全体像をつかむ</strong>
              <p>何ができるOSSか。どこから読めばよいか。</p>
            </div>
          </li>
          <li>
            <ScanLine />
            <div>
              <strong>処理の中をたどる</strong>
              <p>コードと図をつなぎ、状態の変化を見る。</p>
            </div>
          </li>
          <li>
            <Layers3 />
            <div>
              <strong>設計の理由を見つける</strong>
              <p>小さく変え、予想して、確かめる。</p>
            </div>
          </li>
        </ol>
      </section>
      <section className="container source-banner">
        <div>
          <span className="eyebrow">ALWAYS WITH THE SOURCE</span>
          <h2>根拠は、いつも原本に。</h2>
          <p>
            対象の版とcommitを固定。説明用サンプルと原本の実装を区別して読みます。
          </p>
        </div>
        <Link className="button outline" href="/about/">
          出典と編集方針 <ArrowUpRight size={18} />
        </Link>
      </section>
    </main>
  );
}
