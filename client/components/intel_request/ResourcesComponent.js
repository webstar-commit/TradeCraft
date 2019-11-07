import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FullHeaderLine from '../reusable/FullHeaderLine';
import FormBlock from "../reusable/FormBlock";
import ModalFormBlock from "../reusable/ModalFormBlock";

import StatusTable from "../reusable/StatusTable";

import FilterDropdown from '../reusable/FilterDropdown';
import FilterDatePicker from '../reusable/FilterDatePicker';

import "react-table/react-table.css";
import ReactTable from 'react-table';
import TableRowDetailModal from '../reusable/TableRowDetailModal';

class ResourcesComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      intelRequest: {
        AreaOfOperations: '',
        SupportedCommand: '',
        SupportedUnit: '',
        NamedOperation: '',
        MissionType: '',
        SubMissionType: '',
        ActiveDateTimeStart: '',
        ActiveDateTimeEnd: '',
        BestCollectionTime: '',
        LatestTimeIntelValue: '',
        PriorityIntelRequirement: '',
        SpecialInstructions: '',
        PrimaryPayload: '',
        SecondaryPayload: '',
        Armed: '',
        PointofContact: '',
        ReportClassification: '',
        LIMIDSRequest: '',
        IC_ISM_Classifications: '',
        IntelReqStatus: '',
        MissionType1: '',
        MissionType2: '',
        Payload: '',
        Payload1: '',
        Unit: '',
      },
      tableRowDetailModalOpen: false,
      requirements: [
        { eei: '0000-01', name: 'torani farmhouse', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', view:'view', edit:'edit', del:'del' },
        { eei: '0000-02', name: 'izz-al-din bed-down', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-18', limids:'us/noforn', view:'view', edit:'edit', del:'del' },
        { eei: '0000-03', name: 'mogzu road', threat: 'ied', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-22', limids:'us/noforn', view:'view', edit:'edit', del:'del' },
        { eei: '0000-04', name: 'zahani fields', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-13', limids:'us/noforn', view:'view', edit:'edit', del:'del' },
        { eei: '0000-05', name: 'madrasaye mosque', threat: 'direct fire', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-06', limids:'us/noforn', view:'view', edit:'edit', del:'del' },
        { eei: '0000-06', name: 'gardez stadium', threat: 'rocket', location: 'gardez, afg', grid: '42swc20821753', pois:'poi-43', limids:'us/noforn', view:'view', edit:'edit', del:'del' },
      ]
      
    }
    
  }

  onClear(){
    console.log("clear");
  }

  onRoute(){
    console.log("route");
  }

  tableRowDetailModal = () => {  
		this.setState({
			tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
		})
	}

  render() {
    const {translations} = this.props;

    const intelRequest1 = [
      {name: translations['Support Command'], type: 'dropdown', domID: 'dispCOCOM', ddID:'COCOM',valFieldID:'SupportedCommand'},
      {name: translations['Named Operation'], type: 'dropdown',domID: 'dispNamedOp',valFieldID:'NamedOperation'},
      {name: translations['Mission Type'], type: 'dropdown', ddID: 'MissionType', domID: 'dispMissionType', valFieldID: 'MissionType'},
      {name: translations['Active Date'], type: 'date', domID: 'ActiveDateTimeStart', valFieldID: 'ActiveDateTimeStart'},
    ];

    const intelRequest2 = [
      {name: translations['Priority Intel Req'], type: 'dropdown', domID: 'PriorityIntelRequirement', ddID: 'PriorityIntelRequirement', valFieldID:'PriorityIntelRequirement'},
      {name: translations['Primary Sensor'], type: 'dropdown',ddID: 'Payload', domID:'dispPriSensor', valFieldID:'PrimaryPayload'},
      {name: translations['Secondary Sensor'], type: 'dropdown',ddID: 'Payload', domID:'dispSecSensor', valFieldID:'SecondaryPayload'},
      {name: translations['Armed'], type: 'dropdown',ddID: 'Munition', domID:'dispArmed', valFieldID:'Armed'},
    ];

    const intelRequest3 = [
      {name: translations['Best Collection Time'], type: 'input', domID: 'BestCollectionTime', valFieldID:'BestCollectionTime'},
      {name: translations['Latest Time of Intel Value'], type: 'input', domID: 'LatestTimeIntelValue', valFieldID: 'LatestTimeIntelValue'},
      {name: translations['Report Classification'], type: 'input', domID: 'ReportClassification', valFieldID: 'ReportClassification'},
      {name: translations['LIMIDS Request'], type: 'input', domID: 'LIMIDSRequest', valFieldID: 'LIMIDSRequest'},
    ]; 

    const requirementColumns = [
      {
        Header: translations["eei#"],
        accessor: 'eei', 
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
        Header: translations['Name'],
        accessor: 'name',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['threat'],
        accessor: 'threat',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      }, 
      {
        Header: translations['Location'],
        accessor: 'location',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
      {
        Header: translations['grid'],
        accessor: 'grid',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },

      {
        Header: translations['POIs'],
        accessor: 'pois',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },
        
      {
        Header: translations['LIMIDS Request'],
        accessor: 'limids',
        filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
      },

      {
        Header: translations['edit'],
        accessor: 'edit',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/eye_icon.png" /></span>// Custom cell components!
      }, 

      {
        Header: translations['edit'],
        accessor: 'edit',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/pen_icon.png" /></span>// Custom cell components!
      }, 

      {
        Header: translations['del'],
        accessor: 'del',
        filterable: false,
        Cell: props => <span className='number'><img src="/assets/img/general/trash_icon.png"  /></span>// Custom cell components!
      }
    ];

    const rowFields = [
			{name: translations['eei#'], type: 'input'},
			{name: translations['Name'], type: 'input'},
			{name: translations['threat'], type: 'input'},
			{name: translations['Location'], type: 'dropdown'},
			{name: translations['grid'], type: 'input'},
			{name: translations['POIs'], type: 'dropdown'},
			{name: translations['LIMIDS Request'], type: 'input'},
		];

    return (
      <div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["intelligence request"]} />
          </div>
          <div className="col-md-12">
            <div className="col-md-4">
              <ModalFormBlock fields={intelRequest1} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={intelRequest2} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={intelRequest3} />
            </div>
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["requirements/eei's"]} />
          </div>
          <div className="col-md-12">
            <ReactTable
              data={this.state.requirements}
              columns={requirementColumns}
              defaultPageSize={5}
              className="-striped -highlight"
              filterable
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id]) === filter.value}

                getTdProps={(state, rowInfo, column, instance) => {
                  return {
                    onClick: e =>{
                      console.log(column.Header);
                      if (column.Header == 'del')
                      {
                        var a = rowInfo.index;

                        var array = [...this.state.requirements]; 
                        array.splice(a, 1);
                        
                        console.log(array);
              
                        this.setState({
                          requirements: array
                        });
                      }

                      else if (column.Header == 'edit')
                      {
                        this.setState({
                          tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
                        });
                      }

                    }

                  };
                }}
            />
          </div>
        </div>
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations["special instructions/notes"]} />
          </div>
          <div className="col-md-12 special-instruction">
            this mission will be coordinated in conjunction with local forces. a joint, pre-mission planning meeting will be held at the jioc at 0900 tuesday
          </div>
        </div>
        <div className="row action-buttons" >
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onClear.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className="highlighted-button" onClick={this.onRoute.bind(this)}>
              {translations['route']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>

        <TableRowDetailModal show={this.state.tableRowDetailModalOpen} onClose={this.tableRowDetailModal} rowdata = {rowFields} translations = {translations}/>
      </div>
    );
  }
}

ResourcesComponent.propTypes = {
  children: PropTypes.element,
};

export default ResourcesComponent;
