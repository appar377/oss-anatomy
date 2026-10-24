import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import migration from "@/docs/migration-map.json";
import { dossiers, type SearchEntry } from "./catalog";
export function getNotes() {
  return migration.map((item) => {
    const slug = item.new.replace(/^\/notes\//, "").replace(/\/$/, "");
    const raw = fs.readFileSync(
      path.join(process.cwd(), "content/notes", `${slug}.mdx`),
      "utf8",
    );
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
    const meta = parse(match?.[1] ?? "") as {
      title: string;
      description: string;
      thumbnail?: string;
      updated?: string;
      category: string;
    };
    return {
      ...meta,
      slug,
      body: raw.slice(match?.[0].length ?? 0),
      source: item.old,
      href: item.new,
    };
  });
}
export function getSearchIndex(): SearchEntry[] {
  return [
    ...dossiers.map((d) => ({
      title: d.title,
      description: d.summary,
      href: `/oss/${d.id}/`,
      kind: "OSS",
      text: d.learning.join(" "),
    })),
    ...dossiers.flatMap((d) =>
      d.chapters.map((c) => ({
        title: `${d.title} / ${c.title}`,
        description: c.lead,
        href: `/oss/${d.id}/${c.id}/`,
        kind: "解剖の章",
        text: [...c.paragraphs, c.code, c.design].join(" "),
      })),
    ),
    ...getNotes().map((n) => ({
      title: n.title,
      description: n.description,
      href: n.href,
      kind: "関連ノート",
      text: n.body,
    })),
  ];
}
