import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
  cleanup,
  act,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Autocomplete, { AutocompleteProps } from '../Autocomplete/autocomplete'

const data = ['aaaa', 'aa', 'advb', 'cssa', 'dssd', 'daaas']
const syncfetchSuggestion = (query: string) => {
  const result = data
    .filter((item) => item.includes(query))
    .map((formatItem) => ({ value: formatItem }))
  return result
}
const defaultProps: AutocompleteProps = {
  fetchSuggestion: syncfetchSuggestion,
  onSelect: jest.fn(),
}

const asyncProps: AutocompleteProps = {
  fetchSuggestion: jest.fn(() =>
    Promise.resolve([
      { value: 'aaaa' },
      { value: 'aa' },
      { value: 'cssa' },
      { value: 'dssd' },
      { value: 'daaas' },
    ])
  ),

  onSelect: jest.fn(),
}

const TestClickOutsideComponent: React.FC<AutocompleteProps> = (props) => {
  return (
    <>
      <div>outside</div>
      <Autocomplete {...props} />
    </>
  )
}

describe('Test Autocomplete component', () => {
  let wrapper: RenderResult, inputNode: HTMLInputElement
  beforeEach(() => {
    wrapper = render(<Autocomplete {...defaultProps} />)
    inputNode = wrapper.getByTestId('inputNode') as HTMLInputElement
  })
  it('test on autocomplete async default behaviors', async () => {
    cleanup()
    const wrapper = render(<Autocomplete {...asyncProps} />)
    const inputNode = wrapper.getByTestId('inputNode') as HTMLInputElement
    userEvent.type(inputNode, 'aa')
    await waitFor(() => {
      expect(asyncProps.fetchSuggestion).toHaveBeenCalledWith('aa')
      expect(inputNode.value).toBe('aa')
      expect(wrapper.container.querySelectorAll('li').length).toBe(5)
    })
  })

  it('test on autocomplete sync default behaviors', async () => {
    //input on change
    userEvent.type(inputNode, 'aa')
    expect(inputNode.value).toBe('aa')

    //test on dropdown length
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('li').length).toBe(3)
    })

    //click on dropdown item change input value
    fireEvent.click(wrapper.getByText('aaaa'))
    expect(defaultProps.onSelect).toHaveBeenCalled()
    expect(inputNode.value).toBe('aaaa')
  })

  it('test on keyboard event: up, down, enter', async () => {
    fireEvent.change(inputNode, { target: { value: 'aa' } })
    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('li').length).toBe(3)
    })

    //Arrow down
    fireEvent.keyDown(inputNode, { code: 'ArrowDown' })
    expect(wrapper.container.querySelectorAll('li')[0].style.color).toBe('red')

    //Arrow up
    fireEvent.keyDown(inputNode, { code: 'ArrowUp' })
    expect(wrapper.container.querySelectorAll('li')[2].style.color).toBe('red')

    //Enter
    fireEvent.keyDown(inputNode, { code: 'Enter' })
    expect(wrapper.container.querySelectorAll('li')).toHaveLength(0)
    expect(inputNode.value).toBe('daaas')
  })

  it('test click out side of component, dropdown disappear', async () => {
    cleanup()
    const wrapper = render(<TestClickOutsideComponent {...defaultProps} />)
    const outSideElement = wrapper.getByText('outside')
    const inputNode = wrapper.getByTestId('inputNode') as HTMLInputElement

    userEvent.type(inputNode, 'aa')

    expect(inputNode.value).toBe('aa')

    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('li').length).toBe(3)
    })

    //TODO: figure out why fireEvent and userEvent acting in different way
    fireEvent.click(outSideElement)
    //userEvent.click(outSideElement)

    // act(() => {
    //   userEvent.click(outSideElement)
    // })

    await waitFor(() => {
      expect(wrapper.container.querySelectorAll('li').length).toBe(0)
    })
  })
})
