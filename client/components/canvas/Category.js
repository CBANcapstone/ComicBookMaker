import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <div
        id={this.props.category}
        onClick={this.props.onClick}
        className="root-canvas-selection-bar-category">
        {this.props.category}
      </div>
    );
  }
}
