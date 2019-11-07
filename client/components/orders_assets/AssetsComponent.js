import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import StatusTable from "../reusable/StatusTable";


class AssetsComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    const {translations} = this.props;
    const thead = [translations['Service'], translations['Asset'], translations['#assets'], translations['Base'], translations['unit'], translations['mission'], translations['SPD'], translations['status'],];
    const firstContent = [
      {service:'usaf', asset:'mq-9', assets:'12', base:'fob-2', unit:'lre1', mission:'fmv', spd:'4', status:'10 fmc/2 pmc'},
      {service:'usaf', asset:'mq-9', assets:'04', base:'aas', unit:'lre2', mission:'fmv', spd:'2', status:'04 fmc'},
      {service:'usaf', asset:'rc-135', assets:'01', base:'ass', unit:'lre1', mission:'sig', spd:'4', status:'01 pmc'},
      {service:'usa', asset:'arl', assets:'02', base:'aas', unit:'lre1', mission:'fmv', spd:'4', status:'02 fmc'},
      {service:'usa', asset:'emarss-s', assets:'04', base:'fob-2', unit:'lre1', mission:'multi', spd:'4', status:'03 fmc/2 pmc'},
    ];

    const secondContent = [
      {service:'usa', asset:'mq-9', assets:'12', base:'fob-2', unit:'lre1', mission:'fmv', spd:'4', status:'10 fmc/2 pmc'},
      {service:'navy', asset:'p-3', assets:'04', base:'aas', unit:'lre2', mission:'fmv', spd:'2', status:'04 fmc'},
      {service:'usa', asset:'rq-7', assets:'01', base:'ass', unit:'lre1', mission:'sig', spd:'4', status:'01 pmc'},
      {service:'coco', asset:'aerosande', assets:'02', base:'aas', unit:'lre1', mission:'fmv', spd:'4', status:'02 fmc'},
      {service:'coco', asset:'mq-1c', assets:'04', base:'fob-2', unit:'lre1', mission:'multi', spd:'4', status:'03 fmc/2 pmc'},
    ];

    return (
      <div>
        <div className="row orders-assets">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["a-isr beddown"]} />
          </div>
          <div className="col-md-12">
            <img className="large-map" src="/assets/img/orders_assets/assets/assets_map.png" alt="" />
          </div>
          <div className="col-md-12">
            <div className="alert">
              <img src="/assets/img/admin/exclamation_mark.png" alt=""/>
              <div> alert: dvb relay bravo impacting mission "skipjack"... alert: dvb relay bravo impacting mission "skipjack"...</div>
              <img src="/assets/img/admin/exclamation_mark.png" alt="" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="table-list">
              <div className="col-md-6">
                <StatusTable thead={thead} lines={firstContent}/>
              </div>
              <div className="col-md-6">
                <StatusTable thead={thead} lines={secondContent}/>
              </div>
            </div>             
          </div>
        </div>
      </div>
    );
  }
}

AssetsComponent.propTypes = {
  children: PropTypes.element,

};

export default AssetsComponent;
