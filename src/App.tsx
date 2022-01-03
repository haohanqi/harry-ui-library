import Button, { ButtonType, ButtonSize } from './components/Button/button'
import Alert from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Tabs from './components/Tabs/tabs'
import Autocomplete from './components/Autocomplete/autocomplete'
import './styles/index.scss'
import TabsItem from './components/Tabs/tabsItem'

function App() {
  const data = ['aaaa', 'aa', 'advb', 'cssa', 'dssd', 'daaas']
  const fetchSuggestion = (query: string) => {
    const result = data
      .filter((item) => item.includes(query))
      .map((formatItem) => ({ value: formatItem }))
    return result
  }

  const asyncFetchSuggestion = (query: string) => {
    return fetch(`http://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        const formatItems = items
          ? items.slice(0, 10).map((item: { login: string }) => ({
              value: item.login,
              ...item,
            }))
          : null
        return formatItems
      })
  }
  // const renderOptions = (item: string) => <h2>suggestion: {item}</h2>
  return (
    <div style={{ width: '95%', margin: 'auto' }}>
      <Autocomplete
        fetchSuggestion={fetchSuggestion}
        onSelect={(item) => {
          console.log(item)
        }}
        // renderOptions={renderOptions}
      ></Autocomplete>
      <Button
        className="customer"
        btnType={ButtonType.Primary}
        onClick={() => {
          console.log('click')
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
      <Menu
        mode="vertical"
        className="custom"
        defaultIndex="0"
        onSelect={(index) => {
          alert(index)
        }}
        defaultOpenSubmenus={['2']}
      >
        <MenuItem disabled>menu item 1</MenuItem>
        <MenuItem>menu item 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropDown 1</MenuItem>
          <MenuItem>dropDown 2</MenuItem>
        </SubMenu>
        <MenuItem>menu item 3</MenuItem>
      </Menu>
      <Tabs
        className="
        customer"
        onSelect={(index) => {
          console.log(index)
        }}
      >
        <TabsItem label="first tab">
          <div>this is first tab</div>
        </TabsItem>
        <TabsItem label="second tab">
          <div>this is second tab</div>
          <div>this is third tab</div>
        </TabsItem>
        <TabsItem label="third tab" disabled>
          <div>this is third tab</div>
        </TabsItem>
      </Tabs>
    </div>
  )
}

export default App
