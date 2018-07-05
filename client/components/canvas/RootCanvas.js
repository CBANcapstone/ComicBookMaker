import React, { Component } from 'react';
import { Stage, Layer, Text, Line, Image } from 'react-konva';
import Konva from 'konva';
import SelectionBar from './SelectionBar';
import ResizeCanvasImage from './ResizeCanvasImage';
import CanvasBox from './CanvasBox';
import TextOnCanvas from './TextOnCanvas';
import { HighlightButton } from '../Templates/SelectTemplateHighlight';
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
      canvasBackground: '',
      selectedImageOnCanvas: null,
      numOfBox: this.props.location.state.number,
      canvasBoxPosX: [],
      canvasBoxPosY: []
    };
  }

  componentDidMount = () => {
    let image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.props.location.state.background;
    image.onload = () => {
      this.setState({ canvasBackground: image });
    };

    if (this.props.location.state.number === 1) {
      this.setState({
        canvasBoxPosX: ['30'],
        canvasBoxPosY: ['140'],
        numOfBox: '1'
      });
    } else if (this.props.location.state.number === 2) {
      this.setState({
        canvasBoxPosX: ['40', '720'],
        canvasBoxPosY: ['140', '140'],
        numOfBox: '2'
      });
    } else if (this.props.location.state.number === 3) {
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

  //stores Image on state for canvas
  handleClick = event => {
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = event.target.src;
    image.height = '170';
    image.width = '150';
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

  handleCanvasTextClick = (eventText, transformer, currLayer) => {
    this._transformer = transformer;
    this._layerofTransformer = currLayer;
    this._type = 'text';
    this.setState({ selectedImageOnCanvas: eventText });
  };

  handleDelete = () => {
    this._transformer = this._transformer || new Konva.Transformer();
    this._layerofTransformer = this._layerofTransformer || new Konva.Layer();
    let arr =
      this.state[this._type] &&
      this.state[this._type].map(img => {
        if (img !== this.state.selectedImageOnCanvas) {
          return img;
        }
      });
    // deleting the transformers
    this._transformer.destroy();
    this._layerofTransformer.destroy();
    this.setState({ [this._type]: arr });
  };

  handleClear = () => {
    this.setState({ images: [], lines: [], text: [] });
  };

  handleDownload = () => {
    var button = document.getElementById('btn-download');
    let canvas = this.stageRef.getStage();
    var dataURL = canvas.toDataURL('image/png');
    button.href = dataURL;
  };

  handleSubmit = async () => {
    const picture = this.stageRef
      .getStage()
      .toDataURL()
      .slice(22);
    const { id, chid } = this.props.match.params;
    var imagesRef = storage.ref().child(`storyID_${id}chapterID_${chid}.png`);
    await imagesRef.putString(picture, 'base64');
    let url = await imagesRef.getDownloadURL();
    await axios.post(`/api/stories/chapter/${chid}`, {
      url
    });
    history.push(`/stories/${id}`);
  };

  render() {
    HighlightButton();
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
            <div className="tooltip">
              <button
                type="button"
                className="btn-canvas active-btn"
                onClick={this.disableDraw}
              >
                MOVE
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/Canvas%20Editing%20Buttons%20Images%2Fmove.png?alt=media&token=f06c0ca6-8604-44d0-84c7-96dea64d9f56"
                  height="30"
                  width="30"
                />
              </button>
              <span className="tooltiptext-btn">
                Click to Move Stickers around
              </span>
            </div>
          </div>

          <div className="root-canvas-draw-line">
            <div className="tooltip">
              <button
                type="button"
                className="btn-canvas"
                onClick={this.handleDraw}
              >
                DRAW
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/Canvas%20Editing%20Buttons%20Images%2Fdraw.png?alt=media&token=b90dd983-7ecd-4fdc-b979-38cc8aa5a544"
                  height="30"
                  width="30"
                />
              </button>
              <span className="tooltiptext-btn">Click to Draw</span>
            </div>
          </div>

          <div className="root-canvas-submit-image">
            <div className="tooltip">
              <button
                type="button"
                className="btn-canvas"
                onClick={this.handleSubmit}
              >
                SUBMIT
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/Canvas%20Editing%20Buttons%20Images%2Fsubmit.png?alt=media&token=b03c1a37-0ce6-4aa8-bb50-dfa8f50c063f"
                  height="30"
                  width="30"
                />
              </button>

              <span className="tooltiptext-btn">
                Click to submit your Comic Strip
              </span>
            </div>
          </div>

          <div className="root-canvas-delete-image">
            <div className="tooltip">
              <button
                type="button"
                className="btn-canvas"
                onClick={this.handleDelete}
              >
                DELETE
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/Canvas%20Editing%20Buttons%20Images%2Fdelete.png?alt=media&token=f78d08e1-c750-4252-8466-401c93f9f0a0"
                  height="30"
                  width="30"
                />
              </button>
              <span className="tooltiptext-btn">
                click on a sticker/ text/ drawing and then click this button to
                delete
              </span>
            </div>
          </div>
          <div className="root-canvas-clear-canvas">
            <div className="tooltip">
              <button
                type="button"
                className="btn-canvas"
                onClick={this.handleClear}
              >
                CLEAR
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/Canvas%20Editing%20Buttons%20Images%2Fclear.png?alt=media&token=23ebcc4c-1f3a-4ab3-b1df-759ab6bc96a0"
                  height="30"
                  width="30"
                />
              </button>
              <span className="tooltiptext-btn">
                Click to get a clean comic strip
              </span>
            </div>
          </div>
          <div className="root-canvas-download-canvas">
            <div className="tooltip">
              <button type="button" className="btn-canvas">
                <a
                  href="#"
                  className="button"
                  id="btn-download"
                  download="my-file-name.png"
                  onClick={this.handleDownload}
                >
                  DOWNLOAD
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/Canvas%20Editing%20Buttons%20Images%2Fdownload.png?alt=media&token=a9954bcd-5a10-4536-b2fc-894da04b319c"
                    height="30"
                    width="30"
                  />
                </a>
              </button>
              <span className="tooltiptext-btn">
                Click to download your comic strip
              </span>
            </div>
          </div>
        </div>
        <div className="root-canvas-info">
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
              <Image
                image={this.state.canvasBackground}
                width={window.innerWidth}
                height="700"
              />
              <Text
                fontFamily="Bangers"
                text={`Chapter ${this.props.location.state.chapNum}, ${
                  this.props.location.state.title
                }`}
                fontSize="50"
                shadowColor="black"
                align="center"
                fill="white"
                x={window.innerWidth / 6}
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
                      key={fontIdx}
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
