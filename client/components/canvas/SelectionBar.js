import React, { Component } from 'react';
import Category from './Category';
import ImageOptions from './ImageOptions';
import CanvasTextArea from './CanvasTextArea';
import {
  backgroundsArr,
  charactersArr,
  bubblesArr,
  eyes,
  people,
  avatars,
  stickers,
  buildings
} from '../../initialData';

export default class SelectionBar extends Component {
  constructor() {
    super();
    this.categories = [
      'background',
      'characters',
      'textbubbles',
      'custom-text',
      'eyes',
      'people',
      'avatars',
      'stickers',
      'buildings'
    ];
    this.images = {
      background: backgroundsArr,
      characters: charactersArr,
      textbubbles: bubblesArr,
      eyes,
      people,
      avatars,
      stickers,
      buildings
    };
    this.state = {
      sampleCategory: null
    };
  }
  handleClick = event => {
    let isHidden =
      this.state.sampleCategory === event.target.id ? null : event.target.id;
    this.setState({ sampleCategory: isHidden });
  };

  render() {
    let active = '';
    return (
      <div className="root-canvas-selection-bar-component">
        <div className="root-canvas-selection-bar-component-category">
          {this.categories &&
            this.categories.map((cat, idx) => {
              {
                !idx ? (active = 'active-cat') : (active = '');
              }
              return (
                <Category
                  key={idx}
                  category={cat}
                  onClick={this.handleClick}
                  active={active}
                />
              );
            })}
        </div>
        <div className="root-canvas-selection-bar-component-images">
          {this.state.sampleCategory === 'custom-text' ? (
            <CanvasTextArea sendTextToCanvas={this.props.addText} />
          ) : (
            this.state.sampleCategory &&
            this.images[this.state.sampleCategory].map((img, i) => {
              return (
                <div className="selection-bar-images-container">
                  <ImageOptions key={i} src={img} click={this.props.click} />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
