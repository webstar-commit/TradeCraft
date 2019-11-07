import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UploadBlock from '../../reusable/UploadBlock';
import ContentBlock from '../../reusable/ContentBlock';
import { baseUrl } from 'dictionary/network';
import axios from 'axios';

import { uploadFile } from 'actions/file';
import { addPayloadInventory, updatePayloadInventory, fetchPayloadInventoryById } from 'actions/payloadinventory';
import Loader from '../../reusable/Loader';
import { requestHeaders } from '../../../dictionary/network';

class AddPayloadsInventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      editFetched:false,
      imagePreviewUrl: '',
      locationcategory: '',
      onePayloadInventory: {},
      loading:false

      // payloads : {
      // metaDataID:'',
      // locationID:'',
      // owningUnit:'',
      // serialNumber:''
      // },
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    const { editId } = this.props;
    this.setState({ clear: true });
    if(editId !== '0') {
      this.editComponent(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
  }

  editComponent = (editId) => {
    this.props.fetchPayloadInventoryById(editId).then(() => {
      this.setState({
        editFetched: true,
        payloads: this.props.onePayloadInventory,
      });
    });
  }

  stopUpdate = () => {
    this.setState({editFetched:false});
  }


  handlePayloadGeneralData = (generalData) => {
    const { payloads } = this.state;
    this.setState({ locationcategory: generalData.locationcategory });
    this.setState({
      payloads: {
        ...payloads,
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        serialNumber: generalData.serialNumber,
        locationcategory: generalData.locationcategory,
        COCOM: generalData.COCOM,
        branch: generalData.branch,
        id: this.props.editId,
      },
      selectedBranch: generalData.branch,

    });

    if(generalData.locationcategory && generalData.locationcategory!=this.state.locationcategory) {
      this.updatelocationid(generalData);
    }

    if(generalData.branch && generalData.branch !== this.state.selectedBranch) {
      this.updateOwningUnit(generalData);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const { editId } = this.props;
    let { payloads } = this.state;
    if (editId !== undefined && editId !== '0') {
      this.setState({loading:true});
      payloads.id = editId;
      this.props.updatePayloadInventory(editId, payloads).then( () => {
        this.setState({loading:false});
        this.props.onClose('UPDATE');});
    } else {
      this.setState({loading:true});
      this.props.addPayloadInventory(this.state.payloads).then( () => {
        this.setState({loading:false});
        this.props.onClose('ADD');}
      );
    }
    
  }

  updatelocationid (generalData) {
    const { translations } = this.props;
    let locationselect = document.getElementsByName('locationID')[0];
    locationselect.length = 0;
    locationselect.add(new Option(translations['Fetching Locations'], ''));
    const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=` + generalData.locationcategory;
    axios.get(apiUrl,{headers:requestHeaders})
      .then(response => {
        locationselect.length = 0;
        if(response.data) {
          locationselect.add(new Option(translations['Select Location'], ''));
          response.data.map(item => {
            let selected = false;
            if(item.id === generalData.locationID) {
              selected = true;
            }
            locationselect.add(new Option(item.description, item.id.trim(), selected, selected));
          });
        }else{
          locationselect.add(new Option(translations['No Location Found'], ''));
        }
      })
      .catch((error) => {
        locationselect.length = 0;
        locationselect.add(new Option(translations['Error Fetching Locations'], ''));
        console.log('Exception comes:' + error);
      });
  }



  updateOwningUnit (generalData) {
    const { translations } = this.props;
    let unitselect = document.getElementsByName('owningUnit')[0];
    unitselect.length = 0;
    unitselect.add(new Option(translations['Fetching Units'], ''));
    const apiUrl = `${baseUrl}/Units/GetUnits?branchID=` + generalData.branch;
    axios.get(apiUrl,{headers:requestHeaders})
      .then(response => {
        unitselect.length = 0;
        if(response.data) {
          unitselect.add(new Option(translations['Select Unit'], ''));
          response.data.map(item => {
            let selected = false;
            if(item.id == generalData.owningUnit) {
              selected = true;
            }
            unitselect.add(new Option(item.description, item.id.trim(), selected, selected));
          });
        }else{
          const { translations } = this.props;
          unitselect.add(new Option(translations['No Unit Found'], ''));
        }
      })
      .catch((error) => {
        const { translations } = this.props;
        unitselect.length = 0;
        unitselect.add(new Option(translations['Error Fetching Units'], ''));
        console.log('Exception comes:' + error);
      });
  }

  stopset () {
    this.setState({clear:false});
  }

  resetForm() {
    const { translations } = this.props;
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm(translations["ClearConfirmation"])) {
      this.setState({clear:true});
    }
    else {
 
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    // if(!this.props.show) {
    //   return null;
    // }

    const { translations } = this.props;
    // let { onePayloadInventory } = this.props;
    // if (onePayloadInventory === undefined) {
    //   onePayloadInventory = {};
    // }

    const generalFields = [
      { name: translations['Payload Specifications'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      { name: translations['Serial#'], type: 'input', domID: 'serialNumber', valFieldID: 'serialNumber', required: true },
      { name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM', valFieldID: 'COCOM'},
      { name: translations['Branch'], type: 'dropdown', domID: 'ServiceBranch', ddID: 'BranchOfService', valFieldID: 'branch', required: true },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'owningUnit', ddID: 'Units/GetUnits', valFieldID: 'owningUnit' , required: true},
      { name: translations['Location Category'], type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory' , required: true},
      { name: translations['Location ID'], type: 'dropdown', domID: 'locationID', ddID: '', valFieldID: 'locationID', required: true },
    ];

    return (

      <form action="" onSubmit={this.handleSubmit} >

        {/*  <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div> */}
        <div className="payload-content">
          <Loader loading={this.state.loading} />
          {/* <div className="row personnel" >
            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt=""/>
              <div className="header-text">
                  Add Payloads Inventory
              </div>
              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
            </div>
          </div> */}

          <div className="row personnel" >
            <div className="under-munitions-content">
              <div className="col-md-4" />
              <ContentBlock fields={generalFields} editId={this.props.editId} data={this.handlePayloadGeneralData} initstate ={this.props.onePayloadInventory} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched = {this.state.editFetched} stopupd = {this.stopUpdate}/>
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
              {translations['submit']}

            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>

      </form>

    );
  }
}

AddPayloadsInventory.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePayloadInventory: state.payloadinventory.onePayloadInventory,
  };
};

const mapDispatchToProps = {
  uploadFile,
  addPayloadInventory,
  updatePayloadInventory,
  fetchPayloadInventoryById,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPayloadsInventory);
