import React from 'react';
import PropTypes from 'prop-types';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import Table from "../reusable/Table";
import { Switch, Route, NavLink } from 'react-router-dom';
import AirborneComponent from './comnet/AirborneComponent';
import SatcomComponent from './comnet/SatcomComponent';

import TerrestrialComponent from './comnet/TerrestrialComponent';

class ComNetComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMap: '/assets/img/admin/comsnet4.png',
    };
  }


  renderMapButtons = () => {
    const {translations, match} = this.props;

    let buttons = [
      {name: 'satcom', subButton: false, url: `${match.url}/satcom`},
      {name: 'gbs', subButton: true},
      {name: 'dvb', subButton: true},
      {name: 'airborne', subButton: false, url: `${match.url}/airborne`},
      {name: 'terrestrial', subButton: false, url: `${match.url}/terrestrial`},
    ];

    return buttons.map((item, i) => {
      if (!item.subButton) {
        let matchForLink = (this.props.router.location.pathname.indexOf(item.url) !== -1);

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
                <Route path={`${match.url}/satcom`} component={SatcomComponent} />
                <Route path={`${match.url}/airborne`} component={AirborneComponent} />
                <Route path={`${match.url}/terrestrial`} component={TerrestrialComponent} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ComNetComponent.propTypes = {
  children: PropTypes.element,

};

export default ComNetComponent;
