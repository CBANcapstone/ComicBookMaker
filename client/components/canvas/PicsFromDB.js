import React, { Component } from 'react';
import firebase from 'firebase';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      allPictures: []
    };
  }

  componentDidMount = () => {
    const picturesRef = firebase.database().ref('Pictures');
    picturesRef.on('value', snapshot => {
      let pictures = snapshot.val();
      let newState = [];
      for (let pic in pictures) {
        newState.push({
          id: pic,
          picture: pictures[pic].picture
        });
      }
      this.setState({
        allPictures: newState
      });
    });
  };

  render() {
      return (
        <div>
        <h1>All pictures in database</h1>
        <ul>
          {this.state.allPictures.map(pic => {
            return (
              <div key={pic.id}>
                <li>{pic.picture}</li>
                <img src={pic.picture} width="100" height="100" />
              </div>
            );
          })}
        </ul>
      </div>
      )
  }

}
