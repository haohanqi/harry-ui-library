import { ComponentStory, ComponentMeta } from "@storybook/react"

import Button, { ButtonType, ButtonSize } from "../components/Button/button"
import "../styles/index.scss"
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: "clicked" },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  btnType: ButtonType.Default,
  children: "BUTTON",
}

export const Danger = Template.bind({})
Danger.args = {
  btnType: ButtonType.Danger,
  children: "DANGER",
}

export const Link = Template.bind({})
Link.args = {
  btnType: ButtonType.Link,
  children: "LINK",
}

export const Large = Template.bind({})
Large.args = {
  ...Default.args,
  size: ButtonSize.Large,
  children: "LARGE",
}

export const Small = Template.bind({})
Small.args = {
  ...Default.args,
  size: ButtonSize.Small,
  children: "SMALL",
}
