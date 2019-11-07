import { uploadFile } from 'actions/file';
import { addPayload, deletePayloadsById, fetchPayloads, fetchPayloadsById, updatePayload } from 'actions/payload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import UploadFileBlock from '../../reusable/UploadFileBlock';
import Loader from '../../reusable/Loader';
import {NoticeType} from '../../../dictionary/constants';



class EoirModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      payloadPhotoPreviewUrl: '/assets/img/admin/aircraft.png',
      payloadWireframePreviewUrl: '/assets/img/admin/r2d2-1.png',
      clear: false,
      editFetched: false,
      payload: {
        // PayloadID: '',
        // PayloadReferenceCode: '',
        // PayloadWireframe: '',
        // PayloadPhoto: '',
        // Payload3D: '',
        // PayloadIcon: '',
        // Payload2525B: '',
        // PayloadDatasheet: '',
        // PayloadSerialNumber: '',
        // PayloadName: '',
        // PayloadNomenclature: '',
        // PayloadRole: '',
        // PayloadManufacturer: '',
        // PayloadExecutiveAgent: '',
        // PayloadContractProgram: '',
        // PayloadCost: '',
        // PayloadCostNotes: '',
        // PayloadLength: '',
        // PayloadWidth: '',
        // PayloadHeight: '',
        // PayloadWeight: '',
        // PayloadPower: '',
        // PayloadConnector1: '',
        // PayloadConnector2: '',
        // PayloadDaySpotter: '',
        // PayloadThermalImager: '',
        // PayloadLaserDesginator: '',
        // PayloadContinuousZoom: '',
        // PayloadStabalization: '',
        // PayloadVibrationIsolation: '',
        // PayloadAutoTracker: '',
        // PayloadGPSTimeSync: '',
        // PayloadInternalGPS: '',
        // PayloadInternalINS: '',
        // PayloadMetadata: '',
        // PayloadCrewCount: '',
        // PayloadMOS1: '',
        // PayloadMOS2: '',
        // PayloadMOS3: '',
        // PayloadType: '',
        // PayloadCOCOM: '2',
        // PayloadLocation: 'd0386ac6-1609-444e-aa7f-91a17f5a42aa',
      },
      onePayload: {},
      eoirPayloadFiles: {
        PayloadPhoto: null,
        PayloadWireframe: null,
        Payload3D: null,
        PayloadIcon: null,
        Payload2525B: null,
        PayloadDatasheet: null
      },
      isImagedRequired: true,
      loading:false
    }

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.editComponent(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if (editId === '0' && prevProps.editId !== editId) {
      this.setState({
        clear: true,
        payloadPhotoPreviewUrl: '',
        payloadWireframePreviewUrl: '',
       });
    }
    if (editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }

  }

  stopUpdate = () => {
    this.setState({ editFetched: false });
  }

  editComponent = (editId) => {
    this.setState({
      payloadPhotoPreviewUrl: '',
        payloadWireframePreviewUrl: '',
       });
    this.props.fetchPayloadsById(editId).then(() => {
      this.setState({
        editFetched: true,
        payload: this.props.onePayload,
        isImagedRequired: true,
        payloadPhotoPreviewUrl: this.props.onePayload.PayloadPhoto,
        payloadWireframePreviewUrl: this.props.onePayload.PayloadWireframe,
      });
    });
  }




  handlePayloadGeneralData = (generalData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        // PayloadSerialNumber: generalData.PayloadSerial,
        // PayloadOwningUnit: generalData.PayloadOwningUnit,
        PayloadName: generalData.PayloadName,
        PayloadNomenclature: generalData.PayloadNomenclature,
        MissionRole: generalData.MissionRole,
        PayloadManufacturer: generalData.PayloadManufacturer,
        PayloadExecutiveAgent: generalData.PayloadExecutiveAgent,
        PayloadContractProgram: generalData.PayloadContractProgram,
        PayloadCost: generalData.PayloadCost,
        PayloadCostNotes: generalData.PayloadCostNotes,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadTechnicalData = (technicalData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadLength: technicalData.PayloadLength,
        PayloadWidth: technicalData.PayloadWidth,
        PayloadHeight: technicalData.PayloadHeight,
        PayloadWeight: technicalData.PayloadWeight,
        PayloadPower: technicalData.PayloadPower,
        PayloadConnector1: technicalData.PayloadConnector1,
        PayloadConnector2: technicalData.PayloadConnector2,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadFeatureData = (featureData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadDaySpotter: featureData.PayloadDaySpotter,
        PayloadThermalImager: featureData.PayloadThermalImager,
        PayloadLaserDesginator: featureData.PayloadLaserDesginator,
        PayloadContinuousZoom: featureData.PayloadContinuousZoom,
        PayloadStabalization: featureData.PayloadStabalization,
        PayloadVibrationIsolation: featureData.PayloadVibrationIsolation,
        PayloadAutoTracker: featureData.PayloadAutoTracker,
        PayloadGPSTimeSync: featureData.PayloadGPSTimeSync,
        PayloadInternalGPS: featureData.PayloadInternalGPS,
        PayloadInternalINS: featureData.PayloadInternalINS,
        PayloadMetadata: featureData.PayloadMetadata
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  handlePayloadCrewData = (crewData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadCrewCount: crewData.PayloadCrewCount,
        PayloadMOS1: crewData.PayloadMOS1,
        PayloadMOS2: crewData.PayloadMOS2,
        PayloadMOS3: crewData.PayloadMOS3
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.payload);
    });
  }

  /**
  * This is callback method called automatically and update state with eoirPayloadFiles.
  */
  handleUploadFileData = (uploadFileData) => {
    const { eoirPayloadFiles } = this.state;
    this.setState({
      eoirPayloadFiles: {
        ...eoirPayloadFiles,
        PayloadPhoto: uploadFileData.PayloadPhoto,
        PayloadWireframe: uploadFileData.PayloadWireframe,
        Payload3D: uploadFileData.Payload3D,
        PayloadIcon: uploadFileData.PayloadIcon,
        Payload2525B: uploadFileData.Payload2525B,
        PayloadDatasheet: uploadFileData.PayloadDatasheet,
      }
    });
  }


  /**
   * This is callback method called automatically and show selected image preview.
   */
  handlePhotoPreviewURL = (uploadedFile) => {
    let reader = new FileReader();
    let file = uploadedFile.originalFile;
    if (uploadedFile.name === 'PayloadPhoto') {
      reader.onloadend = () => {
        this.setState({
          payloadPhotoPreviewUrl: reader.result
        });
      }
    }
    if (uploadedFile.name === 'PayloadWireframe') {
      reader.onloadend = () => {
        this.setState({
          payloadWireframePreviewUrl: reader.result
        });
      }
    }
    reader.readAsDataURL(file);
  }


  /* handleUploadFile(event) {
    event.preventDefault();
    const { payload } = this.state;
    if (event.target.id == "PayloadPhoto") {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }
    else if (event.target.id == "PayloadWireframe") {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl2: reader.result
        });
      }
      reader.readAsDataURL(file)
    }
    let parametername = event.target.id;
    this.setState({
      payload: {
        ...payload,
        [parametername]: event.target.files[0].name
      }
    }, () => {
      console.log("New state in ASYNC callback:", this.state.payload);
    });
    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('name', event.target.files[0].name);
    // this.props.uploadFile(data);
  } */

  handleSubmit = event => {
    event.preventDefault();
    let { payload, eoirPayloadFiles } = this.state;
    const { editId, payloadTypeId } = this.props;
    // File Upload form data 
    const formData = new FormData();
    if (eoirPayloadFiles.PayloadPhoto) {
      formData.append('PayloadPhoto', eoirPayloadFiles.PayloadPhoto, eoirPayloadFiles.PayloadPhoto.name);
    }
    if (eoirPayloadFiles.PayloadWireframe) {
      formData.append('PayloadWireframe', eoirPayloadFiles.PayloadWireframe, eoirPayloadFiles.PayloadWireframe.name);
    }
    if (eoirPayloadFiles.Payload3D) {
      formData.append('Payload3D', eoirPayloadFiles.Payload3D, eoirPayloadFiles.Payload3D.name);
    }
    if (eoirPayloadFiles.PayloadIcon) {
      formData.append('PayloadIcon', eoirPayloadFiles.PayloadIcon, eoirPayloadFiles.PayloadIcon.name);
    }
    if (eoirPayloadFiles.Payload2525B) {
      formData.append('Payload2525B', eoirPayloadFiles.Payload2525B, eoirPayloadFiles.Payload2525B.name);
    }
    if (eoirPayloadFiles.PayloadDatasheet) {
      formData.append('PayloadDatasheet', eoirPayloadFiles.PayloadDatasheet, eoirPayloadFiles.PayloadDatasheet.name);
    }
    payload.PayloadType = payloadTypeId;
    if (editId !== undefined && editId !== '0') {
      this.setState({loading:true});
      payload.PayloadID = editId;
      formData.append("payloadFormData", JSON.stringify(payload));
      this.props.updatePayload(editId, formData).then(() => {
         this.setState({loading:false});
         this.props.onClose(NoticeType.UPDATE); 
        });
    } else {

      this.setState({loading:true});
      formData.append("payloadFormData", JSON.stringify(payload));
      this.props.addPayload(formData).then(() => {
        this.setState({loading:false});
        this.props.onClose(NoticeType.ADD); 
      });
    }
  }

  deletePayload = () => {

    const { editId } = this.props;
    if (editId !== undefined && editId !== '0') {
      this.setState({loading:true});
      this.props.deletePayloadsById(editId).then(() => { 
        this.setState({loading:false});
        this.props.onClose(NoticeType.DELETE);
       });
    }
  }


  stopset() {
    this.setState({ clear: false });
  }


  resetForm() {
    const { translations } = this.props;
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm(translations["ClearConfirmation"])) {
      this.setState({ 
        clear: true,
        payloadPhotoPreviewUrl: '/assets/img/admin/aircraft.png',
        payloadWireframePreviewUrl: '/assets/img/admin/r2d2-1.png',
        eoirPayloadFiles : {}

       });
      document.getElementById('payloadform').reset();
    }
  }


  render() {
    let { payloadPhotoPreviewUrl } = this.state;
    let { payloadWireframePreviewUrl } = this.state;
    let $imagePreview = '';
    let $imagePreview2 = '';

    if (payloadPhotoPreviewUrl || payloadPhotoPreviewUrl === '') {
      $imagePreview = (<img src={payloadPhotoPreviewUrl} alt="" className="photo" alt="" />);
    }
    else {
      $imagePreview = (<img src="/assets/img/admin/aircraft.png" className="photo" alt="" />);
    }

    if (payloadWireframePreviewUrl || payloadWireframePreviewUrl === '') {
      $imagePreview2 = (<img src={payloadWireframePreviewUrl} alt="" className="photo" alt="" />);
    }
    else {
      $imagePreview2 = (<img src="/assets/img/admin/r2d2-1.png" className="photo" alt="" />);
    }

    const { translations } = this.props;
    const generalFields = [
      /* { name: translations['Serial#'], type: 'number', domID: 'PayloadSerial', valFieldID: 'PayloadSerial', required: true }, */
      /* { name: translations['Owning Unit'], type: 'dropdown', domID: 'PayloadOwningUnit', ddID: 'Units', valFieldID: 'PayloadOwningUnit' }, */
      { name: translations['Payload Name'], type: 'input', domID: 'PayloadName', valFieldID: 'PayloadName', required: true },
      { name: translations['Payload Nomenclature'], type: 'input', domID: 'PayloadNomenclature', valFieldID: 'PayloadNomenclature', required: true },
      { name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'PayloadRoles/GetPayloadRoles', valFieldID: 'MissionRole', required: true },
      { name: translations['Manufacture'], type: 'dropdown', domID: 'PayloadManufacture', ddID: 'Companies/GetCompanies', valFieldID: 'PayloadManufacturer', required: true },
      { name: translations['Service Executive Agent'], type: 'input', domID: 'PayloadExecutiveAgent', valFieldID: 'PayloadExecutiveAgent', required: true },
      { name: translations['Contract Program'], type: 'input', domID: 'PayloadContractProgram', valFieldID: 'PayloadContractProgram', required: true },
      { name: translations['Cost'], type: 'number', domID: 'PayloadCost', valFieldID: 'PayloadCost' },
      { name: translations['Cost notes'], type: 'input', domID: 'PayloadCostNotes', valFieldID: 'PayloadCostNotes' },
    ];

    const technicalFields = [
      { name: translations['Length (in.)'], type: 'number', domID: 'PayloadLength', valFieldID: 'PayloadLength', required: true },
      { name: translations['Width (in.)'], type: 'number', domID: 'PayloadWidth', valFieldID: 'PayloadWidth', required: true },
      { name: translations['Height (in.)'], type: 'number', domID: 'PayloadHeight', valFieldID: 'PayloadHeight', required: true },
      { name: translations['Weight (lbs.)'], type: 'number', domID: 'PayloadWeight', valFieldID: 'PayloadWeight', required: true },
      { name: translations['Power(W)'], type: 'number', domID: 'PayloadPower', valFieldID: 'PayloadPower', required: true },
      { name: translations['Connector'] + "1", type: 'input', domID: 'PayloadConnector1', valFieldID: 'PayloadConnector1' },
      { name: translations['Connector'] + "2", type: 'input', domID: 'PayloadConnector2', valFieldID: 'PayloadConnector2' },
    ];

    const payloadFields = [
      { name: translations['Day Spotter'], type: 'checkbox', domID: 'PayloadDaySpotter', valFieldID: 'PayloadDaySpotter' },
      { name: translations['Thermal Imager'], type: 'checkbox', domID: 'PayloadThermalImager', valFieldID: 'PayloadThermalImager' },
      { name: translations['Laser Designator'], type: 'checkbox', domID: 'PayloadLaserDesginator', valFieldID: 'PayloadLaserDesginator' },
      { name: translations['Continuous Zoom'], type: 'checkbox', domID: 'PayloadContinuousZoom', valFieldID: 'PayloadContinuousZoom' },
      { name: translations['Stabilization'], type: 'checkbox', domID: 'PayloadStabalization', valFieldID: 'PayloadStabalization' },
      { name: translations['Vibration Isolation'], type: 'checkbox', domID: 'PayloadVibrationIsolation', valFieldID: 'PayloadVibrationIsolation' },
      { name: translations['Auto-Tracker'], type: 'checkbox', domID: 'PayloadAutoTracker', valFieldID: 'PayloadAutoTracker' },
      { name: translations['GPS Time Sync'], type: 'checkbox', domID: 'PayloadGPSTimeSync', valFieldID: 'PayloadGPSTimeSync' },
      { name: translations['Internal GPS'], type: 'checkbox', domID: 'PayloadInternalGPS', valFieldID: 'PayloadInternalGPS' },
      { name: translations['Internal INS'], type: 'checkbox', domID: 'PayloadInternalINS', valFieldID: 'PayloadInternalINS' },
      { name: translations['Metadata'], type: 'checkbox', domID: 'PayloadMetadata', valFieldID: 'PayloadMetadata' },

    ];

    const crewFields = [
      { name: translations['Payload Crew Count'], type: 'number', domID: 'PayloadCrewCount', valFieldID: 'PayloadCrewCount' },
      { name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'PayloadMOS1' },
      { name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'PayloadMOS2' },
      { name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'PayloadMOS3' },
    ];

    const uploadFileFields = [
      { name: translations['Photo Image'], type: 'file', domID: 'PayloadPhoto', valFieldID: 'PayloadPhoto', fileType: 'image' },
      { name: translations['Wireframe Image'], type: 'file', domID: 'PayloadWireframe', valFieldID: 'PayloadWireframe', fileType: 'image' },
      { name: translations['3D Model'], type: 'file', domID: 'Payload3D', valFieldID: 'Payload3D', fileType: 'image' },
      { name: translations['2D Icon'], type: 'file', domID: 'PayloadIcon', valFieldID: 'PayloadIcon', fileType: 'image' },
      { name: translations['Milspec Icon'], type: 'file', domID: 'Payload2525B', valFieldID: 'Payload2525B', fileType: 'image'},
      { name: translations['Datasheets'], type: 'file', domID: 'PayloadDatasheet', valFieldID: 'PayloadDatasheet', fileType: 'file' }
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} id="payloadform">
      <div className="payload-content">
          <div className="row personnel" >
            <Loader loading={this.state.loading} />
            {/* <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
              {translations["eo/ir payloads specification"]}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div> */}
            <div className="personnel-content">
              <div className="col-md-4 image-block">
                {$imagePreview}
              </div>
              <div className="col-md-4 image-block">
                {$imagePreview2}
              </div>
              <UploadFileBlock headerLine="/assets/img/admin/upload_1.png" 
              title={translations["Upload Imagery & Datasheets"]}
              fields={uploadFileFields}
              data={this.handleUploadFileData}
              initstate={this.props.onePayload} previewFile={this.handlePhotoPreviewURL} isImagedRequired={this.state.isImagedRequired}
              stopupd={this.stopUpdate} editFetched={this.state.editFetched}
              clearit={this.state.clear} stopset={this.stopset.bind(this)} ></UploadFileBlock>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-payload-content">
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadGeneralData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["size, weight, power, connect"]} fields={technicalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadTechnicalData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock bigBackground={true} headerLine="/assets/img/admin/upload_1.png" title={translations["payload features"]} fields={payloadFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadFeatureData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["crew requirements"]} fields={crewFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadCrewData} initstate={this.props.onePayload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="button" className='highlighted-button' onClick={this.resetForm.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>

          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button type="submit" className='highlighted-button'>
              {/* {(this.props.editId != undefined && this.props.editId != '0') ? translations['update'] : translations['save']} */}
              {translations['submit']}

            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

EoirModal.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};


const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayload: state.payloads.onePayload,
  };
};

const mapDispatchToProps = {
  addPayload,
  deletePayloadsById,
  fetchPayloads,
  fetchPayloadsById,
  uploadFile,
  updatePayload,
};

export default connect(mapStateToProps, mapDispatchToProps)(EoirModal);

