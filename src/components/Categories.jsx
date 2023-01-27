import React, {useState} from 'react'

const categoriesPizza= [
  'Все',
  'Мясные',
  'Вегетарианские',
  'Гриль',
  'Острые',
  'Закрытые'
]

function Categories() {
  const [activeCategories, setActiveCategories] = useState(0)

  const handlerActiveCategories = (index) => {
    setActiveCategories(index)
  }

  return (
    <div className="categories">
      <ul>
        {
          categoriesPizza.map( (item, ind) => (
            <li
              key={`${item}_${ind}`}
              className={activeCategories === ind ? 'active': ''}
              onClick={() => handlerActiveCategories(ind)}
            >{item}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default Categories