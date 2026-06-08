import { useId, useState, type SubmitEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared";
import styles from "./LookupForm.module.css";

const { form, srOnly, controls, input, error } = styles;

type Props = {
  onLookup: (word: string) => void;
};

export function LookupForm({ onLookup }: Props) {
  const [validationError, setValidationError] = useState<string | null>(null);
  const id = useId();
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const word = new FormData(e.currentTarget).get("word") as string;
    if (!word.trim()) {
      setValidationError("Please enter a word");
      return;
    }
    setValidationError(null);
    onLookup(word.trim());
  }
  return (
    <form className={form} noValidate onSubmit={handleSubmit}>
      <label className={srOnly} htmlFor={id}>
        Word
      </label>
      <div className={controls}>
        <input
          className={input}
          type="text"
          id={id}
          placeholder="e.g. serendipity"
          autoFocus
          autoComplete="off"
          required
          name="word"
        />
        <Button type="submit">
          Lookup
          <ArrowRight />
        </Button>
      </div>
      {validationError && (
        <p className={error} role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
}
