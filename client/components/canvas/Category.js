import React from 'react';

const Category = props => {
  return (
    <div
      id={props.category}
      onClick={props.onClick}
      className="root-canvas-selection-bar-category"
    >
      {props.category}
    </div>
  );
};

export default Category;
