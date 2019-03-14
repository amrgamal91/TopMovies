import React, { Component } from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import NewPagination from "./newPagination";
import { paginate, getYears } from "../utils/utils";
import SearchBox from "./searchBox";
import { getYearMovies, getPageMovies } from "../services/moviesService";
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
    totalPages: null,
    years: [],
    selectedYear: null
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
    this.setState({ selectedYear: "2018" /*new Date().getFullYear()*/ }, () =>
      this.refreshComponent(this.state.selectedYear)
    );
    console.log("here with the new selected year : " + this.state.selectedYear);
    // const { data } = await getYearMovies(this.state.SelectedYear);
    // console.log("here with the new total pages : " + data.total_pages);

    // const totalPages = data.total_pages > 50 ? 50 : data.total_pages;
    console.log(
      "totalPAges:......." +
        // totalPages +
        " " +
        JSON.stringify(this.state.selectedYear)
    );
    // this.getMoviesPages(totalPages, this.state.SelectedYear);

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

  async getMoviesPages(pages, year) {
    let allMovies = "";
    for (let index = 1; index <= pages; index++) {
      const { data } = await getPageMovies(index, year);
      const movies = data.results;
      allMovies = [...allMovies, ...movies];
    }
    this.setState({ movies: allMovies });
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
    // console.log("the selected genre is : " + this.state.selectedGenre);
  };

  handleYearSelect = year => {
    console.log("value passed to handle select year : " + year.value);
    this.setState(
      {
        selectedYear: year.value,
        selectedGenre: this.state.selectedGenre,
        currentPage: 1,
        searchQuery: ""
      },
      () => this.refreshComponent(year.value)
    );
    // console.log("the selected genre is : " + JSON.stringify(genre));
  };

  async refreshComponent(year) {
    const { data } = await getYearMovies(year);
    const totalPages = data.total_pages > 50 ? 50 : data.total_pages;
    console.log("here in refresh total Pages=" + totalPages);
    this.getMoviesPages(totalPages, year);
    this.render();
  }

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
    console.log("in render method ........ooooooooo : " + totalCount);
    const allYears = getYears();
    if (!totalCount || !data) {
      return <p>loading.......</p>;
    }
    return (
      <div className="row justify-content-center padding-outer">
        <div className=" col-xs-12 col-md-12 col-lg-12 padding-inner">
          <div className="row justify-content-md-center ">
            <div className="col-md-3">
              <p>Select Year </p>
              <FilterignDropdown
                items={allYears}
                onItemSelect={this.handleYearSelect}
                placeholderText={this.state.selectedYear}
              />
            </div>
            <div className="col-md-3">
              <p>Select Genre </p>
              <FilterignDropdown
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
                placeholderText="All Genres"
              />
            </div>
            <div className="col-md-5">
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
          {console.log("here b4 pagination : " + totalCount)}
          <NewPagination
            itemsCount={totalCount}
            pageLimit={this.state.pageSize}
            pageNeighbours={2}
            currentPage={this.state.currentPage}
            onPageChanged={this.onPageChanged}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
