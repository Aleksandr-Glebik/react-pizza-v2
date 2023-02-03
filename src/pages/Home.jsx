import React, { useEffect, useContext, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaCartSkeleton from '../components/PizzaCartSkeleton';

import { SearchContext } from '../App';
import { setCategoryInd, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzasAT } from '../redux/slices/pizzasSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryInd, sort, currentPage } = useSelector((state) => state.filters);
  const {items, status} = useSelector(state => state.pizzas)
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (index) => {
    dispatch(setCategoryInd(index));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = useCallback(async () => {
    const sortByType = sort.sortTypeProps.replace('-', '');
    const order = sort.sortTypeProps.includes('-') ? 'asc' : 'desc';
    const category = categoryInd > 0 ? `category=${categoryInd}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzasAT({
      currentPage,
      category,
      sortByType,
      order,
      search
    }))

  }, [categoryInd, searchValue, currentPage, sort.sortTypeProps, dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortTypeProps: sort.sortTypeProps,
        categoryInd,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryInd, currentPage, sort.sortTypeProps, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      const sort = sortList.find((obj) => obj.sortTypeProps === params.sortTypeProps);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [fetchPizzas]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryInd} onChangeCategories={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === 'loading'
          ? [...Array(6)].map((_, ind) => <PizzaCartSkeleton key={ind} />)
          : items.map((item, ind) => <PizzaBlock key={`${item}_${ind}`} {...item} />)}
      </div>
      <Paginate currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
