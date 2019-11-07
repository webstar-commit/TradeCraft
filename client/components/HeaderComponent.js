import React from 'react';
import MenuComponent from './MenuComponent';
import moment from 'moment';
import {
  NavLink
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { NotificationContainer} from 'react-notifications';
import { supportedLanguages } from 'dictionary/localization';
import { Route, Redirect } from 'react-router-dom';
import initialState from 'store/initialState';

import { adminUser, dashboardUser, livewViewUser, statusUser, intelReqUser, missionManageUser } from '../dictionary/auth';

class HeaderComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      width: '72px'
    }
    moment.locale('en');
  }

  changeLang(lang) {
    this.props.updateLocalization(lang);

    setTimeout(() => {
      
      let widthValue = this.refs.search.innerText.length * 12;
      this.setState({
        width:`${widthValue}px`
      });
    }, 0);

  }

  logoutCall = () => {
    
    // localStorage.removeItem('session');
    localStorage.removeItem('session');
      if(localStorage.getItem('session')===null)
        { console.log("Removed"); }
  
  }

  //render dropdown list of lang switcher
  renderLangsList() {
    let langsList;

    langsList = Object.keys(supportedLanguages).map((code, i) => (
        <li key={i}>
          <a className="dropdown-item" href="#" onClick={() => this.changeLang(code)}>{supportedLanguages[code]}</a>
        </li>
      )
    );

    return langsList;
  }

  renderMenuItems() {

    const {translations} = this.props;

    
    let ses = JSON.parse(localStorage.getItem('session'));
    if (ses != undefined && ses.UserRoles != undefined) 
    {
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let adminAccess = roles2.some(v => adminUser.includes(v));
    let dashboardAccess = roles2.some(v => dashboardUser.includes(v));
    let liveViewAccess = roles2.some(v => livewViewUser.includes(v));
    let statusAccess = roles2.some(v => statusUser.includes(v));
    let intelReqAccess = roles2.some(v => intelReqUser.includes(v));
    let missionManageAccess = roles2.some(v => missionManageUser.includes(v));

    let tr = true;
    let fa = false;

    let menuItems = [];


    if(dashboardAccess){
      menuItems.push({title: translations['dashboard'], url: '/dashboard'});
    }

    if(liveViewAccess) {
      menuItems.push({title: translations['liveview'], url: '/liveview'});
    }

    if(statusAccess) {
      menuItems.push({title: translations['status'], url: '/status'});
    }

    if(intelReqAccess) {
      menuItems.push({title: translations['intel request'], url: '/intel-request/request'});
    }

    if(missionManageAccess) {
      menuItems.push({title: translations['mission mgt'], url: '/mission-mgt/isr-sync'});
    }

    menuItems.push({title: translations['intel library'], url: '/intel-library'});
    
    if(adminAccess) { 
      menuItems.push({title: translations['admin'], url: '/admin/personnel'});
    }

    
    // menuItems = [
    //   {title: translations['dashboard'], url: '/dashboard'},
    //   {title: translations['liveview'], url: '/liveview'},
    //   {title: translations['status'], url: '/status'},
    //   {title: translations['intel request'], url: '/intel-request/request'},
    //   {title: translations['mission mgt'], url: '/mission-mgt/isr-sync'},
    //   // {title: translations['schedules'], url: '/schedules'},
    //   // {title: translations['orders/assets'], url: '/orders-assets/orders'},
    //   // {title: translations['intel library'], url: '/intel-library'},
    //   // {title: translations['messages'], url: '/messages'},
    //   {title: translations['admin'], url: '/admin/personnel'},
    //   //{title: translations['logout'], url: '/logout'}
    // ];


    return menuItems.map((item, i) => {
      let matchForLink = false;

    
      if (item.url.indexOf('/', 1) !== -1) {
        matchForLink = (this.props.router.location.pathname.indexOf(item.url.substr(0, item.url.indexOf('/', 1))) !== -1);
      } else {
        matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);
      }
    
   
    if (item.url == null) { keep == false; }
      return (
        <div className="menu-button" key={i}>
          <NotificationContainer />
        <NavLink to={item.url} className={matchForLink ? "active-menu-item" : ''}> 
            <button data-target="#bs-AMPS-navbar-collapse-1"  data-toggle="collapse">
              {item.title}
            </button>
            <div className="under-button-line">
              <img src={matchForLink ? '/assets/img/menu/button-line-highlight.png' : '/assets/img/menu/button-line.png'} className="under-button-image pull-right" alt=""/>
            </div>
      </NavLink> 
        </div>
      );
    });

  }
  }

  search() {
    // console.log(this.refs.search.value);
  }

  render () {
    const {translations} = this.props;
    let ses = JSON.parse(localStorage.getItem('session'));
    let userName, rank, assignedUnit, locationName = '';
    if (ses)
    {
     userName = ses.userName;
    rank = ses.rankAbbrev;
     assignedUnit = ses.AssignedUnitName;
     locationName = ses.LocationName;
    
    }

    return (












<section>




      
      <nav className="navbar navbar-default">
        <div className="container-fluid header">
          <div className="user-info col-md-3 col-xs-12">
            <div className="header-line">
              <img src="/assets/img/menu/vertical-line.png" className="line-img" alt=""/>
            </div>
            <div className="">
              {userName}
            </div>
            <div className="">
              {rank}, {assignedUnit}
            </div>
            <div className="">
              {locationName}
            </div>
          </div>
          <div className="header-title text-center col-md-6 col-xs-12">
            <div className="header-unclassified">
              UNCLASSIFIED
            </div>
            <div className="header-isr">
            Advanced Mission Planning Software (AMPS)
            </div>
          </div>
          <div className="date-info col-md-3 col-xs-12">
            <div className="date">
              <div className="">
                {moment().local().format('DD MMMM, YYYY')}
              </div>
              <div className="">
                Local:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{moment().local().format('HH:mm:ss')}
              </div>
              <div className="">
                UTC:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {moment().utc().format('HH:mm:ss')}
              </div>
            </div>
            <div className="header-line">
              <img src="/assets/img/menu/vertical-line.png" className="line-img" alt=""/>
            </div>
          </div>
        </div>

      <div className="langs-dropdown" style={{position: "absolute",
              top: "45px", right: "200px"}}>
              <button type="button" className="btn btn-secondary dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Language
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {this.renderLangsList()}
              </ul>
              <ul className="pull-right setting-user">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i className="fa fa-cog "></i><span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
                       <li><a href="#"><i className="fa fa-user"></i> User Setting</a></li>
            <li><NavLink to='/change-password'> <i className="fa fa-key"></i> Change Password</NavLink></li>
            <li className="divider"></li>
            <li><NavLink to="/login" onClick={this.logoutCall}><i className="fa fa-sign-out"></i> Log Out</NavLink></li>
          </ul>
        </li>
      
      </ul>
            </div>
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-AMPS-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
  
        <div className="container-fluid buttons">
          <img src="/assets/img/menu/horiz-line.png" className="horiz-line" alt=""/>
          <img className="right-image" src="/assets/img/menu/horiz-line-right.png"  alt=""/>
          <div className="collapse navbar-collapse" id="bs-AMPS-navbar-collapse-1">
          <div className="buttons-list">
          
            {this.renderMenuItems()}
            {/* <div className="search">
           
              <NavLink to="/search">
                <div className="search-button" style={{width: this.state.width}} ref="search" onClick={() => this.search()}>
                  {translations.search}
                </div>
              </NavLink>
              <input type="text" className="search-input" placeholder={translations['enter values']} name="search" />
            </div> */}
      
          </div>
        </div>
        </div>
      </nav>
      </section>
    );
  }
}

HeaderComponent.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
  translations: PropTypes.object
};

export default HeaderComponent;
