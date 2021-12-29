import { fireEvent, render, RenderResult } from '@testing-library/react'
import React from 'react'
import Tabs from './tabs'
import TabsItem from './tabsItem'
import { TabsProps } from './tabs'

const Component: React.FC<TabsProps> = (props) => {
    return (
        <Tabs {...props}>
            <TabsItem label="defaultTab">default tab</TabsItem>
            <TabsItem label="secondTab">second Tab</TabsItem>
            <TabsItem label="disabledTab" disabled>
                disabled tab
            </TabsItem>
        </Tabs>
    )
}

const defaultProps: TabsProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'custom',
    style: { color: 'red' },
}

describe('Test Tabs Component', () => {
    let wrapper: RenderResult,
        tabsElement: HTMLElement,
        tabsItemElement: HTMLElement

    beforeEach(() => {
        wrapper = render(<Component {...defaultProps} />)
        tabsElement = wrapper.getByTestId('test-tabs')
        tabsItemElement = wrapper.getByText('defaultTab')
    })

    it('test on Tabs default props, render correct tabs and tabs item', () => {
        expect(tabsElement).toBeInTheDocument()
        expect(tabsElement.querySelectorAll('li')).toHaveLength(3)
        expect(tabsItemElement).toHaveClass('is-active')
        const tabsContent = wrapper.getByText('default tab')
        expect(tabsContent).toBeInTheDocument()
    })
    it('test on Tabs default props, expect active tab item has active style', () => {
        const secondTabItem = wrapper.getByText('secondTab')
        fireEvent.click(secondTabItem)
        expect(secondTabItem).toHaveClass('is-active')
        expect(tabsItemElement).not.toHaveClass('is-active')
    })
    it('test on Tabs default props, expect click on tab item call the correct callback', () => {
        const secondTabItem = wrapper.getByText('secondTab')
        fireEvent.click(secondTabItem)
        expect(defaultProps.onSelect).toHaveBeenCalledWith(1)
    })
    it('test on disbale Tabs item, expect to have disabled style', () => {
        const disabledTabItem = wrapper.getByText('disabledTab')
        expect(disabledTabItem).toHaveClass('is-disabled')
    })
    it("test on disbale Tabs item, expect tab is unclickable, callback won't be called", () => {
        const disabledTabItem = wrapper.getByText('disabledTab')
        fireEvent.click(disabledTabItem)
        expect(defaultProps.onSelect).not.toBeCalled()
        expect(disabledTabItem).not.toHaveClass('is-active')
    })
})
