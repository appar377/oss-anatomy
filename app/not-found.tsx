import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="container narrow page-section">
      <span className="eyebrow">404 / PAGE NOT FOUND</span>
      <h1>このページは見つかりませんでした。</h1>
      <p>OSS図書館から、読みたい一冊を探してください。</p>
      <Link className="button" href="/library/">
        OSS図書館へ戻る →
      </Link>
    </main>
  );
}
