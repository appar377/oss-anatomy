# OSS解剖学

コードをたどる。設計が見える。

公開サイト: [oss-kaibougaku.vercel.app](https://oss-kaibougaku.vercel.app/)

React・Rails・Devise・RSpecを、固定した版のソースとともに読む「OSS図書館＋解剖室」です。Orifolioから独立して、本文・画像・図解・検索索引をこのリポジトリで保持します。

## 読書の流れ

ホーム → 分野 / OSS図書館 → OSS概要 → 6章 → 振り返り。

各巻は、外側の動作、ディレクトリ、呼び出しフロー、データと状態、設計の工夫、小さな実験の順です。章内の図はステップを選んで観察でき、原本の固定commitへ移動できます。

| 対象 | 読む版 | 範囲 |
| --- | --- | --- |
| React | 19.2.0 | useStateと通常の更新 |
| Rails | 8.1.0 | HTTPからcontroller actionへ |
| Devise | 4.9.4 | database_authenticatable |
| rspec-core | 3.13.0 | example実行とlet |

全24章に加え、既存の関連ノート26本を保持します。対象commitは [source-versions.json](docs/source-versions.json) に固定しています。説明用サンプルと原本を区別し、実行していない実験を実行済みとは記載しません。

## 開発と検証

Node.js 22.xを使用します。

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

`http://localhost:3104` で開きます。Next.js App Routerで静的書き出しし、ビルド結果は `out/` です。Vercelは独立プロジェクトへGit接続して公開します。環境変数・DB・APIキーは不要です。

VercelのFramework PresetはNext.js、Output Directoryは標準値のままにします。`out` を上書き指定すると、Next.jsのビルド用manifestの探索先と衝突します。

## 構成

| 場所 | 内容 |
| --- | --- |
| `content/dossiers.json` | 4 OSS・24章の本文、図の手順、出典、振り返り |
| `content/notes/` | 移行済みの関連ノート本文・メタデータ |
| `public/images/articles/` | ノートの画像 |
| `public/licenses/` | 対象OSSの原本ライセンス |
| `lib/catalog.ts`, `lib/notes.ts` | 分類・原本URL・全文検索索引 |
| `components/` | 図書館、読書、状態保存、コードと図解 |
| `app/` | 各画面、metadata、sitemap、404 |
| `docs/migration-map.json` | 元URLと新URLの対応 |

しおり・読了・メモは、版付きのlocalStorageへ保存します。端末間同期やアカウント機能はありません。保存が使えない場合も本文は読めます。

## 独立性と移行

Orifolio `4aa6aba58817796f16382ea80fe4d4ccbf2df0cc` を移行基準としました。元のOSS入口が参照していた3記事から、記事内リンクをたどった26記事・26画像を複製しています。本文内の旧記事パスを新しい `/notes/` に変更し、元記事と画像は削除しません。

移行時は本文がリンク変更以外で変わっていないこと、画像が同一であることをハッシュで照合しました。過去の記事本文の「検証した」という記述は移行元の記録で、今回の移行における再実行を意味しません。新サイトのフッターにある任意のOrifolioリンク以外に、Orifolioのページ/APIへの実行時依存はありません。

RailsとDevise・RSpecの並びは学習上の関連です。実際の依存は各固定版のgemspec等で示します。RailsからDeviseへ必須依存があるようには描きません。

## 権利と出典

対象OSSは各MIT Licenseを保持しています。本サイトの説明用コード・図は教材として作成しました。原本への固定commitリンクと対象範囲を各章に記載します。各プロジェクトの公式サイトや提携を表すものではありません。

移行した本人の文章・画像、ブランドデザインについて、新しい包括的な再利用ライセンスは付与していません。別途表示のある第三者コンテンツはその条件に従います。
