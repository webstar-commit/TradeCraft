/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRoute';
import HeaderContainer from '../containers/HeaderContainer';
import AdminComponent from '../components/AdminComponent';
import DashboardContainer from '../containers/DashboardContainer';
import IntelLibraryContainer from '../containers/IntelLibraryContainer';
import IntelRequestComponent from '../components/IntelRequestComponent';
import LiveViewContainer from '../containers/LiveViewContainer';
import LoginContainer from '../containers/LoginContainer';
import ChangePasswordContainer from '../containers/ChangePasswordContainer';
import MessagesContainer from '../containers/MessagesContainer';
import MissionMGTComponent from '../components/MissionMGTComponent';
import OrdersAssetsComponent from '../components/OrdersAssetsComponent';
import SchedulesContainer from '../containers/SchedulesContainer';
import StatusContainer from '../containers/StatusContainer';
import SearchContainer from '../containers/SearchContainer';
import initialState from '../store/initialState';
import { connect } from 'react-redux';
import { refresh } from '../actions/auth';
import { requestHeaders, formDataRequestHeader } from '../dictionary/network';

let condition = true;
class NavigationComponent extends React.Component {

  

  componentDidUpdate () {
    let ses = JSON.parse(localStorage.getItem('session'));
    console.log("Here-Pre");
    if (ses === null)
    { console.log("Empty Session"); }
    else 
    {
    console.log(ses);
    if(Object.keys(ses).length === 0 && ses.constructor === Object)
    { console.log('Empty Session'); }
    else
    {
    let expired = ses['.expires'];
    let exp = new Date(expired).toISOString();
    console.log(exp);
    // console.log(new Date().toISOString());
    let current = new Date().toISOString();
    console.log(current);
    if (exp < current)           
    {       
        //   localStorage.removeItem('session');
        //  console.log("Logged Out");
        //  this.props.history.push('/'); 
        //  alert("Session Expired - Please Login");
        //  condition = false;
       if(window.location.pathname!='/login')
       { 
        // alert("Here");
        console.log("Unauthorized");
        let refresh_token = ses.refresh_token;
        console.log(refresh_token);
        // alert(exp);
        let obj = {'grant_type':'refresh_token', 'refresh_token': refresh_token}       
        // alert(exp);
        this.props.refresh(obj).then(() => {        
          let { loginData } = this.props;
          let mySession = JSON.stringify(loginData);
          const { authenticated } = this.props;
          localStorage.setItem('session',mySession);
          if (authenticated)
          { 
            requestHeaders['Authorization']='Bearer '+ loginData.access_token;
            formDataRequestHeader['Authorization']='Bearer '+ loginData.access_token;
            window.location.reload();
          }

        });
      }
    }
            condition = false;
  }
  }
  }

  render() {
        let roles = initialState.auth.userRoles;
    return (
      <div>
      <Route path="/" render={(route) =>{

            return route.location.pathname==='/login' ? null : <HeaderContainer/>;
        }} />
        <Switch>
          <PrivateRoute exact path="/" component={DashboardContainer} > <Redirect to='/dashboard' /> </PrivateRoute>
          <PrivateRoute exact path="/dashboard" component={DashboardContainer} />
          <PrivateRoute exact path="/intel-library" component={IntelLibraryContainer} />
          <PrivateRoute path="/intel-request" component={IntelRequestComponent} />
          <PrivateRoute exact path="/liveview" component={LiveViewContainer} />
          <PrivateRoute exact path="/messages" component={MessagesContainer} />
          <PrivateRoute path="/mission-mgt" component={MissionMGTComponent} />
          <PrivateRoute path="/orders-assets" component={OrdersAssetsComponent} />
          <PrivateRoute exact path="/schedules" component={SchedulesContainer} />
          <PrivateRoute exact path="/status" component={StatusContainer} />
          <PrivateRoute path="/admin" component={AdminComponent} userRole="test"/>
          <PrivateRoute path="/search" component={SearchContainer} />
          <Route path="/login" component={LoginContainer} />
          <PrivateRoute path="/change-password" component={ChangePasswordContainer} />
        </Switch>
      </div>
    );
  }
}

NavigationComponent.propTypes = {
  children: PropTypes.element
};

const mapStateToProps = state => {
  return {
    isLoading: state.auth.isFetching,
    loginData: state.auth.loginData,
    authenticated: state.auth.authenticated,
  };
};

const mapDispatchToProps = {
  refresh,
};

export default connect(mapStateToProps,mapDispatchToProps)(NavigationComponent);
