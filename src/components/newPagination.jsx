import React, { Component, Fragment } from "react";
import _ from "lodash";
const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

class NewPagination extends Component {
  /**
   *
   * initialize the base attributes of pagination :
   * pageLimit :max num of items per page
   * itemsCount :total number of movies to be divided over pages
   * pageNeighbours : num of page numbers beside current page (right & left)
   * totaPages : number of pages for all movies
   * finally , set current page to 1 as state
   */
  constructor(props) {
    super(props);
    const { itemsCount = null, pageLimit = 20, pageNeighbours = 0 } = props;
    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 20;
    this.itemsCount = typeof itemsCount === "number" ? itemsCount : 0;
    // pageNeighbours can be: 0, 1 or 2
    this.pageNeighbours =
      typeof pageNeighbours === "number"
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;
    this.totalPages = Math.ceil(this.itemsCount / this.pageLimit);
    this.state = { currentPage: 1 };
  }

  /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalNumbers: (2 neighbors right + 2 on left ) + current page + 2 terminal pages
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    /**
     * when pages need to be hidden (num of blocks not enough for num of pages)
     * */
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
      let pages = _.range(startPage, endPage + 1);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = _.range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = _.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return _.range(1, totalPages);
  };

  render() {
    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <div className="row justify-content-center ">
        <nav aria-label="pagination">
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}
                    >
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}
                    >
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={this.handleClick(page)}
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  /**
   * start the app on page 1
   */
  componentDidMount() {
    this.gotoPage(1);
  }

  /**
   * set state with the new current page &
   * pass handle change method
   */
  gotoPage = page => {
    const { onPageChanged } = this.props;
    const currentPage = Math.max(0, Math.min(page, this.totalPages));
    const paginationData = { currentPage, totalPages: this.totalPages };
    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  /**
   * handles click of each page , just call gotoPage method
   * page : # of page
   */
  handleClick = page => evt => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  /**
   *  (1) < ={10 11} [12] {13 14}= > (23) , left means get the previous set of 5 pages
   *  (1) < ={5 6} [7] {8 9}= > (23)
   */
  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  /**
   *  (1) < ={10 11} [12] {13 14}= > (23) , right means get the next set of 5 pages
   *  (1) < ={15 16} [17] {18 19}= > (23)
   */
  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };
}

export default NewPagination;
