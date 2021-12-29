import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import TabsItem, { TabsItemProps } from './tabsItem'

export interface TabsProps {
  defaultIndex?: number
  onSelect?: (index: number) => void
  style?: React.CSSProperties
  className?: string
}

export interface TabsContextProps {
  defaultIndex?: number
  onSelect?: (index: number) => void
  currentActive: number
}

export const tabsContext = createContext<TabsContextProps | null>(null)

const Tabs: React.FC<TabsProps> = ({
  defaultIndex,
  onSelect,
  style,
  className,
  children,
}) => {
  const [currentActive, setCurrentActive] = useState(
    defaultIndex ? defaultIndex : 0
  )
  const handleSelect = (index: number) => {
    setCurrentActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: TabsContextProps = {
    defaultIndex,
    onSelect: handleSelect,
    currentActive,
  }

  const renderChild = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<TabsItemProps>
      if (childElement.type.displayName === 'TabsItem') {
        return React.cloneElement(childElement, {
          index,
        })
      } else {
        console.error('Tabs has a child which is not TabsItem')
      }
    })
  }
  const classnames = classNames('tabs', className)

  return (
    <tabsContext.Provider value={passedContext}>
      <ul className={classnames} style={style} data-testid="test-tabs">
        {renderChild()}
      </ul>
    </tabsContext.Provider>
  )
}

Tabs.defaultProps = {
  defaultIndex: 0,
}

export default Tabs
