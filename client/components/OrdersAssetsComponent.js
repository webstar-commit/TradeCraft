import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Switch, Route, NavLink } from 'react-router-dom';

import AssetsContainer from '../containers/orders_assets/AssetsContainer';
import OrdersContainer from '../containers/orders_assets/OrdersContainer';
import AllocationContainer from '../containers/orders_assets/AllocationContainer';
import ForecastContainer from '../containers/orders_assets/ForecastContainer';

class OrdersAssetsComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  renderMenuItems() {

    const {translations, match} = this.props;

    const menuItems = [
      {title: translations['orders'], url: `${match.url}/orders`},
      {title: translations['Assets'], url: `${match.url}/assets`},
      {title: translations['Allocation'], url: `${match.url}/allocation`},
      {title: translations['Forecast'], url: `${match.url}/forecast`},
    ];

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
              )
              : null}
          </NavLink>
        </div>
      );
    });
  }

  render() {
    const {translations, match} = this.props;

    return (
      <div>
        <div className="container-fluid sub-buttons">
          <div className="buttons-list">
            {this.renderMenuItems()}
          </div>
        </div>
        <Switch>
          <Route path={`${match.url}/orders`} component={OrdersContainer} />
          <Route path={`${match.url}/assets`} component={AssetsContainer} />
          <Route path={`${match.url}/allocation`} component={AllocationContainer} />
          <Route path={`${match.url}/forecast`} component={ForecastContainer} />
        </Switch>
      </div>
    );
  }
}

OrdersAssetsComponent.propTypes = {
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

export default connect(mapStateToProps)(OrdersAssetsComponent);
