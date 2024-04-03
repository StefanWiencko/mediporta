import { ChangeEvent } from "react";

export type TagsResponse = {
  backoff?: number;
  error_id?: number;
  error_message?: string;
  error_name?: string;
  has_more: boolean;
  items: Tag[];
  page?: number;
  page_size?: number;
  quota_max?: number;
  quota_remaining: number;
  total?: number;
  type?: string;
};

export type Tag = {
  collectives?: Collective[];
  count: number;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  name: string;
  last_activity_date: number;
  synonyms?: string[];
  user_id?: number;
};

type Collective = {
  description: string;
  external_links: CollectiveExternalLinks[];
  link: string;
  name: string;
  slug: string;
  tags: string[];
};

type CollectiveExternalLinks = {
  type:
    | "website"
    | "twitter"
    | "github"
    | "facebook"
    | "instagram"
    | "support"
    | "linkedin";
  link: string;
};

export type StackexchangeError = {
  error_id: number;
  error_message: string;
  error_name: string;
};
export type GetTagsDataParams = {
  page: number;
  perPage: number;
  sort: string;
  order: string;
};

export type TableAlign =
  | "inherit"
  | "left"
  | "right"
  | "center"
  | "justify"
  | undefined;

export type BasicTableData = {
  name: string;
  [key: string]: unknown;
};

export type HandleNumberChange = (
  a: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
