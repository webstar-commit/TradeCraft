import React from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { defaultFilter, formatDateTime, getIntelStatusColor, getConfirmation } from '../../util/helpers';
import { TableDefaults, IntelConstants } from '../../dictionary/constants';
import { NotificationManager } from 'react-notifications';
import Loader from '../reusable/Loader';
import AddCollectionValidationModal from '../reusable/AddCollectionValidationModal';
import { collectionManagerUser, adminUser, superAdmin } from '../../dictionary/auth';

class RequestComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
      tableRowDetailModalOpen: false,
      serialVal: '',
      nameVal: '',
      form: {
        type: 'Test',
      },
      loading: false,
      modalOpen: false,
      IntelRequestID: null,

    };

    moment.locale('en');
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.props.fetchIntelRequests();
  }

  openAddCollectionValidationModal = (row) => {
    const IntelRequestID = row.original.IntelRequestID;
    this.setState({
      modalOpen: true,
      IntelRequestID,
    });
  }

  saveCollectionValidationModal = (intelRequest) => {
    this.closeCollectionValidationModal();
    this.notify();
    this.loadData();
    // this.props.sendEmails(content, row.original.MissionId).then(() => {
    //   this.closeEmailModal();
    //   this.notify();
    // });
  }

  notify = () => {
    const { translations } = this.props;
    NotificationManager.success('', 'Collection Validation is  added successfully.', 5000);

  };

  closeCollectionValidationModal = () => {
    this.setState({
      modalOpen: false,
      IntelRequestID: null,
    });
  }

  // This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
    const { translations } = this.props;
    this.setState({ loading: true });

    this.props.deleteIntelRequestById(value).then(() => {
      this.setState({ loading: false });
      if(this.props.isDeleted) {
        NotificationManager.success(translations.DeletedSuccesfully, translations['Intel Request Title'], 5000);
        this.props.fetchIntelRequests();
      } else{
        NotificationManager.error(translations.DeleteUnSuccessfull, translations['Intel Request Title'], 5000);
      }
    });
  }

  // will call when user click on Delete Button
  deleteIntelRequestById =(value)=>{
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No
    getConfirmation(translations.DeleteConfirmation,
      translations.Yes,
      translations.No,
      () => this.deleteLogic(value)
    );
  }

  getColor= (row)=> {
    return getIntelStatusColor(row.original.Abbreviation);
  }
  render() {

    const { translations } = this.props;

    const { allRequests } = this.props;

    const { match } = this.props;

    const addurl = match.url.replace('/request', '/request-form');
    const editurl = match.url.replace('/request', '/detail/');


    const ses = JSON.parse(localStorage.getItem('session'));
    const roles = JSON.parse(ses.UserRoles);
    const isCollectionMgr = roles.some(v => collectionManagerUser.includes(v));
    const isSuperAdmin = roles.some(v => superAdmin.includes(v));
    const isVisibleCollectionManager = isCollectionMgr && isSuperAdmin;

    const columns = [
      {
        Header: translations['IR#'],
        accessor: 'ReqUserFrndlyID',
        maxWidth: 100,
        Cell: row => <div>
          <span style ={this.getColor(row)} className="glyphicon glyphicon-stop" /> &nbsp;
          <Link to={`${editurl}${row.original.IntelRequestID}`}> <span>{row.value}</span></Link>
        </div>,
      },
      {
        Header: translations.status,
        id: 'StatusId',
        accessor: 'Status',
      },
      {
        Header: translations['Named Operation'],
        accessor: 'CCIRPIRName',
      },
      {
        Header: translations.Command,
        accessor: 'COCOMText',
        maxWidth: 150,
      },
      {
        Header: translations.MissionType,
        accessor: 'MissionTypeText',
      },
      {
        Header: translations.payload,
        accessor: 'PrimaryPayloadName',
      },
      {
        Header: translations.originator,
        accessor: 'OrginatorPersonnelID',
        Cell: row => <div>{row.original.OriginatorFirstName} {row.original.OriginatorLastName} </div>,
      },
      {
        Header: translations.date,
        id: 'ActiveDateTimeStart',
        maxWidth: 150,
        accessor: d => {
          return formatDateTime(d.ActiveDateTimeStart);
        },
      },
      {
        Header: translations.LTIV,
        id: 'LatestTimeIntelValue',
        maxWidth: 150,
        accessor: d => {
          return formatDateTime(d.LatestTimeIntelValue);
        },
      },
      {
        Header: translations.view,
        accessor: 'IntelRequestID',
        filterable: false,
        maxWidth: 200,
        Cell: row => <div>  <Link to={`${editurl}${row.value}`} className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-edit"/></Link> &nbsp;

          { (row.original.MissionId !== null) ? '' :
            <span><a href="javaScript:void('0');" className="btn btn-danger btn-sm" > <span className="glyphicon glyphicon-trash" onClick={() => this.deleteIntelRequestById(row.value)}/></a> &nbsp;
              { (isVisibleCollectionManager && row.original.Abbreviation === IntelConstants.STATUS.AV.abbreviation) ? <a href="javaScript:void('0');" className="btn btn-danger btn-sm" > <span className="glyphicon glyphicon-plus" title="Add Collection Validation" onClick={() => this.openAddCollectionValidationModal(row)}/></a> : '' }
            </span>
          }

        </div>,
      },
    ];

    return (
      <div>
          <AddCollectionValidationModal show = {this.state.modalOpen} onClose={this.closeCollectionValidationModal} 
          IntelRequestID = { this.state.IntelRequestID }
          save = {this.saveCollectionValidationModal} translations = {translations}/>
        <div className="row orders-assets">
          <div className="header-line">
            <Loader loading={this.state.loading} />
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations.summary} &nbsp;
              <Link to={ addurl } className="btn btn-info btn-xs add-data"><i className="fa fa-plus"/>&nbsp;{translations.Add}</Link>

            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="col-md-12 filter-line">

            {/* <Link to={ itemurl } activeClassName="btn btn-warning">{translations['New request'}</Link> */}
            {/* <Link to={ addurl } className="btn btn-warning">New Request</Link> */}

            {/*             <NavLink to={itemurl} className="submenu" activeClassName="active-submenu-item">
              <div className="add-button">
                <button className="bt btn-warning">New Request</button>
              </div>
            </NavLink>
 */}
          </div>
          <div className="col-md-12" id="intel-request" >
            <ReactTable
              data={allRequests}
              loading={this.props.isLoading}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.MIN_ROWS}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={defaultFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

RequestComponent.propTypes = {
  children: PropTypes.element,

};

export default RequestComponent;
