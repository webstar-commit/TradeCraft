import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class DashboardCircleStatus extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {translations} = this.props;
    let background, backgroundSize, width;

      switch(this.props.statusHeader) {

        case translations["platform"]:
          background= 'url(/assets/img/status/platform_status.png) no-repeat center';
          break;

        case translations['mission']:
          background= 'url(/assets/img/status/platform_status.png) no-repeat center';
          break;

        case translations["ccri's"]:
          background= 'url(/assets/img/status/platform_status.png) no-repeat center';
          break;

        case translations["payload"]:
          background= 'url(/assets/img/status/payload_status.png) no-repeat center';
          break;
        case translations['reports']:
          background= 'url(/assets/img/status/payload_status.png) no-repeat center';
          break;
        case translations["pir's"]:
          background= 'url(/assets/img/status/payload_status.png) no-repeat center';
          break;

        case translations["flight crew"]:
          background= 'url(/assets/img/status/fcrew_status.png) no-repeat center';
          break;
        case translations['video']:
          background= 'url(/assets/img/status/fcrew_status.png) no-repeat center';
          break;
        case translations["eei's"]:
          background= 'url(/assets/img/status/fcrew_status.png) no-repeat center';
          break;

        case translations["line crew"]:
          background= 'url(/assets/img/status/lcrew_status.png) no-repeat center';
          break;
        case translations['tracks']:
          background= 'url(/assets/img/status/lcrew_status.png) no-repeat center';
          break;
        case translations["nai's"]:
          background= 'url(/assets/img/status/lcrew_status.png) no-repeat center';
          break;

        case translations["ped crew"]:
          background= 'url(/assets/img/status/pcrew_status.png) no-repeat center';
          break;
        case translations['capacity']:
          background= 'url(/assets/img/status/fcrew_status.png) no-repeat center';
          width = '100%';
          break;
        case translations["pid's"]:
          background= 'url(/assets/img/status/pcrew_status.png) no-repeat center';
          break;


      }

    return (
      <div className="each-status" style={{width}}>
        <div className="status-image" style={{background,backgroundSize}}><div className="status-percent">{this.props.statusPercent}</div></div>
        <div className="status-header">{this.props.statusHeader}</div>
      </div>
    );
  }
}

DashboardCircleStatus.propTypes = {
  children: PropTypes.element,

};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText
  };
};

export default connect(mapStateToProps)(DashboardCircleStatus);

