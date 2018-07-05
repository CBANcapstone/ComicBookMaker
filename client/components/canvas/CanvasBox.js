import React, { Component } from 'react';
import { Rect } from 'react-konva';

export default class CanvasBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '1440',
      height: '490',
      y: this.props.y
    };
  }
  componentDidMount() {
    if (this.props.number === '1') {
      this.setState({ width: window.innerWidth - 70, height: '570' });
    } else if (this.props.number === '2') {
      this.setState({ width: window.innerWidth / 2.2, height: '550' });
    } else if (this.props.number === '3') {
      this.setState({ width: window.innerWidth / 3.3, height: '550' });
    } else if (this.props.number === '4') {
      if (this.props.boxNum === 1) {
        this.setState({ width: window.innerWidth / 2.4, height: '250' });
      } else if (this.props.boxNum === 2) {
        this.setState({ width: window.innerWidth / 2.3, height: '320' });
      } else if (this.props.boxNum === 3) {
        this.setState({ width: window.innerWidth / 2.2, height: '320' });
      } else {
        this.setState({ width: window.innerWidth / 2.1, height: '220' });
      }
    }
  }

  render() {
    return (
      <Rect
        width={this.state.width}
        height={this.state.height}
        stroke="black"
        fill="white"
        x={this.props.x}
        y={this.state.y}
      />
    );
  }
}
