import { atomWithImmer } from "jotai-immer";

const tagTableControlAtom = atomWithImmer({
  per_page: 5,
  sort: "popular",
  order: "desc",
});

export { tagTableControlAtom };
