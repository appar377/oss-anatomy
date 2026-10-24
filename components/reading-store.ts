"use client";
import { useSyncExternalStore } from "react";
export type ReadingState = {
  saved: string[];
  completed: string[];
  notes: Record<string, string>;
  last: string | null;
};
const empty: ReadingState = { saved: [], completed: [], notes: {}, last: null };
const key = "oss-anatomy:reading:v1";
let cachedRaw: string | null = null;
let cachedState = empty;
function snapshot(): ReadingState {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === cachedRaw) return cachedState;
    cachedRaw = raw;
    if (!raw) return (cachedState = empty);
    const value = JSON.parse(raw);
    return (cachedState = {
      saved: Array.isArray(value.saved)
        ? value.saved.filter((s: unknown) => typeof s === "string")
        : [],
      completed: Array.isArray(value.completed)
        ? value.completed.filter((s: unknown) => typeof s === "string")
        : [],
      notes:
        value.notes && typeof value.notes === "object"
          ? Object.fromEntries(
              Object.entries(value.notes).filter(
                (entry): entry is [string, string] =>
                  typeof entry[1] === "string",
              ),
            )
          : {},
      last: typeof value.last === "string" ? value.last : null,
    });
  } catch {
    return (cachedState = empty);
  }
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("oss-reading-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("oss-reading-change", callback);
  };
}
export function useReading() {
  return useSyncExternalStore(subscribe, snapshot, () => empty);
}
export function updateReading(update: (state: ReadingState) => ReadingState) {
  try {
    window.localStorage.setItem(key, JSON.stringify(update(snapshot())));
    window.dispatchEvent(new Event("oss-reading-change"));
    return true;
  } catch {
    return false;
  }
}
