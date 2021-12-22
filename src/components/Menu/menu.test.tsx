import React from "react"
import Menu, { MenueProps } from "./menu"
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor,
} from "@testing-library/react"
import MenuItem from "./menuItem"
import SubMenu from "./subMenu"

const Component: React.FC<MenueProps> = ({ ...props }) => {
  return (
    <Menu {...props}>
      <MenuItem>active-item</MenuItem>
      <MenuItem disabled>disabled-item</MenuItem>
      <MenuItem>MenuItem-3</MenuItem>
      <SubMenu title="dropDown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const defaultProps: MenueProps = {
  defaultIndex: "0",
  mode: "horizontal",
  onSelect: jest.fn(),
  className: "test",
}

const verticalProps: MenueProps = {
  defaultIndex: "0",
  defaultOpenSubmenus: ["3"],
  mode: "vertical",
}
let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement
describe("Test Menu Component", () => {
  beforeEach(() => {
    wrapper = render(<Component {...defaultProps} />)
    menuElement = wrapper.getByTestId("test-menu")
    activeElement = wrapper.getByText("active-item")
    disabledElement = wrapper.getByText("disabled-item")
  })
  it("Should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass("menu test")
    expect(activeElement).toHaveClass("menu-item is-active")
    expect(disabledElement).toHaveClass("menu-item is-disable")
    expect(menuElement.querySelectorAll(":scope > li")).toHaveLength(4)
  })
  it("click on items should change the active and call right call back", () => {
    fireEvent.click(disabledElement)
    expect(disabledElement).toHaveClass("menu-item is-disable")
    expect(defaultProps.onSelect).not.toHaveBeenCalled()
    const thirdMenuItem = wrapper.getByText("MenuItem-3")
    fireEvent.click(thirdMenuItem)
    expect(activeElement).not.toHaveClass("is-active")
    expect(thirdMenuItem).toHaveClass("menu-item is-active")
    expect(defaultProps.onSelect).toHaveBeenCalledWith("2")
  })
  it("Should render vertical menu when mode set to vertical", () => {
    cleanup()
    wrapper = render(<Component {...verticalProps} />)
    menuElement = wrapper.getByTestId("test-menu")
    expect(menuElement).toHaveClass("menu-vertical")
  })
  it("Should show dropdown items  when hover on  subMenu", async () => {
    const submenuElement = wrapper.getByText("dropDown")
    const submenuItem = wrapper.queryByText("drop1")
    expect(submenuItem).not.toBeInTheDocument()

    fireEvent.mouseEnter(submenuElement)
    await waitFor(() => {
      const openedSubmenuItem = wrapper.queryByText("drop1")
      expect(openedSubmenuItem).toBeInTheDocument()
    })

    //onMouseEntry submenu item appear
    const openedSubmenuItem = wrapper.getByText("drop1")
    fireEvent.click(openedSubmenuItem)
    expect(defaultProps.onSelect).toHaveBeenCalledWith("3-0")

    //onMouseLeave submenu item disappear
    fireEvent.mouseLeave(submenuElement)
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).not.toBeInTheDocument()
    })
  })
  it("In the vertical mode, open default subMenu", () => {
    cleanup()
    wrapper = render(<Component {...verticalProps} />)
    const subMenuItem = wrapper.queryByText("drop1")
    expect(subMenuItem).toBeInTheDocument()
  })
  it("In the vertical mode, click to open subMenu", () => {
    cleanup()
    wrapper = render(
      <Component {...verticalProps} defaultOpenSubmenus={undefined} />
    )
    const subMenuElement = wrapper.getByText("dropDown")
    const subMenuItem = wrapper.queryByText("drop1")
    expect(subMenuItem).not.toBeInTheDocument()

    fireEvent.click(subMenuElement)
    const openedSubMenuItem = wrapper.queryByText("drop1")
    expect(openedSubMenuItem).toBeInTheDocument()
  })
})
