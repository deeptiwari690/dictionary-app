import { z } from "zod";

const DefinitionSchema = z.object({
  definition: z.string(),
  example: z.string().optional(),
});

const MeaningSchema = z.object({
  partOfSpeech: z.string(),
  definitions: z.array(DefinitionSchema),
});

const PhoneticSchema = z.object({
  text: z.string().optional(),
  audio: z.string().optional(),
});

export const EntrySchema = z.object({
  word: z.string(),
  phonetic: z.string().optional(),
  phonetics: z.array(PhoneticSchema),
  meanings: z.array(MeaningSchema),
});

export const DictionaryResponseSchema = z.array(EntrySchema);
