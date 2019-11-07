import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';


import HeaderContainer from '../containers/HeaderContainer';
import AdminComponent from '../components/AdminComponent';
import DashboardContainer from '../containers/DashboardContainer';
import IntelLibraryContainer from '../containers/IntelLibraryContainer';
import IntelRequestComponent from '../components/IntelRequestComponent';
import LiveViewContainer from '../containers/LiveViewContainer';
import LoginContainer from '../containers/LoginContainer';
import MessagesContainer from '../containers/MessagesContainer';
import MissionMGTComponent from '../components/MissionMGTComponent';
import OrdersAssetsComponent from '../components/OrdersAssetsComponent';
import SchedulesContainer from '../containers/SchedulesContainer';
import StatusContainer from '../containers/StatusContainer';
import SearchContainer from '../containers/SearchContainer';
import NavigationComponent from './NavigationComponent';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';
import ChangePasswordComponent from '../components/ChangePasswordComponent';

import { history } from 'store/configureStore';

class App extends React.Component {

  componentDidUpdate () {
    let token = sessionStorage.getItem('jwtToken');
    // console.log("Logged Out");
    // console.log(token);
    let expired = sessionStorage.getItem('expires');
if(!token || token === '') {//if there is no token, dont bother
  return;
    }

    if (expired < Date.now() / 1000)           
    { sessionStorage.removeItem('jwtToken');
     console.log("Logged Out");
    }
  }

  render() {
    const { directionality } = this.props;
    return (
      <ConnectedRouter history={history}>
        <div dir={directionality}>
          <Switch>
            <Route exact path="/logout" component={LoginContainer} />
            <Route exact path="/" component={NavigationComponent} > <Redirect to='/dashboard' /> </Route>
            <Route exact path="/dashboard" component={NavigationComponent} />
            <Route exact path="/intel-library" component={NavigationComponent} />
            <Route path="/intel-request" component={NavigationComponent} />
            <Route exact path="/liveview" component={NavigationComponent} />
            <Route exact path="/messages" component={NavigationComponent} />
            <Route path="/mission-mgt" component={NavigationComponent} />
            <Route path="/orders-assets" component={NavigationComponent} />
            <Route exact path="/schedules" component={NavigationComponent} />
            <Route exact path="/status" component={NavigationComponent} />
            <Route path="/admin" component={NavigationComponent} />
            <Route path="/search" component={NavigationComponent} />
            <Route path="/login" component={NavigationComponent} />
            <Route exact path="/change-password" component={NavigationComponent} />
          </Switch>
        </div>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  directionality: PropTypes.string.isRequired,
};

function mapStateToProps({ localization: { directionality } }) {
  return {
    directionality,
  };
}

export default hot(module)(connect(mapStateToProps)(App));
