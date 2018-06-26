import React, { Component } from 'react';
import Category from './Category';
import ImageOptions from './ImageOptions';
import {backgroundsArr, charactersArr, bubblesArr} from '../../initialData';

export default class extends Component {
  constructor() {
    super();
    this.categories = ['background', 'characters', 'textbubbles'];
    this.images =  {
          background: backgroundsArr,
          characters: charactersArr,
          textbubbles: bubblesArr
      }
    this.state = {
      imageId: ''
    };
  }
  handleClick = event => {
      this.setState({
          imageId: event.target.id
      })
  };
  render() {
    return (
      <div className='root-canvas-selection-bar-component'>
        <div className="root-canvas-selection-bar-component-category">
          {this.categories &&
            this.categories.map(cat => {
              return <Category key={cat} category={cat} onClick={this.handleClick} />;
            })}
        </div>
        <div className="root-canvas-selection-bar-component-images">
          {this.state.imageId &&
            this.images[this.state.imageId].map((img, i) => {
              return <ImageOptions key={i} src={img} click={this.props.click} />;
            })}
        </div>
      </div>
    );
  }
}
