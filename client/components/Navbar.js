import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, auth} from '../store'

class Navbar extends Component {
  handleLogout = () => {
    this.props.logUserOut()
  }

  render() {
    return (
      <div className="nav-parent">
        <div>LOGO</div>

        {this.props.user.id ? (
          <div className="nav-child">
            <Link to="/login">
              <div className="nav-ch" onClick={this.handleLogout}>
                LOGOUT
              </div>
            </Link>
            <Link to="/user-profile">
              <div className="nav-ch">MY-ACCOUNT</div>
            </Link>
          </div>
        ) : (
          <div className="nav-ch">
            <Link to="/login"> LOG IN </Link>
            <Link to="/signup"> SIGN UP </Link>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

function mapToProps(dispatch) {
  return {
    logUserOut: () => dispatch(logout())
  }
}

export default connect(mapState, mapToProps)(Navbar)
