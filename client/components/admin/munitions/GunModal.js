import { uploadFile } from 'actions/file';
import { addMunition, fetchMunitions, fetchMunitionsById, updateMunition } from 'actions/munition';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import UploadFileBlock from '../../reusable/UploadFileBlock';
import Loader from '../../reusable/Loader';
import { NoticeType } from '../../../dictionary/constants';


class GunModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      gunPhotoPreviewUrl: '/assets/img/admin/rockets.png',
      editFetched: false,
      oneMunition: {},
      clear: false,
       munition: {
      //   MunitionID: '',
      //   MunitionsReferenceCode: '',
      //   MunitionWireframe: '',
      //   MunitionPhoto: '',
      //   Munition3D: '',
      //   MunitionIcon: '',
      //   Munition2525B: '',
      //   MunitionDatasheet: '',
      //   MunitionName: '',
      //   MunitionNomenclature: '',
      //   MunitionRole: '',
      //   MunitionManufacturer: '',
      //   MunitionExecutiveAgent: '',
      //   MunitionContractProgram: '',
      //   MunitionCost: '',
      //   MunitionCostNotes: '',
      //   MunitionLength: '',
      //   MunitionWidthDiameter: '',
      //   MunitionWeight: '',
      //   MunitionWingspan: '',
      //   MunitionWarhead: '',
      //   MunitionEngine: '',
      //   MunitionRange: '',
      //   MunitionSpeed: '',
      //   MunitionGuideanceSys: '',
      //   MunitionLaunchPlatform: '',
      //   MunitionWeatherRestriction: '',
      //   MunitionCrewCount: '',
      //   MunitionMOS1: '',
      //   MunitionMOS2: '',
      //   MunitionMOS3: '',
      //   MunitionHeigh: '',
      //   MunitionWeightUnloaded: '',
      //   MunitionWeightLoaded: '',
      //   MunitionRoundsCarried: '',
      //   MunitionRateFire: '',
      //   MunitionMuzzleVelocity: '',
      //   MunitionProjectileWeight: '',
      //   MunitionCaliber: '',
      //   MunitionDriveSystem: '',
      //   MunitionFeedSystem: '',
      //   MunitionMuzzleEnergy: ''
       },
      gunMunitionFiles: {
        MunitionPhoto: null,
        MunitionWireframe: null,
        Munition3D: null,
        MunitionIcon: null,
        Munition2525B: null,
        MunitionDatasheet: null
      },
      isImagedRequired: true,
      loading: false

    },

      this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentWillMount() {
    //this.props.fetchMunitions();
  }

  /**
   * Auto invoked functions and Once initialized.
   */
  componentDidMount = () => {
    this.setState({ 
      clear: true
    });
    let { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      /*  this.props.fetchMunitionsById(editId).then(() => {
         this.setState(
           {
             editFetched: true,
             munition: this.props.oneMunition,
           });
       }); */
      this.editComponent(editId);
    }
  }

  editComponent = (editId) => {
    // On click of edit remove if any image in state
    this.setState({
      gunPhotoPreviewUrl: '',
    });
    this.props.fetchMunitionsById(editId).then(() => {
      this.setState(
        {
          editFetched: true,
          munition: this.props.oneMunition,
          gunPhotoPreviewUrl: this.props.oneMunition.MunitionPhoto,
          isImagedRequired: false
        });
    });
  }

  /**
   * Auto invoked functions. This Function works like as listener. This will update or call during changes in the value of input fields.
   */
  componentDidUpdate = (prevProps, prevState) => {
    let { editId } = this.props;
    if (editId !== '0' && prevProps.editId !== editId) {
      /* this.props.fetchMunitionsById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            munition: this.props.oneMunition,
          });
      }); */
      this.editComponent(editId);
    }

    if (editId === '0' && prevProps.editId !== editId) {
      this.setState({ 
        gunPhotoPreviewUrl: '',
        clear: true
      });
    }
  }

  stopupd = () => {
    this.setState({ editFetched: false });
  }

  handleMunitionGeneralData = (generalData) => {
    const { munition } = this.state;
    this.setState({
      munition: {
        ...munition,
        MunitionName: generalData.MunitionName,
        MunitionNomenclature: generalData.MunitionNomenclature,
        MunitionRole: generalData.MunitionRole,
        MunitionManufacturer: generalData.MunitionManufacturer,
        MunitionExecutiveAgent: generalData.MunitionExecutiveAgent,
        MunitionContractProgram: generalData.MunitionContractProgram,
        MunitionCost: generalData.MunitionCost,
        MunitionCostNotes: generalData.MunitionCostNotes,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }

  handleMunitionTechnicalData = (technicalData) => {
    const { munition } = this.state;
    this.setState({
      munition: {
        ...munition,
        /*  MunitionType: technicalData.MunitionType, */
        MunitionCaliber: technicalData.MunitionCaliber,
        MunitionDriveSystem: technicalData.MunitionDriveSystem,
        MunitionFeedSystem: technicalData.MunitionFeedSystem,
        MunitionRateFire: technicalData.MunitionRateFire,
        MunitionMuzzleVelocity: technicalData.MunitionMuzzleVelocity,
        MunitionProjectileWeight: technicalData.MunitionProjectileWeight,
        MunitionMuzzleEnergy: technicalData.MunitionMuzzleEnergy,
        MunitionLength: technicalData.MunitionLength,
        MunitionWidthDiameter: technicalData.MunitionWidthDiameter,
        MunitionHeight: technicalData.MunitionHeight,
        MunitionWeightUnloaded: technicalData.MunitionWeightUnloaded,
        MunitionWeightLoaded: technicalData.MunitionWeightLoaded,
        MunitionRoundsCarried: technicalData.MunitionRoundsCarried
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }

  handleMunitionCrewData = (crewData) => {
    const { munition } = this.state;
    this.setState({
      munition: {
        ...munition,
        MunitionCrewCount: crewData.MunitionCrewCount,
        MunitionMOS1: crewData.MunitionMOS1,
        MunitionMOS2: crewData.MunitionMOS2,
        MunitionMOS3: crewData.MunitionMOS3
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.munition);
    });
  }


  /**
  * This is callback method called automatically and update state with gunMunitionFiles.
  */
  handleUploadFileData = (uploadFileData) => {
    const { gunMunitionFiles } = this.state;
    this.setState({
      gunMunitionFiles: {
        ...gunMunitionFiles,
        MunitionPhoto: uploadFileData.MunitionPhoto,
        MunitionWireframe: uploadFileData.MunitionWireframe,
        Munition3D: uploadFileData.Munition3D,
        MunitionIcon: uploadFileData.MunitionIcon,
        Munition2525B: uploadFileData.Munition2525B,
        MunitionDatasheet: uploadFileData.MunitionDatasheet,
      }
    }, () => {
      console.log("New state in ASYNC callback of UPLOAD IMAGERY & DATASHEETS() Munition Specification screen :", this.state.gunMunitionFiles);
    });
  }


  /**
   * This is callback method called automatically and show selected image preview.
   */
  handlePhotoPreviewURL = (uploadedFile) => {
    let reader = new FileReader();
    let file = uploadedFile.originalFile;
    if (uploadedFile.name === 'MunitionPhoto') {
      reader.onloadend = () => {
        this.setState({
          gunPhotoPreviewUrl: reader.result
        });
      }
    }
    reader.readAsDataURL(file);
  }


  /*  handleUploadFile(event) {
     event.preventDefault();
     const { munition } = this.state;
     if (event.target.id == "MunitionPhoto") {
       let reader = new FileReader();
       let file = event.target.files[0];
       reader.onloadend = () => {
         this.setState({
           imagePreviewUrl: reader.result
         });
       }
       reader.readAsDataURL(file);
     }
     let parametername = event.target.id;
     this.setState({
       munition: {
         ...munition,
         [parametername]: event.target.files[0].name
       }
     }, () => {
       console.log("New state in ASYNC callback:", this.state.munition);
     });
     const data = new FormData();
     data.append('file', event.target.files[0]);
     data.append('name', event.target.files[0].name);
     //this.props.uploadFile(data);
   } */

  handleSubmit = event => {
    event.preventDefault();
    const { munition } = this.state;
    const { editId } = this.props;
    munition.MunitionType = this.props.munitionType;
    const { gunMunitionFiles } = this.state;
    //We are going to upload files with JSON request body.
    const formData = new FormData();
    if (gunMunitionFiles.MunitionPhoto) {
      formData.append('MunitionPhoto', gunMunitionFiles.MunitionPhoto, gunMunitionFiles.MunitionPhoto.name);
    }
    if (gunMunitionFiles.MunitionWireframe) {
      formData.append('MunitionWireframe', gunMunitionFiles.MunitionWireframe, gunMunitionFiles.MunitionWireframe.name);
    }
    if (gunMunitionFiles.Munition3D) {
      formData.append('Munition3D', gunMunitionFiles.Munition3D, gunMunitionFiles.Munition3D.name);
    }
    if (gunMunitionFiles.MunitionIcon) {
      formData.append('MunitionIcon', gunMunitionFiles.MunitionIcon, gunMunitionFiles.MunitionIcon.name);
    }
    if (gunMunitionFiles.Munition2525B) {
      formData.append('Munition2525B', gunMunitionFiles.Munition2525B, gunMunitionFiles.Munition2525B.name);
    }
    if (gunMunitionFiles.MunitionDatasheet) {
      formData.append('MunitionDatasheet', gunMunitionFiles.MunitionDatasheet, gunMunitionFiles.MunitionDatasheet.name);
    }
    if (editId !== undefined && editId !== '0') {
      munition.MunitionID = editId;
      console.log("editId " + editId);
      console.log("munition " + JSON.stringify(munition));
      formData.append("munitionFormData", JSON.stringify(munition));
      this.setState({loading: true});

      this.props.updateMunition(editId, formData).then(() => { 
        this.setState({loading: false});
        this.props.onClose(NoticeType.UPDATE);
       });
    } else {
      formData.append("munitionFormData", JSON.stringify(munition));
      this.setState({loading: true});
      this.props.addMunition(formData).then(() => { 
        this.setState({loading: false});
        this.props.onClose(NoticeType.ADD); 
      });
    }
  }


  stopset() {
    this.setState({ clear: false });
  }

  resetForm() {
    const {translations}= this.props;
   this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("ClearConfirmation")) {
      this.setState({
        clear: true,
        gunPhotoPreviewUrl: '/assets/img/admin/rockets.png',
       // gunMunitionFiles : {}
      });
      document.getElementById('munitionform').reset();
    }
    else {
    }
    
  }

  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    let { gunPhotoPreviewUrl } = this.state;
    let $imagePreview = '';

    //const imageUrl = this.props.oneMunition.MunitionPhoto;

   /*  if (imageUrl !== undefined && imageUrl !== "" && this.props.editId != '0') {
      $imagePreview = (<img src={imageUrl} alt="" className="photo" alt="" />);
    } */ 
    if (gunPhotoPreviewUrl || gunPhotoPreviewUrl === '') {
      $imagePreview = (<img src={gunPhotoPreviewUrl} alt="" className="photo" alt="" />);
    }else {

      $imagePreview = (<img src="/assets/img/admin/rockets.png" className="photo" alt="" />);
    }
    

    let { munition } = this.state;
    const { translations } = this.props;
    const { munitionType } = this.props;

    const generalFields = [
      { name: translations['Munition Name'], type: 'input', domID: 'MunitionName', valFieldID: 'MunitionName', required: true },
      { name: translations['Munition Nomenclature'], type: 'input', domID: 'MunitionNomenclature', valFieldID: 'MunitionNomenclature', required: true },
      { name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'MunitionRoles', valFieldID: 'MunitionRole', required: true },
      { name: translations['Manufacture'], type: 'dropdown', domID: 'dispMunitionManufacturer', ddID: 'Companies/GetCompanies', valFieldID: 'MunitionManufacturer' },
      { name: translations['Service Executive Agent'], type: 'input', domID: 'MunitionExecutiveAgent', valFieldID: 'MunitionExecutiveAgent' },
      { name: translations['Contract Program'], type: 'input', domID: 'MunitionContractProgram', valFieldID: 'MunitionContractProgram' },
      { name: translations['Cost'], type: 'number', domID: 'MunitionCost', valFieldID: 'MunitionCost' },
      { name: translations['Cost notes'], type: 'input', domID: 'MunitionCostNotes', valFieldID: 'MunitionCostNotes' },
    ];

    const crewFields = [
      { name: translations['Munitions Crew Count'], type: 'number', domID: 'MunitionCrewCount', valFieldID: 'MunitionCrewCount' },
      { name: translations['MOS#1'], type: 'dropdown', domID: 'dispMOS1', ddID: "MOS", valFieldID: 'MunitionMOS1' },
      { name: translations['MOS#2'], type: 'dropdown', domID: 'dispMOS2', ddID: "MOS", valFieldID: 'MunitionMOS2' },
      { name: translations['MOS#3'], type: 'dropdown', domID: 'dispMOS3', ddID: "MOS", valFieldID: 'MunitionMOS3' },
    ];

    const technicalFields = [
      /* { name: translations['Type'], type: 'input', domID: 'MunitionType', valFieldID: 'MunitionType', required: true }, */
      { name: translations['Caliber'], type: 'input', domID: 'MunitionCaliber', valFieldID: 'MunitionCaliber', required: true },
      { name: translations['Drive System'], type: 'input', domID: 'MunitionDriveSystem', valFieldID: 'MunitionDriveSystem' },
      { name: translations['Feed System'], type: 'input', domID: 'MunitionFeedSystem', valFieldID: 'MunitionFeedSystem' },
      { name: translations['Rate of Fire'], type: 'number', domID: 'MunitionRateFire', valFieldID: 'MunitionRateFire' },
      { name: translations['Muzzle Velocity'], type: 'number', domID: 'MunitionMuzzleVelocity', valFieldID: 'MunitionMuzzleVelocity' },
      { name: translations['Projectile Weight'], type: 'number', domID: 'MunitionProjectileWeight', valFieldID: 'MunitionProjectileWeight', required: true },
      { name: translations['Mussel Energy'], type: 'number', domID: 'MunitionMuzzleEnergy', valFieldID: 'MunitionMuzzleEnergy' },
      { name: translations['Length'], type: 'number', domID: 'MunitionLength', valFieldID: 'MunitionLength' },
      { name: translations['Width/Diameter'], type: 'number', domID: 'MunitionWidthDiameter', valFieldID: 'MunitionWidthDiameter' },
      { name: translations['Height'], type: 'number', domID: 'MunitionHeight', valFieldID: 'MunitionHeight' },
      { name: translations['Weight Unloaded(lbs.)'], type: 'number', domID: 'MunitionWeightUnloaded', valFieldID: 'MunitionWeightUnloaded' },
      { name: translations['Weight Loaded(lbs.)'], type: 'number', domID: 'MunitionWeightLoaded', valFieldID: 'MunitionWeightLoaded' },
      { name: translations['Rounds Carried'], type: 'number', domID: 'MunitionRoundsCarried', valFieldID: 'MunitionRoundsCarried' },
    ];

    const uploadFileFields = [
      { name: translations['Photo Image'], type: 'file', domID: 'MunitionPhoto', valFieldID: 'MunitionPhoto', fileType: 'image' },
      { name: translations['Wireframe Image'], type: 'file', domID: 'MunitionWireframe', valFieldID: 'MunitionWireframe', fileType: 'image' },
      { name: translations['3D Model'], type: 'file', domID: 'Munition3D', valFieldID: 'Munition3D', fileType: 'image' },
      { name: translations['2D Icon'], type: 'file', domID: 'MunitionIcon', valFieldID: 'MunitionIcon', fileType: 'image' },
      { name: translations['Milspec Icon'], type: 'file', domID: 'Munition2525B', valFieldID: 'Munition2525B', fileType: 'image' },
      { name: translations['Datasheets'], type: 'file', domID: 'MunitionDatasheet', valFieldID: 'MunitionDatasheet', fileType: 'file'}
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} id="munitionform">
        {/* <div className="close-button" >
            <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
          </div> */}
        <div className="payload-content">
          <div className="row personnel" >
          <Loader loading={this.state.loading} />
            {/* <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                {translations["guns administration"]}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div> */}
            <div className="personnel-content">
              <div className="col-md-8 image-block">
                {$imagePreview}
              </div>
              <UploadFileBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Upload Imagery & Datasheets"]} fields={uploadFileFields}
                data={this.handleUploadFileData} initstate={this.props.oneMunition} previewFile={this.handlePhotoPreviewURL} isImagedRequired={this.state.isImagedRequired} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd}  ></UploadFileBlock>
            </div>
          </div>
          <div className="row personnel" >
            <div className="under-munitions-content">

              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields}
                data={this.handleMunitionGeneralData} initstate={this.props.oneMunition} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields}
                data={this.handleMunitionCrewData} initstate={this.props.oneMunition} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd} />
              <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Technical specification"]} fields={technicalFields}
                data={this.handleMunitionTechnicalData} initstate={this.props.oneMunition} clearit={this.state.clear} stopset={this.stopset.bind(this)}
                editFetched={this.state.editFetched} stopupd={this.stopupd} />
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

GunModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMunition: state.munitions.oneMunition,
  };
};

const mapDispatchToProps = {
  addMunition,
  fetchMunitions,
  uploadFile,
  fetchMunitionsById,
  updateMunition,
};

export default connect(mapStateToProps, mapDispatchToProps)(GunModal);
