import React, { Component } from 'react';
import { Group, Image, Circle } from 'react-konva';
import Konva from 'konva';

//photo resizing
export default class ResizeCanvasImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xLeft: 5,
      yTop: 5,
      xRight: 280,
      yBottom: 280,
      rotation: 0,
      draggable: true,
      fill: 'transparent'
    };

    this.handleDragMoveTopLeft = this.handleDragMoveTopLeft.bind(this);
    this.handleDragMoveTopRight = this.handleDragMoveTopRight.bind(this);
    this.handleDragMoveBottomLeft = this.handleDragMoveBottomLeft.bind(this);
    this.handleDragMoveBottomRight = this.handleDragMoveBottomRight.bind(this);
    this.circleShow = this.circleShow.bind(this);
    this.circleHide = this.circleHide.bind(this);
    this.updateXandY = this.updateXandY.bind(this);
  }

  updateXandY() {
    const image = new window.Image();
    image.src = this.props.imageUrl;
    this.setState({
      xLeft: 0,
      yTop: 0,
      xRight: this.props.image.width,
      yBottom: this.props.image.height
    });
  }

  componentDidMount() {
    this.updateXandY();
  }

  //Resizing Options:
  handleDragMoveTopLeft(e) {
    const { x, y } =
      e.target instanceof Konva.Circle
        ? e.target.attrs // circle
        : e.target.children[1].attrs; // image
    this.setState({
      xLeft: x >= this.state.xRight ? this.state.xRight : x,
      yTop: y >= this.state.yBottom ? this.state.yBottom : y
    });
    this.anchor.moveToTop();
  }

  handleDragMoveTopRight(e) {
    const { x, y } =
      e.target instanceof Konva.Circle
        ? e.target.attrs
        : e.target.children[1].attrs;
    this.setState({
      xRight: x <= this.state.xLeft ? this.state.xLeft : x,
      yTop: y >= this.state.yBottom ? this.state.yBottom : y
    });
    this.anchor.moveToTop();
  }

  handleDragMoveBottomLeft(e) {
    const { x, y } =
      e.target instanceof Konva.Circle
        ? e.target.attrs
        : e.target.children[1].attrs;
    this.setState({
      xLeft: x >= this.state.xRight ? this.state.xRight : x,
      yBottom: y <= this.state.yTop ? this.state.yTop : y
    });
    this.anchor.moveToTop();
  }

  handleDragMoveBottomRight(e) {
    const { x, y } =
      e.target instanceof Konva.Circle
        ? e.target.attrs
        : e.target.children[1].attrs;
    this.setState({
      xRight: x <= this.state.xLeft ? this.state.xLeft : x,
      yBottom: y <= this.state.yTop ? this.state.yTop : y
    });
    this.anchor.moveToTop();
  }

  //Toggling Show/Hide resize circle guides
  circleShow() {
    this.setState({ fill: 'grey' });
  }

  circleHide() {
    this.setState({ fill: 'transparent' });
  }

  render() {
    const image = new window.Image();
    image.src = this.props.imageUrl;

    return (
      <Group draggable={this.state.draggable}>
        <Circle //bottom-right resize guide
          fill={this.state.fill}
          onDragMove={this.handleDragMoveBottomRight}
          onMouseOver={this.circleShow}
          onMouseOut={this.circleHide}
          x={this.state.xRight}
          y={this.state.yBottom}
          ref={anchor => {
            this.anchor = anchor;
          }}
          radius={10}
          draggable
        />
        <Circle //bottom-left resize guide
          fill={this.state.fill}
          onDragMove={this.handleDragMoveBottomLeft}
          onMouseOver={this.circleShow}
          onMouseOut={this.circleHide}
          x={this.state.xLeft}
          y={this.state.yBottom}
          ref={anchor => {
            this.anchor = anchor;
          }}
          radius={10}
          draggable
        />
        <Circle //top-right resize guide
          fill={this.state.fill}
          onDragMove={this.handleDragMoveTopRight}
          onMouseOver={this.circleShow}
          onMouseOut={this.circleHide}
          x={this.state.xRight}
          y={this.state.yTop}
          ref={anchor => {
            this.anchor = anchor;
          }}
          radius={10}
          draggable
        />
        <Circle //top-left resize guide
          fill={this.state.fill}
          onDragMove={this.handleDragMoveTopLeft}
          onMouseOver={this.circleShow}
          onMouseOut={this.circleHide}
          x={this.state.xLeft}
          y={this.state.yTop}
          ref={anchor => {
            this.anchor = anchor;
          }}
          radius={10}
          draggable
        />

        <Image //image passed down thorugh props
          image={this.props.image}
          onMouseOver={this.circleShow}
          onMouseOut={this.circleHide}
          x={this.state.xLeft}
          y={this.state.yTop}
          width={Math.abs(this.state.xRight - this.state.xLeft)}
          height={Math.abs(this.state.yBottom - this.state.yTop)}
          rotation={this.state.rotation}
          onClick={this.props.onClickImg}
        />
      </Group>
    );
  }
}
