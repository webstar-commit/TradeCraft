import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';
import AtoContainer from '../containers/mission_mgt/AtoContainer';
import FlightOpsContainer from '../containers/mission_mgt/FlightOpsContainer';
import IsrSyncContainer from '../containers/mission_mgt/IsrSyncContainer';
import MissionDetailContainer from '../containers/mission_mgt/MissionDetailContainer';
import PedTaskingContainer from '../containers/mission_mgt/PedTaskingContainer';
import MissionSummaryContainer from '../containers/mission_mgt/MissionSummaryContainer';

import { missionManageUser, missionATOUser, missionFlightUser, missionPEDUser } from '../dictionary/auth';

class MissionMGTComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations, match} = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let missionATOAccess = roles2.some(v => missionATOUser.includes(v));
    let missionFlightAccess = roles2.some(v => missionFlightUser.includes(v));
    let missionPEDAccess = roles2.some(v => missionPEDUser.includes(v));

    let menuItems = [];

    //  menuItems = [
    //   {title: translations['isr sync'], url: `${match.url}/isr-sync`},
    //   {title: translations['ato'], url: `${match.url}/ato`},
    //   {title: translations['flightops'], url: `${match.url}/flightops`},
    //   {title: translations['ped tasking'], url: `${match.url}/ped-tasking`},
    //   {title: translations['mission summary'], url: `${match.url}/mission-summary`},
    //   /* {title: translations['mission detail'], url: `${match.url}/mission-detail`}, */
    // ];

     menuItems = [
      {title: translations['isr sync'], url: `${match.url}/isr-sync`},
      
    ];

    if(missionATOAccess) {
      menuItems.push({title: translations['ato'], url: `${match.url}/ato`});
    }

    if(missionFlightAccess){
      menuItems.push({title: translations['flightops'], url: `${match.url}/flightops`});
    }

    if(missionPEDAccess){
      menuItems.push({title: translations['ped tasking'], url: `${match.url}/ped-tasking`});
    }
    menuItems.push({title: translations['mission summary'], url: `${match.url}/mission-summary`});
    
    return menuItems.map((item, i) => {
      let image = '/assets/img/menu/button-line-highlight.png';
      let matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);

      return (
        <div className="submenu-button" key={i}>
          <NavLink to={item.url} className="submenu" activeClassName="active-submenu-item">
            {item.title}
            {matchForLink ?
              (
                <div className="under-button-line">
                  <img src={image} className="under-button-image pull-right" alt=""/>
                </div>
              ):
              null}
          </NavLink>
        </div>
      );
    });
  }

  render() {
    const {translations, match} = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => missionManageUser.includes(v));

    return ( access ? (
      <div>
        <div className="container-fluid sub-buttons">
          <div className="buttons-list">
            {this.renderMenuItems()}
          </div>
        </div>
        <Switch>
          <Route path={`${match.url}/isr-sync`} component={IsrSyncContainer} />
          <Route path={`${match.url}/flightops`} component={FlightOpsContainer} />
          <Route path={`${match.url}/ato`} component={AtoContainer} />
          <Route path={`${match.url}/ped-tasking`} component={PedTaskingContainer} />
          <Route path={`${match.url}/mission-summary`} component={MissionSummaryContainer} />
          <Route path={`${match.url}/mission-detail/:editId`} component={MissionDetailContainer} />
        </Switch>
    </div> ) : null
    );
  }
}

MissionMGTComponent.propTypes = {
  children: PropTypes.element,
  router: PropTypes.object,
  translations: PropTypes.object
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    router: state.router,
  };
};

export default connect(mapStateToProps)(MissionMGTComponent);
