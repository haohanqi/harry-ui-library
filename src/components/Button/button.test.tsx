import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

const defaultProps: ButtonProps = {
    onClick: jest.fn(),
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'custom',
}

const linkProps: ButtonProps = {
    btnType: ButtonType.Link,
    href: '/',
}

const disableProps: ButtonProps = {
    disable: true,
    onClick: jest.fn(),
}

describe('Test Button Component', () => {
    it('By default, render default Button ', () => {
        const wrapper = render(
            <Button {...defaultProps}>default button</Button>
        )
        const element = wrapper.getByText('default button') as HTMLButtonElement
        expect(element).toBeInTheDocument
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('Should render correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Test</Button>)
        const element = wrapper.getByText('Test')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('BUTTON')
        expect(element).toHaveClass('btn btn-primary btn-lg custom')
    })
    it('Should render a link when link and href is provided', () => {
        const wrapper = render(<Button {...linkProps}>Test</Button>)
        const element = wrapper.getByText('Test')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('Should render a disable button when disable is true', () => {
        const wrapper = render(<Button {...disableProps}>Disable</Button>)
        const element = wrapper.getByText('Disable') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('BUTTON')
        expect(element.disabled).toBe(true)
        fireEvent.click(element)
        expect(disableProps.onClick).not.toHaveBeenCalled()
    })
})
