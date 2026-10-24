import type { MetadataRoute } from "next";
import { dossiers, fields } from "@/lib/catalog";
import { getNotes } from "@/lib/notes";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "library/",
    "fields/",
    "guide/",
    "review/",
    "notes/",
    "about/",
    ...fields.map((f) => `fields/${f.id}/`),
    ...dossiers.flatMap((d) => [
      `oss/${d.id}/`,
      ...d.chapters.map((c) => `oss/${d.id}/${c.id}/`),
    ]),
    ...getNotes().map((n) => n.href.slice(1)),
  ].map((path) => ({ url: `https://oss-kaibougaku.vercel.app/${path}` }));
}
