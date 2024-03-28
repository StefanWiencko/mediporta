import { TagsResponse } from "@/types";

export const getTagsData = async (): Promise<TagsResponse> => {
  const response = await fetch(
    "https://api.stackexchange.com/2.3/tags?page=1&order=desc&sort=popular&site=stackoverflow"
  );

  if (!response.ok) {
    throw new Error("Request failed with status code: " + response.status);
  }
  return response.json();
};
