import React, { InputHTMLAttributes, useState, useEffect } from 'react'
import classnames from 'classnames'

//props type
type SelectDataSourceType<T = {}> = T & { value: string; disble?: boolean }

interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'onChange'> {
  selectionData: () => Promise<SelectDataSourceType[]> | SelectDataSourceType[]
  onVisibleChange?: () => void
  onChange?: (value: string) => void
}

const Select: React.FC<SelectProps> = (props) => {
  const { selectionData, onVisibleChange, onChange, ...restProps } = props
  const [showDropdown, setShowDropdown] = useState(false)
  const [data, setData] = useState<SelectDataSourceType[]>([])
  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
  })
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    const results = selectionData()

    if (results instanceof Promise) {
      setApiStatus((prevStatus) => ({
        ...prevStatus,
        loading: true,
        error: false,
      }))
      results
        .then((data) => {
          setData(data)
          setApiStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            error: false,
          }))

          if (!data) {
            throw new Error('error')
          }
        })
        .catch((e) => {
          setApiStatus((prevStatus) => ({
            ...prevStatus,
            loading: false,
            error: true,
          }))
        })
    } else {
      setData(results)
    }
  }, [selectionData])

  // change input value to selected item, call onChange
  const handleSelectionChange = (value: string) => {
    setSelectedItem(value)
    if (onChange) {
      onChange(value)
    }
  }

  //show dropdown selection, call onVisibleChange
  const handleInputClick = () => {
    setShowDropdown(!showDropdown)
    if (onVisibleChange) {
      onVisibleChange()
    }
  }

  const renderSelectionItems = () => {
    return (
      <ul style={{ listStyle: 'none' }}>
        {apiStatus.loading && <div>loading</div>}
        {apiStatus.error && <div>error</div>}
        {data
          ? data.map((selectItem, index) => {
              const classes = classnames('select-item', {
                'disabled-item': selectItem.disble,
              })
              return (
                <li
                  onClick={() => {
                    handleSelectionChange(selectItem.value)
                  }}
                  key={`${selectItem.value}-${index}`}
                  className={classes}
                >
                  {selectItem.value}
                </li>
              )
            })
          : null}
      </ul>
    )
  }

  return (
    <div onClick={handleInputClick}>
      <input value={selectedItem} disabled {...restProps} />
      {showDropdown ? renderSelectionItems() : null}
    </div>
  )
}

export default Select
