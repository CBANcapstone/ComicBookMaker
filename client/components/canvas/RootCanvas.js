import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import SelectionBar from './SelectionBar';
import ResizeCanvasImage from './ResizeCanvasImage';
import CanvasBox from './CanvasBox';
// import '../../styles/RootCanvas.css';

export default class extends Component {
  constructor() {
    super();
    this.canvasBoxDisRatio = 3.3;
    this.canvasBoxPos = 30;
    this.state = {
      images: [],
      selectedImageOnCanvas: null,
      width: window.innerWidth,
      height: window.innerHeight / 1.5,
      canvasBoxPosX: [
        this.canvasBoxPos,
        this.canvasBoxPos + 30 + window.innerWidth / this.canvasBoxDisRatio,
        this.canvasBoxPos + 60 + window.innerWidth / this.canvasBoxDisRatio * 2
      ]
    };
  }

  updateDimensions = () => {
    this.canvasBoxPos = window.innerWidth * 0.02;
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight / 2,
      canvasBoxPosX: [
        this.canvasBoxPos,
        this.canvasBoxPos + 20 + window.innerWidth / this.canvasBoxDisRatio,
        this.canvasBoxPos + 40 + window.innerWidth / this.canvasBoxDisRatio * 2
      ]
    });
  };
  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions);
  };
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions);
  };

  handleClick = event => {
    const image = new window.Image();
    image.src = event.target.src;
    image.onload = () => {
      this.setState({ images: [...this.state.images, image] });
    };
  };

  handleCanvasImgClick = event => {
    this.setState({ selectedImageOnCanvas: event.target.attrs.image });
  };

  handleDelete = () => {
    let arr = this.state.images.filter(img => {
      return img !== this.state.selectedImageOnCanvas;
    });
    this.setState({ images: arr });
  };

  handleClear = () => {
    this.setState({ images: [] });
  };

  render() {
    return (
      <div className="root-canvas">
        <div className="root-canvas-selection-bar">
          <SelectionBar click={this.handleClick} />
        </div>
        <div className="root-canvas-buttons">
          <div className="root-canvas-delete-image">
            <button type="button" onClick={this.handleDelete}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/in-and-around-the-house/43/trash_bin-512.png"
                height="30"
                width="30"
              />
            </button>
          </div>
          <div className="root-canvas-clear-canvas">
            <button type="button" onClick={this.handleClear}>
              <img
                src="https://static1.squarespace.com/static/5737ad2a1d07c093e2787063/5ab80fd503ce64c499d79d16/5ab810f3562fa7d514189228/1522012404191/Clear+icon.png?format=300w"
                height="30"
                width="30"
              />
            </button>
          </div>
        </div>
        <div className="root-canvas-info">
          <Stage width={window.innerWidth} height="700">
            <Layer>
              <Text
                text="Chapter # - Name Of Chapter"
                fontSize="30"
                align="center"
                fill="blue"
              />
              {this.state.canvasBoxPosX.map(pos => {
                return (
                  <CanvasBox
                    x={pos}
                    width={this.state.width}
                    height={this.state.height}
                  />
                );
              })}
              {this.state.images &&
                this.state.images.map((img, i) => {
                  return (
                    <ResizeCanvasImage
                      key={i}
                      image={img}
                      onClickImg={this.handleCanvasImgClick}
                    />
                  );
                })}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}
