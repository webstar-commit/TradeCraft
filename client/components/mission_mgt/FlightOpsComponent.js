import PropTypes from 'prop-types';
import React from 'react';
import { MissionConsts } from '../../dictionary/constants';
import FlightOpsPlatform from './flight-ops/FlightOpsPlatform';
import FlightOpsTeam from './flight-ops/FlightOpsTeam';

import { missionFlightUser } from '../../dictionary/auth';

class FlightOpsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.FOP,
    };
  }


  updateSelectedResource = (resource) => {
    this.setState({
      selectedResource: resource,
    });
  }

  render = () => {

    const { translations } = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => missionFlightUser.includes(v));


    return ( access ? (
      <div>
        { this.state.selectedResource === MissionConsts.RESOURCE.PLATFORM ?
          <FlightOpsPlatform updateResource={this.updateSelectedResource}/>
          : null
        }

        { this.state.selectedResource === MissionConsts.RESOURCE.TEAM ?
          <FlightOpsTeam updateResource={this.updateSelectedResource}/>
          : null
        }
        
      </div>) : null
    );
  }
}

FlightOpsComponent.propTypes = {
  children: PropTypes.element,

};

export default FlightOpsComponent;
