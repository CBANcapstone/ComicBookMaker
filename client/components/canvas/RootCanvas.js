import React, { Component } from 'react';
import { Stage, Layer, Text, Line } from 'react-konva';
// import Konva from 'konva'
import SelectionBar from './SelectionBar';
import ResizeCanvasImage from './ResizeCanvasImage';
import CanvasBox from './CanvasBox';
import TextOnCanvas from './TextOnCanvas';
import axios from 'axios';
import history from '../../history';
import { storage } from '../../config/firebase';

export default class RootCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasBoxDisRatio = 3.3;
    this.canvasBoxPos = 30;
    this.state = {
      chapter: {},
      images: [],
      lines: [],
      text: [],
      font: [],
      canvasBackground: this.props.background || '',
      selectedImageOnCanvas: null,
      numOfBox: this.props.number,
      canvasBoxPosX: [],
      canvasBoxPosY: []
    };
  }

  componentDidMount = async () => {
    let { id, chid } = this.props.match.params;
    let res = await axios.get(`/api/stories/${id}/${chid}`);
    this.setState({ chapter: res.data });

    if (this.props.number === 1) {
      this.setState({
        canvasBoxPosX: ['30'],
        canvasBoxPosY: ['140'],
        numOfBox: '1'
      });
    } else if (this.props.number === 2) {
      this.setState({
        canvasBoxPosX: ['40', '720'],
        canvasBoxPosY: ['140', '140'],
        numOfBox: '2'
      });
    } else if (this.props.number === 3) {
      this.setState({
        canvasBoxPosX: ['30', '496', '962'],
        canvasBoxPosY: ['140', '140', '140'],
        numOfBox: '3'
      });
    } else {
      this.setState({
        canvasBoxPosX: ['100', '720', '35', '740'],
        canvasBoxPosY: ['140', '120', '350', '450'],
        numOfBox: '4'
      });
    }
  };

  disableDraw = () => {
    this._drawAllowed = false;
  };

  handleDraw = () => {
    this._drawAllowed = true;
  };

  handleMouseDown = () => {
    if (this._drawAllowed) this._drawing = true;
    // add line
    this.setState({
      lines: [...this.state.lines, []]
    });
  };

  handleMouseMove = () => {
    // no drawing - skipping
    if (!this._drawing) {
      return;
    }
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    const { lines } = this.state;

    let lastLine = lines[lines.length - 1];
    // add point
    lastLine = lastLine.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    this.setState({
      lines: lines.concat()
    });
  };

  handleMouseUp = () => {
    this._drawing = false;
  };

  handleClick = event => {
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = event.target.src;
    image.height = '457';
    image.width = '432';
    image.onload = () => {
      this.setState({ images: [...this.state.images, image] });
    };
  };

  addBackgroundToCanvas = background => {
    this.setState({ canvasBackground: background });
  };

  addTextToCanvas = (text, font) => {
    this.setState({
      text: [...this.state.text, text],
      font: [...this.state.font, font]
    });
  };

  handleCanvasImgClick = event => {
    this._type = 'images';
    this.setState({ selectedImageOnCanvas: event.target.attrs.image });
  };

  handleCanvasLineClick = event => {
    this._type = 'lines';
    this.setState({ selectedImageOnCanvas: event.target.attrs.points });
  };

  handleCanvasTextClick = event => {
    this._type = 'text';
    this.setState({ selectedImageOnCanvas: event.target.attrs.text });
  };

  handleDelete = () => {
    let arr = this.state[this._type].filter(img => {
      return img !== this.state.selectedImageOnCanvas;
    });
    this.setState({ [this._type]: arr });
  };

  handleClear = () => {
    this.setState({ images: [], lines: [], text: [] });
  };

  handleSubmit = async () => {
    const picture = this.stageRef
      .getStage()
      .toDataURL()
      .slice(22);

    var imagesRef = storage.ref().child('saved2.png');

    await imagesRef.putString(picture, 'base64');
    let url = await imagesRef.getDownloadURL();
    console.log('Uploaded a blob or file!', url);
    await axios.post(`/api/stories/chapter/${this.props.match.params.chid}`, {
      url
    });
    history.push(`/stories/${this.props.match.params.id}`);
    // after user is done =>
    // save it under the chapter in DB and redirect to STORY main screen
  };

  render() {
    console.log('CANVAS', this.props);
    return (
      <div className="root-canvas">
        <div className="root-canvas-selection-bar">
          <SelectionBar
            click={this.handleClick}
            addText={this.addTextToCanvas}
            addCanvasBackground={this.addBackgroundToCanvas}
          />
        </div>
        <div className="root-canvas-buttons">
          <div className="root-canvas-move-image">
            <button type="button" onClick={this.disableDraw}>
              MOVE
              <img
                src="https://cdn1.iconfinder.com/data/icons/web-interface-part-1/32/arrows-outside-2-512.png"
                height="30"
                width="30"
              />
            </button>
          </div>

          <div className="root-canvas-draw-line">
            <button type="button" onClick={this.handleDraw}>
              DRAW
              <img
                src="https://cdn1.iconfinder.com/data/icons/fs-icons-ubuntu-by-franksouza-/512/draw-freehand.png"
                height="30"
                width="30"
              />
            </button>
          </div>

          <div className="root-canvas-submit-image">
            <button type="button" onClick={this.handleSubmit}>
              SUBMIT
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png"
                height="30"
                width="30"
              />
            </button>
          </div>

          <div className="root-canvas-delete-image">
            <button type="button" onClick={this.handleDelete}>
              DELETE
              <img
                src="https://cdn3.iconfinder.com/data/icons/in-and-around-the-house/43/trash_bin-512.png"
                height="30"
                width="30"
              />
            </button>
          </div>
          <div className="root-canvas-clear-canvas">
            <button type="button" onClick={this.handleClear}>
              CLEAR
              <img
                src="https://static1.squarespace.com/static/5737ad2a1d07c093e2787063/5ab80fd503ce64c499d79d16/5ab810f3562fa7d514189228/1522012404191/Clear+icon.png?format=300w"
                height="30"
                width="30"
              />
            </button>
          </div>
        </div>
        <div
          className="root-canvas-info"
          style={{
            backgroundImage: 'url(' + `${this.state.canvasBackground}` + ')'
          }}
        >
          <Stage
            width={window.innerWidth}
            height="700"
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            onClick={this.clickOnStage}
            ref={node => (this.stageRef = node)}
          >
            <Layer>
              <Text
                text={`Chapter ${this.props.match.params.chorder} - ${this.state
                  .chapter && this.state.chapter.title}`}
                fontSize="40"
                fontFamily="Bangers"
                shadowColor="black"
                align="center"
                fill="white"
                x={window.innerWidth / 3.1}
                y="10"
              />
              {this.state.canvasBoxPosX.map((pos, index) => {
                return (
                  <CanvasBox
                    number={this.state.numOfBox}
                    x={pos}
                    y={this.state.canvasBoxPosY[index]}
                    boxNum={index + 1}
                    key={pos}
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
              {this.state.text &&
                this.state.text.map((txt, fontIdx) => {
                  return (
                    <TextOnCanvas
                      key={txt}
                      handleCanvasTextClick={this.handleCanvasTextClick}
                      currText={txt}
                      font={this.state.font[fontIdx]}
                    />
                  );
                })}

              {this.state.lines &&
                this.state.lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line}
                    stroke="black"
                    onClick={this.handleCanvasLineClick}
                  />
                ))}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}
