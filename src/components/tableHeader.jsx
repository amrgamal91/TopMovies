import React, { Component } from "react";

class TableHeader extends Component {
  handleSort = sortColumnPath => {
    const newSortColumn = { ...this.props.sortColumn };
    newSortColumn.path = sortColumnPath;
    if (sortColumnPath === this.props.sortColumn.path) {
      newSortColumn.order =
        this.props.sortColumn.order === "desc" ? "asc" : "desc";
    } else {
      newSortColumn.order = "asc";
    }
    this.props.onSort(newSortColumn);
  };

  /**
   * param:name of the column
   * check if the column not the one of sort , if so neglect it
   * if it is the sort column then check order to render the icon of order
   */
  renderIcon = name => {
    if (name !== this.props.sortColumn.path) {
      return null;
    }
    if (this.props.sortColumn.order === "desc")
      return <i className="fa fa-sort-desc" />;
    return <i className="fa fa-sort-asc" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(singleColumn => (
            <th
              scope="col"
              className="movies-tb-header"
              key={singleColumn.label}
              onClick={() => this.handleSort(singleColumn.columnName)}
            >
              {singleColumn.label} {this.renderIcon(singleColumn.columnName)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
