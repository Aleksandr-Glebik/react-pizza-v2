import React from 'react'

const categoriesPizza= [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые'
]

function Categories( {value, onChangeCategories} ) {
  const handlerActiveCategories = (index) => {
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