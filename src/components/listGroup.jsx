import React from "react";

const ListGroup = props => {
  const { items, selectedItem, onItemSelect } = props;
  return (
    <ul className="list-group">
      {items.map(singleItem => (
        <li
          key={singleItem._id}
          onClick={() => onItemSelect(singleItem)}
          className={
            selectedItem === singleItem
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {singleItem.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
