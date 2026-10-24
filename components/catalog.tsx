"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Bookmark, Search, X } from "lucide-react";
import {
  dossiers,
  fields,
  searchEntries,
  type Dossier,
  type SearchEntry,
} from "@/lib/catalog";
import { LayersArt } from "./logo";
import { useReading, updateReading } from "./reading-store";
export function SaveButton({ id, title }: { id: string; title: string }) {
  const reading = useReading();
  const selected = reading.saved.includes(id);
  const [error, setError] = useState("");
  return (
    <>
      <button
        type="button"
        className={`save-button ${selected ? "saved" : ""}`}
        aria-label={`${title}を${selected ? "保存から外す" : "保存する"}`}
        aria-pressed={selected}
        onClick={() => {
          if (
            !updateReading((s) => ({
              ...s,
              saved: selected
                ? s.saved.filter((x) => x !== id)
                : [...s.saved, id],
            }))
          )
            setError("このブラウザでは保存できません。");
        }}
      >
        <Bookmark size={20} fill={selected ? "currentColor" : "none"} />
      </button>
      {error && <small role="status">{error}</small>}
    </>
  );
}
export function DossierCard({ dossier }: { dossier: Dossier }) {
  const field = fields.find((f) => f.id === dossier.domain);
  return (
    <article className="dossier-card">
      <div className="card-art">
        <LayersArt
          symbol={
            dossier.id === "react"
              ? "⚛"
              : dossier.id === "rspec"
                ? "✓"
                : dossier.id === "devise"
                  ? "⌑"
                  : "</>"
          }
        />
        <span>{dossier.language}</span>
      </div>
      <div className="card-main">
        <div className="card-heading">
          <span className="badge">{field?.name}</span>
          <SaveButton id={dossier.id} title={dossier.title} />
        </div>
        <Link className="card-title" href={`/oss/${dossier.id}/`}>
          <h3>{dossier.title}</h3>
        </Link>
        <p>{dossier.summary}</p>
        <div className="learning-tags">
          {dossier.learning.slice(0, 2).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="card-bottom">
          <small>
            全6章 · {dossier.version}
            <br />
            前提：{dossier.prerequisite}
          </small>
          <Link className="button coral small" href={`/oss/${dossier.id}/`}>
            解剖を見る <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function Catalog({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("all");
  const results = searchEntries(searchIndex, query);
  const selected = dossiers.filter(
    (d) => field === "all" || d.domain === field,
  );
  return (
    <>
      <div className="search-control" id="search">
        <Search size={22} />
        <label className="sr-only" htmlFor="catalog-search">
          OSS名・学びたいことを検索
        </label>
        <input
          id="catalog-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="OSS名・学びたいことを入力"
        />
        {query && (
          <button onClick={() => setQuery("")} aria-label="検索をクリア">
            <X size={18} />
          </button>
        )}
      </div>
      <div className="filter-row" role="group" aria-label="分野で絞り込む">
        <button
          aria-pressed={field === "all"}
          onClick={() => {
            setField("all");
            setQuery("");
          }}
        >
          すべて
        </button>
        {fields.map((f) => (
          <button
            key={f.id}
            aria-pressed={field === f.id}
            onClick={() => {
              setField(f.id);
              setQuery("");
            }}
          >
            {f.short}
          </button>
        ))}
      </div>
      {query.trim() ? (
        <section aria-live="polite">
          <p className="result-count">
            「{query}」の検索結果 · {results.length}件
          </p>
          {results.length ? (
            <div className="search-results">
              {results.map((r) => (
                <Link className="search-result" key={r.href} href={r.href}>
                  <span className="eyebrow">{r.kind}</span>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                  <ArrowRight size={18} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h2>該当する記事が見つかりませんでした</h2>
              <p>「状態」「let」「認証」など、短い言葉でも探せます。</p>
              <button className="button" onClick={() => setQuery("")}>
                検索をクリア
              </button>
            </div>
          )}
        </section>
      ) : (
        <>
          <p className="result-count">
            {selected.length}つのOSS · 固定した版から学ぶ
          </p>
          <div className="catalog-grid">
            {selected.map((d) => (
              <DossierCard key={d.id} dossier={d} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
