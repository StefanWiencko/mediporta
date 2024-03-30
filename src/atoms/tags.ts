import { atom } from "jotai";
import { withImmer } from "jotai-immer";

const primitiveTagTableControlAtom = atom({
  count: 5,
  sortBy: "count",
  sortDirection: "desc",
});

export const tagTableControlAtom = withImmer(primitiveTagTableControlAtom);
