import React from 'react'

type categoriesPizzaType = string[]

type CategoriesPropsType = {
  value: number
  onChangeCategories: any
}

const categoriesPizza: categoriesPizzaType = [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые'
]

const Categories: React.FC<CategoriesPropsType> = ( {value, onChangeCategories} ) => {
  const handlerActiveCategories = (index: number) => {
    onChangeCategories(index)
  }

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
}

export default Categories