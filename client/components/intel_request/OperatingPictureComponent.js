import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import FormBlock from "../reusable/FormBlock";
import StatusTable from "../reusable/StatusTable";
import Dropdown from "../reusable/Dropdown";


class OperatingPictureComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let langs = ['val 1', 'val 2'];
    const {translations} = this.props;

    return (
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
            <img className="large-map" src="/assets/img/intel_request/operating_picture/large_map.png" alt="" />
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
      </div>
    );
  }
}

OperatingPictureComponent.propTypes = {
  children: PropTypes.element,

};

export default OperatingPictureComponent;
