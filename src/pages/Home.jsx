import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Paginate from '../components/Paginate';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaCartSkeleton from '../components/PizzaCartSkeleton';

import { SearchContext } from '../App';
import { setCategoryInd } from '../redux/slices/filterSlice';


function Home( ) {
  const { categoryInd, sort } = useSelector(state => state.filters)
  const dispatch = useDispatch()

  const onChangeCategory = (index) => {
    dispatch(setCategoryInd(index))
  }

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsLength, setItemsLength] = useState(10)

  const { searchValue } = useContext(SearchContext)

  useEffect(() => {
    setIsLoading(true);
    const sortByType = sort.sortTypeProps.replace('-', '')
    const order = sort.sortTypeProps.includes('-') ? 'asc' : 'desc'
    const category = categoryInd > 0 ? `category=${categoryInd}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    axios.get(`https://63d776045c4274b136f4ac47.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortByType}&order=${order}${search}`)
      .then(resp => {
        setItems(resp.data);
        setIsLoading(false)
      })
    window.scrollTo(0, 0)

    axios.get(`https://63d776045c4274b136f4ac47.mockapi.io/items?${category}&sortBy=${sortByType}&order=${order}${search}`)
      .then(resp2 => setItemsLength(resp2.data.length))

  }, [categoryInd, searchValue, currentPage, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryInd} onChangeCategories={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, ind) => <PizzaCartSkeleton key={ind} />)
          : items.map((item, ind) => <PizzaBlock key={`${item}_${ind}`} {...item} />)}
      </div>
      <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} itemsLength={itemsLength} />
    </div>
  );
}

export default Home;
