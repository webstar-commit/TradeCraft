import PropTypes from 'prop-types';
import React from 'react';
import 'react-calendar-timeline/lib/Timeline.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { TableDefaults, NoticeType, MissionConsts, IntelConstants } from '../../dictionary/constants';
import { defaultFilter, getIntelStatusColor, formatDateTime, showAlert } from '../../util/helpers';
import FullHeaderLine from '../reusable/FullHeaderLine';
import TimelineFilter from '../reusable/TimelineFilter';
import { NotificationManager } from 'react-notifications';
import { Link } from 'react-router-dom';
import MissionNameModal from '../reusable/MissionNameModal';

import { missionATOUser } from '../../dictionary/auth';

class AtoComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultResource: MissionConsts.RESOURCE.PLATFORM,
      tab: MissionConsts.TABS.ATO,
      radioUnitId: '',
      modalOpen: false,
      row: {},
    };
  }

  componentDidMount() {
    this.loadData();
  }

  deleteApprovedIntelRequests = (value) => {
    /* if (value !== undefined && value !== '0') {
      const statusId = 7; // 'DRC'
      this.props.deleteApprovedIntelRequestById(value, statusId).then(() => {
        this.setState({ editId: '0' });
        this.notify(NoticeType.DELETE);
        this.loadData();
      });
    } */
  };

  getColor= (row) => {
    return getIntelStatusColor(row.original.Abbreviation);
  }

  radioFilterSelect=(selectedRadio)=>{

    this.setState({
      // unitdId: generatedData.value,
      // owningUnitsId: generatedData.value,
      radioUnitId: selectedRadio,
    });
  }

  missionModalNameModal = (row) => {
    if(this.state.radioUnitId !== '' && this.state.radioUnitId !== 0) {
      this.state.row = row;
      this.setState({
        modalOpen: !this.state.modalOpen,
      });
    }else{
      showAlert('Please Select a Platform');
      // alert('Please Select a Platform');
    }

  }

moveLeft = (row) => {
  const intelRequestID = row.original.IntelRequestID;
  if(this.state.radioUnitId !== '' && this.state.radioUnitId !== 0) {
    const data = {
      'IntelReqID': intelRequestID,
      'OwningUnit': this.state.radioUnitId,
    };

    // Inserts new values in mission table
    this.props.moveToATOGenerationFromCollectionPlan(data).then(() => {
      //this.missionModalNameModal(null);
      this.loadData();
      this.timeLine.onFind();
    });

  } else {
    showAlert('Please Select a Platform');
    // alert('Please Select a Platform');
  }
}

  moveRight = (row) => {
    // deletes from mission table by mission id
    const missionId = row.original.MissionId;
    const intelRequestID = row.original.IntelRequestID;

    this.props.moveToCollectionPlanFromATOGeneration(missionId).then(() => {

      const statusId = IntelConstants.STATUS.APR.id; // 'APR'
      this.props.updateIntelStatus(intelRequestID, statusId).then(() => {
        this.loadData();
        this.timeLine.onFind();
      });
    });
  };

  routeATOGenerations = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    const statusId = IntelConstants.STATUS.AAG.id;// 'AAG';
    this.props.routeATOGeneration(unitId, statusId).then(() => {
      // this.notify(NoticeType.ROUTE_COLLECTION_INTEL_REQUEST);
      this.loadData();
    });
  };

  loadData = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    // CP = All intel with Status = APR for given unitId
    this.props.fetchATOCollectionPlans(IntelConstants.STATUS.APR.id, unitId);

    // ATO = All Intel with Status = AAG or APR and which has an entry in missionId table
    this.props.fetchATOGenerations(unitId);
  };

  notify = actionType => {
    const { translations } = this.props;
    if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['Intel Request update'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.ADD === actionType) {
      NotificationManager.success(translations['Intel Request add'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_COLLECTION === actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.MOVE_TO_INTEL_REQUEST === actionType) {
      // NotificationManager.success(translations['Intel Request moved'], translations['Intel Request Title'], 5000);
    } else if (NoticeType.DELETE === actionType) {
      NotificationManager.success(translations['Intel Request delete'], translations['Intel Request Title'], 5000);
    }
  };

  onFind() {
    console.log('find');
  }

  getLeftColumns = () => {
    const editurl = '/intel-request/detail/';
    const { translations } = this.props;
    return [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 100,
        Cell: row => <div className="tooltip-custom">
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
        Header: translations.Armed,
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
      // {
      //   Header: translations['Asset'],
      //   accessor: 'Asset',
      //   Cell: ({ value }) => (value ? 'Yes' : 'No'),
      // },
      {
        Header: translations.Add,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 100,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To ATO Generation" onClick={() => this.moveLeft(row)}> <span className="glyphicon glyphicon-circle-arrow-right" /></a>
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
        Cell: row => <div className="tooltip-custom">
          <a href="Javascript:void(0)" title={row.original.Status} ><span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /></a>
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
        Header: translations.Armed,
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
      // {
      //   Header: translations['Asset'],
      //   accessor: 'Asset',
      //   Cell: ({ value }) => (value ? 'Yes' : 'No'),
      // },
      {
        Header: translations.Remove,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 100,
        Cell: row => (
          <div>
            <a href="javaScript:void('0');" className="btn btn-primary" title="Move To Collection Plan" onClick={() => this.moveRight(row)}> <span className="glyphicon glyphicon-circle-arrow-left" /></a>
            &nbsp;
          </div>
        ),
      },
    ];
  }

  render() {

    const { translations } = this.props;
    const { atoCollectionPlans } = this.props;
    const { atoGenerations } = this.props;
    const columnsATOCollectionPlans = this.getLeftColumns();
    const columnsATOGenerations = this.getRightColumns();

    let ses = JSON.parse(localStorage.getItem('session'));
    let roles = ses.UserRoles;
    let roles2 = JSON.parse(roles);
    let access = roles2.some(v => missionATOUser.includes(v));

    return ( access ? (
      <div>
        <TimelineFilter onRef={ref => (this.timeLine = ref)} translations={translations} headerTxt={translations.ato} defaultResource={this.state.defaultResource} tab={this.state.tab}
          radioFilterSelect={this.radioFilterSelect} showUnitType={this.state.showUnitType} />
        <div className="row mission-mgt">
          <div className="col-md-12">
            {/* <MissionNameModal show={this.state.modalOpen} onClose={this.missionModalNameModal} row = {this.state.row} moveLeft = {this.moveLeft} translations = {translations}  /> */}
            <div className="row collection-plan-table-margin-top">
              <div className="col-md-6">
                <FullHeaderLine headerText={translations.CollectionPlan} />
                <div >
                  <ReactTable
                    data={atoCollectionPlans}
                    columns={columnsATOCollectionPlans}
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
                <FullHeaderLine headerText={translations.ATOGeneration} />
                <div >
                  <ReactTable
                    data={atoGenerations}
                    columns={columnsATOGenerations}
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
        <div className="row route action-buttons">
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button className='highlighted-button' onClick={() => this.routeATOGenerations()} >
                  Route
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
                </div>

    </div> ) : null
    );
  }

}

AtoComponent.propTypes = {
  children: PropTypes.element,

};

export default AtoComponent;
