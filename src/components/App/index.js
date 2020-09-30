import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'constants/routes';
import ApiService from 'services/ApiService';
import {init, uninit} from 'actionCreators/appInit';
import {logout} from 'actionCreators/auth';
import Login from 'components/Login';
import Main from 'components/Main';
import './styles.css';

class App extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    appInit: PropTypes.func.isRequired,
    appUninit: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {appInit} = this.props;

    ApiService.init(this.props.logout);
    appInit();
  }

  componentWillUnmount() {
    const {appUninit} = this.props;

    appUninit();
    ApiService.uninit();
  }

  render() {
    const {isAuthenticated} = this.props;

    if (!isAuthenticated) {
      return (
        <Switch>
          <Route path={ROUTE__LOGIN} exact component={Login} />
          <Redirect to={ROUTE__LOGIN} />
        </Switch>
      );
    }

    return (
      <Switch>
        <Route path={ROUTE__MAIN} component={Main} />
        <Redirect to={ROUTE__MAIN} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  logout,
  appInit: init,
  appUninit: uninit,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
