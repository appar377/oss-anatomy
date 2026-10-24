"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Layers3, Bookmark, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
export function Navigation() {
  const pathname = usePathname();
  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" aria-label="OSS解剖学 ホーム">
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label="メイン">
            <Link
              href="/library/"
              aria-current={
                pathname.startsWith("/library") ? "page" : undefined
              }
            >
              OSS図書館
            </Link>
            <Link href="/fields/">分野から探す</Link>
            <Link href="/guide/">読み方</Link>
            <Link href="/review/">振り返り</Link>
          </nav>
          <Link
            href="/library/#search"
            className="icon-button"
            aria-label="記事を検索"
          >
            <Search size={23} />
          </Link>
        </div>
      </header>
      <nav className="mobile-nav" aria-label="モバイル">
        <Link
          href="/library/"
          aria-current={pathname.startsWith("/library") ? "page" : undefined}
        >
          <Search size={21} />
          探す
        </Link>
        <Link
          href="/guide/"
          aria-current={pathname.startsWith("/guide") ? "page" : undefined}
        >
          <Layers3 size={21} />
          学ぶ
        </Link>
        <Link
          href="/review/"
          aria-current={pathname.startsWith("/review") ? "page" : undefined}
        >
          <Bookmark size={21} />
          振り返り
        </Link>
      </nav>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Logo />
        <p>大きな仕組みを、小さな理解の積み重ねに。</p>
      </div>
      <nav aria-label="フッター">
        <Link href="/about/">このサイトと出典</Link>
        <Link href="/notes/">関連ノート</Link>
        <a href="https://github.com/appar377/oss-anatomy">
          ソースコード <ArrowUpRight size={13} />
        </a>
        <a href="https://tech-note-opal.vercel.app/tech-note/">
          Orifolio <ArrowUpRight size={13} />
        </a>
      </nav>
      <small>OSS解剖学 / 2026 · 非公式の学習サイト</small>
    </footer>
  );
}
