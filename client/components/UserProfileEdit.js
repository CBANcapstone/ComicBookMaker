import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import firebase from 'firebase';

class UserProfileEdit extends Component {
  //  const { name, email, photoUrl } = props.user;
  constructor(){
    super()
    this.state = {
      name: '',
      password: '',
      email: '',
      photoUrl: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event) {
    // console.log(event.target.files[0])
    this.setState({ [event.target.name]: event.target.value,
     });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('state>>>',this.state);
     axios.put(`/api/users/${this.props.user.id}`, this.state).then(res => res.data);
    this.props.history.goBack();
  }

render(){
  const { name, email, photoUrl, password } = this.props.user;
  return (
    <div>
      <form className="user-profile-edit"
      onSubmit={this.handleSubmit}
      >
        <h1>EDIT</h1>
        <div>
          <label>Name</label>
          <div>
            <input className="user-profile-edit-input"
            onChange={this.handleChange}
            value={this.state.name}
            name='name'
            placeholder="Name" />
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input className="user-profile-edit-input"
            name='email'
            value={email}
            onChange={this.handleChange}
            placeholder="Email" />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input className="user-profile-edit-input"
            onChange={this.handleChange}
            name='password'
            value={password}
            placeholder="Password" />
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
        <div >
            <input
              className="user-profile-edit-input"
              style={{ width: '20%'}}
              value={photoUrl}
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
    user: state.user,
  };
}

// function mapDispatch(dispatch) {
//   return {
//     getUserStories: id => dispatch(getUserStoriesThunk(id))
//   };
// }

export default connect(mapState)(UserProfileEdit);
// export default UserProfileEdit;
