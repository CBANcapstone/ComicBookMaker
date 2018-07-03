import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UnitStory extends Component {
  
  render() {
    console.log('UNIT',this.props.story)
    const { coverImgUrl, title, contributors, creator, id } = this.props.story;
    return (
      <div className="single-story-info">
        <img className="single-story-info-img" src={coverImgUrl} alt="cover" />

        <div className="single-story-info-title">
          <div>Story name: {title}</div>
          <div>Creator: {creator.name}</div> 
          <div>
            CONTRIBUTORS:  
            {!contributors.length ? ' No contributors yet' :
              contributors.map((contr, i) => {
                return <p key={i}>{contr.email}</p>;
              })}
          </div>
          <div type="button" className="single-story-btn">
            <Link to={`/stories/${id}`}>
              <span style={{ color: 'white' }}> Go to Story</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
