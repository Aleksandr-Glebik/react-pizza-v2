import { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import PizzaCartSkeleton from './components/PizzaCartSkeleton';

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect( () => {
    setIsLoading(true)
    fetch('https://63d776045c4274b136f4ac47.mockapi.io/items')
    .then( (resp) => {
      return resp.json()
    })
    .then( (items) => {
      setItems(items)
      setIsLoading(false)
    }) 
  }, [])



  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {/* {items.map( (item, ind) => (
              <PizzaBlock
                key={`${item}_${ind}`}
                {...item}
              />
            ))} */}
            {
              isLoading
               ? [...Array(6)].map( (_, ind) => <PizzaCartSkeleton key={ind} />)
               : items.map( (item, ind) => (
                <PizzaBlock
                  key={`${item}_${ind}`}
                  {...item}
                />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
