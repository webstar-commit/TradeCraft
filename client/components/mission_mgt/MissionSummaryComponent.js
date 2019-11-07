import PropTypes from 'prop-types';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import {NoticeType, TableDefaults} from '../../dictionary/constants';
import { defaultFilter, getMissionStatusColor, formatDateTime } from '../../util/helpers';
import Loader from '../reusable/Loader';
import MissionDetailModel from '../mission/MissionDetailModel';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';

class MissionSummaryComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPlatformInventoryOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
    }
  }

  componentDidMount() {
    this.props.fetchMissionSummary();
  }
  
  getColor= (row)=> {
    return getMissionStatusColor(row.original.StatusId);
  }

  render() {

    const { translations } = this.props;
    const { allMissionSummary } = this.props;
    const { match } = this.props;

    const editurl = match.url.replace('/mission-summary', '/mission-detail/');

    const columns = [

      {
        Header: translations["Tail#"],
        accessor: 'TailNumber',
        Cell: row => <div className = 'tooltip-custom'>
          <a href = "javascript:void('0');" title = {row.original.Status}><span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /></a>
          <span> {row.value}</span>
        </div>,
      },
      {
        Header: translations['Crew Team'],
        accessor: 'CrewTeam',
      },
      {
        Header: translations['Ped Team'],
        accessor: 'PedTeam',
      },
      {
        Header: translations['Start Date'],
        id: 'StartDate',
        accessor: d => {
          return formatDateTime(d.StartDate);
        }
        
      },
      {
        Header: translations['End Date'],
        id: 'EndDate',
        accessor: d => {
          return formatDateTime(d.EndDate);
        }
      },
      {
        Header: translations.status,
        accessor: 'Status',
      },
     
      {
        Header: translations['view'],
        accessor: 'MissionId',
        filterable: false,
        //   Cell: row => <div>
        //  <a href="#" className="btn btn-primary" onClick={() => this.openPlatformForm(row.value)} title="Edit" >
        //   <span className="glyphicon glyphicon-edit"/></a>&nbsp;  
        //  {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow" title="Action Not Allowed" > 
        //  <span className="glyphicon glyphicon-trash"/></a> :
        //     <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"> <span className="glyphicon glyphicon-trash"/></a>}
        // </div>,
        Cell: row => <div>
          <Link to={`${editurl}${row.value}`} className="btn btn-primary">
            <span className="glyphicon glyphicon-eye-open"/>
          </Link>
        </div>,
      } 
    ];

    return (
      <div>
        <Loader loading={this.state.loading} />

        <div className="row orders-assets">
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
              {translations.mission}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>
          
          {this.state.addPlatformInventoryOpen ?
            <MissionDetailModel editId = {this.state.editId} onClose={this.closePlatformForm} translations={translations} />
            : null}
      
          <div className="col-md-12">
            <ReactTable
              data={allMissionSummary}
              columns={columns}
              className="-striped -highlight"              
              filterable={true}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.MIN_ROWS}
              loading={this.props.isLoading}
						  defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>

      </div>
    );
  }
}

MissionSummaryComponent.propTypes = {
  children: PropTypes.element,

};

export default MissionSummaryComponent;
