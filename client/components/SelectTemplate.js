import React, {Component} from 'react'
import {backgroundsArr} from '../initialData'
import RootCanvas from './canvas/RootCanvas'

export default class SelectTemplate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      numOfBox: '1',
      templates: [
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.52.56%20PM.png?alt=media&token=d75ed7ba-66d3-4b76-9983-5d06610753ef',
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.52.34%20PM.png?alt=media&token=05e208bd-714c-40cd-ad3e-49345e8a76f0',
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.52.14%20PM.png?alt=media&token=1465a7a7-8571-49a9-8d5c-f5058173dd00',
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.51.43%20PM.png?alt=media&token=f4ae4564-0c6e-499b-91f1-217705cf90ff'
      ],
      backgrounds: backgroundsArr,
      backgroundSelected: null,
      goToCanvas: false
    }
  }
  handleTemplate = templateNum => {
    this.setState({numOfBox: templateNum})
  }
  handleBackground = evt => {
    this.setState({backgroundSelected: evt.target.src})
  }
  selectionMade = () => {
    if (this.state.backgroundSelected) this.setState({goToCanvas: true})
  }
  render() {
    return this.state.goToCanvas ? (
      <RootCanvas
        number={this.state.numOfBox}
        background={this.state.backgroundSelected}
      />
    ) : (
      <div>
        <h1>Select a Template</h1>
        <div className="template-for-story">
          {this.state.templates &&
            this.state.templates.map((template, idx) => {
              return (
                <div
                  className="template-selected"
                  key={idx}
                  onClick={() => this.handleTemplate(idx + 1)}
                >
                  <img src={template} width="400" height="300" />
                </div>
              )
            })}
        </div>
        <h1>Select a Background</h1>
        <div className="backgrounds-for-canvas">
          {this.state.backgrounds &&
            this.state.backgrounds.map((back, idx) => {
              return (
                <div
                  className="background-selected"
                  key={idx}
                  onClick={this.handleBackground}
                >
                  <img src={back} width="400" height="300" />
                </div>
              )
            })}
        </div>
        <div>
          <button
            type="button"
            onClick={this.selectionMade}
            className="template-select-button"
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}
