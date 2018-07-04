import React, { Component } from 'react';
import { backgroundsArr } from '../../initialData';
import { Link } from 'react-router-dom';
import {
  HighlightTemplate,
  HighlightBackground
} from './SelectTemplateHighlight';

export default class SelectTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfBox: null,
      templates: [
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.52.56%20PM.png?alt=media&token=d75ed7ba-66d3-4b76-9983-5d06610753ef',
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.52.34%20PM.png?alt=media&token=05e208bd-714c-40cd-ad3e-49345e8a76f0',
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.52.14%20PM.png?alt=media&token=1465a7a7-8571-49a9-8d5c-f5058173dd00',
        'https://firebasestorage.googleapis.com/v0/b/exquisite-comics.appspot.com/o/CanvasTemplates%2FScreen%20Shot%202018-06-28%20at%2011.51.43%20PM.png?alt=media&token=f4ae4564-0c6e-499b-91f1-217705cf90ff'
      ],
      backgrounds: backgroundsArr,
      backgroundSelected: null,
      goToCanvas: false
    };
  }
  handleTemplate = templateNum => {
    this.setState({ numOfBox: templateNum });
    if (this.state.backgroundSelected) this.setState({ goToCanvas: true });
  };
  handleBackground = evt => {
    this.setState({ backgroundSelected: evt.target.src });
    if (this.state.numOfBox) this.setState({ goToCanvas: true });
  };
  selectionMade = () => {
    if (this.state.backgroundSelected) this.setState({ goToCanvas: true });
  };
  render() {
    //Function calls to handle selction of template & background
    HighlightTemplate();
    HighlightBackground();
    let nameOfActiveClassTemplate, nameOfActiveClassBackground;
    return (
      <div>
        <h1
          style={{
            textAlign: 'center',
            color: '#325e78',
            fontFamily: 'Luckiest Guy',
            fontSize: '3em',
            padding: '0 2em'
          }}
        >
          Select a Layout and Background for the Chapter & then Click Next
        </h1>
        <div className="template-select-and-next">
          <h2
            style={{
              fontFamily: 'Bungee Inline',
              fontSize: '2em',
              color: '#325e78'
            }}
          >
            Click a Layout to Select it
          </h2>
          {/* Display Next Button only when BOTH background & template are selected */}
          {!this.state.goToCanvas ? null : (
            <div>
              <Link
                to={{
                  pathname: `/stories/${this.props.location.state.storyid}/${
                    this.props.location.state.chapterid
                  }/${this.props.location.state.index}`,
                  state: {
                    number: this.state.numOfBox,
                    background: this.state.backgroundSelected,
                    title: this.props.location.state.title,
                    chapNum: this.props.location.state.index
                  }
                }}
              >
                <button
                  type="button"
                  onClick={this.selectionMade}
                  className="single-story-btn"
                  style={{
                    padding: '0.8em 0',
                    fontSize: '1.5em',
                    marginLeft: '13em'
                  }}
                >
                  <span>Next</span>
                </button>
              </Link>
            </div>
          )}
        </div>
        <div id="myDIV" className="template-for-story">
          {this.state.templates &&
            this.state.templates.map((template, idx) => {
              {
                !idx
                  ? (nameOfActiveClassTemplate = 'template-selected active')
                  : (nameOfActiveClassTemplate = 'template-selected');
              }
              return (
                <div
                  className={nameOfActiveClassTemplate || 'template-selected'}
                  key={idx}
                  onClick={() => this.handleTemplate(idx + 1)}
                  style={{ marginLeft: '5em' }}
                >
                  <img src={template} width="200" height="100" />
                </div>
              );
            })}
        </div>
        <h2
          style={{
            fontFamily: 'Bungee Inline',
            fontSize: '2em',
            color: '#325e78',
            padding: '0 1em'
          }}
        >
          Click a Background to Select it
        </h2>
        <div className="backgrounds-for-canvas">
          {this.state.backgrounds &&
            this.state.backgrounds.map((back, idx) => {
              {
                !idx
                  ? (nameOfActiveClassBackground =
                      'background-selected activeB')
                  : (nameOfActiveClassBackground = 'background-selected');
              }
              return (
                <div
                  className={
                    nameOfActiveClassBackground || 'background-selected'
                  }
                  key={idx}
                  onClick={this.handleBackground}
                  style={{ marginLeft: '5em' }}
                >
                  <img src={back} width="200" height="100" />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
