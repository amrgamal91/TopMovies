import React from "react";
import { Link, NavLink } from "react-router-dom";
import FilterignDropdown from "./filteringDropdown";
import SearchBox from "./searchBox";
const NavBar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">IMDB</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <div className="row">
            <div className="col-2">
              <h3>
                <span className="badge badge-pill badge-info">Filter By</span>
              </h3>
            </div>
            <div className="col-4">
              <FilterignDropdown
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              />
            </div>
            <div className="col-6">
              <p>showing {this.state.movies.length} movies in imdb</p>
              <SearchBox
                value={this.state.searchQuery}
                onChange={this.handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
