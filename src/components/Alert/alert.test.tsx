import { render, fireEvent } from "@testing-library/react"
import Alert, { AlertType, AlertProps } from "./alert"

const typeProps: AlertProps = {
  alert_title: "success",
  alert_type: "success",
}

const nonCloseProps: AlertProps = {
  alert_title: "non close",
  close_able: false,
}

describe("Test Alert Component", () => {
  it("By default should render a default alert with a title", () => {
    const mockOnClose = jest.fn()
    const wrapper = render(
      <Alert
        alert_title="this is an alert"
        alert_description="this is a description"
        onClose={mockOnClose}
      />
    )
    const container = wrapper.getByRole("alert")
    expect(container).toBeInTheDocument()
    expect(container.tagName).toBe("DIV")
    expect(container).toHaveClass("alert alert-default")

    const title = wrapper.getByText("this is an alert")
    expect(title).toBeInTheDocument()
    expect(title.tagName).toBe("H3")

    const description = wrapper.getByText("this is a description")
    expect(description).toBeInTheDocument()
    expect(description.tagName).toBe("P")

    const closeButton = wrapper.getByRole("button")
    expect(closeButton).toBeInTheDocument()
    expect(closeButton.tagName).toBe("SPAN")
    expect(closeButton).toHaveClass("alert-close")
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalled()
    expect(container).not.toBeInTheDocument()
  })
  it("Should render correct type of alert based on props", () => {
    const wrapper = render(<Alert {...typeProps} />)
    const container = wrapper.getByRole("alert")
    expect(container).toBeInTheDocument()
    expect(container).toHaveClass("alert alert-success")
  })
  it("Should render non closeable alert when close-able is false", () => {
    const wrapper = render(<Alert {...nonCloseProps} />)
    const closeButton = wrapper.queryByRole("button")
    expect(closeButton).not.toBeInTheDocument()
  })
})
