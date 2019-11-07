import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import FullHeaderLine from 'components/reusable/FullHeaderLine';
import ShortHeaderLine from 'components/reusable/ShortHeaderLine';

import Map from 'components/reusable/Map';
import ModalFormBlock from 'components/reusable/ModalFormBlock';
import { viewerIdentifiers } from 'map/viewer';

import 'react-table/react-table.css';
import { NotificationManager } from 'react-notifications';
import { NoticeType, IntelConstants, DateConsts } from 'dictionary/constants';
import IntelEEI from './IntelEEI';
import { fetchIntelRequestById, addIntelRequest, updateIntelRequest } from 'actions/intel';
import { Redirect } from 'react-router-dom';
import Loader from '../reusable/Loader';
import { requestHeaders, baseUrl } from '../../dictionary/network';
import moment from 'moment';
import uuid from 'uuid/v4';

import { collectionManagerUser, adminUser } from '../../dictionary/auth';
import { fetchCcirPirs } from 'actions/ccirpir';
import { fetchNextHigherUnit } from 'actions/organicorg';
import { fetchLocations } from 'actions/location';

class RequestForm extends React.Component {

  constructor(props) {
    super(props);

    const session = JSON.parse(localStorage.getItem('session'));
    const dt  = moment().add(5, 'days');
    const active = dt.startOf('day').format(DateConsts.DB_DATETIME_FORMAT);
    const bct = dt.add(3, 'hours').format(DateConsts.DB_DATETIME_FORMAT);
    const ltiv = dt.add(6, 'hours').format(DateConsts.DB_DATETIME_FORMAT);
    const unitId = session.AssignedUnit;
    this.state = {
      firstCcir: '',
      ccirCountry: 'US',
      ccirPirMap: {},
      updatedLocation: '',
      toRedirect: false,
      editFetched: false,
      clear: false,
      selectedLocationCategory: '',
      intelRequest: {
        IntelRequestID: '',
        MissionId: null,
        locationcategory: '',
        // AreaOfOperations: '',
        SupportedCommand: session.COCOMID,
        SupportedUnit: unitId,
        // NamedOperation: '',
        // MissionType: '',
        // SubMissionType: '',
        ActiveDateTimeStart: active,
        // ActiveDateTimeEnd: '',
        BestCollectionTime: bct,
        LatestTimeIntelValue: ltiv,
        // PriorityIntelRequirement: '',
        // SpecialInstructions: '',
        // PrimaryPayload: '',
        // SecondaryPayload: '',
        // Armed: '',
        OriginatorFirstName: session.userName,
        OriginatorDSN: session.Telephone,
        OriginatorEmail: session.EmailSIPR,
        // ReportClassification: '',
        // LIMIDSRequest: '',
        // IC_ISM_Classifications: '',
        // IntelReqStatus: '',
        // MissionType1: '',
        // MissionType2: '',
        // Payload: '',
        StatusId: IntelConstants.STATUS.OP.id,
        UnitId: unitId,
      },
      loading: false,
      ccirPirOptions: [],
      pirs: {},
      ccirsOpts: {},
    };

    // this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.setCCIRPIR = this.setCCIRPIR.bind(this);
    this.setOneLocation = this.setOneLocation.bind(this);

  }

  componentDidMount = () =>{

    const { match: { params } } = this.props;
    const editId = params.editId;
    const session = JSON.parse(localStorage.getItem('session'));
    const unitId = session.AssignedUnit;
    const { intelRequest } = this.state;

    // // setting next higher unit
    // this.props.fetchNextHigherUnit(unitId);
    this.props.fetchNextHigherUnit(unitId).then(() => {
      this.setState({
        intelRequest: {
          ...intelRequest,          
          NextHigherUnitId: this.getHigherUnit(),
        },
      });
    });

    // saving all NAI location in loca storage for Cesim Map
    this.props.fetchLocations(2).then(()=>{
      const { allLocations } = this.props;
      localStorage.setItem('NAI', JSON.stringify(allLocations));
    });

    // saving all POI location in loca storage for Cesim Map
    this.props.fetchLocations(3).then(()=>{
      const { allLocations } = this.props;
      localStorage.setItem('POI', JSON.stringify(allLocations));
    });

    // creating different dropdonws
    this.createCcirPirData(editId);

  }

getHigherUnit = () => {
  const { higherUnit } = this.props;
  const higherId = higherUnit.length > 0 ? higherUnit[0].unitID : null;
  return higherId;
}

//  Creating dropdonws for:-
//  CCIRPIR with ccirId as key and MissionName as value
//  CCIR only with column name as key and its vale as label
//  PIR Only with column name as key and its vale as label
createCcirPirData = (editId) => {

  this.props.fetchCcirPirs().then(() =>{
    const {translations}=this.props;
    const { allCcirPirs } = this.props;
    localStorage.setItem('KMLdata', JSON.stringify(allCcirPirs));
    
    // array for ccirpir drodponow
    const ccirPirOptions = [{ 'label': translations['Select Item'], 'value': '' }];

    // map for pir dropdonw only, to fetch pir by ccirpirId
    const pirs = {};

    // map for ccir dropdonw only, to fetch ccir by ccirpirId
    const ccirsOpts = {};

    // map contains all ccirPirObjects by ccirpirid
    const ccirPirMap = {};
    allCcirPirs.map(item => {
      let val = item.CCIRPIRId;
      if(typeof val === 'string') {
        val = val.trim();
      }
      ccirPirOptions.push({ 'label': item.MissionName, 'value': val });

      ccirPirMap[item.CCIRPIRId] = item;

      // pir options for drodown for given ccirid
      const pirOptions = [
        { 'value': 'Description5', 'label': item.Description5 },
        { 'value': 'Description6', 'label': item.Description6 },
        { 'value': 'Description7', 'label': item.Description7 },
        { 'value': 'Description8', 'label': item.Description8 },
      ];
      pirs[item.CCIRPIRId] = pirOptions;

      // cciir options for drodown for given ccirid
      const cirOptions = [
        { 'value': 'Description1', 'label': item.Description1 },
        { 'value': 'Description2', 'label': item.Description2 },
        { 'value': 'Description3', 'label': item.Description3 },
        { 'value': 'Description4', 'label': item.Description4 },
      ];
      ccirsOpts[item.CCIRPIRId] = cirOptions;

    });
    // setting options in state
    this.setState({
      ccirPirOptions,
      pirs,
      ccirsOpts,
      ccirPirMap,
    }, () => {
      // Populate ciirpir dropodnw with options
      this.updateCCIROptions(ccirPirOptions, '');
      // call edit method when all dropdowns data is fetched
      this.editComponent(editId);
    });
  });

}

editComponent = (editId) => {
  
  if(editId !== undefined && editId !== '') {
    this.props.fetchIntelRequestById(editId).then(()=> {
      const { oneIntelRequest } = this.props;
      
      const selectedCCIR = this.state.ccirPirMap[oneIntelRequest.NamedOperation];
      this.setState(
        {
          intelRequest: {
            ...oneIntelRequest,
            NextHigherUnitId: oneIntelRequest.NextHigherUnitId === null ? this.getHigherUnit() : oneIntelRequest.NextHigherUnitId,
          },
          editFetched: true,
          // firstCcir: this.state.ccirsOpts[oneIntelRequest.NamedOperation][0].label,
          firstCcir: selectedCCIR.Description1,
          ccirCountry: selectedCCIR.CountryId,
        });
      this.updateCCIROptions(this.state.ccirPirOptions, oneIntelRequest.NamedOperation);
      this.updatePirOptions(this.state.pirs[oneIntelRequest.NamedOperation], oneIntelRequest.PriorityIntelRequirement);
    });
  }
}

  handleIntelRequest1 = (ir) => {
    const { intelRequest } = this.state;
    const selectedCCIR = this.state.ccirPirMap[ir.NamedOperation];
    let CountryId = 'US';
    let firstCcir = '';
    
    if(selectedCCIR) {
      // if(selectedCCIR.CountryId) {
        CountryId = selectedCCIR.CountryId;
      // }
      // if(selectedCCIR.Description1) {
        firstCcir = selectedCCIR.Description1;
      // }
    }
    this.setState({
      intelRequest: {
        ...intelRequest,
        SupportedCommand: ir.SupportedCommand,
        NamedOperation: ir.NamedOperation,
        MissionType: ir.MissionType,
        ActiveDateTimeStart: ir.ActiveDateTimeStart,
        PriorityIntelRequirement: ir.PriorityIntelRequirement,
      },
      ccirCountry: CountryId,
      firstCcir,
      // ccirCountry: (selectedCCIR !== undefined && selectedCCIR.CountryId !== undefined) ? selectedCCIR.CountryId : '',
      // firstCcir: (selectedCCIR !== undefined && selectedCCIR.Description1 !== undefined) ? selectedCCIR.Description1 : '' ,
    });

    this.updatePirOptions(this.state.pirs[ir.NamedOperation], 'Description5');
  }

  handleIntelRequest2 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PrimaryPayload: ir.PrimaryPayload,
        SecondaryPayload: ir.SecondaryPayload,
        Armed: (ir.Armed == undefined || ir.Armed == '' || ir.Armed == null) ? true : ir.Armed,
        BestCollectionTime: ir.BestCollectionTime,
        LatestTimeIntelValue: ir.LatestTimeIntelValue,
      },
    });
  }

  handleIntelRequest3 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        ReportClassification: ir.ReportClassification,
        locationID: ir.locationID,
        locationcategory: ir.locationcategory,
        // AssetId: ir.AssetId,
        // PointofContact: intelRequest3.PointofContact,
        // DSN: intelRequest3.DSN,
        // EmailSIPR: intelRequest3.EmailSIPR,
      },
      selectedLocationCategory: ir.locationcategory,
    });

    if(ir.locationcategory && ir.locationcategory !== this.state.selectedLocationCategory) {
      this.updatelocationid(ir);
    }
  }

  handleIntelRequest4 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        // OrganicUnit: ir.OrganicUnit,
        StatusId: ir.StatusId,
        NextHigherUnitId: ir.NextHigherUnitId,
      },
    });
  }

  handleIntelRequest5 = (ir) => {
    const { intelRequest } = this.state;
    this.setState({
      intelRequest: {
        ...intelRequest,
        PriorityId: ir.PriorityId,
        SpecialInstructions: ir.SpecialInstructions,
      },
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { intelRequest } = this.state;
    intelRequest.Armed = (intelRequest.Armed == undefined || intelRequest.Armed === null || intelRequest.Armed === '') ? 'true' : intelRequest.Armed;
    const { match: { params } } = this.props;
    const editId = params.editId;
    const session = JSON.parse(localStorage.getItem('session'));
    
    
    // intelRequest.OrginatorPersonnelID = '16e5eb94-41c1-4385-84da-e52bd843d17d'; // id of user from session
    this.setState({ loading: true });
    const redirectUrl = '/intel-request/detail/';

    if(editId !== undefined && editId !== '0') {
      intelRequest.IntelRequestID = editId;
      this.props.updateIntelRequest(editId, intelRequest).then(() => {
        this.props.history.push(redirectUrl + editId);
        this.notify(NoticeType.UPDATE);
        this.setState({
          loading: false,
        });
      });
    } else {
      intelRequest.OrginatorPersonnelID = session.PersonnelID; // id of user from session
      intelRequest.UnitId = session.AssignedUnit;
      intelRequest.SupportedUnit = session.AssignedUnit;
      this.props.addIntelRequest(intelRequest).then(() => {
        this.notify(NoticeType.ADD);
        this.props.history.push(redirectUrl + this.props.oneIntelRequest.IntelRequestID);
        this.setState({
          intelRequest: this.props.oneIntelRequest,
          loading: false,
        });
      });
    }
  }

notify = (type) => {
  const { translations } = this.props;

  if(type === NoticeType.ADD) {
    NotificationManager.success(translations.AddedSuccesfully, translations['intel request'], 5000);
  } else if(type === NoticeType.UPDATE) {
    NotificationManager.success(translations.UpdatedSuccesfully, translations['intel request'], 5000);
  } else if(type === NoticeType.DELETE) {
    NotificationManager.success(translations.DeletedSuccesfully, translations['intel request'], 5000);
  } else if(type === NoticeType.ERROR) {
    NotificationManager.error(translations.ERROR, translations['intel request'], 5000);
  }
}

stopUpdate = () => {
  this.setState({ editFetched: false });
}

stopset = () => {
  this.setState({ clear: false });
}
setCCIRPIR = (ccirpirObj) =>{
  const { intelRequest } = this.state;
  this.setState({
    intelRequest: {
      ...intelRequest,
      NamedOperation: ccirpirObj.CCIRPIRId,
    },

    editFetched: true,
    firstCcir: ccirpirObj.CCIRPIR,
    ccirCountry: ccirpirObj.CountryId,
  });
}
setOneLocation = (location, currentLatLong) =>{
  const updatedLocation = {
    location,
    uid: uuid(),
    currentLatLong,
  };
  this.setState({
    updatedLocation,
  });
}

resetForm() {
  const {translations}=this.props;
  if (confirm(translations['ClearConfirmation'])) {
    this.setState({ clear: true });
    document.getElementById('personnelform').reset();
  }
}

// will call to change the Status to Approved Validated on click of Route Button.
routeStatus(e) {
  e.preventDefault();
  const {IntelRequestID} = this.state.intelRequest;
  // start loader
  this.setState({
    loading: true,
  });
  this.props.updateIntelStatus(IntelRequestID, IntelConstants.STATUS.AV.id).then((response) => {
    console.log(response);
    if(this.props.isStatusUpdated) {
      const { intelRequest } = this.state;
      this.setState({
        intelRequest: {
          ...intelRequest,
          Abbreviation: IntelConstants.STATUS.AV.abbreviation,
        },
      });
      // stop Loader
      this.setState({
        loading: false,
      });
      // Update Notification
      this.notify(NoticeType.UPDATE);
    }else {
      // stop Loader
      this.setState({
        loading: false,
      });
      // Error Notification
      this.notify(NoticeType.ERROR);
    }
  });
}

updateCCIROptions = (items, ccirid) => {

  if(items !== null && items !== undefined) {
    const nameOperationSelect = document.getElementsByName('NamedOperation')[0];
    nameOperationSelect.length = 0;

    items.forEach((element) => {
      let selected = false;
      if(ccirid && element.value === ccirid) {
        selected = true;
      }
      nameOperationSelect.add(new Option(element.label, element.value, selected, selected));
    });

  }
}

updatePirOptions = (items, pirdesc) => {
  if(items !== null && items !== undefined) {
    const pirSelect = document.getElementsByName('PriorityIntelRequirement')[0];
    pirSelect.length = 0;
    items.forEach((element) => {
      let selected = false;
      if(pirdesc && element.value === pirdesc) {
        selected = true;
      }
      pirSelect.add(new Option(element.label, element.value, selected, selected));
    });

  }
}
updatelocationid(generalData) {
  const locationselect = document.getElementsByName('locationID')[0];
  locationselect.length = 0;
  locationselect.add(new Option('--Fetching Locations--', ''));
  const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=` + generalData.locationcategory;
  axios.get(apiUrl, { headers: requestHeaders })
    .then(response => {
      locationselect.length = 0;
      if(response.data) {
        locationselect.add(new Option('--Select Location--', ''));
        response.data.map(item => {
          let selected = false;
          if(item.id === generalData.locationID) {
            selected = true;
          }
          locationselect.add(new Option(item.description, item.id.trim(), selected, selected));
        });
      }else{
        locationselect.add(new Option('No Location Found', ''));
      }

    })
    .catch((error) => {
      locationselect.length = 0;
      locationselect.add(new Option('Error Fetching Locations', ''));
      console.log('Exception comes:' + error);
    });
}

renderCCIRPIR = () =>{
  let pirlist = [];
  const { intelRequest, pirs } = this.state;
  if(intelRequest !== undefined && intelRequest.NamedOperation !== undefined && pirs[intelRequest.NamedOperation] !== undefined) {
    pirlist = pirs[intelRequest.NamedOperation];
  }

  return pirlist.map((data, key) => {
    if(data.label && data.label.trim() !== '') {
      return (
        <li key={key}>{data.label}</li>
      );
    }

  });
}

render = () => {
  const { translations } = this.props;
  const armedOptions = [{ value: true, label: translations['Yes'] }, { value: false, label: translations['No'] }];
 

  const { match: { params } } = this.props;
  const editId = params.editId;

  const { intelRequest } = this.state;

  const ses = JSON.parse(localStorage.getItem('session'));
  const roles = JSON.parse(ses.UserRoles);
  // admin have all access as admin also contains collection mgr and collection mgr can't add new intel req so admin should be excluded from this check
  const isCollectionMgr = roles.some(v => collectionManagerUser.includes(v));
  const isAdmin = roles.some(v => adminUser.includes(v));
  const isDisabled = isCollectionMgr && !isAdmin;

  

  const intelRequest1 = [
    { name: translations['Support Command'], type: 'dropdown', domID: 'dispCOCOM', ddID: 'COCOM', valFieldID: 'SupportedCommand', required: true, disabled: isDisabled },
    { name: translations['Named Operation'], type: 'dropdown', domID: 'dispNamedOp', valFieldID: 'NamedOperation', required: true, options: [{ label: '--Loading--', value: '' }], disabled: isDisabled },
    { name: translations['Mission Type'], type: 'dropdown', ddID: 'MissionType', domID: 'dispMissionType', valFieldID: 'MissionType', required: true, disabled: isDisabled },
    { name: translations['Active Date'], type: 'date', domID: 'ActiveDateTimeStart', valFieldID: 'ActiveDateTimeStart', required: true, disabled: isDisabled },
    { name: translations['Priority Intel Req'], type: 'dropdown', domID: 'PriorityIntelRequirement', valFieldID: 'PriorityIntelRequirement', required: true, options: [{ label: translations['Select Named Operation First'], value: '' }], readOnly: isDisabled },
  ];

  const intelRequest2 = [

    { name: translations['Primary Sensor'], type: 'dropdown', ddID: 'PayloadType/GetPayloadTypes', domID: 'dispPriSensor', valFieldID: 'PrimaryPayload', required: true, disabled: isDisabled },
    { name: translations['Secondary Sensor'], type: 'dropdown', ddID: 'PayloadType/GetPayloadTypes', domID: 'dispSecSensor', valFieldID: 'SecondaryPayload', required: true, disabled: isDisabled },
    { name: translations.Armed, type: 'dropdown', ddID: '', domID: 'dispArmed', valFieldID: 'Armed', options: armedOptions, disabled: isDisabled },
    { name: translations['Best Collection Time'], type: 'date', domID: 'BestCollectionTime', valFieldID: 'BestCollectionTime', required: true, disabled: isDisabled },
    { name: translations['Latest Time of Intel Value'], type: 'date', domID: 'LatestTimeIntelValue', valFieldID: 'LatestTimeIntelValue', required: true, disabled: isDisabled },
  ];

  // Following fields is visible only to Collection manager and also only in case of edit
  const intelRequest3 = [
    { name: translations['Location Category'], type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory', required: true, disabled: isDisabled },
    { name: translations['Location ID'], type: 'dropdown', domID: 'locationID', valFieldID: 'locationID', required: true, options: [{ label: translations['Select Location Category'], value: '' }], disabled: isDisabled },
    { name: translations['Report Classification'], type: 'dropdown', ddID: 'Clearance/GetIC_ISM_Classifications', domID: 'dispReportClass', valFieldID: 'ReportClassification', required: true, disabled: isDisabled },
    // {name: translations['LIMIDS Request'], type: 'input', domID: 'LIMIDSRequest', valFieldID: 'LIMIDSRequest'},
    { name: translations.originator, type: 'input', domID: 'dispLocationPointofContact', ddID: '', valFieldID: 'OriginatorFirstName', readOnly: true },
    { name: translations.DSN, type: 'input', domID: 'DSN', valFieldID: 'OriginatorDSN', readOnly: true },
    { name: translations['Email-SIPR'], type: 'input', domID: 'EmailSIPR', valFieldID: 'OriginatorEmail', readOnly: true },
  ];

  const isStatusDisabled = intelRequest.Abbreviation === IntelConstants.STATUS.APR.abbreviation || intelRequest.Abbreviation === IntelConstants.STATUS.AV.abbreviation || (intelRequest.MissionId !== null && intelRequest.MissionId !== undefined);
  let statusElem = { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: isStatusDisabled, valFieldID: 'StatusId', required: true };
  
  if(isStatusDisabled) {
    const options = [{ label: intelRequest.Status, value: intelRequest.StatusId }];
    // statusElem = { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', disabled: true, valFieldID: 'StatusId', options };
    statusElem = { name: translations.DispositionStaus, type: 'input', domID: 'dispDispositionStatus', readOnly: true, valFieldID: 'Status' };
  }

  const intelRequest4 = [
    statusElem,
    // { name: translations.DispositionStaus, type: 'dropdown', domID: 'dispDispositionStatus', ddID: 'StatusCodes/GetIntelReqStatusCodes', disabled: intelRequest.MissionId, valFieldID: 'StatusId', required: true },
    { name: translations.OrganicUnit, type: 'dropdown', domID: 'organicUnt', ddID: 'Units/GetUnits', valFieldID: 'SupportedUnit', disabled: true },
    { name: translations.NextHigherUnit, type: 'dropdown', domID: 'nextHigherUnit', ddID: 'Units/GetUnits', valFieldID: 'NextHigherUnitId' },
  ];

  const intelRequest5 = [
    { name: translations.Priority, type: 'dropdown', domID: 'intelPriority', ddID: 'Priority', valFieldID: 'PriorityId', required: true /* options: priorityOptions */ },
    { name: translations['special instructions/notes'], type: 'textarea', valFieldID: 'SpecialInstructions', domID: 'SpecialInstructions' },
  ];

  const { editFetched } = this.state;

  const redirectUrl = '/intel-request/detail/';

  return (
    <div>

      <div className="row intel-request" >
        <div className="col-md-8 two-block" >
          <Loader loading={this.state.loading} />
          <div className="img-header-line">
            <img src="/assets/img/status/theader_line.png" alt=""/>
            <div className="header-text">
              {translations['real-time intelligence/threat picture']}
            </div>
            <img className="mirrored-X-image" src="/assets/img/status/theader_line.png" alt=""/>
          </div>
          <div className="two-block">
{            <Map size="100" viewerId={viewerIdentifiers.intelRequest} setCCIRPIR={this.setCCIRPIR} setOneLocation={this.setOneLocation} toolBarOptions={{ kmlLookUp: true, naipoiLookUp: true }} />
 }          </div>
        </div>
        <div className="col-md-4 one-block">
          <ShortHeaderLine headerText={translations['ccir / Priority intelligence requirements']} />
          <div className="ccir-content">

            <ul>
              <div className="fw-800">{this.state.firstCcir}</div>
              { this.renderCCIRPIR() }
            </ul>

          </div>
          <ShortHeaderLine headerText={translations['associated intelligence reports']} />
          <div className="associate-content" />
        </div>
      </div>
      <form action="" onSubmit={this.handleSubmit} id="personnelform">
        <div className="row intel-request">
          <div className="col-md-12">
            <FullHeaderLine headerText={translations['intelligence request']} />
          </div>
          <div className="col-md-4">
            <ModalFormBlock fields={intelRequest1} data={this.handleIntelRequest1} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
          </div>
          <div className="col-md-4">
            <ModalFormBlock fields={intelRequest2} data={this.handleIntelRequest2} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
          </div>
          <div className="col-md-4">
            <ModalFormBlock fields={intelRequest3} data={this.handleIntelRequest3} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
          </div>
        </div>

         {/* {editId != undefined && editId !== '0' ?
          <div className="row intel-request">
            { isCollectionMgr ?
              (<div><div className="col-md-12">
                <FullHeaderLine headerText={translations.collectionValidation} />
              </div>
              <div className="col-md-6">
                <ModalFormBlock fields={intelRequest4} data={this.handleIntelRequest4} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
              </div>
              <div className="col-md-6">
                <ModalFormBlock fields={intelRequest5} data={this.handleIntelRequest5} initstate ={this.state.intelRequest} editFetched={editFetched} stopupd={this.stopUpdate} stopset={this.stopset.bind(this)} clearit={this.state.clear} />
              </div></div>) : null
            }
          </div>
          : null
        }  */}

        { !isStatusDisabled ?
          <div className="row action-buttons">
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              {// Initially Clear and GenrateEEI button will show, after click GenrateEEI, Route button and Submit button will show
                (this.state.intelRequest.IntelRequestID !== '') ? <button className="btn btn-warning" onClick={this.routeStatus.bind(this)}>
                  {translations.route}
                </button> :
                  <button className="btn btn-warning" onClick={this.resetForm.bind(this)}>
                    {translations.clear}
                  </button>
              } 
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button type="submit" className="btn btn-warning">
                {(this.state.intelRequest.IntelRequestID !== '') ? translations.submit
                  : translations.generateEei
                }
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>
          : '' }
      </form>

      { (this.state.intelRequest.IntelRequestID !== '') ?
        <IntelEEI irAbbrebation={this.state.intelRequest.Abbreviation} nearestNAIPOI={this.state.updatedLocation} ccirCountry={this.state.ccirCountry} missionId={this.props.oneIntelRequest.MissionId} intelId = {this.props.oneIntelRequest.IntelRequestID} eeis={this.props.oneIntelRequest.IntelReqEEIs} />
        : null }

      {/* {this.state.toRedirect ? <Redirect to={`${redirectUrl}${this.props.oneIntelRequest.IntelRequestID}`} /> : null } */}

    </div>
  );
}
}

RequestForm.propTypes = {
  editId: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneIntelRequest: state.intelrequest.oneIntelRequest,
    allCcirPirs: state.ccirpir.allCcirPirs,
    allLocations: state.locations.allLocations,
    higherUnit: state.organicorgs.nextHigherUnit,
  };
};

const mapDispatchToProps = {
  addIntelRequest,
  fetchIntelRequestById,
  updateIntelRequest,
  fetchCcirPirs,
  fetchLocations,
  fetchNextHigherUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestForm);
