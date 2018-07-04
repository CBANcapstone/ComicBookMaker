import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class UnitStory extends Component {
  render() {
    const story = this.props.story;
    const { coverImgUrl, title, chapters } = story;
    return (
      <div className="single-story-info-unit">
        <img
          className="single-story-info-img"
          src={coverImgUrl}
          alt="cover"
          width="40%"
          height="50%"
        />

        <div className="single-story-info-title">
          <div>Story name: {title}</div>
          <div>Creator: {story.users[0] && story.users[0].email}</div>
          <div>
            {story.users &&
              story.users.map(col => {
                return <p key={col.id}>{col.email}</p>;
              })}
          </div>
          <div type="button" className="single-story-btn">
            <Link to={`/stories/${story.id}`}>
              <span style={{ color: 'white' }}> Go to Story</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
