import { ComponentStory, ComponentMeta } from '@storybook/react'
import Tabs from '../components/Tabs/tabs'
import TabsItem from '../components/Tabs/tabsItem'
import { screen, userEvent, within } from '@storybook/testing-library'

export default {
  title: 'Example/Tabs',
  component: Tabs,
  subcomponents: { TabsItem },
  argTypes: {
    onSelect: { action: 'click' },
    defaultIndex: {
      control: {
        type: 'number',
      },
    },
  },
} as ComponentMeta<typeof Tabs>

const Template: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabsItem label="First Item"></TabsItem>

    <TabsItem label="Second Item"></TabsItem>

    <TabsItem label="Third Item"></TabsItem>
  </Tabs>
)

export const Default = Template.bind({})
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const secondItem = canvas.getByText('Second Item')
  setTimeout(() => {
    userEvent.click(secondItem)
  }, 1000)

  const thirdItem = canvas.getByText('Third Item')
  setTimeout(() => {
    userEvent.click(thirdItem)
  }, 1500)
}

export const DisableTabsItem: ComponentStory<typeof Tabs> = (args) => (
  <Tabs {...args}>
    <TabsItem label="First Item" disabled></TabsItem>

    <TabsItem label="Second Item"></TabsItem>

    <TabsItem label="Third Item"></TabsItem>
  </Tabs>
)
