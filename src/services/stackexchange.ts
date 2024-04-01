import { GetTagsDataParams, StackexchangeError, TagsResponse } from "@/types";
import { capitalize } from "lodash";

const API_MAIN_URL = "https://api.stackexchange.com/";

export const getTagsData = async ({
  page,
  per_page,
  sort,
  order,
}: GetTagsDataParams): Promise<TagsResponse> => {
  const getTagsUrl =
    API_MAIN_URL +
    `2.3/tags?page=${page}&pagesize=${per_page}&order=${order}&sort=${sort}&site=stackoverflow&filter=!6WPIommj3QX9_`;

  const response = await fetch(getTagsUrl);

  if (!response.ok) {
    const err: StackexchangeError = await response.json();

    throw new Error(
      `${capitalize(err.error_name)} ${err.error_id} : ${err.error_message}. `
    );
  }
  return response.json();
};
