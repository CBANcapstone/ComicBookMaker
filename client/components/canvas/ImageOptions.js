import React, { Component } from 'react';

export default class ImageOptions extends Component {
  render() {
    return (
      <div
        onClick={this.props.click}
        className="root-canvas-selection-bar-images-options"
      >
        <img src={this.props.src} width="100" height="100" />
      </div>
    );
  }
}
