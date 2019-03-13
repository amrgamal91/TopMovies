import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import "../index.css";

class MoviesTable extends Component {
  render() {
    return (
      <div className="cardcont col-xs-12 col-md-11 col-centered ">
        <table className="table">
          <TableHeader
            columns={this.props.columns}
            onSort={this.props.onSort}
            sortColumn={this.props.sortColumn}
          />
          <TableBody
            data={this.props.moviesList}
            genresMap={this.props.genresMap}
          />
        </table>
      </div>
    );
  }
}

export default MoviesTable;
