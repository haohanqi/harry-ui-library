import React, { useContext } from "react"
import classNames from "classnames"
import { MenuContext } from "./menu"

export interface MenuItemProps {
  index?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = ({
  index,
  disabled,
  className,
  style,
  children,
}) => {
  const { index: currentIndex, onSelect } = useContext(MenuContext)

  const classes = classNames("menu-item", className, {
    "is-disable": disabled,
    "is-active": currentIndex === index,
  })

  const handleClick = () => {
    if (onSelect && !disabled && typeof index === "string") {
      onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

MenuItem.displayName = "MenuItem"

export default MenuItem
