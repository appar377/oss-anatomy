import data from "@/content/dossiers.json";

export type Chapter = (typeof data)[number]["chapters"][number];
export type Dossier = (typeof data)[number];
export const dossiers: Dossier[] = data;
export const fields = [
  {
    id: "web",
    name: "Webフレームワーク",
    short: "Web",
    description: "リクエストが入り、応答が返るまで。アプリの土台を読む。",
  },
  {
    id: "ui",
    name: "UI・状態管理",
    short: "UI",
    description: "状態の変化が画面へ届くまで。描画を支える仕組みを読む。",
  },
  {
    id: "auth",
    name: "認証",
    short: "認証",
    description: "利用者を確かめる流れと、ライブラリ同士の境界を読む。",
  },
  {
    id: "testing",
    name: "テスト",
    short: "テスト",
    description: "テスト自身はどう動くのか。実行順と状態の寿命を読む。",
  },
];
export const chapterKinds = [
  "外側の動作",
  "ディレクトリ",
  "呼び出しフロー",
  "データと状態",
  "設計の工夫",
  "小さな実験",
];
export function getDossier(slug: string) {
  return dossiers.find((item) => item.id === slug);
}
export function sourceUrl(dossier: Dossier, chapter?: Chapter) {
  return `https://github.com/${dossier.repo}/${chapter ? `blob/${dossier.commit}/${chapter.sourcePath}#L${chapter.sourceLine}` : `tree/${dossier.commit}`}`;
}
export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  kind: string;
  text: string;
};
export function searchEntries(entries: SearchEntry[], query: string) {
  const terms = query
    .normalize("NFKC")
    .toLocaleLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return entries.filter((entry) =>
    terms.every((term) =>
      `${entry.title} ${entry.description} ${entry.text}`
        .normalize("NFKC")
        .toLocaleLowerCase()
        .includes(term),
    ),
  );
}
