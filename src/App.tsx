import Button, { ButtonType, ButtonSize } from "./components/Button/button"
import Alert from "./components/Alert/alert"
import Menu from "./components/Menu/menu"
import MenuItem from "./components/Menu/menuItem"
import SubMenu from "./components/Menu/subMenu"
import Tabs from "./components/Tabs/tabs"

import "./styles/index.scss"
import TabsItem from "./components/Tabs/tabsItem"

function App() {
  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <Button
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
      </Button>
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
