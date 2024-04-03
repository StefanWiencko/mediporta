import { atomWithImmer } from "jotai-immer";

const tagTableControlAtom = atomWithImmer({
  perPage: 5,
  sort: "popular",
  order: "desc",
});

export { tagTableControlAtom };
