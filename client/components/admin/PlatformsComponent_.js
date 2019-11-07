import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UploadBlock from "../reusable/UploadBlock";
import ContentBlock from "../reusable/ContentBlock";
import ButtonsList from "../reusable/ButtonsList";
import axios from 'axios';

class PersonnelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      platform:{
        PlatformID: '',
        PlatformWireframe: '',
        PlatformPhoto: '',
        Platform3D: '',
        PlatformIcon: '',
        Platform2525B: '',
        PlatformDatasheet: '',
        PlatformTailNumber: '',
        PlatformName: '',
        PlatformNomenclature: '',
        PlatformCategory: '',
        PlatformService: '',
        PlatformRole: '',
        PlatformManufacturer: '',
        PlatformExecutiveAgent: '',
        PlatformContractProgram: '',
        PlatformCost: '',
        PlatformCostNotes: '',
        PlatformIOCDate: '',
        // PlatformGroundStation: '',
        PlatformLength: '',
        PlatformWingspan: '',
        PlatformHeight: '',
        PlatformWeight: '',
        PlatformPowerPlant: '',
        PlatformFuelCapacity: '',
        PlatformCruisingSpeed: '',
        PlatformRange: '',
        PlatformCeiling: '',
        PlatformMaxTakeOff: '',
        PlatformMinRunway: '',
        PlatformPayloadCapacity: '',
        PlatformPayloadCount: '',
        // PlatformPayload1: '',
        // PlatformPayload2: '',
        // PlatformPayload3: '',
        PlatformArmamentCapacity: '',
        PlatformArmamentCount: '',
        PlatformArmament1: '',
        PlatformArmament2: '',
        PlatformArmament3: '',
        // PlatformComs1: '',
        // PlatformComs2: '',
        PlatformFlightCrewReq: '',
        PlatformLineCrewReq: '',
        PlatformPayloadCrewReq: '',
        PlatformPEDCrewReq: '',
        PlatformFlightCrewMOS: '',
        PlatformLineCrewMOS: '',
        PlatformPayloadCrewMOS: '',
        PlatformPEDCrewMOS: '',
        MOS_Desc: '',
        MOS_Desc1: '',
        MOS_Desc2: '',
        MOS_Desc3: '',
        Payload: '',
        Payload1: '',
        Payload2: '',
        PlatformCategory1: '',
        PlatformRole1: ''
      }
    }
    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state
  }

  handlePlatformGeneralData = (generalData) => {
    const {platform} = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformTailNumber: generalData.PlatformTailNumber,
        PlatformName: generalData.PlatformName,
        PlatformNomenclature: generalData.PlatformNomenclature,
        PlatformCategory: generalData.PlatformCategory,
        PlatformService: generalData.PlatformService,
        PlatformRole: generalData.PlatformRole,
        PlatformManufacturer: generalData.PlatformManufacturer,
        PlatformExecutiveAgent: generalData.PlatformExecutiveAgent,
        PlatformContractProgram: generalData.PlatformContractProgram,
        PlatformCost: generalData.PlatformCost,
        PlatformCostNotes: generalData.PlatformCostNotes,
        PlatformIOCDate: generalData.PlatformIOCDate,
        // PlatformInventory: generalData.PlatformInventory,
        // PlatformGroundStation: generalData.PlatformGroundStation
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    });
  }

  handlePlatformTechnicalData = (technicalData) => {
    const {platform} = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformLength: technicalData.PlatformLength,
        PlatformWingspan: technicalData.PlatformWingspan,
        PlatformHeight: technicalData.PlatformHeight,
        PlatformWeight: technicalData.PlatformWeight,
        PlatformPowerPlant: technicalData.PlatformPowerPlant,
        PlatformFuelCapacity: technicalData.PlatformFuelCapacity,
        PlatformCruisingSpeed: technicalData.PlatformCruisingSpeed,
        PlatformRange: technicalData.PlatformRange,
        PlatformCeiling: technicalData.PlatformCeiling,
        PlatformMaxTakeOff: technicalData.PlatformMaxTakeOff,
        PlatformMinRunway: technicalData.PlatformMin
        
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    }); 
  }

  handlePlatformPayloadData = (payloadData) => {
    const {platform} = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformPayloadCapacity: payloadData.PlatformPayloadCapacity,
        PlatformPayloadCount: payloadData.PlatformPayloadCount,
        // PlatformPayload1: payloadData.PlatformPayload1,
        // PlatformPayload2: payloadData.PlatformPayload2,
        // PlatformPayload3: payloadData.PlatformPayload3,
        PlatformArmamentCapacity: payloadData.PlatformArmamentCapacity,
        PlatformArmamentCount: payloadData.PlatformArmamentCount,
        PlatformArmament1: payloadData.PlatformArmament1,
        PlatformArmament2: payloadData.PlatformArmament2,
        PlatformArmament3: payloadData.PlatformArmament3,
        // PlatformComs1: payloadData.PlatformComs1,
        // PlatformComs2: payloadData.PlatformComs2,
        
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    }); 
  }

  handlePlatformCrewData = (crewData) => {
    const {platform} = this.state;
    this.setState({
      platform: {
        ...platform,
        PlatformFlightCrewReq: crewData.PlatformFlightCrewReq,
        PlatformLineCrewReq: crewData.PlatformLineCrewReq,
        PlatformPayloadCrewReq: crewData.PlatformPayloadCrewReq,
        PlatformPEDCrewReq: crewData.PlatformPEDCrewReq,
        PlatformFlightCrewMOS: crewData.PlatformFlightCrewMOS,
        PlatformLineCrewMOS: crewData.PlatformLineCrewMOS,
        PlatformPayloadCrewMOS: crewData.PlatformPayloadCrewMOS,
        PlatformPEDCrewMOS: crewData.PlatformPEDCrewMOS,
      }
    }, () => {
      console.log("New state in ASYNC callback:22222", this.state.platform);
    }); 
  }

  handleUploadImgFile(event){
      event.preventDefault();
      const {platform} = this.state;

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
              imagePreviewUrl: reader.result
          });
      }
      reader.readAsDataURL(file)

      this.setState({
          platform: {
              ...platform,
              PlatformWireframe: event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.platform);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);
      

      axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      });
      
  }

  handleUploadPhotoFile(event) {
      event.preventDefault();
      const {platform} = this.state;

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
          });
      }
      reader.readAsDataURL(file);

      this.setState({
          platform: {
              ...platform,
              PlatformPhoto: event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.platform);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);
      

      axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      });    

  }

  handleUpload3DFile(event) {
      event.preventDefault();
      const {platform} = this.state;

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
          });
      }
      reader.readAsDataURL(file);

      this.setState({
          platform: {
              ...platform,
              Platform3D: event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.platform);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);
      

      axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      });    

  }

  handleUploadIconFile(event) {
      event.preventDefault();
      const {platform} = this.state;

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
          });
      }
      reader.readAsDataURL(file);

      this.setState({
          platform: {
              ...platform,
              PlatformIcon: event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.platform);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);
      

      axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      });    

  }

  handleUploadDatasheetsFile(event) {
      event.preventDefault();
      const {platform} = this.state;

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend =() =>{
          this.setState({
              file:file,
          });
      }
      reader.readAsDataURL(file);

      this.setState({
          platform: {
              ...platform,
              PlatformDatasheet: event.target.files[0].name
          }
      }, () => {
          console.log("New state in ASYNC callback:", this.state.platform);
      });

      const data = new FormData();

      data.append('file', event.target.files[0]);
      data.append('name', event.target.files[0].name);

      axios.post('http://18.222.48.211:8080/api/Upload', data).then((response) => {
        console.log(response);
      });    

  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('---here--');
    console.log(this.state.platform);
    this.props.addPlatform(this.state.platform);
  }


  resetForm(){
    this.setState(this.baseState);
    console.log("FORM RESET DONE");
    if (confirm("Do you want to clear all data from this form?")) {
      let inputs = document.body.getElementsByTagName('input');
      let drops = document.body.getElementsByTagName('select');
      for (let item of inputs) {
        item.value = '';
      }
      for (let item of drops) {
        item.value = 0;
      }
    }
  }



  render() {

    let {imagePreviewUrl} = this.state;
    let $imagePreview = '';

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="" className="photo" alt=""/>);
    } 
    else {
      $imagePreview = (<img src="/assets/img/admin/aircraft.png" className="photo" alt=""/>);
    }

    const {platform} = this.state;
    const {translations} = this.props;

    

    const generalFields = [
      {name: translations['Tail#'], type: 'input', domID: 'Tail#', valFieldID: 'PlatformTailNumber'},
      {name: translations['Platform Name'], type: 'input', domID:'PlatformName', valFieldID: 'PlatformName'},
      {name: translations['Platform Nomenclature'], type: 'input', domID:'PlatformNomenclature', valFieldID: 'PlatformNomenclature'},
      {name: translations['Category'], type: 'dropdown', domID: 'Category' , ddID: 'PlatformCategory', valFieldID: 'PlatformCategory'},
      {name: translations['Military Service'], type: 'dropdown', domID: 'ServiceBranch', ddID: 'BranchOfService', valFieldID:'PlatformService'},
      {name: translations['Mission Role'], type: 'dropdown', domID: 'MissionRole', ddID: 'PlatformRoles', valFieldID:'PlatformRole'},
      {name: translations['Manufacture'], type: 'dropdown', domID: 'dispPlatformManufacture', ddID:'Manufacturer', valFieldID:'PlatformManufacturer'},
      {name: translations['Service Executive Agent'], type: 'input', domID: 'PlatformExecutiveAgent', valFieldID: 'PlatformExecutiveAgent'},
      {name: translations['Contact Program'], type: 'input', domID:'PlatformContractProgram', valFieldID: 'PlatformContractProgram'},
      {name: translations['Cost'], type: 'input', domID: 'PlatformCost', valFieldID: 'PlatformCost'},
      {name: translations['Cost notes'], type: 'input', domID: 'PlatformCostNotes', valFieldID: 'PlatformCostNotes'},
      {name: translations['Initial Op Capability'], type: 'date', domID: 'PlatformIOCDate', valFieldID: 'PlatformIOCDate'},
      // {name: translations['Inventory'], type: 'dropdown', domID: 'PlatformInventory', ddID: 'PlatformInventory'},
      {name: translations['Ground Control Station'], type: 'dropdown', domID: 'PlatformGroundStation', ddID: 'PlatformGroundStation', valFieldID: 'PlatformGroundStation'},
    ];

    const technicalFields = [
      {name: translations['Length (ft.)'], type: 'input', domID: 'Length', valFieldID: 'PlatformLength'},
      {name: translations['Wingspan (ft.)'], type: 'input', domID: 'Wingspan', valFieldID: 'PlatformWingspan'},
      {name: translations['Height (ft.)'], type: 'input', domID: 'Height', valFieldID: 'PlatformHeight'},
      {name: translations['Weight (lbs.)'], type: 'input', domID: 'Weight', valFieldID: 'PlatformWeight'},
      {name: translations['Power Plant'], type: 'input', domID: 'PowerPlant', valFieldID: 'PlatformPowerPlant'},
      {name: translations['Fuel Capacity(lbs.)'], type: 'input', domID: 'FuelCapacity', valFieldID: 'PlatformFuelCapacity'},
      {name: translations['Cruising Speed(mph)'], type: 'input', domID: 'CruisingSpeed', valFieldID: 'PlatformCruisingSpeed'},
      {name: translations['Range(miles)'], type: 'input', domID: 'Range', valFieldID: 'PlatformRange'},
      {name: translations['Ceiling(ft.)'], type: 'input', domID: 'Ceiling', valFieldID: 'PlatformCeiling'},
      {name: translations['Max Takeoff Weight(lbs.)'], type: 'input', domID: 'MaxTakeoffWeight', valFieldID: 'PlatformMaxTakeOff'},
      {name: translations['Min Runway(ft.)'], type: 'input', domID: 'MinRunway', valFieldID: 'PlatformMinRunway'},
    ];

    const payloadsFields = [
      {name: translations['Payload Capacity(lbs.)'], type: 'input', domID: 'PlatformPayloadCapacity', valFieldID: 'PlatformPayloadCapacity'},
      {name: translations['Payload Count'], type: 'input', domID: 'PlatformPayloadCount', valFieldID: 'PlatformPayloadCount'},
      {name: translations['Payload #1'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID:'dispPlatformPayload1', valFieldID:'PlatformPayload1'},
      {name: translations['Payload #2'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID:'dispPlatformPayload2', valFieldID:'PlatformPayload2'},
      {name: translations['Payload #3'], type: 'dropdown', ddID: 'Payload/GetPayloads', domID:'dispPlatformPayload3', valFieldID:'PlatformPayload3'},
      {name: translations['Armament Capacity(lbs.)'], type: 'input', domID: 'PlatformArmamentCapacity', valFieldID:'PlatformArmamentCapacity'},
      {name: translations['Armament Count'], type: 'input', domID: 'PlatformArmamentCount', valFieldID: 'PlatformArmamentCount'},
      {name: translations['Armament #1'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID:'dispPlatformArmament1', valFieldID:'PlatformArmament1'},
      {name: translations['Armament #2'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID:'dispPlatformArmament2', valFieldID:'PlatformArmament2'},
      {name: translations['Armament #3'], type: 'dropdown', ddID: 'Munition/GetMunitions', domID:'dispPlatformArmament3', valFieldID:'PlatformArmament3'},
      {name: translations['Coms Type #1'], type: 'dropdown', ddID:'ComsType', domID:'dispPlatformComs1', valFieldID:'PlatformComs1'},
      {name: translations['Coms Type #2'], type: 'dropdown', ddID:'ComsType', domID:'dispPlatformComs2', valFieldID:'PlatformComs2'},

    ];

    const crewFields = [
      {name: translations['Flight Crew Req'], type: 'input', domID: 'PlatformFlightCrewReq', valFieldID: 'PlatformFlightCrewReq'},
      {name: translations['Flight Crew Mos'], type: 'input', domID: 'PlatformFlightCrewMOS', valFieldID: 'PlatformFlightCrewMOS'},
      {name: translations['Line Crew Req'], type: 'input', domID: 'PlatformLineCrewReq', valFieldID: 'PlatformLineCrewReq'},
      {name: translations['Line Crew Mos'], type: 'input', domID: 'PlatformLineCrewMOS', valFieldID: 'PlatformLineCrewMOS'},
      {name: translations['Payload Crew Req'], type: 'input', domID: 'PlatformPayloadCrewReq', valFieldID: 'PlatformPayloadCrewReq'},
      {name: translations['Payload Crew Mos'], type: 'input', domID: 'PlatformPayloadCrewMOS', valFieldID: 'PlatformPayloadCrewMOS' },
      {name: translations['PED Crew Req'], type: 'input', domID: 'PlatformPEDCrewReq', valFieldID: 'PlatformPEDCrewReq'},
      {name: translations['PED Crew Mos'], type: 'input', domID: 'PlatformPEDCrewMOS', valFieldID: 'PlatformPEDCrewMOS'},

    ];

    const configureFields = [
      {name: translations['Add Payload']+" #1", type: 'dropdown', domID: 'AddPayload1', ddID: 'Payload/GetPayloads', valFieldID: 'Payload1'},
      {name: translations['Add Payload']+" #2", type: 'dropdown', domID: 'AddPayload2', ddID: 'Payload/GetPayloads', valFieldID: 'Payload2'},
      {name: translations['Add Payload']+" #3", type: 'dropdown', domID: 'AddPayload3', ddID: 'Payload/GetPayloads', valFieldID: 'Payload3'},
      {name: translations['Add Munition']+" #1", type: 'dropdown', domID: 'AddMunition1', ddID: 'Munition/GetMunitions', valFieldID: 'Munition1' },
      {name: translations['Add Munition']+" #2", type: 'dropdown', domID: 'AddMunition2', ddID: 'Munition/GetMunitions', valFieldID: 'Munition2'},
      {name: translations['Add Munition']+" #3", type: 'dropdown', domID: 'AddMunition3', ddID: 'Munition/GetMunitions', valFieldID: 'Munition3'},

    ];

    return (
      <div>
      <form action="" onSubmit={this.handleSubmit}> 
        <div className="row personnel" >
          <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt=""/>
            <div className="header-text">
              {translations["Platform Administration"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
          </div>
          <div className="platform-and-munitions-content">
            <div className="col-md-8 image-block">
              {$imagePreview}
            </div>
            <div className="col-md-4 upload-block">
              <div className="upload-imagery">
                <img src="/assets/img/admin/upload_1.png" alt=""/>
                <div className="header-text">
                  upload imagery & datasheets
                </div>
                <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
              </div>
              
              <div className="upload-content">
                <div className="upload-line">
                  <div>
                    {translations['Wireframe Image']}
                  </div>
                  <input type="file"  name="file" id="file" onChange= {this.handleUploadImgFile.bind(this)} className="hidden_input pull-right" required />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['Photo Image']}
                  </div>
                  <input type="file"  name="file" id="file" onChange= {this.handleUploadPhotoFile.bind(this)} className="hidden_input pull-right" required />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['3D Model']}
                  </div>
                  <input type="file"  name="file" id="file" onChange= {this.handleUpload3DFile.bind(this)} className="hidden_input pull-right" required />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['Milspec Icon']}
                  </div>
                  <input type="file"  name="file" id="file" onChange= {this.handleUploadIconFile.bind(this)} className="hidden_input pull-right" required />
                </div>
                <div className="upload-line">
                  <div>
                    {translations['Datasheets']}
                  </div>
                  <input type="file"  name="file" id="file" onChange= {this.handleUploadDatasheetsFile.bind(this)} className="hidden_input pull-right" required />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row personnel" >
          <div className="under-personnel-content">
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["General"]} fields={generalFields} 
            data={this.handlePlatformGeneralData} initstate ={this.state.platform}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Technical specification"]} fields={technicalFields} 
            data={this.handlePlatformTechnicalData} initstate ={this.state.platform}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Payloads, Weapons & Coms"]} fields={payloadsFields} 
            data={this.handlePlatformPayloadData} initstate ={this.state.platform}/>
          </div>
        </div>
        <div className="row personnel" >
          <div className="under-platform-content">
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Crew Requirements"]} fields={crewFields} 
            data={this.handlePlatformCrewData} initstate ={this.state.platform}/>
            <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations["Configure Aircraft"]} fields={configureFields} />
          </div>
        </div>
        <div className="row action-buttons">
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className='highlighted-button' onClick={this.resetForm.bind(this)}>
              {translations['clear']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button className='highlighted-button'>
              {translations['Delete']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
          <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
            <button type="submit" className='highlighted-button'>
              {translations['save']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
          </div>
        </div>
      </form>
      </div>
    );
  }
}

PersonnelComponent.propTypes = {
  children: PropTypes.element,
};

export default PersonnelComponent;
