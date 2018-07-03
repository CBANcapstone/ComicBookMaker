import React from 'react';
import { HighlightCategory } from '../SelectTemplateHighlight';

const Category = props => {
  HighlightCategory();
  return (
    <div className="selection-category">
      <div
        id={props.category}
        onClick={props.onClick}
        className={'root-canvas-selection-bar-category' + ' ' + props.active}
        style={{
          fontSize: '1.1em',
          fontFamily: 'Bungee Inline',
          borderStyle: 'solid',
          borderWidth: '0.1em',
          borderColor: '#325e78'
        }}
      >
        {props.category}
      </div>
    </div>
  );
};

export default Category;
