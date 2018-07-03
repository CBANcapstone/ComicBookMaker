import React from 'react';
import history from '../history';

function ThumbnailsGrid(props) {
  // profile tells that the component is being rendered in User Profile
  const { list, profile } = props;
  return (
    <div className="grid">
      {profile ? (
        <h1 className="grid-header">Stories</h1>
      ) : (
        <h1 className="grid-header">Select a Theme for Your Comic</h1>
      )}
      <div className="grid-thumbnails-container">
        {list.length &&
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
  const goToStory = id => {
    history.push(`/stories/${id}`);
  };
  const { profile } = props;
  const { title, coverImgUrl, description, id } = props.item;
  return (
    <div className="grid-thumbnail">
      <img className="grid-thumbnail-image" src={coverImgUrl} />
      <div className="middle">
        <div className="grid-thumbnail-title">{title}</div>
        <div className="grid-thumbnail-description">{description}</div>
        {profile ? (
          <div className="grid-thumbnail-btn" onClick={() => goToStory(id)}>
            <span>Go to Story</span>
          </div>
        ) : (
          <div
            className="grid-thumbnail-btn"
            onClick={() => props.createStory(id)}
          >
            <span>Create Story</span>
          </div>
        )}
      </div>

      {/* TODO: Attach handler to create story in DB and set it to the state as selected story*/}
    </div>
  );
}

export default ThumbnailsGrid;
