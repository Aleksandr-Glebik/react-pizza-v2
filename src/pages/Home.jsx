import React, { useEffect, useState, useContext } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaCartSkeleton from '../components/PizzaCartSkeleton';

import { SearchContext } from '../App';

function Home( ) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategories, setActiveCategories] = useState(0)
  const [activeSortType, setActiveSortType] = useState({
    name: 'популярности (desc)',
    sortTypeProps: 'rating'
  })

  const { searchValue } = useContext(SearchContext)

  useEffect(() => {
    setIsLoading(true);
    const sortByType = activeSortType.sortTypeProps.replace('-', '')
    const order = activeSortType.sortTypeProps.includes('-') ? 'asc' : 'desc'
    const category = activeCategories > 0 ? `category=${activeCategories}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    fetch(`https://63d776045c4274b136f4ac47.mockapi.io/items?${category}&sortBy=${sortByType}&order=${order}${search}`)
      .then((resp) => {
        return resp.json();
      })
      .then((items) => {
        setItems(items);
        setIsLoading(false);
      });
      window.scrollTo(0, 0)

  }, [activeCategories, activeSortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeCategories} onChangeCategories={(i) => setActiveCategories(i)} />
        <Sort sortType={activeSortType} onChangeSortType={(obj) => setActiveSortType(obj)}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, ind) => <PizzaCartSkeleton key={ind} />)
          : items.map((item, ind) => <PizzaBlock key={`${item}_${ind}`} {...item} />)}
      </div>
    </div>
  );
}

export default Home;
