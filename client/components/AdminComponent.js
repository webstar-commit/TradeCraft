import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import PersonnelContainer from '../containers/admin/PersonnelContainer';
import PlatformsContainer from '../containers/admin/PlatformsContainer';
import PlatformsSpecificationContainer from '../containers/admin/PlatformsSpecificationContainer';
import PayloadsContainer from '../containers/admin/PayloadsContainer';
import PayloadsSpecificationContainer from '../containers/admin/PayloadsSpecificationContainer';
import MunitionsContainer from '../containers/admin/MunitionsContainer';
import MunitionsSpecificationContainer from '../containers/admin/MunitionsSpecificationContainer';
import AdminStatusContainer from '../containers/admin/AdminStatusContainer';
import LocationContainer from '../containers/admin/LocationContainer';
import CcirPirContainer from '../containers/admin/CcirPirContainer';
import OrgBuilderContainer from '../containers/admin/OrgBuilderContainer';
import ComNetContainer from '../containers/admin/ComNetContainer';
import SysHealthContainer from '../containers/admin/SysHealthContainer';
import SysConfigContainer from '../containers/admin/SysConfigContainer';
import ReferenceDocsContainer from '../containers/admin/ReferenceDocsContainer';
import SubMenu from './reusable/SubMenu';
import { adminUser } from '../dictionary/auth';

class AdminComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showSubMenu: false,
      key:-1
    };
  }

  handleHover = (i) => {
    this.setState({ key: i});
  };

  handleLeave = () => {
    this.setState({ key:-1 });
  };

  renderMenuItems() {

    const {translations, match} = this.props;

    const subMenuNames = [translations['inventory'],translations['Specifications']];

    const menuItems = [
      {title: translations['personnel'], url: `${match.url}/personnel` },
      {title: translations['platforms'], url: `${match.url}/platforms`,submenu:true, },
      {title: translations['payloads'], url: `${match.url}/payloads`,submenu:true},
      {title: translations['Munitions'], url: `${match.url}/munitions`,submenu:true},
      {title: translations['Location'], url: `${match.url}/location`},
      {title: translations['status'], url: `${match.url}/admin-status`},
      {title: translations['Ccir/Pir'], url: `${match.url}/ccir-pir`},
      {title: translations['Org builder'], url: `${match.url}/org-builder`},
      // {title: translations['Com/Net'], url: `${match.url}/com-net/satcom`},
      // {title: translations['Sys. Health'], url: `${match.url}/sys-health`},
      {title: 'Reference Docs', url: `${match.url}/sys-config`},
    ];

    return menuItems.map((item, i) => {
      let image = '/assets/img/menu/button-line-highlight.png';
      let matchForLink = false;

      if (item.url.indexOf('/', 8) !== -1) {
        matchForLink = (this.props.router.location.pathname.indexOf(item.url.substr(0, item.url.indexOf('/', 8))) !== -1);
      } else {
        matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);
      }

      return (
        <div className="submenu-button" key={i} onMouseEnter={this.handleHover.bind(this,i)} onMouseLeave={this.handleLeave.bind(this)}>
          <NavLink to={item.url} className={`${matchForLink ? 'active-submenu-item' : ''} submenu`}>
            
            {item.title}
            {matchForLink ?
              (
                <div className="under-button-line">
                  <img src={image} className="under-button-image pull-right" alt=""/>
                </div>
              ):
              null}
               
          </NavLink>
          {this.state.key==i && item.submenu ? <SubMenu link={item.url} names={subMenuNames}/> : null }
        </div>
      );
    });
  }

  render() {
    const {translations, match} = this.props;
    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => adminUser.includes(v));
    console.log(access);
    
    return ( access ? (
      <div>
        <div className="container-fluid sub-buttons">
          <div className="buttons-list">
            {this.renderMenuItems()}
          </div>
        </div>
        <Switch>
          <Route path={`${match.url}/personnel`} component={PersonnelContainer} />
          <Route path={`${match.url}/platforms`} component={PlatformsContainer} />
          <Route path={`${match.url}/platformsspec`} component={PlatformsSpecificationContainer} />
          <Route path={`${match.url}/payloads`} component={PayloadsContainer} />
          <Route path={`${match.url}/payloadsspec`} component={PayloadsSpecificationContainer} />
          <Route path={`${match.url}/munitions`} component={MunitionsContainer} />
          <Route path={`${match.url}/munitionsspec`} component={MunitionsSpecificationContainer} />
          <Route path={`${match.url}/location`} component={LocationContainer} />
          <Route path={`${match.url}/admin-status`} component={AdminStatusContainer} />
          <Route path={`${match.url}/ccir-pir`} component={CcirPirContainer} />
          <Route path={`${match.url}/org-builder`} component={OrgBuilderContainer} />
          <Route path={`${match.url}/com-net`} component={ComNetContainer} />
          <Route path={`${match.url}/sys-health`} component={SysHealthContainer} />
          <Route path={`${match.url}/sys-config`} component={ReferenceDocsContainer} />
        </Switch>
      </div>) : <div><div className="col-md-2"></div><h4 className="header-text">Not Authorized</h4><div className="col-md-4"></div></div>
    );
  }
}

AdminComponent.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
  translations: PropTypes.object
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
    roles: state.auth.userRoles
  };
};

export default connect(mapStateToProps)(AdminComponent);
