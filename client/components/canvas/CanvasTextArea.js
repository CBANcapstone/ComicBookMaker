import React, {Component} from 'react'

export default class CanvasTextArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fonts: ['Courier, monospace', 'Arial'],
      selectedFont: 'Courier, monospace'
    }
  }
  handleFontSelected = font => {
    console.log('font selected >>>>', font)
    this.setState({selectedFont: font})
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.sendTextToCanvas(evt.target.text.value, this.state.selectedFont)
    evt.target.text.value = ''
  }

  render() {
    return (
      <div id="wrapper">
        <form id="paper" method="get" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter something funny...."
            id="text"
            name="text"
            rows="4"
            style={{fontFamily: this.state.selectedFont}}
          />
          <input id="buttonForText" type="submit" value="Add" />
        </form>

        <div className="canvas-text-area-fonts">
          Font Styles
          <div className="canvas-text-area-fonts-options">
            <ul className="canvas-text-area-fonts-selection">
              {this.state.fonts &&
                this.state.fonts.map((font, idx) => {
                  return (
                    <li
                      key={idx}
                      style={{fontFamily: font}}
                      className="canvas-text-area-font-each"
                      onClick={() => this.handleFontSelected(font)}
                    >
                      Text
                    </li>
                  )
                })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

/*



*/
