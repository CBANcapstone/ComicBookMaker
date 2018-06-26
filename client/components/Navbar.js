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
            <Link to="/userProfile">
              <div className="nav-ch">MY-ACCOUNT</div>
            </Link>
          </div>
        ) : (
          <Link to="/login">
          <div className="nav-ch" >
            SIGN-IN
          </div>
          </Link>
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
    logUserOut: () => dispatch(logout()),
    // authLogin: () => dispatch(auth())
  }
}

export default connect(mapState, mapToProps)(Navbar)
