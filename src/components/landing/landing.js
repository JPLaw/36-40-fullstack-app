import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AuthForm from '../auth-form/auth-form';
import * as authActions from '../../actions/auth';
import * as routes from '../../lib/routes';

// This component will be connected to the store
const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  userSignup: user => dispatch(authActions.userSignup(user)),
  userLogin: user => dispatch(authActions.userLogin(user)),
});


class Landing extends React.Component {
  handleSignup = (user) => {
    this.props.userSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  handleLogin = (user) => {
    this.props.userLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  renderJSX = (pathname) => {
    const rootJSX = // eslint-disable-line
    <div>
      <h2>Welcome</h2>
      <ul>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>;

    const signUpJSX = // eslint-disable-line
    <div>
      <h2>Sign Up</h2>
      <AuthForm onComplete={ this.handleSignup }/>
      <p>Already have an account?</p>
      <Link to="/login"> Login </Link>
    </div>;

    const loginJSX = // eslint-disable-line
    <div>
      <h2> login </h2>
      <AuthForm type="login" onComplete={this.handleLogin} />
      <p> Don&#39;t have an account? </p>
      <Link to="/signup"> signup </Link>
    </div>;
    switch (pathname) {
      case routes.ROOT_ROUTE:
        return rootJSX;
      case routes.SIGNUP_ROUTE:
        return signUpJSX;
      case routes.LOGIN_ROUTE:
        return loginJSX;
      default: 
        return null;
    }
  }

  render() {
    const { location } = this.props;
    return (
      <div>
        { this.renderJSX(location.pathname) }
      </div>
    );
  }
}

Landing.propTypes = {
  userLogin: PropTypes.func,
  userSignup: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
