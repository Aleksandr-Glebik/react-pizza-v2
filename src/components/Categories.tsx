import React, {useCallback} from 'react'
// import { useWhyDidYouUpdate } from 'ahooks'

type categoriesPizzaType = string[]

type CategoriesPropsType = {
  value: number
  onChangeCategories: (index: number) => void
}

const categoriesPizza: categoriesPizzaType = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые'
]

const Categories: React.FC<CategoriesPropsType> = React.memo(( {value, onChangeCategories} ) => {
  const handlerActiveCategories = useCallback((index: number) => {
    onChangeCategories(index)
  }, [onChangeCategories])

  // useWhyDidYouUpdate('Categories', {value, onChangeCategories})
  return (
    <div className="categories">
      <ul>
        {
          categoriesPizza.map( (item, ind) => (
            <li
              key={`${item}_${ind}`}
              className={value === ind ? 'active': ''}
              onClick={() => handlerActiveCategories(ind)}
            >{item}</li>
          ))
        }
      </ul>
    </div>
  )
})

export default Categories