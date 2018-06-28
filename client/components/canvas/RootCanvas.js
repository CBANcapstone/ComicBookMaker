import React, {Component} from 'react'
import {Stage, Layer, Text, Line} from 'react-konva'
import Konva from 'konva'
import SelectionBar from './SelectionBar'
import ResizeCanvasImage from './ResizeCanvasImage'
import CanvasBox from './CanvasBox'

export default class RootCanvas extends Component {
  constructor() {
    super()
    this.canvasBoxDisRatio = 3.3
    this.canvasBoxPos = 30
    this.state = {
      images: [],
      lines: [],
      text: [],
      selectedImageOnCanvas: null,
      width: window.innerWidth,
      height: window.innerHeight / 1.5,
      canvasBoxPosX: [
        this.canvasBoxPos,
        this.canvasBoxPos + 30 + window.innerWidth / this.canvasBoxDisRatio,
        this.canvasBoxPos + 60 + window.innerWidth / this.canvasBoxDisRatio * 2
      ]
    }
  }

  updateDimensions = () => {
    this.canvasBoxPos = window.innerWidth * 0.02
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight / 2,
      canvasBoxPosX: [
        this.canvasBoxPos,
        this.canvasBoxPos + 20 + window.innerWidth / this.canvasBoxDisRatio,
        this.canvasBoxPos + 40 + window.innerWidth / this.canvasBoxDisRatio * 2
      ]
    })
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.updateDimensions)
  }
  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateDimensions)
  }

  disableDraw = () => {
    this._drawAllowed = false
  }

  handleDraw = () => {
    this._drawAllowed = true
  }

  handleMouseDown = () => {
    if (this._drawAllowed) this._drawing = true
    // add line
    this.setState({
      lines: [...this.state.lines, []]
    })
  }

  handleMouseMove = e => {
    // no drawing - skipping
    if (!this._drawing) {
      return
    }
    const stage = this.stageRef.getStage()
    const point = stage.getPointerPosition()
    const {lines} = this.state

    let lastLine = lines[lines.length - 1]
    // add point
    lastLine = lastLine.concat([point.x, point.y])

    // replace last
    lines.splice(lines.length - 1, 1, lastLine)
    this.setState({
      lines: lines.concat()
    })
  }

  handleMouseUp = () => {
    this._drawing = false
  }

  handleClick = event => {
    const image = new window.Image()
    image.crossOrigin = 'Anonymous'
    image.src = event.target.src
    image.onload = () => {
      this.setState({images: [...this.state.images, image]})
    }
  }

  addTextToCanvas = text => {
    console.log('in rott-canvas, text is >>>>', text)
    // var textNode = new Konva.Text({
    //   text: text,
    //   x: 50,
    //   y: 50,
    //   fontSize: 20
    // })
    // textNode.onload = () => {
    //   this.setState({text: [...this.state.text, textNode]})
    // }
    // console.log('textnode IS >>>>', textNode)
    this.setState({text: [...this.state.text, text]})
    // console.log('STATE IS >>>>', this.state)
  }

  handleCanvasImgClick = event => {
    this._type = 'images'
    this.setState({selectedImageOnCanvas: event.target.attrs.image})
  }

  handleCanvasLineClick = event => {
    this._type = 'lines'
    this.setState({selectedImageOnCanvas: event.target.attrs.points})
  }

  handleCanvasTextClick = event => {
    this._type = 'text'
    console.log(event.target)
    this.setState({selectedImageOnCanvas: event.target.attrs.text})
  }

  handleDelete = () => {
    let arr = this.state[this._type].filter(img => {
      return img !== this.state.selectedImageOnCanvas
    })
    this.setState({[this._type]: arr})
  }

  handleClear = () => {
    this.setState({images: [], lines: [], text: []})
  }

  handleSubmit = () => {
    const picture = this.stageRef.getStage().toDataURL()
    console.log(picture)
  }

  render() {
    return (
      <div className="root-canvas">
        <div className="root-canvas-selection-bar">
          <SelectionBar
            click={this.handleClick}
            addText={this.addTextToCanvas}
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
              submit
              <img
                src="https://cdn.pixabay.com/photo/2016/03/31/14/37/check-mark-1292787_1280.png"
                height="30"
                width="30"
              />
            </button>
          </div>

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
          <Stage
            width={window.innerWidth}
            height="700"
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}
            onMouseUp={this.handleMouseUp}
            ref={node => (this.stageRef = node)}
          >
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
                    key={pos}
                    width={this.state.width}
                    height={this.state.height}
                  />
                )
              })}
              {this.state.images &&
                this.state.images.map((img, i) => {
                  return (
                    <ResizeCanvasImage
                      key={i}
                      image={img}
                      onClickImg={this.handleCanvasImgClick}
                    />
                  )
                })}
              {this.state.text &&
                this.state.text.map(txt => {
                  return (
                    <Text
                      key={txt}
                      text={txt}
                      fontSize="40"
                      align="center"
                      fill="black"
                      draggable
                      onClick={this.handleCanvasTextClick}
                    />
                  )
                })}

              {this.state.lines &&
                this.state.lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line}
                    stroke="blue"
                    onClick={this.handleCanvasLineClick}
                  />
                ))}
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
}
