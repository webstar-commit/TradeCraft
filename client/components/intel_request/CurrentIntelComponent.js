import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import ShortHeaderLine from '../reusable/ShortHeaderLine';
import StatusTable from '../reusable/StatusTable';
import Dropdown from "../reusable/Dropdown";
import FormBlock from "../reusable/FormBlock";
import CustomDatePicker from "../reusable/CustomDatePicker";
import ModalFormBlock from "../reusable/ModalFormBlock";

import FilterDropdown from '../reusable/FilterDropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';

import "react-table/react-table.css";
import ReactTable from 'react-table';


import Select from 'react-select';
import 'react-select/dist/react-select.css';


class CurrentIntelComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    selectedOption: '',
    form: {
      start: '',
      end: ''
    }
  }

  onClear(){
    console.log("clear");

    let formit = {...this.state.form};

    this.setState({
        selectedOption: '',
        selectedOption2: '',
        form: {
          start: '',
          end: ''
        }
    });


    
  }

  onEnter(){
    console.log("enter");
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      console.log(`Selected: ${selectedOption.label}`);
    }
  }

  handleChange2 = (selectedOption2) => {
    this.setState({ selectedOption2 });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption2) {
      
    }
  }

  handleForm = (dateTime) => {
    console.log("here");
    const {form} = this.state;
    this.setState({
      form: {
        start: dateTime.start,
        end: dateTime.end
      }
    }, () => {
     // console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }
  


  render() {

    const { selectedOption } = this.state;
    const { selectedOption2 } = this.state;

    const {translations} = this.props;

    const searchResult = [
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'different', type:'air', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
      { date:'07//11/17', mission:'firechief', type:'strike', start:'12:45', end:'18:45', classification:'unclass', air_track:'check', video:'check', images:'check', sigacts:'check', email:'email', export:'export', detail:'detail' },
    ];

    const searchResultColumns = [
      {
        Header: translations["date"],
        accessor: 'date', 
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value),
        
        sortMethod: (a, b) => {
                      if (a.length === b.length) {
                        return a > b ? 1 : -1;
                      }
                      return a.length > b.length ? 1 : -1;
                    }// String-based value accessors!
      },
      {
        Header: translations['mission'],
        accessor: 'mission',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['type'],
        accessor: 'type',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      }, 
      {
        Header: translations['start'],
        accessor: 'start',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['end'],
        accessor: 'end',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },

      {
        Header: translations['classification'],
        accessor: 'classification',
      },
        
      {
        Header: translations['air track'],
        accessor: 'air_track',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox"  />
      },

      {
        Header: translations['video'],
        accessor: 'video',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
      },

      {
        Header: translations['images'],
        accessor: 'images',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
       
      },

      {
        Header: translations['sigacts'],
        accessor: 'sigacts',
        filterable: false,
        Cell: props => <input type="checkbox" className="checkbox" />
      },

      {
        Header: translations['email'],
        accessor: 'email',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/email_icon.png"  /></span> // Custom cell components!
      }, 

      {
        Header: translations['export'],
        accessor: 'export',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/export_icon.png"  /></span> // Custom cell components!
      }, 

      {
        Header: translations['detail'],
        accessor: 'detail',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/detail_icon.png"  /></span> // Custom cell components!
      }
    ];


    const dateTime = [
      {name: 'Start', type: 'date', valField:'start'},
      {name: 'End', type: 'date', valField:'end'},
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

    
    const options = [{ label: 'Report Doc', value: 'Report Doc' },
    { label: 'AirTracks', value: 'AirTracks' },
    { label: 'Video', value: 'Video' },
    { label: 'Images', value: 'Images' },
    { label: 'SIGACTS', value: 'SIGACTS' }];

    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search criteria"]} />
          </div>
          <div className="col-md-12 search-content">
            <div className="content-block">
              <ShortHeaderLine headerText={translations["geo selection"]} />
              <div className="content-geo">
                <img src="/assets/img/intel_request/current_intel/geo_1.png" />
                <img src="/assets/img/intel_request/current_intel/geo_2.png" />
                <img src="/assets/img/intel_request/current_intel/geo_3.png" />
                <img src="/assets/img/intel_request/current_intel/geo_4.png" />
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText={translations["date/time range"]} />
              <div >
                
                <ModalFormBlock fields={dateTime} data={this.handleForm} initstate ={this.state.form} style={{width:"100%"}}/>

              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText={translations["data type filtering"]} />
              <div className="content-other">
                        <Select
                            name="form-field-name"
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            multi={true}
                            removeSelected={false}
                        />

                <br /><br />
                   
                    <Select
                            name="form-field-name"
                            value={selectedOption2}
                            onChange={this.handleChange2}
                            options={options}
                            multi={true}
                            removeSelected={false}
                        />
              </div>
            </div>
            <div className="content-block">
              <ShortHeaderLine headerText={translations["key word/phrase"]} />
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
                    {translations["clear"]}
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
                <div className="col-md-6">
                  <img clasName="button-line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className="highlighted-button" onClick={this.onEnter.bind(this)}>
                    {translations["route"]}
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search criteria"]} />
          </div>
          <div className="col-md-12">
            <img className="large-map" src="/assets/img/intel_request/operating_picture/large_map.png" alt="" />
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["search result"]} />
          </div>
          <div className="col-md-12">
            <div className="col-md-12">
              <ReactTable
                data={searchResult}
                columns={searchResultColumns}
                minRows={TableDefaults.MIN_ROWS}
                defaultPageSize={5}
                className="-striped -highlight"
                filterable
                defaultFilterMethod={(filter, row) =>
                  String(row[filter.id]) === filter.value}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CurrentIntelComponent.propTypes = {
  children: PropTypes.element,
};

export default CurrentIntelComponent;
