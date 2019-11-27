import React, { Component } from "react";
import _ from "lodash";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import { paginate, getYears } from "../utils/utils";
import SearchBox from "./searchBox";
import { get_Num_Movies_Pages, getPageMovies } from "../services/moviesService";
import CustomDropDown from "./customDropDown";
import { getAllGenres } from "../services/genreService";
import loading from "../spinner-loading.svg";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 10,
    currentPage: 1,
    searchQuery: "",
    selectedGenre: null,
    genresMap: new Map(),
    sortColumn: { path: "vote_average", order: "desc" },
    totalPages: null,
    years: [],
    selectedYear: new Date().getFullYear(),
    isLoading: true
  };

  columns = [
    { columnName: "poster", label: "" },
    { columnName: "title", label: "Title" },
    { columnName: "release_date", label: "Release Date" },
    { columnName: "vote_average", label: "Rate" },
    { columnName: "genre_ids", label: "Genre" }
  ];

  /**
   * first , initializes Genres then ,
   * if there is a state saved in local storage get this state
   * else , refresh the component with the movies of current selected year
   * add event listener to save state to localStorage when user refreshes the page
   */
  async componentDidMount() {
    this.getGenrePairs();
    if (localStorage.getItem("movies")) this.hydrateStateWithLocalStorage();
    else this.getComponentContent(this.state.selectedYear);
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  /**
   * add event listener to save state to localStorage when user leaves the page
   */
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  /**
   * loop on each item in the state , save it in local storage
   */
  saveStateToLocalStorage() {
    for (let key in this.state) {
      if (key === "genresMap") continue;
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  /**
   * get the saved state from local storage
   */
  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      if (key === "genresMap") continue;
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  /**
   * get all genres values from the API then add the initial value at first
   * create map of these pairs , then get names only from these pairs
   * set state with the new values
   */
  async getGenrePairs() {
    const { data } = await getAllGenres();
    const all_genres_pairs = [{ id: 0, name: "All Genres" }, ...data.genres];
    let allGenresMap = new Map(all_genres_pairs.map(i => [i.id, i.name]));
    const genres = [...allGenresMap.values()];
    this.setState({ genres, genresMap: allGenresMap });
  }

  /**
   *
   * @param {number} pages total number of pages to get from API
   * @param {number} year the selected year to get its movies
   * loop on pages , foreach page get its movies , add page movies to all movies
   * set state with the movies val , set is loading to false to hide loading sign
   */
  async getAllMovies(pages, year) {
    let allMovies = "";
    for (let index = 1; index <= pages; index++) {
      const { data } = await getPageMovies(index, year);
      const movies = data.results;
      allMovies = [...allMovies, ...movies];
    }
    this.setState({ movies: allMovies }, () =>
      this.setState({ isLoading: false })
    );
  }

  /**
   *
   * @param {number} year the current selected year
   * get total number of pages of the selected year movies
   * if it exceeds 50 then set it to 50 else keep it
   * get movies of these pages
   */
  async getComponentContent(year) {
    const { data } = await get_Num_Movies_Pages(year);
    const totalPages = data.total_pages > 50 ? 50 : data.total_pages;
    this.getAllMovies(totalPages, year);
  }

  /**
   * handles Genre Selection, by updating state with the selected one
   */
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  /**
   * handle year selection by updating the state ,
   * then get component content after setting state directly
   */
  handleYearSelect = year => {
    this.setState(
      {
        isLoading: true,
        selectedYear: year.value,
        selectedGenre: this.state.selectedGenre,
        currentPage: 1,
        searchQuery: ""
      },
      () => {
        this.getComponentContent(year.value);
      }
    );
  };

  /**
   * Param:column of path & order to sort the table regarding it
   */
  handleSort = newSortColumn => {
    this.setState({ sortColumn: newSortColumn });
  };

  /**
   * update the search query val with the query val , reset genre and page
   */
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  /**
   * update the current page with the selected one
   */
  handlePageChange = data => {
    const { currentPage, totalPages } = data;
    this.setState({ currentPage, totalPages });
  };

  /**
   * preparing the data to be passed to render method
   * 1- fitler movise due to search query in search box if exist
   * 2- if not exist then filter Movies by genres
   * 3- sort the filtered ones
   * 4- paginate : slice movies from all movies according to page size
   * return : total count of page movies , page movies objects
   */
  getPreparedData = () => {
    let filteredMovies = this.state.movies;

    console.log("fitlered Movies: " + filteredMovies);
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
    console.log("fitlered Movies-2: " + filteredMovies);

    const sortedMovies = _.orderBy(
      filteredMovies,
      this.state.sortColumn.path,
      this.state.sortColumn.order
    );
    console.log("stored Movies: " + sortedMovies);

    const pageMovies = paginate(
      sortedMovies,
      this.state.currentPage,
      this.state.pageSize
    );
    console.log("page Movies: " + pageMovies);

    return { totalCount: filteredMovies.length, data: pageMovies };
  };

  render() {
    const { totalCount, data } = this.getPreparedData();
    let allYears = getYears();
    console.log("totalCount : " + totalCount);
    console.log("data : " + data);

    // if (!totalCount || !data || this.state.isLoading) {
    //   return (
    //     <div className="loading">
    //       <header className="App-header">
    //         <p>loading.......</p>
    //         <img src={loading} className="App-loading" alt="loading" />
    //       </header>
    //     </div>
    //   );
    // }
    return (
      <div className="row justify-content-center padding-outer">
        <div className="col-xs-12 col-md-11 col-lg-10 col-centered">
          <div className="row justify-content-md-center cardcont-f">
            <div className=" col-lg-3 col-md-4">
              <p className="label">Select Year </p>
              <CustomDropDown
                items={allYears}
                onItemSelect={this.handleYearSelect}
                placeholderText={this.state.selectedYear}
              />
            </div>
            <div className="col-lg-4 col-md-4">
              <p className="label">Select Genre </p>
              <CustomDropDown
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
                placeholderText="All Genres"
              />
            </div>
            <div className="col-lg-5 col-md-4">
              <p className="label">
                showing{" "}
                <span className="label-val">{this.state.movies.length}</span>{" "}
                movies
              </p>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
            </div>
          </div>
        </div>
        <MoviesTable
          moviesList={data}
          genresMap={this.state.genresMap}
          columns={this.columns}
          sortColumn={this.state.sortColumn}
          onSort={this.handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageLimit={this.state.pageSize}
          pageNeighbours={2}
          currentPage={this.state.currentPage}
          onPageChanged={this.handlePageChange}
          key={totalCount}
        />
      </div>
    );
  }
}

export default Movies;
