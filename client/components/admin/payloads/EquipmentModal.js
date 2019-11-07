import { uploadFile } from 'actions/file';
import { addPayload, fetchPayloads, fetchPayloadsById, updatePayload } from 'actions/payload';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import UploadFileBlock from '../../reusable/UploadFileBlock';
import Loader from '../../reusable/Loader';
import { NoticeType } from '../../../dictionary/constants';


class EquipmentModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      payloadPhotoPreviewUrl: '/assets/img/admin/aircraft.png',
      payloadWireframePreviewUrl: '/assets/img/admin/r2d2-1.png',
      clear: false,
      editFetched: false,
      payload: {
        PayloadID: '',
        PayloadReferenceCode: '',
        PayloadWireframe: '',
        PayloadPhoto: '',
        Payload3D: '',
        PayloadIcon: '',
        Payload2525B: '',
        PayloadDatasheet: '',
        PayloadName: '',
        PayloadNomenclature: '',
        PayloadRole: '',
        PayloadManufacturer: '',
        PayloadExecutiveAgent: '',
        PayloadContractProgram: '',
        PayloadCost: '',
        PayloadCostNotes: '',
        PayloadLength: '',
        PayloadWidth: '',
        PayloadHeight: '',
        PayloadWeight: '',
        PayloadPower: '',
        PayloadConnector1: '',
        PayloadConnector2: '',
        PayloadDaySpotter: '',
        PayloadThermalImager: '',
        PayloadLaserDesginator: '',
        PayloadContinuousZoom: '',
        PayloadStabalization: '',
        PayloadVibrationIsolation: '',
        PayloadAutoTracker: '',
        PayloadGPSTimeSync: '',
        PayloadInternalGPS: '',
        PayloadInternalINS: '',
        PayloadMetadata: '',
        PayloadCrewCount: '',
        PayloadMOS1: '',
        PayloadMOS2: '',
        PayloadMOS3: '',
      },

      onePayload: {},
      equipmentPayloadFiles: {
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
    if (editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    if (editId === '0' && prevProps.editId !== editId) {
      this.setState({
         clear: true,
         payloadPhotoPreviewUrl: '',
         payloadWireframePreviewUrl: '',
      });
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


  // componentDidMount = () => {
  //   const { editId } = this.props;
  //   if (editId !== undefined && editId !== '0') {
  //     this.props.fetchPayloadsById(editId);
  //   } else {
  //     // this.setState({ onePayload: {} });
  //   }
  //   console.log("variable" + editId);
  // }

  handlePayloadGeneralData = (generalData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        // PayloadSerial: generalData.PayloadSerial,
        // PayloadOwningUnit: generalData.PayloadOwningUnit,
        PayloadName: generalData.PayloadName,
        PayloadNomenclature: generalData.PayloadNomenclature,
        PayloadRole: generalData.PayloadRole,
        PayloadManufacturer: generalData.PayloadManufacturer,
        PayloadExecutiveAgent: generalData.PayloadExecutiveAgent,
        PayloadContractProgram: generalData.PayloadContractProgram,
        PayloadCost: generalData.PayloadCost,
        PayloadCostNotes: generalData.PayloadCostNotes,
        MissionRole: generalData.MissionRole,
      },
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
    });
  }

  handlePayloadFeatureData = (featureData) => {
    const { payload } = this.state;
    this.setState({
      payload: {
        ...payload,
        PayloadLensCount: featureData.PayloadLensCount
      },
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
      },
    });
  }

  /**
 * This is callback method called automatically and update state with equipmentPayloadFiles.
 */
  handleUploadFileData = (uploadFileData) => {
    const { equipmentPayloadFiles } = this.state;
    this.setState({
      equipmentPayloadFiles: {
        ...equipmentPayloadFiles,
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
    }else if (event.target.id == "PayloadWireframe") {
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          imagePreviewUrl2: reader.result
        });
      }
      reader.readAsDataURL(file);
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

    let { payload, equipmentPayloadFiles } = this.state;
    const { editId, payloadTypeId } = this.props;

    // File Upload form data 
    const formData = new FormData();
    if (equipmentPayloadFiles.PayloadPhoto) {
      formData.append('PayloadPhoto', equipmentPayloadFiles.PayloadPhoto, equipmentPayloadFiles.PayloadPhoto.name);
    }
    if (equipmentPayloadFiles.PayloadWireframe) {
      formData.append('PayloadWireframe', equipmentPayloadFiles.PayloadWireframe, equipmentPayloadFiles.PayloadWireframe.name);
    }
    if (equipmentPayloadFiles.Payload3D) {
      formData.append('Payload3D', equipmentPayloadFiles.Payload3D, equipmentPayloadFiles.Payload3D.name);
    }
    if (equipmentPayloadFiles.PayloadIcon) {
      formData.append('PayloadIcon', equipmentPayloadFiles.PayloadIcon, equipmentPayloadFiles.PayloadIcon.name);
    }
    if (equipmentPayloadFiles.Payload2525B) {
      formData.append('Payload2525B', equipmentPayloadFiles.Payload2525B, equipmentPayloadFiles.Payload2525B.name);
    }
    if (equipmentPayloadFiles.PayloadDatasheet) {
      formData.append('PayloadDatasheet', equipmentPayloadFiles.Payload2525B, equipmentPayloadFiles.PayloadDatasheet.name);
    }
    payload.PayloadType = payloadTypeId;
    if (editId !== undefined && editId !== '0') {
      payload.PayloadID = editId;
      formData.append("payloadFormData", JSON.stringify(payload));
      this.setState({loading: true});
      this.props.updatePayload(editId, formData).then(() => { 
        this.setState({loading:false});
        this.props.onClose(NoticeType.UPDATE);
      });
    } else {
      formData.append("payloadFormData", JSON.stringify(payload));
      this.setState({loading:true});
      this.props.addPayload(formData).then(() => { 
        this.setState({loading:false});
        this.props.onClose(NoticeType.ADD);
      });
    }
  }


  stopset() {
    this.setState({ clear: false });
  }


  resetForm() {
    const {translations}=this.props;
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm(translations["ClearConfirmation"])) {
      this.setState({ 
        clear: true,
        payloadPhotoPreviewUrl: '/assets/img/admin/aircraft.png',
        payloadWireframePreviewUrl: '/assets/img/admin/r2d2-1.png',
        equipmentPayloadFiles : {}
      });
      document.getElementById('payloadform').reset();
    }
    else {

    }
  }


  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    let { payloadPhotoPreviewUrl } = this.state;
    let { payloadWireframePreviewUrl } = this.state;
    let $imagePreview = '';
    let $imagePreview2 = '';

    if (payloadPhotoPreviewUrl || payloadPhotoPreviewUrl === '') {
      $imagePreview = (<img src={payloadPhotoPreviewUrl} alt="" className="photo" alt="" />);
    } else {
      $imagePreview = (<img src="/assets/img/admin/aircraft.png" className="photo" alt="" />);
    }

    if (payloadWireframePreviewUrl || payloadWireframePreviewUrl === '') {
      $imagePreview2 = (<img src={payloadWireframePreviewUrl} alt="" className="photo" alt="" />);
    } else {
      $imagePreview2 = (<img src="/assets/img/admin/r2d2-1.png" className="photo" alt="" />);
    }
    /* const {payload} = this.state; */
    const { translations } = this.props;
    const generalFields = [
      // { name: translations['Serial#'], type: 'number', domID: 'PayloadSerial', valFieldID: 'PayloadSerial', required: true },
      // { name: translations['Owning Unit'], type: 'dropdown', domID: 'PayloadOwningUnit', ddID: 'Units', valFieldID: 'PayloadOwningUnit' },
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

    const itemDescription = [
      { name:translations['Lens Count'], type: 'number', domID: 'PayloadLensCount', valFieldID: 'PayloadLensCount' },
    ];

    const uploadFileFields = [
      { name: translations['Photo Image'], type: 'file', domID: 'PayloadPhoto', valFieldID: 'PayloadPhoto', fileType: 'image' },
      { name: translations['Wireframe Image'], type: 'file', domID: 'PayloadWireframe', valFieldID: 'PayloadWireframe', fileType: 'image' },
      { name: translations['3D Model'], type: 'file', domID: 'Payload3D', valFieldID: 'Payload3D', fileType: 'image' },
      { name: translations['2D Icon'], type: 'file', domID: 'PayloadIcon', valFieldID: 'PayloadIcon', fileType: 'image' },
      { name: translations['Milspec Icon'], type: 'file', domID: 'Payload2525B', valFieldID: 'Payload2525B', fileType: 'image' },
      { name: translations['Datasheets'], type: 'file', domID: 'PayloadDatasheet', valFieldID: 'PayloadDatasheet', fileType: 'file' }
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} id="payloadform">
        {/*  <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div> */}
        <div className="payload-content">
          <div className="row personnel" >
          <Loader loading={this.state.loading} />
            {/* <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                equipment payloads administration
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
              <UploadFileBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Upload Imagery & Datasheets"]} fields={uploadFileFields}
                data={this.handleUploadFileData} initstate={this.props.onePayload} previewFile={this.handlePhotoPreviewURL} isImagedRequired={this.state.isImagedRequired} stopupd={this.stopUpdate} editFetched={this.state.editFetched}  clearit={this.state.clear} stopset={this.stopset.bind(this)}></UploadFileBlock>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-payload-content">
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadGeneralData} initstate={this.state.payload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["size, weight, power, connect"]} fields={technicalFields} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadTechnicalData} initstate={this.state.payload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock bigBackground={true} headerLine="/assets/img/admin/upload_1.png" title={translations["Item Description"]} fields={itemDescription} stopupd={this.stopUpdate} editFetched={this.state.editFetched}
                data={this.handlePayloadFeatureData} initstate={this.state.payload} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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

EquipmentModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayload: state.payloads.onePayload,
  };
};

const mapDispatchToProps = {
  addPayload,
  fetchPayloads,
  uploadFile,
  updatePayload,
  fetchPayloadsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentModal);
