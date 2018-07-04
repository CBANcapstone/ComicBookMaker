import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStoryThunk } from '../../store';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class SingleStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(imageUrl) {
    this.setState({ modalIsOpen: true, imageUrl });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  componentDidMount() {
    this.props.getStory();
  }

  render() {
    const {
      coverImgUrl,
      title,
      chapters,
      id,
      creator,
      contributors
    } = this.props.story;
    return (
      <div>
        <div className="single-story-container">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <button
              className="grid-thumbnail-btn "
              type="button"
              onClick={this.closeModal}
            >
              <span>CLOSE</span>
            </button>
            <img
              className="modal-image"
              src={this.state.imageUrl}
              alt="image"
            />
          </Modal>

          <div className="single-story-info">
            <img
              className="single-story-info-img"
              src={coverImgUrl}
              alt="cover"
            />
            <div className="single-story-info-title">
              <div>Story name: {title}</div>
              <div>Creator: {creator && creator.email}</div>
              <div>
                Contributors:{' '}
                {contributors &&
                  contributors.map(col => {
                    return <p key={col.id}>{col.email}</p>;
                  })}
              </div>
              <button type="button" className="single-story-btn">
                <Link to={`/${id}/completedChapters`}>
                  <span style={{ color: 'white' }}>View The Story</span>
                </Link>
              </button>
            </div>
          </div>
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

                        {chapter.completed ? (
                          <button
                            className="grid-thumbnail-btn "
                            type="button"
                            onClick={() => this.openModal(chapter.imageUrl)}
                          >
                            <span>VIEW</span>
                            {/* add modal to view a pic */}
                          </button>
                        ) : (
                          <Link
                            to={{
                              pathname: '/selectTemplate',
                              state: {
                                storyid: this.props.story.id,
                                chapterid: chapter.id,
                                index: i + 1,
                                title: chapter.title
                              }
                            }}
                          >
                            <button
                              className="grid-thumbnail-btn "
                              type="button"
                            >
                              <span>EDIT</span>
                            </button>
                          </Link>
                        )}
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
}

function mapState(state) {
  return {
    story: state.stories.currentStory,
    creator: state.stories.currentStory.creator
  };
}

function mapDispatch(dispatch, ownProps) {
  let storyId = ownProps.story ? ownProps.story.id : +ownProps.match.params.id;
  return {
    getStory: () => dispatch(fetchStoryThunk(storyId))
  };
}

export default connect(mapState, mapDispatch)(SingleStory);

// Button 'see completed chaps => view the story => new component
// ***extra*** edit story name / cover image => modal
