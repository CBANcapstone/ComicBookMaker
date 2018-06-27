import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'


const HomePage = (props) => {
  return (
    <div className="home-container">
      <img src="http://rensyn.com/wp-content/uploads/2014/06/placeholder.png" alt="carousel" />
      <div>
        {props.user.id ?
        <Link to="/templates">
        <button>Create a story now!</button>
        </Link>
        :
        <Link to="/login">
        <button>Create a story now!</button>
        </Link> }
      </div>
    </div>
  )
}

function mapState(state) {
  return {
    user: state.user
  }
}


export default connect(mapState)(HomePage)
