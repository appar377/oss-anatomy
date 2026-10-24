import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { dossiers, sourceUrl, searchEntries } from "../lib/catalog";
import { getNotes, getSearchIndex } from "../lib/notes";

test("every dossier has a fixed source and six reachable stages", () => {
  assert.equal(dossiers.length, 4);
  for (const dossier of dossiers) {
    assert.match(dossier.commit, /^[a-f0-9]{40}$/);
    assert.deepEqual(
      dossier.chapters.map((c) => c.id),
      ["outside", "directory", "flow", "state", "design", "experiment"],
    );
    for (const chapter of dossier.chapters) {
      assert.ok(chapter.paragraphs.every((p) => p.length > 50));
      assert.ok(chapter.flow.length >= 3);
      assert.ok(sourceUrl(dossier, chapter).includes(dossier.commit));
      assert.ok(chapter.sourceLine > 0);
    }
    assert.ok(fs.existsSync(path.join("public/licenses", `${dossier.id}.txt`)));
  }
});

test("migrated article and image references resolve locally", () => {
  const notes = getNotes();
  assert.equal(notes.length, 26);
  const slugs = new Set(notes.map((n) => n.slug));
  for (const note of notes) {
    assert.doesNotMatch(note.body, /tech-note-opal|\/tech-note\//);
    for (const match of note.body.matchAll(/\/notes\/([^\s)#\]"<>]+)/g)) {
      assert.ok(
        slugs.has(match[1].replace(/\/$/, "")),
        `${note.slug} → ${match[1]}`,
      );
    }
    for (const match of note.body.matchAll(/\/images\/[^\s)\]"<>]+/g)) {
      assert.ok(
        fs.existsSync(path.join("public", match[0])),
        `${note.slug}: ${match[0]}`,
      );
    }
    if (note.thumbnail)
      assert.ok(fs.existsSync(path.join("public", note.thumbnail)));
  }
});

test("search finds body-only terms and normalizes mixed-width input", () => {
  const index = getSearchIndex();
  assert.equal(index.length, 54);
  assert.ok(
    searchEntries(index, "ｕｓｅＳｔａｔｅ").some(
      (r) => r.href === "/oss/react/outside/",
    ),
  );
  assert.ok(
    searchEntries(index, "fetch_or_store").some(
      (r) => r.href === "/oss/rspec/state/",
    ),
  );
  assert.ok(searchEntries(index, "Rails request").length > 0);
  assert.equal(searchEntries(index, "no-such-article-XYZ-678").length, 0);
});

test("all related dossiers exist and relationship scope is explicit", () => {
  for (const dossier of dossiers)
    for (const id of dossier.related) {
      assert.ok(dossiers.some((d) => d.id === id));
      assert.notEqual(id, dossier.id);
    }
});
