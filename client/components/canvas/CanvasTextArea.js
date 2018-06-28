import React, {Component} from 'react'

export default class CanvasTextArea extends Component {
  handleSubmit = evt => {
    evt.preventDefault()
    console.log('submitted')
    this.props.sendTextToCanvas(evt.target.text.value)
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
          />
          <br />
          <input id="buttonForText" type="submit" value="Add" />
        </form>
      </div>
    )
  }
}
