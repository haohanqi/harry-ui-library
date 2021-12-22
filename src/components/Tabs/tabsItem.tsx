import React, { useContext } from "react"
import { tabsContext } from "./tabs"
import classNames from "classnames"

export interface TabsItemProps {
  label: string
  index?: number
  disabled?: boolean
}

const TabsItem: React.FC<TabsItemProps> = ({
  label,
  index,
  children,
  disabled,
}) => {
  const context = useContext(tabsContext)
  const handleTabItemClick = () => {
    if (context?.onSelect && typeof index === "number") {
      context.onSelect(index)
    }
  }

  const titleclasses = classNames("tabsItem-title", {
    "is-active": context?.currentActive === index,
    "is-disabled": disabled,
  })

  return (
    <li>
      <div
        onClick={disabled ? undefined : handleTabItemClick}
        className="tabsItem"
      >
        <div className={titleclasses}>{label}</div>
      </div>

      {context?.currentActive === index ? (
        <div className="tabsItem-container">{children}</div>
      ) : null}
    </li>
  )
}

TabsItem.displayName = "TabsItem"

export default TabsItem
