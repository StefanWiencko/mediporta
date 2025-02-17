import { GetTagsDataParams, StackexchangeError, TagsResponse } from "@/types";
import { capitalize } from "lodash";

const API_MAIN_URL = "https://api.stackexchange.com/2.3/";

export const getTagsData = async ({
  page,
  perPage,
  sort,
  order,
}: GetTagsDataParams): Promise<TagsResponse> => {
  const getTagsUrl =
    API_MAIN_URL +
    `tags?page=${page}&pagesize=${perPage}&order=${order}&sort=${sort}&site=stackoverflow&filter=!6WPIommj3QX9_`;

  const response = await fetch(getTagsUrl);

  if (!response.ok) {
    const err: StackexchangeError = await response.json();

    throw new Error(
      `${capitalize(err.error_name)} ${err.error_id} : ${err.error_message}. `
    );
  }
  return response.json();
};
