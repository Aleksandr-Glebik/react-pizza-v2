import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss'

function Paginate({setCurrentPage, itemsLength}) {
  let currentPageCount = (itemsLength >= 4) ? Math.ceil(itemsLength / 4) : 1

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
