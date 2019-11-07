import React from 'react';
import PropTypes from 'prop-types';
import ContentBlock from '../../reusable/ContentBlock';
import { connect } from 'react-redux';
import { addCcirPir, updateCcirPir, fetchCcirPirById } from 'actions/ccirpir';
import { NoticeType } from '../../../dictionary/constants';
import Loader from '../../reusable/Loader';
import axios from 'axios';
import { getKMLCenter } from 'map/kmlGrinder';
import { requestHeaders, baseUrl } from '../../../dictionary/network';

class CcirPirModal extends React.Component {

  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('session'));
    this.state = {
      addClicked: false,
      editFetched: false,
      ccirpir: {
        COCOMId: session.COCOMID,
        BranchId: session.Branch,
        CountryId: session.LocationCountry,
        RegionId: session.LocationRegion,
        UnitId: session.AssignedUnit,
        // CommanderId: '',
        // Type: '',
        // MissionName: '',
        // EffectiveAreaKML: '',
        // Description1: '',
        // Description2: '',
        // Description3: '',
        // Description4: '',
        // Description5: '',
        // Description6: '',
        // Description7: '',
        // Description8: '',
      },

      EffectiveAreaKML: null,
      oneCcirPir: {},
      loading: false,
    };

  }

  componentDidMount() {
    const { editId } = this.props;
    
    if(editId !== '0') {
      this.props.fetchCcirPirById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            ccirpir: this.props.oneCcirPir,
          });

      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;

    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchCcirPirById(editId).then(() => {
        this.setState(
          {
            editFetched: true,
            ccirpir: this.props.oneCcirPir,
          });
      });
    }
  }

  baseState = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    this.setState({
      ccirpir: {
        COCOMId: session.COCOMID,
        BranchId: session.Branch,
        CountryId: session.LocationCountry,
        RegionId: session.LocationRegion,
        UnitId: session.AssignedUnit,
        // CommanderId: '',
        // Type: '',
        // MissionName: '',
        // EffectiveAreaKML: '',
      },
    });
  }

  stopupd = () => {
    this.setState({ editFetched: false });
  }

  handleCcirPirGeneralData = (generalData) => {
    const { ccirpir } = this.state;
    this.setState({ selectedBranch: generalData.BranchId });

    this.setState({
      EffectiveAreaKML: generalData.EffectiveAreaKML,
      ccirpir: {
        ...ccirpir,
        COCOMId: generalData.COCOMId,
        BranchId: generalData.BranchId,
        CountryId: generalData.CountryId,
        RegionId: generalData.RegionId,
        UnitId: generalData.UnitId,
        // CommanderId: generalData.CommanderId,
        /* Type: generalData.Type,*/
        MissionName: generalData.MissionName,
        /* EffectiveAreaKML: generalData.EffectiveAreaKML, */
        CCIRPIRId: this.props.editId,
      },
    });

    if(generalData.BranchId && generalData.BranchId !== this.state.selectedBranch) {
      this.updateUnit(generalData);
    }
  }

handleCcirData = (ccirData) => {
  const { ccirpir } = this.state;
  this.setState({
    ccirpir: {
      ...ccirpir,
      Description1: ccirData.Description1,
      Description2: ccirData.Description2,
      Description3: ccirData.Description3,
      Description4: ccirData.Description4,
    },
  });
}

handlePirData = (pirData) => {
  const { ccirpir } = this.state;
  this.setState({
    ccirpir: {
      ...ccirpir,
      Description5: pirData.Description5,
      Description6: pirData.Description6,
      Description7: pirData.Description7,
      Description8: pirData.Description8,
    },
  });
}

stopset = () => {
  this.setState({ clear: false });
}

updateUnit(generalData) {
  const unitselect = document.getElementsByName('UnitId')[0];
  unitselect.length = 0;
  unitselect.add(new Option('--Fetching Units--', ''));
  const apiUrl = `${baseUrl}/Units/GetUnits?branchID=` + generalData.BranchId;
  axios.get(apiUrl, { headers: requestHeaders })
    .then(response => {
      unitselect.length = 0;
      if(response.data) {
        unitselect.add(new Option('--Select Unit--', ''));
        response.data.map(item => {
          let selected = false;
          if(item.id == generalData.UnitId) {
            selected = true;
          }
          unitselect.add(new Option(item.description, item.id.trim(), selected, selected));
        });
      }else{
        unitselect.add(new Option('No Unit Found', ''));
      }
    })
    .catch((error) => {
      unitselect.length = 0;
      unitselect.add(new Option('Error Fetching Units', ''));
      console.log('Exception comes:' + error);
    });
}

resetForm = () => {
  const {translations} = this.props;
  this.setState(this.baseState);
  console.log('FORM RESET DONE');
  if (confirm(translations["ClearConfirmation"])) {
    this.setState({ clear: true });
    document.getElementById('personnelform').reset();
  }
}

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    const kmlFile = this.state.EffectiveAreaKML;

    if (kmlFile) {
      // instantiating new FileReader to read KML file
      const reader = new FileReader();

      reader.onloadend = () => {
        this.submitData(kmlFile, reader, formData);
      };
      // if new file Selected
      if(typeof kmlFile === 'object') {
        reader.readAsText(kmlFile);
        formData.append('EffectiveAreaKML', kmlFile, kmlFile.name);
      } else {
        this.submitData(kmlFile, reader, formData);
      }
    }

  }

  submitData(kmlFile, reader, formData) {
    let centerPoints;
    const { ccirpir } = this.state;
    const { editId } = this.props;

    // if New File Selected
    if(typeof kmlFile === 'object') {
      // Empty old CenterPoint
      ccirpir.CenterPoint = [];
      centerPoints = getKMLCenter(reader.result);
      ccirpir.CenterPoint = centerPoints;
    }

    if (editId !== undefined && editId !== '0') {
      // Start Loader
      this.setState({ loading: true });
      ccirpir.CCIRPIRId = editId;
      ccirpir.LastUpdateUserId = null;
      formData.append('ccirpirFormData', JSON.stringify(ccirpir));
      this.props.updateCcirPir(editId, formData).then(() => {
        // Stop Loader
        this.setState({ loading: false });
        this.props.onClose(NoticeType.UPDATE);
      });
    } else {
      ccirpir.LastUpdateUserId = null;
      formData.append('ccirpirFormData', JSON.stringify(ccirpir));
      // Start Loader
      this.setState({ loading: true });
      this.props.addCcirPir(formData).then(() => {
        // Stop Loader
        this.setState({ loading: false });
        this.props.onClose(NoticeType.ADD);
      });
    }
  }

  render() {

    const { translations } = this.props;
    const { EffectiveAreaKML } = this.state;

    let generalFields = [];
    let kmlRequired = true;
    if(EffectiveAreaKML !== undefined && EffectiveAreaKML !== null && EffectiveAreaKML !== '') {
      kmlRequired = false;
    }
    generalFields = [
      { name: translations['COCOM'], type: 'dropdown', ddID: 'COCOM', valFieldID: 'COCOMId', domID: 'COCOM' },
      { name: translations['Branch'], type: 'dropdown', ddID: 'BranchOfService', valFieldID: 'BranchId', domID: 'Branch', required: true },
      { name: translations['Country'], type: 'dropdown', ddID: 'Countries', valFieldID: 'CountryId', domID: 'Country', required: true },
      { name: translations['Region'], type: 'dropdown', ddID: 'Regions', valFieldID: 'RegionId', domID: 'Region', required: true },
      { name: translations['Unit'], type: 'dropdown', ddID: 'Units/GetUnits', valFieldID: 'UnitId', domID: 'Unit', required: true },
      // { name: 'Commander', type: 'dropdown', ddID: 'Personnel/GetCommanderList', valFieldID: 'CommanderId', domID: 'Commander', required: true },
      { name: translations['Named Operation'], type: 'input', valFieldID: 'MissionName', domID: 'Opname', required: true },
      { name: translations['Effective Area KML'], type: 'file', valFieldID: 'EffectiveAreaKML', domID: 'KML', extension: 'kml', required: kmlRequired },
    ];

    const ccirFields = [
      { name: translations.ccir1, type: 'textarea', valFieldID: 'Description1', domID: 'desc1', required: true },
      { name: translations.ccir2, type: 'textarea', valFieldID: 'Description2', domID: 'desc2' },
      { name: translations.ccir3, type: 'textarea', valFieldID: 'Description3', domID: 'desc3' },
      { name: translations.ccir4, type: 'textarea', valFieldID: 'Description4', domID: 'desc4' },
    ];

    const pirFields = [
      { name: translations.pir1, type: 'textarea', valFieldID: 'Description5', domID: 'desc5', required: true },
      { name: translations.pir2, type: 'textarea', valFieldID: 'Description6', domID: 'desc6' },
      { name: translations.pir3, type: 'textarea', valFieldID: 'Description7', domID: 'desc7' },
      { name: translations.pir4, type: 'textarea', valFieldID: 'Description8', domID: 'desc8' },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >
        <div className="payload-content">
          <Loader loading={this.state.loading} />
          {/* <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt=""/>
              <div className="header-text">
                {translations['Add Ccir/Pirs']}
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
            </div>
          </div> */}
          <div className="row personnel" >
            <div className="under-payload-content">
              <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handleCcirPirGeneralData}
                headerLine="/assets/img/admin/upload_1.png" title={translations['Ccir/Pir']}
                initstate ={this.state.ccirpir} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>

              <ContentBlock fields={ccirFields} editId={this.props.editId} data={this.handleCcirData}
                headerLine="/assets/img/admin/upload_1.png" title={translations.ccir}
                initstate ={this.state.ccirpir} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>

              <ContentBlock fields={pirFields} editId={this.props.editId} data={this.handlePirData}
                headerLine="/assets/img/admin/upload_1.png" title={translations.pir}
                initstate ={this.state.ccirpir} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopupd}/>
            </div>
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="button" className="highlighted-button" onClick={this.resetForm.bind(this)}>
              {translations.clear}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>

          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className="highlighted-button">
              {/* {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']} */}
              {translations.submit}

            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>

          {/*   <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className="highlighted-button" onClick={() => this.props.onClose()}>
              {translations['close']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div> */}
        </div>

      </form>

    );
  }
}

CcirPirModal.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneCcirPir: state.ccirpir.oneCcirPir,
  };
};

const mapDispatchToProps = {
  addCcirPir,
  updateCcirPir,
  fetchCcirPirById,
};

export default connect(mapStateToProps, mapDispatchToProps)(CcirPirModal);

// export default CcirPirModal;
