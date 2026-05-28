import { DictionaryResponseSchema } from "./schema";

export const formatHttpErrorMessage = (status: number, word: string) =>
  `HTTP error ${status} for word ${word}`;

export async function fetchWord(word: string) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(formatHttpErrorMessage(response.status, word));
  }
  const rawData = await response.json();
  const parsedData = DictionaryResponseSchema.parse(rawData);
  return parsedData;
}
