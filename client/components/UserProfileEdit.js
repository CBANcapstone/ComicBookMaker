import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { storage } from '../config/firebase';

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
  }

  componentDidMount() {
    const { name, email, photoUrl, password } = this.props.user;
    this.setState({ name, email, photoUrl, password });
  }

  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    const file = event.target.files[0];
    const storageRef = storage.ref('/user-images' + file.name);
    const uploadTask = storageRef.put(file, { contentType: file.type });
    let photoUrl = await uploadTask.snapshot.ref.getDownloadURL();
    this.setState({ photoUrl });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    axios
      .put(`/api/users/${this.props.user.id}`, this.state)
      .then(res => res.data);
    this.props.history.goBack();
  }

  render() {
    const { name, email, password } = this.state;
    return (
      <div>
        <form className="user-profile-edit" onSubmit={this.handleSubmit}>
          <h1>EDIT</h1>
          <div>
            <label>Name</label>
            <div>
              <input
                className="user-profile-edit-input"
                onChange={this.handleChange}
                value={name}
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
          </div>
          <div>
            <label>Email</label>
            <div>
              <input
                className="user-profile-edit-input"
                type="text"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                className="user-profile-edit-input"
                onChange={this.handleChange}
                name="password"
                type="text"
                value={password}
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <label>Choose your profile picture</label>
            <div>
              <input
                className="user-profile-edit-input"
                onChange={this.handleChange}
                type="file"
                name="photoUrl"
                accept="image/*"
              />
            </div>
          </div>
          <div>
            <input
              className="user-profile-edit-input"
              style={{ width: '20%' }}
              type="submit"
              value="Save Changes"
            />
          </div>
        </form>
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
