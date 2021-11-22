import Button, { ButtonType, ButtonSize } from "./components/Button/button"
import Alert from "./components/Alert/alert"
import "./styles/index.scss"

function App() {
  return (
    <div className="App">
      {/* <Button
        className="customer"
        btnType={ButtonType.Primary}
        onClick={() => {
          console.log("click")
        }}
      >
        Primary
      </Button>
      <Button size={ButtonSize.Small} btnType={ButtonType.Default}>
        DefaultButton
      </Button>
      <Button btnType={ButtonType.Link} href="/dd">
        Link
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        Danger
      </Button> */}
      <Alert alert_title="this is an alert" />
      <Alert
        alert_title="this is an alert"
        alert_description="this is an alert description"
        alert_type="success"
      />
      <Alert
        alert_title="this is an alert"
        alert_description="this is an alert description"
        alert_type="danger"
      />
      <Alert
        alert_title="this is an alert"
        alert_description="this is an alert description"
        alert_type="warning"
      />
    </div>
  )
}

export default App
