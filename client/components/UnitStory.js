import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class extends Component {
  render() {
    const story = this.props.story;
    const { coverImgUrl, title, chapters } = story;
    return(
        <div className="single-story-info">
          <Link to={`/stories/${story.id}`}>
            <img className="single-story-info-img" src={coverImgUrl} alt="cover" />
          </Link>
          <div className="single-story-info-title">
            <div>Story name: {title}</div>
            <div>Creator: {story.users[0] && story.users[0].email}</div>
            <div>
              {story.users &&
                story.users.map(col => {
                return <p key={col.id}>{col.email}</p>;
              })}
            </div>
            <div className="single-story-btn">
              <Link to={`/${story.id}/completedChapters`}>
                See completed chapters
              </Link>
            </div>
          <button type="button" className="single-story-btn">
            <span>See completed chapters</span>
          </button>
        </div>
      </div>
    );
  }
}
