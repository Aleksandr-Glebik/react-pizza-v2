import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortType } from '../redux/slices/filterSlice'
// import { useWhyDidYouUpdate } from 'ahooks'

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  NAME_DESC = 'name',
  NAME_ASC = '-name'
}

export type SortListType = {
  name: string
  sortTypeProps: SortPropertyEnum
}

type M = MouseEvent & {
  path: Node[]
}

type SortPropsType = {
  value: SortListType
}

export const sortList: SortListType[] = [
  {name: 'популярности (desc)', sortTypeProps: SortPropertyEnum.RATING_DESC},
  {name: 'популярности (asc)', sortTypeProps: SortPropertyEnum.RATING_ASC},
  {name: 'цене (desc)', sortTypeProps: SortPropertyEnum.PRICE_DESC},
  {name: 'цене (asc)', sortTypeProps: SortPropertyEnum.PRICE_ASC},
  {name: 'алфавиту (desc)', sortTypeProps: SortPropertyEnum.NAME_DESC},
  {name: 'алфавиту (asc)', sortTypeProps: SortPropertyEnum.NAME_ASC},
]

const Sort: React.FC<SortPropsType> = React.memo(( { value } ) => {
  // useWhyDidYouUpdate('Sort', {value})
  const dispatch = useDispatch()

  const [isVisible, setIsVisible] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  const handlerActiveItem = (obj: SortListType) => {
    dispatch(setSortType(obj))
    setIsVisible(false)
  }

  useEffect( () => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as M
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        setIsVisible(false)
      }
    }

    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={isVisible ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => setIsVisible(prev => !prev)}
        >{value.name}</span>
      </div>
      {isVisible && <div className="sort__popup">
        <ul>
          {sortList.map( (item, ind) => (
            <li
              key={`${item.name}_${ind}`}
              className={item.sortTypeProps === value.sortTypeProps ? 'active' : ''}
              onClick={() => handlerActiveItem(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
})

export default Sort;
