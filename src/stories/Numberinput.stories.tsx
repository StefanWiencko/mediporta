import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import NumberInput from "@/components/NumberInput";
import { ChangeEvent } from "react";

const meta = {
  title: "UI/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function Component(args) {
    const [, setArgs] = useArgs();
    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      args.changeHandler(e);
      setArgs({ value: e.target.value });
    };

    return <NumberInput {...args} changeHandler={onChange} />;
  },
  args: {
    backgroundColor: "white",
    changeHandler: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {},
    value: 5,
  },
};
