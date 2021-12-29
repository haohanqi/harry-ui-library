import { ComponentMeta, ComponentStory } from '@storybook/react'
import Menu from '../components/Menu/menu'
import MenuItem from '../components/Menu/menuItem'
import SubMenu from '../components/Menu/subMenu'

export default {
  title: 'Example/Menu',
  component: Menu,
  argTypes: {
    onSelect: { action: 'click' },
    mode: {
      options: ['horizontal', 'vertical'],
      control: {
        type: 'select',
        labels: {
          horizontal: 'Horizontal',
          vertical: 'Vertical',
        },
      },
    },
  },
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>MenuItem one</MenuItem>
    <MenuItem>MenuItem two</MenuItem>
    <MenuItem>MenuItem three</MenuItem>
  </Menu>
)

export const Default = Template

export const Disabled: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem disabled>MenuItem one</MenuItem>
    <MenuItem>MenuItem two</MenuItem>
    <MenuItem>MenuItem three</MenuItem>
  </Menu>
)

export const WithSubMenu: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem disabled>MenuItem one</MenuItem>
    <MenuItem>MenuItem two</MenuItem>
    <SubMenu title="Dropdown">
      <MenuItem>Submenu one</MenuItem>
      <MenuItem>Submenu two</MenuItem>
    </SubMenu>
  </Menu>
)
