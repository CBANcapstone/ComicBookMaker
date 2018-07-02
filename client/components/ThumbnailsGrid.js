import React from 'react';

function ThumbnailsGrid(props) {
  const { list } = props;
  return (
    <div className="grid">
      <div className="grid-thumbnails-container">
        {list.length &&
          list.map(item => (
            <Thumbnail
              item={item}
              key={item.id}
              createStory={props.createStory}
            />
          ))}
      </div>
    </div>
  );
}

function Thumbnail(props) {
  const { title, coverImgUrl, description, id } = props.item;
  return (
    <div className="grid-thumbnail">
      <img className="grid-thumbnail-image" src={coverImgUrl} />
      <div className="middle">
        <div className="grid-thumbnail-title">{title}</div>
        <div className="grid-thumbnail-description">{description}</div>
        <div
          className="grid-thumbnail-btn"
          onClick={() => props.createStory(id)}
        >
          <span>Create Story</span>
        </div>
      </div>

      {/* TODO: Attach handler to create story in DB and set it to the state as selected story*/}
    </div>
  );
}

export default ThumbnailsGrid;
