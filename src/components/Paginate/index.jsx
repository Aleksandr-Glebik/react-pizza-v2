import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss'

function Paginate({ currentPage, onChangePage }) {

  return (
    <ReactPaginate
      className={styles.root}
      nextLabel=">"
      onPageChange={event => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
}

export default Paginate;
