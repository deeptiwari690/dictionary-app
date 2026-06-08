# Word Lookup

A dictionary app built with React + TypeScript. Type a word, get the definition, IPA, and audio pronunciation.

**Live:** https://deeptiwari690.github.io/dictionary-app/

**Repo:** https://github.com/deeptiwari690/dictionary-app

## What it does

- Fetches from [dictionaryapi.dev](https://dictionaryapi.dev) — free, no API key
- Shows a shimmer skeleton while loading
- Caches results in localStorage — instant on repeat lookups
- Handles inconsistent API responses: finds the richest entry, extracts IPA and audio independently across all returned entries

## Stack

- React + TypeScript + Vite
- CSS Modules
- Zod for API response validation
- lucide-react for icons

## Setup

```bash
npm install
npm run dev
```
