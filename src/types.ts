import { z } from "zod";
import {
  DictionaryResponseSchema,
  EntrySchema,
} from "./features/dictionary/schema";

export type DictionaryResponse = z.infer<typeof DictionaryResponseSchema>;
export type DictionaryEntry = z.infer<typeof EntrySchema>;

export type CachedEntry = {
  entry: DictionaryEntry;
  ipa: string | null;
  audioUrl: string | null;
};
