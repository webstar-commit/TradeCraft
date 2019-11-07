import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { addIntelEei, fetchIntelEeiById, updateIntelEei } from '../../actions/inteleei';
import FullHeaderLine from '../reusable/FullHeaderLine';
import { NoticeType } from '../../dictionary/constants';
import ModalFormBlock from '../reusable/ModalFormBlock';
import Loader from '../reusable/Loader';

class EeiForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editId: '0',
      clear: false,
      eeiFetched: false,
      intelReqEEI: {
        // id: '',
        // intelReqID: '',
        // targetName: '',
        // targetNum: '',
        // threatGroupID: '',
        // location: '',
        district: props.ccirCountry,
        // gridCoordinates: '',
        // LIMIDS_Req: '',
        // POI1_ID: '',
        // POI2_ID: '',
        // POI3_ID: '',
        // EEIs: '',
        // createDate: '',
        // lastUpdateDate: '',
        // objective: '',
        // EEIThreat: '',
        // LIMIDSReq: '',
      },
      loading: false,
    };
  }

  componentDidMount = () => {

    const { editId } = this.props;
    if(editId !== '0') {
      this.editComponent(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId, nearestLocations, ccirCountry } = this.props;

    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
    if(editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    if(nearestLocations.uid !== prevProps.nearestLocations.uid) {
      this.setNAIPOI(nearestLocations);
    }

    if(ccirCountry !== prevProps.ccirCountry) {
      this.updateCountry();
    }
  }

  setNAIPOI = (locationsData) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        gridCoordinates: locationsData.currentLatLong.latitude + ', ' + locationsData.currentLatLong.longitude,
        POI1_ID: locationsData.location[0].id || 'no value',
        POI2_ID: locationsData.location[1].id || 'no value',
      },
      eeiFetched: true,
      clear: false,
    });
  }

updateCountry = () => {
  // const districtSelect = document.getElementsByName('district')[0];
  const { intelReqEEI } = this.state;
  this.setState(
    {
      intelReqEEI:
        { ...intelReqEEI,
          district: this.props.ccirCountry,
        },
      eeiFetched: true, // to update data in chil components
    });
}

  editComponent = (editId) => {
    this.props.fetchIntelEeiById(editId).then(() => {
      this.setState(
        {
          eeiFetched: true,
          intelReqEEI: {
            ...this.props.oneEEI,
            district: this.props.ccirCountry,
          },
        });
    });

  }

  handleIntelEei1 = (intelEei1) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        targetID: intelEei1.targetID,
        objectiveID: intelEei1.objectiveID,
        threatGroupID: intelEei1.threatGroupID,
      },
    });
  }

  handleIntelEei2 = (intelEei2) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        location: intelEei2.location,
        district: intelEei2.district,
        gridCoordinates: intelEei2.gridCoordinates,
        LIMIDS_Req: intelEei2.LIMIDS_ReqID,
        LIMIDS_ReqID: intelEei2.LIMIDS_ReqID,
      },
    });
  }

  handleIntelEei3 = (intelEei3) => {
    const { intelReqEEI } = this.state;
    this.setState({
      intelReqEEI: {
        ...intelReqEEI,
        POI1_ID: intelEei3.POI1_ID,
        POI2_ID: intelEei3.POI2_ID,
        // POI3_ID: intelEei3.POI3_ID,
        EEIs: intelEei3.EEIs,
      },
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { intelReqEEI } = this.state;
    const { editId, intelId } = this.props;
    intelReqEEI.intelReqID = intelId;
    if(editId !== undefined && editId !== '0') {
      delete intelReqEEI.LIMIDSReq;
      delete intelReqEEI.EEIThreat;
      intelReqEEI.id = editId;
      // as in response we get ID integer value for LIMIDS REQUEST Field in variable LIMIDS_ReqID and String value in LIMIDS_Req
      // but during save/update we have to send integer ID in LIMIDS_Req
      intelReqEEI.LIMIDS_Req = intelReqEEI.LIMIDS_ReqID;
      this.setState({ loading: true });
      this.props.updateIntelEei(editId, intelReqEEI).then(() => {
        this.setState({ loading: false });
        this.props.onClose(NoticeType.UPDATE);
      });
    } else {
      delete intelReqEEI.LIMIDS_ReqID;
      this.setState({ loading: true });
      this.props.addIntelEei(intelReqEEI).then(() => {
        this.setState({ loading: false });
        this.props.onClose(NoticeType.ADD);
      });
    }
  }

  stopUpdate = () => {
    this.setState({ eeiFetched: false });
  }

  stopset = () => {
    this.setState({ clear: false });
  }

  resetForm() {
    const {translations}=this.props;
    if (confirm(translations['ClearConfirmation'])) {
      this.setState({ clear: true });
      document.getElementById('EeiForm').reset();
    }
  }

  render = () => {

    const { translations } = this.props;

    // FORM fields Array
    const eeiFiled1 = [
      // { name: translations['Target Name'], type: 'input', domID: 'targetName', valFieldID: 'targetName', required: true },
      { name: translations['Target#'], type: 'dropdown', domID: 'targetNum', ddID: 'Target/GetTargets', valFieldID: 'targetID', required: true },
      { name: translations.Objective, type: 'dropdown', domID: 'dispObjective', ddID: 'Objective/GetObjectives', valFieldID: 'objectiveID', required: true },
      { name: translations['Threat Group'], type: 'dropdown', ddID: 'EEIThreat', domID: 'dispThreatGroups', valFieldID: 'threatGroupID', required: true },
    ];

    const eeiFiled2 = [
      { name: translations.Country, type: 'dropdown', domID: 'dispDistrict', ddID: 'Countries', valFieldID: 'district', required: true },
      { name: translations.Location, type: 'input', domID: 'location', valFieldID: 'location', required: true },
      { name: translations['Grid Coordinates'], type: 'input', domID: 'gridCoordinates', valFieldID: 'gridCoordinates', required: true },
      { name: translations['LIMIDS Request'], type: 'dropdown', ddID: 'LIMIDSReq/GetLIMIDSReqs', domID: 'dispLIMIDS', valFieldID: 'LIMIDS_ReqID', required: true },
    ];

    const eeiFiled3 = [
      { name: translations.NearestNAI, type: 'dropdown', domID: 'POI1_ID', valFieldID: 'POI1_ID', ddID: 'Locations/GetLocationsByCategory?Category=2' },
      { name: translations.NearestPOI, type: 'dropdown', domID: 'POI2_ID', valFieldID: 'POI2_ID', ddID: 'Locations/GetLocationsByCategory?Category=3' },
      // { name: translations.POIs, type: 'input', domID: 'POI3_ID', valFieldID: 'POI3_ID' },
      { name: translations.EEIs, type: 'dropdown', domID: 'dispEEIs', ddID: 'IntelReqEEI/GetEEIOptions', valFieldID: 'EEIs' },
    ];

    return (
      <div>
        <form action="" onSubmit={this.handleSubmit} id="EeiForm">
          <div className="row intel-request">
            <Loader loading={this.state.loading} />
            <div className="col-md-12">
              <FullHeaderLine headerText={translations['eei generator']} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled1} data={this.handleIntelEei1} initstate ={this.state.intelReqEEI} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.eeiFetched} stopupd = {this.stopUpdate} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled2} data={this.handleIntelEei2} initstate ={this.state.intelReqEEI} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.eeiFetched} stopupd = {this.stopUpdate} />
            </div>
            <div className="col-md-4">
              <ModalFormBlock fields={eeiFiled3} data={this.handleIntelEei3} initstate ={this.state.intelReqEEI} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.eeiFetched} stopupd = {this.stopUpdate} />
            </div>
          </div>
          <div className="row action-buttons" >
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" onClick={this.resetForm.bind(this)}>
                {translations.clear}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
            <div className="menu-button">
              <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
              <button className="highlighted-button" type="submit">
                {translations.submit}
              </button>
              <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
            </div>
          </div>
        </form>
      </div>);

  }

}

EeiForm.propTypes = {
  ccirCountry: PropTypes.string,
  editId: PropTypes.string,
  intelId: PropTypes.string,
  nearestLocations: PropTypes.any,
  onClose: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneEEI: state.inteleei.oneEei,
  };
};

const mapDispatchToProps = {
  addIntelEei,
  fetchIntelEeiById,
  updateIntelEei,

};

export default connect(mapStateToProps, mapDispatchToProps)(EeiForm);
