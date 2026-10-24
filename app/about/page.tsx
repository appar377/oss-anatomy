import { dossiers, sourceUrl } from "@/lib/catalog";
export const metadata = {
  title: "このサイトと出典",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <main id="main" className="container narrow page-section">
      <div className="page-intro">
        <span className="eyebrow">ABOUT & SOURCES</span>
        <h1>根拠と一緒に、読み進める。</h1>
        <p>
          OSS解剖学は、公開されたソースから仕組みを学ぶ非公式の学習サイトです。
        </p>
      </div>
      <div className="prose">
        <h2>固定した版を読む</h2>
        <p>
          各巻は次の版とcommitを観察対象にします。最新版の紹介やセキュリティ更新の案内ではありません。内部APIは版によって変わります。
        </p>
        {dossiers.map((d) => (
          <section className="source-card" key={d.id}>
            <h3>
              {d.title} {d.version}
            </h3>
            <p>{d.scope}</p>
            <code>{d.commit}</code>
            <p>
              <a href={sourceUrl(d)}>公式リポジトリの固定commit</a> ·{" "}
              <a href={`/licenses/${d.id}.txt`}>原本のMIT License</a>
            </p>
          </section>
        ))}
        <h2>説明と原本の関係</h2>
        <p>
          本文・フロー図・コード例は理解を助けるために作成した教材です。図では通常経路に絞り、分岐や周辺処理を省略した範囲を本文で示します。「設計の理由」は原本に基づく読解であり、すべてが作者の明示した意図とは限りません。
        </p>
        <p>
          新規の解剖章のコードは説明用サンプル・読解メモとして区別しています。実際のソースを読む入口は、各章末の固定commitへのリンクです。
        </p>
        <h2>記事と画像について</h2>
        <p>
          関連ノート26本は、本人が管理する公開済みOrifolio記事と画像を保持して独立させました。元サイトの本文を削除せず、必要な内部参照もこのサイトへ移しています。本文中の過去の検証結果は移行元の記録を保持したものです。
        </p>
        <p>
          本サイトの文章・画像・ブランドデザインは、別途記載があるものを除き権利者に帰属します。第三者OSSのライセンスは各原本の表示に従います。OSS名は説明・識別のために用いており、各プロジェクトの公式サイトや提携を表しません。
        </p>
        <h2>このサイトの独立性</h2>
        <p>
          記事本文、章データ、図解、画像、検索索引を同じリポジトリで保持し、静的ファイルとして公開しています。OrifolioのAPIやページを呼び出さずに読めます。フッターのOrifolioリンクは任意の移動先です。
        </p>
        <h2>保存とプライバシー</h2>
        <p>
          読了・しおり・メモは、このブラウザのlocalStorageだけに保存します。本サイトのサーバーへメモを送信する機能や、端末間の同期はありません。ホスティングサービスは通常のアクセスログを扱う場合があります。
        </p>
      </div>
    </main>
  );
}
