import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../store';

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div className="wrapper fadeInDown">
      <h1 className="auth-form-heading">{displayName} to Create your Comic</h1>
      <div id="formContent">
        <div className="fadeIn first">
          <iframe
            src="https://giphy.com/embed/TpUxOJmGEaQ5a"
            width="480"
            height="364"
            frameBorder="0"
            className="giphy-embed"
          />
        </div>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="email" />
            <input
              name="email"
              className="fadeIn second"
              type="text"
              placeholder="email"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              className="fadeIn third"
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="fadeIn fourth"
              id="submit-form-btn"
            >
              {displayName}
            </button>
          </div>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <div id="formFooter">
          <a href="/auth/google" className="underlineHover">
            {displayName} with Google
          </a>
        </div>
      </div>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
