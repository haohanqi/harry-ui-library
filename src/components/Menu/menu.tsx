import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

type selectCallback = (selectedIndex: string) => void

export interface MenueProps {
    defaultIndex?: string
    defaultOpenSubmenus?: string[]
    mode?: MenuMode
    className?: string
    style?: React.CSSProperties
    onSelect?: selectCallback
}

interface MenuContextProps {
    index: string
    onSelect?: selectCallback
    mode?: MenuMode
    defaultOpenSubmenus?: string[]
}

export const MenuContext = createContext<MenuContextProps>({
    index: '0',
})

const Menu: React.FC<MenueProps> = ({
    defaultIndex,
    mode,
    className,
    style,
    onSelect,
    children,
    defaultOpenSubmenus,
}) => {
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    })

    const handleSelect = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: MenuContextProps = {
        index: currentActive ? currentActive : '0',
        onSelect: handleSelect,
        mode,
        defaultOpenSubmenus,
    }

    // make sure Menu only accept MenuItem as child element
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement =
                child as React.FunctionComponentElement<MenuItemProps>
            if (
                childElement.type.displayName === 'MenuItem' ||
                childElement.type.displayName === 'SubMenu'
            ) {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                })
            } else {
                console.error(
                    'Menu has a child which is not MenuItem Component'
                )
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    defaultOpenSubmenus: [],
    mode: 'horizontal',
}

export default Menu
