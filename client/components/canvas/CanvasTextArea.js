import React, { Component } from 'react';

export default class CanvasTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fonts: [
        'Courier, monospace',
        'Times New Roman',
        'Alfa Slab One',
        'Changa One',
        'Dancing Script',
        'Bangers',
        'Eater',
        'Galada',
        'Handlee',
        'IM Fell English SC',
        'Indie Flower',
        'Lobster',
        'Luckiest Guy',
        'Merienda',
        'Monoton',
        'Pacifico',
        'Permanent Marker',
        'Rock Salt',
        'Shadows Into Light',
        'Shrikhand',
        'Spirax',
        'Ultra',
        'Bowlby One SC',
        'Bungee',
        'Bungee Inline',
        'Ceviche One',
        'Coiny',
        'Fugaz One',
        'Marko One',
        'Ribeye Marrow',
        'Wendy One'
      ],
      selectedFont: 'Courier, monospace'
    };
  }
  handleFontSelected = font => {
    this.setState({ selectedFont: font });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.sendTextToCanvas(evt.target.text.value, this.state.selectedFont);
    evt.target.text.value = '';
  };

  render() {
    return (
      <div id="wrapper">
        <div className="canvas-add-text">
          <h1
            style={{
              textAlign: 'center',
              fontFamily: 'Luckiest Guy',
              color: '#325e78'
            }}
          >
            Add some text, select a font, and click next to put text to comic
          </h1>
          <form id="paper" method="get" onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Enter something funny...."
              id="text"
              name="text"
              rows="4"
              style={{ fontFamily: this.state.selectedFont }}
            />

            <button className="grid-thumbnail-btn " type="submit" value="Add">
              <span>Add Text</span>
            </button>
          </form>
        </div>
        <div
          style={{
            fontSize: '2em',
            padding: '0 1em',
            fontFamily: 'Luckiest Guy',
            color: '#325e78'
          }}
        >
          Select A Font Style
        </div>
        <div className="canvas-text-area-fonts">
          <br />
          <div className="canvas-text-area-fonts-options">
            <ul className="canvas-text-area-fonts-selection">
              {this.state.fonts &&
                this.state.fonts.map((font, idx) => {
                  return (
                    <li
                      key={idx}
                      style={{ fontFamily: font }}
                      className="canvas-text-area-font-each"
                      onClick={() => this.handleFontSelected(font)}
                    >
                      Text
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

/*



*/
