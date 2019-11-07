import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import FormBlock from "../reusable/FormBlock";
import StatusTable from "../reusable/StatusTable";
import Dropdown from "../reusable/Dropdown";
import ImageryBlock from "../reusable/ImageryBlock";

class NatlImageryComponent extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {


    const {translations} = this.props;

    const imageryData = [
      {name: translations['Place Name'], type: 'input'},
      {name: translations['Lat'], type: 'input'},
      {name: translations['Lon'], type: 'input'},
      {name: translations['MGRS'], type: 'input'},
      {name: translations['Image Date'], type: 'input'},
    ];

    let langs = ['val 1', 'val 2'];
    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["national imagery"]} />
          </div>
          
          <div className="col-md-12">
            <div className="national-imagery">
              <ImageryBlock headerText={translations["POI"]+"-06"} fields={imageryData} src="/assets/img/intel_request/national_imagery/video_1.png"/>
              <ImageryBlock headerText={translations["POI"]+"-06"} fields={imageryData} src="/assets/img/intel_request/national_imagery/video_2.png"/>
              <ImageryBlock headerText={translations["POI"]+"-06"} fields={imageryData} src="/assets/img/intel_request/national_imagery/video_3.png"/>
            </div>
            <div className="national-imagery">
              <ImageryBlock headerText={translations["POI"]+"-06"} fields={imageryData} src="/assets/img/intel_request/national_imagery/video_4.png"/>
              <ImageryBlock headerText={translations["POI"]+"-06"} fields={imageryData} src="/assets/img/intel_request/national_imagery/video_5.png"/>
              <ImageryBlock headerText={translations["POI"]+"-06"} fields={imageryData} src="/assets/img/intel_request/national_imagery/video_6.png"/>
            </div>        
          </div>
        </div>
      </div>
    );
  }
}

NatlImageryComponent.propTypes = {
  children: PropTypes.element,

};

export default NatlImageryComponent;
