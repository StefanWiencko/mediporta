import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import Select from "@/components/Select";
import { SelectChangeEvent } from "@mui/material";

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

const tagSortOptions: { name: string; key: string }[] = [
  { name: "Name", key: "name" },
  { name: "Popularity", key: "popular" },
  { name: "Last activity", key: "activity" },
];

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Component(args) {
    const [, setArgs] = useArgs();
    const onChange = (e: SelectChangeEvent<string>) => {
      args.changeHandler(e);
      setArgs({ value: e.target.value });
    };

    return <Select {...args} changeHandler={onChange} />;
  },
  args: {
    value: "name",
    backgroundColor: "white",
    label: "Test",
    minWidth: 120,
    options: tagSortOptions,
    changeHandler: (e: SelectChangeEvent<string>) => {},
  },
};
