import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { chapterKinds } from "@/lib/catalog";
export const metadata = {
  title: "この図書館の歩き方",
  alternates: { canonical: "/guide/" },
};
const descriptions = [
  "まず動かしたときの入出力を観察します。利用者のコードとOSS本体を区別しましょう。",
  "入口のファイルから担当ごとの置き場所を探します。全部を読む必要はありません。",
  "ひとつの通常経路をたどります。図の矢印はすべての分岐を表すものではありません。",
  "値がどこに保存され、いつ変わり、いつ消えるかを確かめます。",
  "責務の分割や失敗時の扱いを読みます。実装からの解釈と公式の説明を区別します。",
  "小さく一箇所を変え、結果を予想して確かめます。最後に自分の言葉でメモを残します。",
];
export default function Guide() {
  return (
    <main id="main" className="container narrow page-section">
      <div className="page-intro">
        <span className="eyebrow">A GUIDE TO THE LIBRARY</span>
        <h1>
          コードは、
          <br />
          ひとつの道から読める。
        </h1>
        <p>
          初めてのOSSでも、外から中へ。
          <br />
          6つの視点で、少しずつ解像度を上げましょう。
        </p>
      </div>
      <ol className="guide-steps">
        {chapterKinds.map((title, i) => (
          <li key={title}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h2>{title}</h2>
              <p>{descriptions[i]}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="relationship-panel">
        <h2>読むときの、小さな約束</h2>
        <p>
          原本は版とcommitを固定しています。最新の実装や、あなたのアプリの版とは異なる場合があります。
        </p>
        <p>
          「説明用サンプル」は理解のためのコードです。省略したものを原本と同一の実装として扱わず、各章末の原本リンクで確かめます。
        </p>
        <p>
          保存・読了・メモはブラウザ内だけに保存されます。サインインは必要ありません。
        </p>
      </section>
      <Link className="button coral" href="/oss/rails/">
        Railsの旅をはじめる <ArrowRight size={18} />
      </Link>
      <Link className="text-link guide-secondary" href="/library/">
        別のOSSから選ぶ →
      </Link>
    </main>
  );
}
