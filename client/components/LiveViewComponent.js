import React from 'react';
import PropTypes from 'prop-types';
/* import UploadBlock from "./reusable/UploadBlock";
import ContentBlock from "./reusable/ContentBlock";
import ButtonsList from "./reusable/ButtonsList";
import Table from "./reusable/Table";
import { Switch, Route, NavLink } from 'react-router-dom';
import OpsComponent from './live_view/OpsComponent';
import PedComponent from './live_view/PedComponent';
import ComsComponent from './live_view/ComsComponent'; */
import FullHeaderLine from './reusable/FullHeaderLine';

import Map, { viewerSize } from 'components/reusable/Map';
import { viewerIdentifiers } from 'map/viewer';

import { livewViewUser } from '../dictionary/auth';

class LiveViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMap: '/assets/img/admin/comsnet4.png'
    };
  }



  render() {

    let langs = ['val 1', 'val 2'];
    const {translations} = this.props;

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => livewViewUser.includes(v));
    console.log(access);

    return ( access ? (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["real-time intelligence/threat picture"]} />
          </div>
          <div className="alert">
            <img src="/assets/img/admin/exclamation_mark.png" alt=""/>
            <div>flash alert: [08:12:00] vbied in massoud square: 54 civ, 3 nato casulties ... developing ... [08:01:01] vbied in massoud square: 54 civ, 3 narto casul</div>
            <img src="/assets/img/admin/exclamation_mark.png" alt="" />
          </div>
          <div className="col-md-12">
            <Map size={viewerSize.medium} viewerId={viewerIdentifiers.liveView} enableLiveViewToolBar = {true}/>
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["operating environment"]} />
          </div>

          <div className="col-md-12">
            <div className="operating-content">
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations["sigacts"]}
                    </div>
                    <div className="col-md-6 pull-right">
                    <select className="form-control">
                        <option value="Kinetic Strikes">Kinetic Strikes</option>
                        <option value="Small Arms Fire">Small Arms Fire</option>
                        <option value="IEDs">IEDs</option>
                        <option value="Mortar Fire">Mortar Fire</option>
                        <option value="Casualty-Enemy">Casualty-Enemy</option>
                        <option value="Casualty-Civilian">Casualty-Civilian</option>
                    </select>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/sigacts.png" className="photo" alt=""/>
                </div>
              </div>

              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations['current weather']}
                    </div>
                    <div className="col-md-6 pull-right">
                    <select className="form-control">
                        <option value="Current Surface">Current Surface</option>
                        <option value="Current Air">Current Air</option>
                        <option value="Current Sea">Current Sea</option>
                        <option value="Next 24-Surface">Next 24-Surface</option>
                        <option value="Next 24-Air">Next 24-Air</option>
                    </select>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/current_weather.png" className="photo" alt=""/>
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations['a-isr coverage']}
                    </div>
                    <div className="col-md-6 pull-right">
                    <select className="form-control">
                        <option value="Missions">Missions</option>
                        <option value="Past 30 Days">Past 30 Days</option>
                        <option value="Past 5 Days">Past 5 Days</option>
                        <option value="Past 1 Day">Past 1 Day</option>
                        <option value="Upcoming 1 Day">Upcoming 1 Day</option>
                    </select>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/a-isr.png" className="photo" alt=""/>
                </div>
              </div>
              <div className="col-md-3 map-block">
                <div className="map-image">
                  <div className="select-bar col-md-12">
                    <div className="col-md-6 label-text">
                      {translations['force positions']}
                    </div>
                    <div className="col-md-6 pull-right">
                      <select className="form-control">
                          <option value="Kinetic Strikes">Blue Forces</option>
                          <option value="Small Arms Fire">Red Forces</option>
                          <option value="IEDs">Green Forces</option>
                          <option value="Mortar Fire">Yellow Forces</option>
                          <option value="Casualty-Enemy">All Forces</option>
                      </select>
                    </div>
                  </div>
                  <img src="/assets/img/intel_request/operating_picture/force_position.png" className="photo" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>) : null
    );
  }
}


/*
  renderMapButtons = () => {
    const {translations, match} = this.props;

    console.log(match.url);

    let buttons = [
      {name: 'ops', subButton: false, url: `${match.url}/ops`},
      {name: 'ped', subButton: false, url: `${match.url}/ped`},
      {name: 'coms', subButton: false, url: `${match.url}/coms`},
    ];

    return buttons.map((item, i) => {
      if (!item.subButton) {
        let matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);
        console.log(matchForLink);
        return (
          <div className={`${item.subButton ? 'sub-button' : 'main-button'} ${matchForLink ?  'highlighted-main-button' : ''}`} key={i}>
            <NavLink to={item.url}>
              <button>{item.name}</button>
            </NavLink>
          </div>
        )
      } else {
        return (
          <div className={`${item.subButton ? 'sub-button' : ''}  ${this.props.router.location.pathname.indexOf(buttons[0].url) !== -1 ?  'highlighted-sub-button' : ''}`} key={i}>
            <button>{item.name}</button>
          </div>
        )
      }
    });
  };

  render() {

    const {translations, match} = this.props;

    return (
      <div>
        <div className="row coms-net" >
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              coms/net
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="coms-net-content">
            <div className="col-md-12">
              <div className="map-buttons">
                {this.renderMapButtons()}
              </div>
              <Switch>
                <Route path={`${match.url}/ops`} component={OpsComponent} />
                <Route path={`${match.url}/ped`} component={PedComponent} />
                <Route path={`${match.url}/coms`} component={ComsComponent} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  } */


LiveViewComponent.propTypes = {
  children: PropTypes.element,
};

export default LiveViewComponent;
