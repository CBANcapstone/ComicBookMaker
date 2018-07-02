import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStoryThunk } from '../store';

function SingleStory(props) {
  const { coverImgUrl, title, chapters } = props.story;
  return (
    <div>
      <div className="single-story-info">
        <img className="single-story-info-img" src={coverImgUrl} alt="cover" />
        <div className="single-story-info-title">
          <div>Story name: {title}</div>
          <div>Creator: {props.creator && props.creator.email}</div>
          <div>
            Contributors:{' '}
            {props.contributors &&
              props.contributors.map(col => {
                return <p key={col.id}>{col.email}</p>;
              })}
          </div>
          <button type="button" className="single-story-btn">
            <span>See completed chapters</span>
          </button>
        </div>
      </div>
      <div className="single-story-container">
        <div className="single-story-chapters">
          <h3 className="center-item-heading">
            Select the Chapter You Want To Create
          </h3>
          <ol>
            {chapters &&
              chapters.map((chapter, i) => {
                return (
                  <li key={chapter.id} className="single-story-thumbnail">

                    <div className="single-story-thumbnail-info">
                      <h3 className="center-item">{chapter.title}</h3>
                      <Link
                        to={{
                          pathname: '/selectTemplate',
                          state: {
                            storyid: props.story.id,
                            chapterid: chapter.id,
                            index: i + 1,
                            title: chapter.title
                          }
                        }}
                      >
                        <button className="grid-thumbnail-btn " type="button">
                          <span>EDIT</span>
                        </button>
                      </Link>
                    </div>
                    
                    {chapter.completed ? (
                      <img
                        src={chapter.imageUrl}
                        alt="chapter-image"
                        className="single-story-thumbnail-img"
                      />
                    ) : (
                      '' // null
                    )}
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    </div>
  );
}

class SingleStoryContainer extends Component {
  componentDidMount() {
    this.props.getStory();
  }

  render() {
    return (
      <SingleStory
        story={this.props.story}
        creator={this.props.creator}
        contributors={this.props.contributors}
      />
    );
  }
}

function mapState(state) {
  return {
    story: state.story,
    creator:
      state.story.users &&
      state.story.users.filter(user => user.user_role.role == 'creator')[0],
    contributors:
      state.story.users &&
      state.story.users.filter(user => user.user_role.role == 'contributor')
  };
}

function mapDispatch(dispatch, ownProps) {
  let storyId = ownProps.story ? ownProps.story.id : +ownProps.match.params.id;
  return {
    getStory: () => dispatch(fetchStoryThunk(storyId))
  };
}

export default connect(mapState, mapDispatch)(SingleStoryContainer);

// Still load all chapter : completed and open
// If chapter is completed => pic is on background of the box and BUTTON is VIEW not EDIT
// If you click => modal with picture / fullscreen
// Button 'see completed chaps => view the story => new component
// ***extra*** edit story name / cover image => modal
