"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Copy, ArrowRight, ArrowLeft, ChevronDown } from "lucide-react";
import { type Chapter, type Dossier, dossiers } from "@/lib/catalog";
import { useReading, updateReading } from "./reading-store";
export function CopyCode({ code }: { code: string }) {
  const [status, setStatus] = useState("コピー");
  return (
    <button
      className="copy-button"
      aria-label="コードをコピー"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code);
          setStatus("コピーしました");
        } catch {
          setStatus("コピーできません。選択してください");
        }
      }}
    >
      <Copy size={15} />
      <span aria-live="polite">{status}</span>
    </button>
  );
}
export function FlowDiagram({ flow }: { flow: Chapter["flow"] }) {
  const [selected, setSelected] = useState(0);
  return (
    <figure className="flow-diagram">
      <figcaption>
        処理の断面 <small>各ステップを選んで観察</small>
      </figcaption>
      <ol>
        {flow.map((step, i) => (
          <li key={step.title}>
            <button
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <ChevronDown size={16} />
            </button>
          </li>
        ))}
      </ol>
      <div className="flow-detail" aria-live="polite">
        <span className="eyebrow">STEP {selected + 1}</span>
        <p>{flow[selected].detail}</p>
      </div>
      <p className="diagram-note">
        通常経路を縮約した教材図です。例外や条件分岐は本文と原本で確認します。
      </p>
    </figure>
  );
}
export function ChapterControls({
  dossier,
  chapter,
}: {
  dossier: Dossier;
  chapter: Chapter;
}) {
  const key = `${dossier.id}/${chapter.id}`;
  const reading = useReading();
  const [feedback, setFeedback] = useState("");
  const done = reading.completed.includes(key);
  const index = dossier.chapters.findIndex((c) => c.id === chapter.id);
  const prev = dossier.chapters[index - 1];
  const next = dossier.chapters[index + 1];
  useEffect(() => {
    updateReading((s) => (s.last === key ? s : { ...s, last: key }));
  }, [key]);
  return (
    <>
      <section className="reflection">
        <span className="eyebrow">CHECK YOUR UNDERSTANDING</span>
        <h2>言葉にして、振り返る。</h2>
        <p>{chapter.question}</p>
        <details>
          <summary>考え方を確認する</summary>
          <p>{chapter.answer}</p>
        </details>
        <label htmlFor="reflection-note">自分の言葉で残すメモ</label>
        <textarea
          id="reflection-note"
          rows={4}
          value={reading.notes[key] ?? ""}
          placeholder="分かったこと、次に原本で確かめたいこと…"
          onChange={(e) => {
            const note = e.target.value;
            if (
              !updateReading((s) => ({
                ...s,
                notes: { ...s.notes, [key]: note },
              }))
            )
              setFeedback(
                "保存できませんでした。メモをコピーして保管してください。",
              );
          }}
        />
        <small>メモ・保存・読了は、このブラウザ内にだけ保存します。</small>
        <button
          className={`button ${done ? "outline" : "coral"}`}
          aria-pressed={done}
          onClick={() => {
            const ok = updateReading((s) => ({
              ...s,
              completed: done
                ? s.completed.filter((c) => c !== key)
                : [...s.completed, key],
            }));
            setFeedback(
              ok
                ? done
                  ? "読了を取り消しました"
                  : "読了を記録しました"
                : "このブラウザでは保存できません。",
            );
          }}
        >
          <Check size={18} />
          {done ? "読了済み · 取り消す" : "この章を読了にする"}
        </button>
        <p role="status">{feedback}</p>
      </section>
      <nav className="chapter-pagination" aria-label="章の移動">
        <Link
          href={prev ? `/oss/${dossier.id}/${prev.id}/` : `/oss/${dossier.id}/`}
        >
          <ArrowLeft size={18} />
          <span>
            <small>{prev ? "前の章" : "全体像へ"}</small>
            {prev?.title ?? "章一覧に戻る"}
          </span>
        </Link>
        <Link href={next ? `/oss/${dossier.id}/${next.id}/` : "/review/"}>
          <span>
            <small>{next ? "次の章" : "読んだあとに"}</small>
            {next?.title ?? "振り返りを見る"}
          </span>
          <ArrowRight size={18} />
        </Link>
      </nav>
    </>
  );
}
export function QueueExperiment() {
  const [mode, setMode] = useState<"value" | "function" | null>(null);
  return (
    <section className="experiment">
      <h3>教材モデルで、2回の更新を比べる</h3>
      <p>開始値は0。選ぶたびに0から計算し直します。</p>
      <div className="experiment-actions">
        <button className="button outline" onClick={() => setMode("value")}>
          値「1」を2回渡す
        </button>
        <button className="button" onClick={() => setMode("function")}>
          「n + 1」を2回渡す
        </button>
      </div>
      <output aria-live="polite">
        {mode === null
          ? "結果を予想して選んでみましょう"
          : mode === "value"
            ? "0 → 1 → 1　結果は 1"
            : "0 → 1 → 2　結果は 2"}
      </output>
      <small>
        純粋なキュー計算のモデル。Reactのスケジューラーの実行結果ではありません。
      </small>
    </section>
  );
}
export function Review() {
  const reading = useReading();
  const chapters = dossiers.flatMap((d) =>
    d.chapters.map((c) => ({ d, c, key: `${d.id}/${c.id}` })),
  );
  const completed = chapters.filter((x) => reading.completed.includes(x.key));
  const saved = dossiers.filter((d) => reading.saved.includes(d.id));
  const last = chapters.find((x) => x.key === reading.last);
  const notes = chapters.filter((x) => reading.notes[x.key]);
  return (
    <>
      <div className="review-stats">
        <strong>
          {completed.length}
          <span> / 24章 読了</span>
        </strong>
        <p>分かったことを、次の観察につなげる。</p>
        <progress max={24} value={completed.length} aria-label="全章の読了数" />
      </div>
      {last && (
        <Link className="continue-card" href={`/oss/${last.key}/`}>
          <span>
            <small>続きから読む</small>
            <strong>
              {last.d.title} / {last.c.title}
            </strong>
          </span>
          <ArrowRight />
        </Link>
      )}
      <h2>保存したOSS</h2>
      {saved.length ? (
        <div className="saved-list">
          {saved.map((d) => (
            <Link key={d.id} href={`/oss/${d.id}/`}>
              {d.title}
              <ArrowRight size={18} />
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-line">
          まだ保存はありません。図書館のしおりから保存できます。
        </p>
      )}
      <h2>読了した章</h2>
      {completed.length ? (
        <ul className="review-list">
          {completed.map(({ d, c, key }) => (
            <li key={key}>
              <Check size={18} />
              <Link href={`/oss/${key}/`}>
                {d.title} / {c.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-line">
          各章の最後で「読了にする」を押すと、ここへ並びます。
        </p>
      )}
      <h2>自分の言葉で残したメモ</h2>
      {notes.length ? (
        notes.map(({ d, c, key }) => (
          <article className="note-card" key={key}>
            <Link href={`/oss/${key}/`}>
              <h3>
                {d.title} / {c.title}
              </h3>
            </Link>
            <p>{reading.notes[key]}</p>
          </article>
        ))
      ) : (
        <p className="empty-line">読書画面に書いたメモがここに残ります。</p>
      )}
      <p className="privacy-note">
        記録はこのブラウザ内に保存されます。別端末との同期はありません。ブラウザの保存データを削除すると記録も消えます。
      </p>
      <Link className="button" href="/library/">
        次に読むOSSを探す <ArrowRight size={18} />
      </Link>
    </>
  );
}
