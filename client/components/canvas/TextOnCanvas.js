import React, { Component } from 'react';
import { Text } from 'react-konva';
import Konva from 'konva';

export default class TextOnCanvas extends Component {
  constructor(props) {
    super(props);
    this.tr;
    this.layer2 = new Konva.Layer();
  }
  //attaching transformer on Text
  transformShow = e => {
    this.props.handleCanvasTextClick(this.props.currText);
    let stage = e.target.getStage();
    stage.add(this.layer2);
    this.tr = new Konva.Transformer();
    this.layer2.add(this.tr);
    this.tr.attachTo(e.target);
    this.layer2.draw();
    this.props.handleCanvasTextClick(this.props.currText, this.tr, this.layer2);
  };
  // redraw transformer when mouse drags the text
  dragMove = e => {
    this.layer2.draw();
  };
  // remove transformer on doubleClick
  transformHide = e => {
    this.tr.destroy();
    this.layer2.destroy();
  };
  // redraw Text on transform
  handleTransform = e => {
    let textLayer = e.target.getLayer();
    textLayer.draw();
  };
  render() {
    return (
      <Text
        text={this.props.currText}
        onDragMove={this.dragMove}
        onClick={this.transformShow}
        onDblClick={this.transformHide}
        fontSize="40"
        fontFamily={this.props.font}
        align="center"
        fill="black"
        draggable
        onTransform={this.handleTransform}
      />
    );
  }
}
