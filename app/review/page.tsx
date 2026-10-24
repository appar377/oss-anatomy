import { Review } from "@/components/reader-controls";
export const metadata = {
  title: "振り返り",
  alternates: { canonical: "/review/" },
};
export default function ReviewPage() {
  return (
    <main id="main" className="container narrow page-section">
      <div className="page-intro">
        <span className="eyebrow">YOUR READING DESK</span>
        <h1>読んだ先に、残るもの。</h1>
        <p>保存した一冊と、自分の言葉になった理解。</p>
      </div>
      <Review />
    </main>
  );
}
