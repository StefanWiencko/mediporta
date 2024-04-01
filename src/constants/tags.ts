import { Tag } from "@/types";

export const tagTableStructure: { name: string; key: keyof Tag }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "count" },
  { name: "Required", key: "is_required" },
  { name: "Moderator Only", key: "is_moderator_only" },
  { name: "Synonyms", key: "has_synonyms" },
];

export const tagSortOptions: { name: string; key: string }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "popular" },
  { name: "Last activity", key: "activity" },
];

export const tagOrderOptions: { name: string; key: string }[] = [
  { name: "Ascending", key: "asc" },
  { name: "Descending", key: "desc" },
];

export const tagInputsDebounceTime = 500;
