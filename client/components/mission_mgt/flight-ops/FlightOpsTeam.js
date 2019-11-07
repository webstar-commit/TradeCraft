import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, MissionConsts } from '../../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime, showAlert } from '../../../util/helpers';
import { flightOpsAtoCrew, flightOpsCrew, moveToFlightOPSFromATO, moveToATOFromFlightOPS } from 'actions/mssionmgt';
import FullHeaderLine from '../../reusable/FullHeaderLine';
import TimelineFilter from '../../reusable/TimelineFilter';
import Link from 'react-router-dom/Link';

class FlightOpsTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.TEAM,
      tab: MissionConsts.TABS.FOP,
      radioTeamId: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getColor= (row)=>{
    return getIntelStatusColor(row.original.Abbreviation);
  }

  // Move Left to Right
  // Updates CrewId in mission
  moveRight = (row) => {
    const IntelReqID = row.original.IntelRequestID ;
    const missionId = row.original.MissionId;    
    if(this.state.radioTeamId !== undefined && this.state.radioTeamId !== 0 && this.state.radioTeamId !== '') {
      const data = {
        'Id': missionId,
        'IntelReqID': IntelReqID,
        'CrewTeamId': this.state.radioTeamId,
        'Type': 'Crew',
      };
      this.props.moveToFlightOPSFromATO(missionId, data).then(() => {
        this.loadData();
        this.timeLine.onFind();
      });
    } else {
      showAlert('Please Select Team');
    }
  }

  // Move Right to Left
  // Updates CrewTeamId to null in mission
  moveLeft = (row) => {
    const IntelReqID = row.original.IntelRequestID ;    
    const missionId = row.original.MissionId ;    
    if((IntelReqID !== undefined && IntelReqID !== 0) && (missionId !== undefined && missionId !== 0)) {
      const data = {
        'Id': missionId,
        IntelReqID,
        'CrewTeamID': null,
        'Type': 'Crew',
      };
      this.props.moveToATOFromFlightOPS(data).then(() => {
        this.loadData();
        this.timeLine.onFind();
      });
    } else {
      showAlert('Please Select Team');
    }
  }

  loadData = () => {
    // const unitId = 25;
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // Left Table: Status = AAG and Crew Team Id == null
    this.props.flightOpsAtoCrew(unitId);
    // Right Table: Status = AAG and Crew Team Id != null
    this.props.flightOpsCrew(unitId);
  };

  radioFilterSelect=(value)=> {
    this.setState({
      radioTeamId: value,
    });
  }

  getLeftColumns = () => {
    const editurl = '/intel-request/detail/';
    const { translations } = this.props;
    return [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 100,
        Cell: row => <div>
          <Link to={`${editurl}${row.original.IntelRequestID}`}><span className="hand-cursor" >{row.value}</span></Link>
        </div>,
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
        maxWidth: 150,
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: 'Payload',
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations['Armed'],
        accessor: 'Armed',
        maxWidth: 80,
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.Assign,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 100,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Flight Ops" onClick={() => this.moveRight(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
            &nbsp;
            &nbsp;
            {/* <a href="javaScript:void('0');" className="btn btn-danger" title="Delete"><span className="glyphicon glyphicon-trash" /> </a> */}
          </div>
        ),
      },
    ];
  }

  getRightColumns = () => {
    const editurl = '/intel-request/detail/';
    const { translations } = this.props;
    return [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 100,
        Cell: row => <div>
          <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
          <Link to={`${editurl}${row.original.IntelRequestID}`}><span className="hand-cursor" >{row.value}</span></Link>
        </div>,
      },
      {
        Header: translations.Priority,
        accessor: 'Priority',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
        maxWidth: 150,
      },
      {
        Header: translations['Mission Type'],
        accessor: 'MissionTypeText',
      },
      {
        Header: translations['Date/Time'],
        id: 'BestCollectionTime',
        accessor: d => {
          return formatDateTime(d.BestCollectionTime);
        },
      },
      {
        Header: translations.Unassign,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 100,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveLeft(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];
  }

  render() {
    const { translations, fopCrews, fopCrewAto } = this.props;
    const columnsATOGenerations = this.getLeftColumns();
    const columnsFlightOps = this.getRightColumns();

    return (
      <div>
        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations.flightops} defaultResource={this.state.defaultResource} tab={this.state.tab} radioFilterSelect={this.radioFilterSelect} updateResource={this.props.updateResource}/>
        <div className="row mission-mgt">
          <div className="col-md-12">
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={fopCrewAto}
                    columns={columnsATOGenerations}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPageSizeOptions={true}
                    defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <FullHeaderLine headerText={translations.FlightOPS + ' (' + translations.team + ')'} />
                <div >
                  <ReactTable
                    data={fopCrews}
                    columns={columnsFlightOps}
                    defaultPageSize={TableDefaults.PAGE_SIZE}
                    minRows={TableDefaults.MIN_ROWS}
                    className="-striped -highlight"
                    filterable={false}
                    showPagination={true}
                   defaultFilterMethod={defaultFilter}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

FlightOpsTeam.propTypes = {
  children: PropTypes.element,
  updateResource: PropTypes.func,

};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    fopCrewAto: state.mssionmgts.fopCrewAto,
    fopCrews: state.mssionmgts.fopCrews,
  };
};

const mapDispatchToProps = {
  flightOpsAtoCrew,
  flightOpsCrew,
  moveToFlightOPSFromATO,
  moveToATOFromFlightOPS,

};
export default connect(mapStateToProps, mapDispatchToProps)(FlightOpsTeam);
