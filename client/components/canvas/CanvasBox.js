import React, { Component } from 'react';
import { Rect } from 'react-konva';

export default class extends Component {
  render() {
    return (
      <Rect
        width={this.props.width / 3.3}
        height={this.props.height}
        stroke="black"
        fill="transparent"
        x={this.props.x}
        y={140}
      />
    );
  }
}
