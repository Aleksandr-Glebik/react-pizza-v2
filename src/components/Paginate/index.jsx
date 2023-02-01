import React, { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss'

function Paginate({currentPage, setCurrentPage, itemsLength}) {
  let currentPageCount = (itemsLength >= 4) ? Math.ceil(itemsLength / 4) : 1

  useEffect( () => {
    let page = currentPageCount === 1 ? 1 : currentPage
    setCurrentPage(page)
  }, [currentPageCount, currentPage, setCurrentPage])

  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      onPageChange={event => setCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={currentPageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
}

export default Paginate;

// так как mockAPI имеет ограниченный функционал пагинация работает с использованием костыля = длина массива возвращаемых пицц меньше 4 - значит пагинатор выводит одну страницу... fix этих нюансов приводит к некорректной работе поиска в input Search
