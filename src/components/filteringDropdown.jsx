import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
const filteringDropDown = props => {
  const { items, selectedItem, onItemSelect, placeholderText } = props;
  return (
    <Dropdown
      options={items}
      value={selectedItem}
      onChange={onItemSelect}
      placeholder={placeholderText}
    />
  );
};

export default filteringDropDown;
