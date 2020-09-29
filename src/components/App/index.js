import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'constants/routes';
import ApiService from 'services/ApiService';
import {logout} from 'actionCreators/auth';
import Login from 'components/Login';
import Main from 'components/Main';
import './styles.css';

class App extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    ApiService.init(this.props.logout);
  }

  componentWillUnmount() {
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
