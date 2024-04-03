import BasicTable from "@/components/BasicTable";
import { BasicTableData, TableAlign, Tag, TagsResponse } from "@/types";
import { tagsData } from "./assets/tagsData";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/BasicTable",
  component: BasicTable,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BasicTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columnAlign = (key: keyof BasicTableData): TableAlign =>
  key === "name" || key === "count" ? "left" : "center";
const tableStructure: { name: string; key: keyof Tag }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "count" },
  { name: "Required", key: "is_required" },
  { name: "Moderator Only", key: "is_moderator_only" },
  { name: "Synonyms", key: "has_synonyms" },
];

const paginateData = (
  page: number,
  perPage: number,
  tagsData: TagsResponse
) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return tagsData.items.slice(startIndex, endIndex);
};

export const Default: Story = {
  render: function Component(args) {
    const useTableData = (page: number) => {
      return {
        data: paginateData(page, args.perPage, tagsData),
        error: null,
        isSuccess: true,
        isPending: false,
        totalPages:
          tagsData?.total !== undefined
            ? Math.ceil(tagsData?.total / args.perPage)
            : 0,
      };
    };
    return <BasicTable {...args} query={useTableData} />;
  },
  args: {
    tableStructure: tableStructure,
    perPage: 5,
    minWidth: 450,
    columnAlign: columnAlign,
    query: () => ({
      data: [],
      error: null,
      isSuccess: false,
      isPending: true,
      totalPages: 0,
    }),
  },
};

export const Loading: Story = {
  render: function Component(args) {
    const useTableData = (page: number) => {
      return {
        data: paginateData(page, args.perPage, tagsData),
        error: null,
        isSuccess: false,
        isPending: true,
        totalPages:
          tagsData?.total !== undefined
            ? Math.ceil(tagsData?.total / args.perPage)
            : 0,
      };
    };
    return <BasicTable {...args} query={useTableData} />;
  },
  args: {
    ...Default.args,
  },
};

export const Error: Story = {
  render: function Component(args) {
    const useTableData = (page: number) => {
      return {
        data: paginateData(page, args.perPage, tagsData),
        error: { message: "Test client error 404: request failed" } as Error,
        isSuccess: false,
        isPending: false,
        totalPages: 0,
      };
    };
    return <BasicTable {...args} query={useTableData} />;
  },
  args: {
    ...Default.args,
  },
};

export const NoData: Story = {
  render: function Component(args) {
    const useTableData = () => {
      return {
        data: [],
        error: null,
        isSuccess: true,
        isPending: false,
        totalPages: 0,
      };
    };
    return <BasicTable {...args} query={useTableData} />;
  },
  args: {
    ...Default.args,
  },
};
