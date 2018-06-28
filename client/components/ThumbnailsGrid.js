import React from 'react'




function ThumbnailsGrid(props) {
  const {list} = props
  return (
    <div className="grid">
      <h1 className="grid-header">Templates</h1>
      <div className="grid-thumbnails-container">
        {list.length &&
          list.map(item => <Thumbnail item={item} key={item.id} createStory={props.createStory} />)}
      </div>
    </div>
  )
}

function Thumbnail(props) {
  const {title, coverImgUrl, description, id} = props.item
  return (
    <div className="grid-thumbnail">
      <div className="grid-thumbnail-title">{title}</div>
      <img className="grid-thumbnail-image" src={coverImgUrl} />
      <div className="grid-thumbnail-description">{description}</div>
      <div className="grid-thumbnail-btn" onClick={() => props.createStory(id)}>
        Create Story
      </div>
      {/* TODO: Attach handler to create story in DB and set it to the state as selected story*/}
    </div>
  )
}

export default ThumbnailsGrid
