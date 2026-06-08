import { useState, useRef } from "react";
import { ZodError } from "zod";
import { BookOpen } from "lucide-react";
import { fetchWord } from "./features/dictionary/fetchWord";
import { LookupForm } from "./features/dictionary/LookupForm";
import { SkeletonCard } from "./features/dictionary/SkeletonCard";
import { DefinitionCard } from "./features/dictionary/DefinitionCard";
import type { DictionaryEntry, CachedEntry } from "./types";
import styles from "./App.module.css";

const { layout, header, title, error } = styles;

export function App() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [entry, setEntry] = useState<DictionaryEntry | null>(null);
  const [ipa, setIpa] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [srAnnouncement, setSrAnnouncement] = useState("");
  const srAnnouncementTimeoutId = useRef<number>(null);

  function scheduleSrAnnouncementReset() {
    clearTimeout(srAnnouncementTimeoutId.current ?? undefined);
    srAnnouncementTimeoutId.current = setTimeout(() => setSrAnnouncement(""), 3000);
  }

  function setFetchError(errorMessage: string) {
    setErrorMessage(errorMessage);
    setSrAnnouncement(errorMessage);
    scheduleSrAnnouncementReset();
  }

  async function handleLookup(word: string) {
    const rawCachedData = localStorage.getItem(`dictionary-${word.toLowerCase()}`);

    if (rawCachedData) {
      const { entry, ipa, audioUrl } = JSON.parse(rawCachedData) as CachedEntry;
      setEntry(entry);
      setIpa(ipa);
      setAudioUrl(audioUrl);
      setStatus("success");
      setSrAnnouncement(`Definition loaded: ${entry.word}`);
      scheduleSrAnnouncementReset();
      return;
    }

    setStatus("loading");

    try {
      const fetchedData = await fetchWord(word);
      const entry = fetchedData.reduce((best, current) =>
        current.meanings.length > best.meanings.length ? current : best,
      );
      const ipa =
        fetchedData.flatMap((entry) => entry.phonetics).find((ph) => ph.text && ph.text !== "")?.text ??
        fetchedData.find((entry) => entry.phonetic)?.phonetic ??
        null;
      const audioUrl =
        fetchedData.flatMap((entry) => entry.phonetics).find((ph) => ph.audio && ph.audio !== "")?.audio ?? null;
      const cached: CachedEntry = { entry, ipa, audioUrl };
      localStorage.setItem(`dictionary-${entry.word.toLowerCase()}`, JSON.stringify(cached));

      setEntry(entry);
      setIpa(ipa);
      setAudioUrl(audioUrl);
      setStatus("success");
      setSrAnnouncement(`Definition loaded: ${entry.word}`);
      scheduleSrAnnouncementReset();
    } catch (error) {
      if (error instanceof TypeError) {
        setFetchError("Something went wrong. Check your internet connection and try again");
      } else if (error instanceof ZodError) {
        setFetchError("Received unexpected data. Please try again");
      } else if (error instanceof Error) {
        if (error.message.includes("404")) {
          setFetchError("No definition found for that word");
        } else if (error.message.includes("403")) {
          setFetchError("Rate limit reached. Please wait a moment and try again");
        } else if (error.message.includes("500")) {
          setFetchError("The dictionary API is experiencing issues. Please try again later");
        } else if (error.message.includes("503")) {
          setFetchError("The dictionary API is temporarily unavailable. Please try again later");
        } else {
          setFetchError("An unexpected error occurred. Please try again");
        }
      } else {
        setFetchError("An unexpected error occurred. Please try again");
      }
      setStatus("error");
    }
  }

  return (
    <div className={layout}>
      <header className={header}>
        <BookOpen size={46} />
        <h1 className={title}>Word Lookup</h1>
      </header>
      <LookupForm onLookup={handleLookup} />
      <p className="sr-only" role="alert">
        {srAnnouncement}
      </p>
      {status === "loading" && <SkeletonCard />}
      {status === "error" && <p className={error}>{errorMessage}</p>}
      {status === "success" && entry && <DefinitionCard entry={entry} ipa={ipa} audioUrl={audioUrl} />}
    </div>
  );
}
