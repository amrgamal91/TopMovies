import React, { Component } from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import NewPagination from "./newPagination";
import { paginate } from "../utils/utils";
import SearchBox from "./searchBox";
import { getCurrentYearMovies, getPageMovies } from "../services/moviesService";
import FilterignDropdown from "./filteringDropdown";
import { getAllGenres } from "../services/genreService";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 10,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    genresMap: [],
    sortColumn: { path: "vote_average", order: "desc" },
    totalPages: null
  };

  columns = [
    { columnName: "poster", label: "" },
    { columnName: "title", label: "Title" },
    { columnName: "release_date", label: "Release Date" },
    { columnName: "vote_average", label: "Rate" },
    { columnName: "genre_ids", label: "Genre" }
  ];

  /**
   * initializes Genres & Movies once the movies Component created
   */
  async componentDidMount() {
    this.getAllGenres();
    const { data } = await getCurrentYearMovies();
    const x_movies = data.results;
    // console.log("movies : " + data.total_pages);
    // this.setState({ movies });
    const totalPages = data.total_pages > 50 ? 50 : data.total_pages;
    this.getPageMoviess(totalPages);

    // let backdropIMG = "././public/images/cinema.jpeg";
    // console.log("the image path : " + backdropIMG);
    // document.body.style.backgroundImage = 'url("' + backdropIMG + '")';
    // console.log("background path : " + document.body.style.backgroundImage);
    // document.body.style.backgroundSize = "cover";
    // document.body.style.repeat = "no-repeat";
  }

  async getAllGenres() {
    const { data } = await getAllGenres();
    const all = [{ id: 0, name: "All Genres" }, ...data.genres];
    let result = new Map(all.map(i => [i.id, i.name]));
    const genres = [...result.values()];
    this.setState({ genres, genresMap: result });
  }

  async getPageMoviess(pages) {
    let allMovies = "";
    for (let index = 1; index <= pages; index++) {
      const { data } = await getPageMovies(index);
      const movies = data.results;
      allMovies = [...allMovies, ...movies];
    }
    // allMovies.sort(this.compare);
    // console.log(JSON.stringify(allMovies));
    this.setState({ movies: allMovies });
    // console.log("state movies : " + JSON.stringify(this.state.movies));
  }

  compare(a, b) {
    const first = a.vote_average;
    const second = b.vote_average;
    let comparison = 0;
    if (first < second) {
      comparison = 1;
    } else if (first > second) {
      comparison = -1;
    }
    return comparison;
  }
  /**
   * handles Genre Selection, by updating state with the selected one
   */
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
    // console.log("the selected genre is : " + JSON.stringify(genre));
  };

  /**
   * update the current page with the selected one
   */
  handlePageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };

  /**
   * Param:column of path & order to sort the table regarding it
   */
  handleSort = newSortColumn => {
    this.setState({ sortColumn: newSortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  /**
   * preparing the data to be passed to render method
   * 1- fitler movise due to search query in search box if exist
   * 2- if not exist then filter Movies by genres
   * 3- sort the filtered ones
   * 4- paginate
   */
  getData = () => {
    let filteredMovies = this.state.movies;

    if (this.state.searchQuery) {
      filteredMovies = this.state.movies.filter(m =>
        m.title
          .toLowerCase()
          .startsWith(this.state.searchQuery.toString().toLowerCase())
      );
    } else {
      let genreKey = "";
      if (this.state.selectedGenre) {
        genreKey = [...this.state.genresMap.entries()]
          .filter(({ 1: v }) => v === this.state.selectedGenre.value)
          .map(([k]) => k);
        genreKey = parseInt(genreKey, 10);
      }

      filteredMovies =
        this.state.selectedGenre && genreKey !== 0
          ? this.state.movies.filter(m => m.genre_ids.includes(genreKey))
          : this.state.movies;
    }

    const sortedMovies = _.orderBy(
      filteredMovies,
      this.state.sortColumn.path,
      this.state.sortColumn.order
    );

    const pageMovies = paginate(
      sortedMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    return { totalCount: filteredMovies.length, data: pageMovies };
  };

  onPageChanged = data => {
    const { currentPage, totalPages } = data;
    this.setState({ currentPage, totalPages });
  };

  render() {
    const { totalCount, data } = this.getData();
    if (!totalCount || !data) {
      return <p>loading.......</p>;
    }

    return (
      <div className="row justify-content-center padding-outer">
        <div className=" col-xs-12 col-md-12 col-lg-12 padding-inner">
          <div className="row justify-content-md-center ">
            <div className="col-md-5">
              <p>Filter By </p>
              <FilterignDropdown
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col-md-6">
              <p>showing {this.state.movies.length} movies in imdb</p>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
            </div>
          </div>

          {/* Table of Movies */}
          <MoviesTable
            moviesList={data}
            genresMap={this.state.genresMap}
            columns={this.columns}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
          />
          {/* page numbers */}
          {/* <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          /> */}

          {/* <div className="d-flex flex-row py-4 align-items-center"> */}
          <NewPagination
            itemsCount={totalCount}
            pageLimit={this.state.pageSize}
            pageNeighbours={2}
            currentPage={this.state.currentPage}
            onPageChanged={this.onPageChanged}
          />
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Movies;
