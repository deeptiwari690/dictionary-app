import { Fragment } from "react";
import { Volume2 } from "lucide-react";
import { Button } from "@/shared";
import type { DictionaryEntry } from "@/types";
import styles from "./DefinitionCard.module.css";

type Props = {
  entry: DictionaryEntry;
  audioUrl: string | null;
  ipa: string | null;
};

const { card, word, meaningSection, partOfSpeech, definition, example } = styles;

export function DefinitionCard({ entry, audioUrl, ipa }: Props) {
  async function handlePlay() {
    try {
      await new Audio(audioUrl!).play();
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") return;
      console.error("Audio playback failed:", err);
    }
  }

  return (
    <div className={card}>
      <h2 className={word}>{entry.word}</h2>
      {audioUrl && (
        <Button variant="surfaceObject" onClick={handlePlay}>
          <Volume2 />
          <span>{ipa}</span>
        </Button>
      )}
      {entry.meanings.map((meaning) => (
        <section key={meaning.partOfSpeech} className={meaningSection}>
          <h3 className={partOfSpeech}>{meaning.partOfSpeech}</h3>
          {meaning.definitions.map((def, i) => (
            <Fragment key={i}>
              <p className={definition}>{def.definition}</p>
              {def.example && <p className={example}>{def.example}</p>}
            </Fragment>
          ))}
        </section>
      ))}
    </div>
  );
}
