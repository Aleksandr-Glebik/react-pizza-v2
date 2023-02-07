import React, { useCallback, useRef, useState, useMemo } from 'react';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import {  setSearchValue } from '../../redux/slices/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch()

  const inputRef = useRef<HTMLInputElement>(null)
  const [localValue, setLocalValue] = useState('')

  const onClickClear = () => {
    setLocalValue('')
    dispatch(setSearchValue(''))
    inputRef?.current?.focus()
  }

  const debouncedSearch = useMemo(
    () => debounce( (str: string) => {
      dispatch(setSearchValue(str))
    }, 750),
    [ dispatch]
  )
  const onChangeInput = useCallback(
    (e: any) => {
      setLocalValue(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        height="18px"
        version="1.1"
        viewBox="0 0 18 18"
        width="18px">
        <title />
        <desc />
        <defs />
        <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
          <g fill="#000000" id="Core" transform="translate(-339.000000, -381.000000)">
            <g id="search" transform="translate(339.000000, 381.000000)">
              <path
                d="M12.5,11 L11.7,11 L11.4,10.7 C12.4,9.6 13,8.1 13,6.5 C13,2.9 10.1,0 6.5,0 C2.9,0 0,2.9 0,6.5 C0,10.1 2.9,13 6.5,13 C8.1,13 9.6,12.4 10.7,11.4 L11,11.7 L11,12.5 L16,17.5 L17.5,16 L12.5,11 L12.5,11 Z M6.5,11 C4,11 2,9 2,6.5 C2,4 4,2 6.5,2 C9,2 11,4 11,6.5 C11,9 9,11 6.5,11 L6.5,11 Z"
                id="Shape"
              />
            </g>
          </g>
        </g>
      </svg>
      <input
        ref={inputRef}
        placeholder="Поиск пиццы ..."
        className={styles.input}
        value={localValue}
        onChange={onChangeInput}
      />
      {localValue && (
        <svg
          className={styles.iconClose}
          onClick={onClickClear}
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          height="200"
          id="Layer_1"
          viewBox="0 0 200 200"
          width="200">
          <title />
          <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
        </svg>
      )}
    </div>
  );
}

export default Search;
