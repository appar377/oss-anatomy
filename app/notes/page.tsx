import Link from "next/link";
import { getNotes } from "@/lib/notes";
export const metadata = {
  title: "関連ノート",
  alternates: { canonical: "/notes/" },
};
export default function Notes() {
  return (
    <main id="main" className="container page-section">
      <div className="page-intro">
        <span className="eyebrow">READ A LITTLE FURTHER</span>
        <h1>理解をつなぐ、関連ノート。</h1>
        <p>
          テスト、APIの契約、状態の寿命。解剖の前後に読みたい26本。
          <br />
          本文・画像・参照先は、このサイト内に保持しています。
        </p>
      </div>
      <div className="notes-grid">
        {getNotes().map((n) => (
          <Link className="note-card" href={n.href} key={n.slug}>
            <span className="eyebrow">{n.category}</span>
            <h2>{n.title}</h2>
            <p>{n.description}</p>
            <span className="text-link">読む →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
