import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import {ROUTE__LOGIN, ROUTE__MAIN} from 'constants/routes';
import Login from 'components/Login';
import Main from 'components/Main';
import './styles.css';

class App extends React.PureComponent {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
  };

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

export default withRouter(connect(mapStateToProps)(App));
