import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Paginate from '../components/Paginate';
import qs from 'qs';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaCartSkeleton from '../components/PizzaCartSkeleton';
import {Status} from '../redux/slices/pizzasSlice'

import { selectFilters, setCategoryInd, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { FetchPizzaArgsType, fetchPizzasAT, selectPizzas } from '../redux/slices/pizzasSlice';

import { PizzaSliceItemsType } from '../redux/slices/pizzasSlice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categoryInd, sort, currentPage, searchValue } = useSelector(selectFilters);
  const { items, status } = useSelector(selectPizzas);

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryInd(index));
  }, [dispatch])

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = useCallback(async () => {
    const sortBy = sort.sortTypeProps.replace('-', '');
    const order = sort.sortTypeProps.includes('-') ? 'asc' : 'desc';
    const category = categoryInd > 0 ? `category=${categoryInd}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzasAT({
        currentPage,
        category,
        sortBy,
        order,
        search,
      }),
    );
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
      const params = (qs.parse(window.location.search.slice(1)) as unknown) as FetchPizzaArgsType;
      const sort = sortList.find((obj) => obj.sortTypeProps === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryInd: Number(params.category),
          currentPage: params.currentPage,
          sort: sort ? sort : sortList[0],
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

  const pizzas = items.map((item: PizzaSliceItemsType, ind: number) => <PizzaBlock key={`${item}_${ind}`} {...item} />);
  const skeletons = [...Array(6)].map((_, ind) => <PizzaCartSkeleton key={ind} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryInd} onChangeCategories={onChangeCategory} />
        <Sort value={sort}/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === Status.LOADING ? skeletons : pizzas}</div>
      )}
      <Paginate currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}

export default Home;
