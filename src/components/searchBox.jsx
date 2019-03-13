import React from "react";

const SearchBox = ({ searchQuery, onChange }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="Search.."
      value={searchQuery}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
