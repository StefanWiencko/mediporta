import BasicTable from "@/components/BasicTable";
import { Tag } from "@/types";
import { tagsData } from "./assets/tagsData";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/NumberInputs",
  component: BasicTable,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BasicTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const columnAlign = (key: keyof Tag) =>
  key === "name" || key === "count" ? "left" : "center";
const tableStructure: { name: string; key: keyof Tag }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "count" },
  { name: "Required", key: "is_required" },
  { name: "Moderator Only", key: "is_moderator_only" },
  { name: "Synonyms", key: "has_synonyms" },
];

export const Default: Story = {
  render: function Component(args) {
    const useTableData = (page: number) => {
      const startIndex = (page - 1) * args.perPage;
      const endIndex = startIndex + args.perPage;
      const paginatedData = tagsData.items.slice(startIndex, endIndex);
      return {
        data: paginatedData,
        error: null,
        isSuccess: true,
        isPending: false,
        totalPages:
          tagsData?.total !== undefined
            ? Math.ceil(tagsData?.total / args.perPage)
            : 0,
      };
    };
    return (
      <BasicTable<Tag>
        {...args}
        tableStructure={tableStructure}
        query={useTableData}
        columnAlign={columnAlign}
      />
    );
  },
  args: {
    tableStructure: [{ name: "Name", key: "name" }],
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
      const startIndex = (page - 1) * args.perPage;
      const endIndex = startIndex + args.perPage;
      const paginatedData = tagsData.items.slice(startIndex, endIndex);
      return {
        data: paginatedData,
        error: null,
        isSuccess: false,
        isPending: true,
        totalPages:
          tagsData?.total !== undefined
            ? Math.ceil(tagsData?.total / args.perPage)
            : 0,
      };
    };
    return (
      <BasicTable<Tag>
        {...args}
        tableStructure={tableStructure}
        query={useTableData}
        columnAlign={columnAlign}
      />
    );
  },
  args: {
    tableStructure: [{ name: "Name", key: "name" }],
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

export const Error: Story = {
  render: function Component(args) {
    const useTableData = (page: number) => {
      const startIndex = (page - 1) * args.perPage;
      const endIndex = startIndex + args.perPage;
      const paginatedData = tagsData.items.slice(startIndex, endIndex);
      return {
        data: paginatedData,
        error: { message: "Test client error 404 : request failed" } as Error,
        isSuccess: false,
        isPending: false,
        totalPages: 0,
      };
    };
    return (
      <BasicTable<Tag>
        {...args}
        tableStructure={tableStructure}
        query={useTableData}
        columnAlign={columnAlign}
      />
    );
  },
  args: {
    tableStructure: [{ name: "Name", key: "name" }],
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
    return (
      <BasicTable<Tag>
        {...args}
        tableStructure={tableStructure}
        query={useTableData}
        columnAlign={columnAlign}
      />
    );
  },
  args: {
    tableStructure: [{ name: "Name", key: "name" }],
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
