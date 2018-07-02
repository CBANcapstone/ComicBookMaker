import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStoryThunk } from '../store';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

class SingleStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(imageUrl) {
    this.setState({ modalIsOpen: true, imageUrl });
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = '#f00';
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  componentDidMount() {
    this.props.getStory();
  }

  render() {
    const { coverImgUrl, title, chapters } = this.props.story;
    const { creator, contributors } = this.props;
    console.log('STATE', this.state.imageUrl);
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          {/* <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2> */}
          <button
            className="grid-thumbnail-btn "
            type="button"
            onClick={this.closeModal}
          >
            <span>CLOSE</span>
          </button>

          <img className="modal-image" src={this.state.imageUrl} alt="image" />
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

export default connect(mapState, mapDispatch)(SingleStory);

// Still load all chapter : completed and open
// If chapter is completed => pic is on background of the box and BUTTON is VIEW not EDIT
// If you click => modal with picture / fullscreen
// Button 'see completed chaps => view the story => new component
// ***extra*** edit story name / cover image => modal
