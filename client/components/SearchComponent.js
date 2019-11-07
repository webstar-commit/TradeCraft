import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from './reusable/FullHeaderLine';
import ShortHeaderLine from './reusable/ShortHeaderLine';
import StatusTable from './reusable/StatusTable';
import Dropdown from "./reusable/Dropdown";
import FormBlock from "./reusable/FormBlock";
import CustomDatePicker from "./reusable/CustomDatePicker";


class SearchComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  onClear(){
    console.log("clear");
  }

  onEnter(){
    console.log("enter");
  }




  render() {
    const searchResultHead = [ 'date', 'mission', 'type', 'start', 'end', 'classification', 'air track', 'video', 'images', 'sigacts', 'email', 'export', 'detail'];
    const searchResult = [
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
    ];

    const dateTime = [
      {name: '', type: 'calendar'},
      {name: '', type: 'calendar'},
    ];

    const dataType = [
      {name: '', type: 'dropdown'},
      {name: '', type: 'dropdown'},
    ];

    const keyWord = [
      {name: '', type: 'input'},
      {name: '', type: 'dropdown'},
    ];

    let langs = ['val 1', 'val 2'];

    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText="search criteria" />
          </div>
          <div className="col-md-12 search-content">
            <div className="content-block">
              <ShortHeaderLine headerText="geo selection" />
              <div className="content-geo">
                <img src="/assets/img/intel_request/current_intel/geo_1.png" />
                <img src="/assets/img/intel_request/current_intel/geo_2.png" />
                <img src="/assets/img/intel_request/current_intel/geo_3.png" />
                <img src="/assets/img/intel_request/current_intel/geo_4.png" />
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText="date/time range" />
              <div className="content-other">
                <div>
                  <CustomDatePicker headerText="Start Date/Time" style={{margin:0}} />
                </div>
                <div>
                  <CustomDatePicker headerText="End Date/Time" style={{margin:"0 !important"}} />
                </div>
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText="data type filtering" />
              <div className="content-other">
                <Dropdown key="1" id="1" items={langs}/>
                <Dropdown key="2" id="2" items={langs}/>
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText="key word/phrase" />
              <div className="content-other">
                <div><input type="text"/></div>
                <Dropdown key="1" id="1" items={langs}/>
              </div>
            </div>
            <div className="button-group">
              <div className="content-button">
                <div className="col-md-6">
                  <img clasName="button-line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onClear.bind(this)}>
                    CLEAR
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
                <div className="col-md-6">
                  <img clasName="button-line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onEnter.bind(this)}>
                    ROUTE
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText="search criteria" />
          </div>
          <div className="col-md-12">
            <img className="large-map" src="/assets/img/intel_request/operating_picture/large_map.png" alt="" />
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText="search result" />
          </div>
          <div className="col-md-12">
            <StatusTable thead={searchResultHead} lines={searchResult} />
          </div>
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  children: PropTypes.element,

};

export default SearchComponent;
