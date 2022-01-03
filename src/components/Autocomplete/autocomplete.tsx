import React, {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
  useEffect,
  useRef,
} from 'react'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

export type DataSourceType<T = {}> = T & { value: string }

export interface AutocompleteProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'onSelect'> {
  onSelect?: (item: string) => void
  fetchSuggestion: (
    query: string
  ) => DataSourceType[] | Promise<DataSourceType[]>
  renderOptions?: (item: string) => React.ReactElement
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const { onSelect, value, fetchSuggestion, renderOptions, ...restProps } =
    props

  //if value exist, we need to delete the defaultValue, since component only can
  //be either controlled component or uncontrolled component.(either value or defaultValue)
  if ('value' in props) {
    delete restProps.defaultValue
    //if value doesn't init before, we need to give a value to provent value change from undefined
    //(uncontrolled component can not change to controlled component or vice versa)
    if (typeof value === 'undefined' || value === null) {
      props.value = ''
    }
  }
  const [inputValue, setInputValue] = useState(value ? value : '')
  const [suggestions, setSuggestion] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex, setHighlightIndex] = useState(-1)
  const showDropDown = useRef(true)
  const clickoutsideRef = useRef<HTMLDivElement>(null)
  useClickOutside(clickoutsideRef, () => {
    setSuggestion([])
  })
  const debounceValue = useDebounce(inputValue, 300)

  useEffect(() => {
    if (debounceValue && showDropDown.current) {
      setSuggestion([])
      const results = fetchSuggestion(debounceValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then((data) => {
          setSuggestion(data)
          setLoading(false)
        })
      } else {
        setSuggestion(results)
      }
    } else {
      setSuggestion([])
    }
    setHighlightIndex(-1)
  }, [debounceValue, fetchSuggestion])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    showDropDown.current = true
  }

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    showDropDown.current = false
    setSuggestion([])
    if (onSelect) onSelect(item.value)
  }

  const renderTemplete = (item: string) => {
    return renderOptions ? renderOptions(item) : item
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const handleArrowDown = () => {
      if (highlightIndex < suggestions.length - 1) {
        setHighlightIndex((c) => c + 1)
      } else {
        setHighlightIndex(0)
      }
    }

    const handleArrowUp = () => {
      if (highlightIndex > 0) {
        setHighlightIndex((c) => c - 1)
      } else {
        setHighlightIndex(suggestions.length - 1)
      }
    }

    switch (e.code) {
      case 'ArrowDown':
        handleArrowDown()
        break
      case 'ArrowUp':
        handleArrowUp()
        break
      case 'Enter':
        handleSelect(suggestions[highlightIndex])
        break
      default:
        break
    }
  }

  return (
    <div ref={clickoutsideRef}>
      <input
        value={inputValue}
        onChange={handleChange}
        {...restProps}
        onKeyDown={handleKeyDown}
        data-testid="inputNode"
      />

      {/* suggest list */}
      <ul style={{ listStyle: 'none' }}>
        {loading ? (
          <div>loading</div>
        ) : suggestions && suggestions.length > 0 ? (
          suggestions.map((item, index) => (
            <li
              key={`${item}+${index}`}
              style={
                index === highlightIndex ? { color: 'red' } : { color: 'black' }
              }
              onClick={() => {
                handleSelect(item)
              }}
            >
              {renderTemplete(item.value)}
            </li>
          ))
        ) : null}
      </ul>
    </div>
  )
}

export default Autocomplete
