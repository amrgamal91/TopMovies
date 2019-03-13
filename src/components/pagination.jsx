import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log("paging 1:" + JSON.stringify(props));
  console.log("here in 1 pages:" + itemsCount);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null; //don't render paging if no more than 1 page
  const pages = _.range(1, pagesCount + 1);

  return (
    <div className="row justify-content-center ">
      <nav>
        <ul className="pagination">
          <li>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {pages.map(singlePage => (
            <li
              key={singlePage}
              className={
                currentPage === singlePage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(singlePage)}>
                {singlePage}
              </a>
            </li>
          ))}
          <li>
            <a className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
