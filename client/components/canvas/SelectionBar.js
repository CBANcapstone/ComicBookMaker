import React, {Component} from 'react'
import Category from './Category'
import ImageOptions from './ImageOptions'
import CanvasTextArea from './CanvasTextArea'
import {backgroundsArr, charactersArr, bubblesArr} from '../../initialData'
// import '../../styles/SelectionBar.css';
export default class SelectionBar extends Component {
  constructor() {
    super()
    this.categories = ['background', 'characters', 'textbubbles', 'custom-text']
    this.images = {
      background: backgroundsArr,
      characters: charactersArr,
      textbubbles: bubblesArr
    }
    this.state = {
      sampleCategory: null
    }
  }
  handleClick = event => {
    let isHidden = this.state.sampleCategory === event.target.id ? null : event.target.id
    this.setState({sampleCategory : isHidden})
  }

  render() {
    return (
      <div className="root-canvas-selection-bar-component">
        <div className="root-canvas-selection-bar-component-category">
          {this.categories &&
            this.categories.map(cat => {
              return (
                <Category key={cat} category={cat} onClick={this.handleClick} />
              )
            })}
        </div>
        <div className="root-canvas-selection-bar-component-images">
          {this.state.sampleCategory === 'custom-text' ? (
            <CanvasTextArea sendTextToCanvas={this.props.addText} />
          ) : (
            this.state.sampleCategory &&
            this.images[this.state.sampleCategory].map((img, i) => {
              return <ImageOptions key={i} src={img} click={this.props.click} />
            })
          )}
        </div>
      </div>
    )
  }
}
