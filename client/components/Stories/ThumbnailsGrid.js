import React from 'react';
import { Link } from 'react-router-dom';

function ThumbnailsGrid(props) {
  const { list, profile } = props;
  return (
    <div className="grid">
      <div className="grid-thumbnails-container">
        {!!list.length &&
          list.map(item => (
            <Thumbnail
              item={item}
              key={item.id}
              createStory={props.createStory}
              profile={profile}
            />
          ))}
      </div>
    </div>
  );
}

function Thumbnail(props) {
  // profile tells that the component is being rendered in User Profile
  const { profile } = props;
  const { title, coverImgUrl, description, id } = props.item;
  return (
    <div className="grid-thumbnail">
      <img className="grid-thumbnail-image" src={coverImgUrl} />
      <div className="middle">
        <div className="grid-thumbnail-title">{title}</div>
        <div className="grid-thumbnail-description">{description}</div>
        {profile ? (
          <Link to={`/stories/${id}`}>
          <div className="grid-thumbnail-btn">
            <span>Go to Story</span>
          </div>
          </Link>
        ) : (
          <div
            className="grid-thumbnail-btn"
            onClick={() => props.createStory(id)}
          >
            <span>Create Story</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ThumbnailsGrid;
