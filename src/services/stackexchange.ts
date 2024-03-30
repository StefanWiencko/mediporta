import { TagsResponse } from "@/types";

const API_MAIN_URL = "https://api.stackexchange.com/";

export const getTagsData = async (
  page: number,
  per_page: number,
  sort: string,
  order: string
): Promise<TagsResponse> => {
  const getTagsUrl =
    API_MAIN_URL +
    `2.3/tags?page=${page}&pagesize=${per_page}&order=${order}&sort=${sort}&site=stackoverflow&filter=!6WPIommj3QX9_`;
  const response = await fetch(getTagsUrl);

  if (!response.ok) {
    throw new Error("Request failed with status code: " + response.status);
  }
  return response.json();
};
