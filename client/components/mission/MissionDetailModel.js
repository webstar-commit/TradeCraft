import { uploadFile } from 'actions/file';
import { addPlatformInventory, fetchPlatformInventoryById, updatePlatformInventory } from 'actions/platforminventory';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { baseUrl } from 'dictionary/network';
import axios from 'axios';
import Loader from '../reusable/Loader';
import ContentBlock from '../reusable/ContentBlock';
import { requestHeaders } from '../../dictionary/network';




class MissionDetailModel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      imagePreviewUrl: '',
      locationcategory: '',
      inventoryId: '0',
      isUpdated: false,
       platform: {
      //   metaDataID: '',
      //   locationID: '',
      //   owningUnit: '',
      //   tailNumber: '',
      //   dispPlatformPayload1: '',
      //   dispPlatformPayload2: '',
      //   dispPlatformPayload3: '',
      //   dispPlatformArmament1: '',
      //   dispPlatformArmament2: '',
      //   dispPlatformArmament3: '',
      //   dispPlatformComs1: '',
      //   dispPlatformComs2: '',
      },
      onePlatformInventory: {},
      loading:false
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchPlatformInventoryById(editId).then(() => {
        this.setState({
          isUpdated: true,
          platform: this.props.onePlatformInventory,
        });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchPlatformInventoryById(this.props.editId).then(() => {
        this.setState({
          isUpdated: true,
          platform: this.props.onePlatformInventory,
        });

      });
    }

    if(editId === '0' && prevProps.editId !== editId) {
      this.setState({ clear: true });
    }
  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }
  
  handlePlatformGeneralData = (generalData) => {
    const { platform } = this.state;
    this.setState({ locationcategory: generalData.locationcategory });
    this.setState({ selectedBranch: generalData.branch });

    this.setState({
      platform: {
        ...platform,
        metaDataID: generalData.metaDataID,
        locationID: generalData.locationID,
        owningUnit: generalData.owningUnit,
        locationcategory: generalData.locationcategory,
        tailNumber: generalData.tailNumber,
        payload1: generalData.payload1,
        payload2: generalData.payload2,
        payload3: generalData.payload3,
        armament1: generalData.armament1,
        armament2: generalData.armament2,
        armament3: generalData.armament3,
        coms1: generalData.coms1,
        coms2: generalData.coms2,       
        branch: generalData.branch,
        COCOM: generalData.COCOM,
      },
    });

    if(generalData.locationcategory && generalData.locationcategory!=this.state.locationcategory) {
      this.updatelocationid(generalData);
    }
    if( generalData.branch && generalData.branch !== this.state.selectedBranch) {
      this.updateOwningUnit(generalData);
    }
  }

  handlePayloadData = (generalData) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        payload1: generalData.payload1,
        payload2: generalData.payload2,
        payload3: generalData.payload3,
        coms1: generalData.coms1,
      },
    });
  }

  handleArmsData = (generalData) => {
    const { platform } = this.state;
    this.setState({
      platform: {
        ...platform,
        armament1: generalData.armament1,
        armament2: generalData.armament2,
        armament3: generalData.armament3,
        coms2: generalData.coms2,
      },
    });
  }

  handleSubmit = event => {
    this.setState({
      loading:true
    });
    event.preventDefault();
    let { platform } = this.state;
    const { editId } = this.props;
    console.log(JSON.stringify(platform));
    if (editId !== undefined && editId !== '0') {
      platform.id = editId;
      this.props.updatePlatformInventory(editId, platform).then( () => {
        this.setState({
          loading:false
        });
        this.props.onClose(NoticeType.UPDATE);
      });
    } else {
      this.props.addPlatformInventory(platform).then( () => {
        this.setState({
          loading:false
        });
        this.props.onClose(NoticeType.ADD);
      });
    }
  }

  updatelocationid (generalData) {
    let locationselect = document.getElementsByName('locationID')[0];
    locationselect.length = 0;
    locationselect.add(new Option('--Fetching Locations--', ''));
    let items = [{'label': 'Loading Locations', 'value': ''}];
    const apiUrl = `${baseUrl}/Locations/GetLocationsByCategory?Category=` + generalData.locationcategory;
    axios.get(apiUrl,{headers:requestHeaders})
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
        // if(items.length > 1) {items.length = 0; items = [{'label': '--Select Item--', 'value': 0}];}
        // response.data.map(item => {
        //   items.push({ 'label': item['description'], 'value': item['id'].trim() });
        // });
        // if (locationselect.length > 0) {locationselect.length = 0;}
        // for(let i in items) {
        //   locationselect.add(new Option(items[i].label, items[i].value));
        // }
      })
      .catch((error) => {
        locationselect.length = 0;
        locationselect.add(new Option('Error Fetching Locations', ''));
        console.log('Exception comes:' + error);
      });
  }




  updateOwningUnit (generalData) {
    let unitselect = document.getElementsByName('owningUnit')[0];
    unitselect.length = 0;
    unitselect.add(new Option('--Fetching units--', ''));
    let items = [{'label': 'Loading Units', 'value': ''}];
    const apiUrl = `${baseUrl}/Units/GetUnits?branchID=` + generalData.branch;
    axios.get(apiUrl,{headers:requestHeaders})
      .then(response => {
        unitselect.length = 0;
        if(response.data) {
          unitselect.add(new Option('--Select Unit--', ''));
          response.data.map(item => {
            let selected = false;
            if(item.id == generalData.owningUnit) {
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

  stopset () {
    this.setState({clear:false});
  }


  resetForm() {
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      this.setState({clear:true});
    }
    else {
 
    }
  }

  render() {
    // Render nothing if the "show" prop is false
    // if (!this.props.show) {
    //   return null;
    // }
   
    const { translations } = this.props;

    const generalFields = [
      { name: "Platform Specifications", type: 'dropdown', ddID: 'Platform/GetPlatforms', domID: 'metaDataID', valFieldID: 'metaDataID', required: true },
      { name: translations['Tail#'], type: 'input', domID: 'Tail#', valFieldID: 'tailNumber', required: true },
      {name: translations['COCOM'], type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM',valFieldID: 'COCOM',required:true},
      { name: translations['Branch'], type: 'dropdown', domID: 'ServiceBranch', ddID: 'BranchOfService', valFieldID: 'branch', required: true },
      { name: translations['Owning Unit'], type: 'dropdown', domID: 'owningUnit', ddID: 'Units/GetUnits', valFieldID: 'owningUnit'  , required: true},
      { name: 'Location Category', type: 'dropdown', domID: 'locationcategory', ddID: 'LocationCategory', valFieldID: 'locationcategory' , required: true},
      { name: 'Location ID', type: 'dropdown', domID: 'locationID', ddID: '', valFieldID: 'locationID' , required: true},
    ];

    const payloadFields = [
      { name: translations['Payload #1'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload1', valFieldID: 'payload1' },
      { name: translations['Payload #2'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload2', valFieldID: 'payload2' },
      { name: translations['Payload #3'], type: 'dropdown', ddID: 'PayloadInventory/GetPayloadInventory', domID: 'dispPlatformPayload3', valFieldID: 'payload3' },
      { name: translations['Coms Type #1'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs1', valFieldID: 'coms1' },
    ];

    const armsFields = [
      { name: translations['Armament #1'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament1', valFieldID: 'armament1' },
      { name: translations['Armament #2'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament2', valFieldID: 'armament2' },
      { name: translations['Armament #3'], type: 'dropdown', ddID: 'MunitionsInventory/GetMunitionsInventory', domID: 'dispPlatformArmament3', valFieldID: 'armament3' },
      { name: translations['Coms Type #2'], type: 'dropdown', ddID: 'ComsType', domID: 'dispPlatformComs2', valFieldID: 'coms2' },
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} >
        {/*  <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div> */}
              <Loader loading={this.state.loading} />

        <div className="payload-content">
          <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                Add Platform Inventory
              </div>

              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
          </div>

          <div className="row personnel" >
            <div className="under-munitions-content">
              <ContentBlock fields={generalFields} data={this.handlePlatformGeneralData} initstate={this.props.onePlatformInventory} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={payloadFields} data={this.handlePayloadData} initstate={this.props.onePlatformInventory} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <ContentBlock fields={armsFields} data={this.handleArmsData} initstate={this.props.onePlatformInventory} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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
{/*               {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']}
 */}
 
               {translations['submit']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

MissionDetailModel.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePlatformInventory: state.platforminventory.onePlatformInventory,
  };
};

const mapDispatchToProps = {
  addPlatformInventory,
  fetchPlatformInventoryById,
  updatePlatformInventory,
  uploadFile,

};

export default connect(mapStateToProps, mapDispatchToProps)(MissionDetailModel);
