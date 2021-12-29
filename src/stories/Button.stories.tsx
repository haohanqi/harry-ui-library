import { ComponentStory, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'
import Button, { ButtonType, ButtonSize } from '../components/Button/button'
import '../styles/index.scss'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' },
    btnType: {
      options: ['danger', 'default', 'link', 'primary'],
      control: {
        type: 'select',
        labels: {
          danger: 'Danger',
          default: 'Default',
          link: 'Link',
          primary: 'Primary',
        },
      },
    },
    size: {
      options: ['lg', 'sm'],
      control: {
        type: 'select',
        labels: {
          lg: 'Large',
          sm: 'Small',
        },
      },
    },
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  btnType: ButtonType.Default,
  children: 'BUTTON',
}

Default.play = async () => {
  await userEvent.click(screen.getByText('BUTTON'))
}
