import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { storage } from '../../config/firebase';
import history from '../../history';

class UserProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: '',
      photoUrl: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this)
  }

  componentDidMount() {
    const { name, email, photoUrl, password } = this.props.user;
    this.setState({ name, email, photoUrl, password });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleUpload(event) {
    const file = event.target.files[0];
    const storageRef = storage.ref('/user-images' + file.name);
    const uploadTask = await storageRef.put(file, { contentType: file.type });
    let photoUrl = await uploadTask.ref.getDownloadURL();
    this.setState({ photoUrl }); 
  }

  handleSubmit(evt) {
    evt.preventDefault();
    axios
      .put(`/api/users/`, this.state)
      .then(res => history.push('/user-profile'))
      .catch(err => console.error(err))
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div className="container" style={{ height: '100vh', marginTop: '0' , display: 'flex'}}>
        <div className="body-div">
          <form
            id="form"
            className="user-profile-edit"
            onSubmit={this.handleSubmit}
          >
            <h1 id="message">EDIT</h1>

            <small id="smallMessage" />
            <div className="input-box-type">
              <h3>Name</h3>
              <div className="field">
                <input
                  className="user-profile-edit-input"
                  onChange={this.handleChange}
                  value={name}
                  // type="text"
                  name="name"
                  placeholder="Name"
                  style={{ width: '15em' }}
                />
                <label htmlFor="name">Name</label>
              </div>
            </div>
            <div className="input-box-type">
              <h3>Email</h3>
              <div className="field">
                <input
                  className="user-profile-edit-input"
                  // type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.handleChange}
                  placeholder="Email"
                  style={{ width: '15em' }}
                />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="input-box-type">
              <h3>Password</h3>
              <div className="field">
                <input
                  className="user-profile-edit-input"
                  onChange={this.handleChange}
                  name="password"
                  type="text"
                  value={password}
                  placeholder="Password"
                  style={{ width: '15em' }}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="input-box-type">
              <h3>Choose your profile picture</h3>
              <div className="field">
                <input
                  className="user-profile-edit-input"
                  onChange={this.handleUpload}
                  type="file"
                  accept="image/*"
                  style={{ width: '15em' }}
                />
                <label htmlFor="password">Choose your profile picture</label>
              </div>
            </div>

            <div className="input-box-type">
              <div className="field">
                <input
                  className="user-profile-edit-input"
                  type="submit"
                  value="Save Changes"
                  style={{ width: '15em' }}
                />
                <label htmlFor="password">Upload Profile Picture</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    user: state.user
  };
}

export default connect(mapState)(UserProfileEdit);
