import React from 'react';
import { HighlightCategory } from '../Templates/SelectTemplateHighlight';

const Category = props => {
  HighlightCategory();
  return (
    <div className="selection-category">
      <div className="tooltip">
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
        {props.category === 'custom-text' ? (
          <span className="tooltiptext-cat">
            Click on text to resize & Double Click to remove border
          </span>
        ) : (
          <span className="tooltiptext-cat">
            Click on a sticker to add it to your comic strip
          </span>
        )}
      </div>
    </div>
  );
};

export default Category;
