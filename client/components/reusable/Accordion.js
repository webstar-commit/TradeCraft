import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Dropdown from "../reusable/Dropdown";
import ContentBlock from './ContentBlock';
import { fetchPersonnelsByFilter } from 'actions/organicpersonnel.js'
import { fetchUnitById } from 'actions/organicorg.js'
import { addOraganicOrg, updateUnit } from 'actions/organicorg';
import { addOraganicPersonnel } from 'actions/organicpersonnel';
import ContentFull from './ContentFull';
import { showAlert } from '../../util/helpers';

class Accordion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uncheckedResults: [],
      showAddForm:false,
      branch:'1',
      editId: '0',
      isUpdated: false,
      clear:false,
      addUnit: {
        description:'',
        UnitIdentificationCode:'',
        DerivativeUIC:'',
        CommandRelationship:'1',
        LocationID:'',
        Commander:'',
        UnitType:'',
        UnitSpecialization:'',
        ParentUnitID:'',
        BranchOfService:'1',
        UnitPersonnel: []
      },
      searchUnit: {
        COCOM: '',
        BranchOfService: '',
        AssignedUnit: '',
        DeployedUnit:'',
        TeamID: '',
        DutyPosition: '',
        LocationID: '',
        MOS: '',
        FreeFormSearchText: ''
      },
      unit: {}
      
    }
  }

  componentDidMount = () => {
    const { editId } = this.state;
    console.log(this.state.editId);
    console.log("Props are");
    console.log(this.props);
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchUnitById(editId).then(() => {
        this.setState({
          isUpdated: true,
          unit: this.props.oneUnit,
        });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    let { editId } = this.state;
    console.log(this.state.editId);
    if(editId !== '0' && prevState.editId !== editId) {
      this.props.fetchUnitById(this.state.editId).then(() => {
        this.setState({
          isUpdated: true,
          unit: this.props.oneUnit,
        });
        console.log(this.state.unit);  
      });
    }

    if(editId === '0' && prevState.editId !== editId) {
      this.setState({ clear: true });
    }

    if(this.props.callEdit) 
    {
      
      const { edit } = this.props;
      console.log(edit);
      this.props.stopCall();
      this.openEditForm(edit);
    }
  }

  save = () => {
    console.log('saving');
  };

  stopset () {
    this.setState({clear:false});
  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }

  toggleAddForm = () => {
      this.setState({
        showAddForm:true,
        editId:'0'
      }, () => {this.addOrgForm();});   

      const { listPersonnel } = this.props;
      let { uncheckedResults } = this.state;
      let { UnitPersonnel } = this.state.addUnit;
      console.log("Printing These");
      console.log(listPersonnel); 
      for (let i = 0; i<listPersonnel.length; i++)
      {
        if (!(uncheckedResults.includes(i))) 
        {  UnitPersonnel.push(listPersonnel[i].ID); 
          console.log(UnitPersonnel);
          console.log(this.state.addUnit.UnitPersonnel);
        }
      }
  }

 

  close = (key) => {
    let accordionContent = document.getElementsByClassName(`accordion-content`)[key];
    // this.closeSection(key, accordionContent);
    if(accordionContent){
    accordionContent.style.height = 0;
  }
  };

  closeSection = (key, accordionContent) => {
    setTimeout(() => {
      // this.refs[`section${key}`].childNodes[1].style.borderBottom = 'none';
    }, 450);
    // accordionContent.style.height = 0;
  };

  changeValue = (key, value) => {
    document.getElementById(`dropdown${key}`).value = value;
  };

  toggleHeader(key) {
    let accordionContent = document.getElementsByClassName(`accordion-content`)[key];
    if (accordionContent.clientHeight) {
      if(key!=3){this.close(key);}
    } else {
      let wrapper = document.querySelector(`.accordion-content-wrapper${key}`);
      accordionContent.style.height = wrapper.clientHeight + "px";
      if(key==4){
        accordionContent.style.height = "max-content";
      }
      this.refs[`section${key}`].childNodes[1].style.borderBottom = '1px solid #bbcfe2';
    }
  }

  addOrgForm = () => {
    console.log("Fired");
    this.toggleHeader(4);
    this.close(1); this.close(2);
  }

  openEditForm = (id) => {
    console.log("It is here");
    console.log(this.state.editId);
    this.setState({
      editId: id,
      showAddForm:true,
    }, () => { this.addOrgForm();});
  }

  handleGeneralData = (generalData) => {
    const { addUnit } = this.state;

    this.setState({
      addUnit: {
        ...addUnit,
        description: generalData.description,
        UnitIdentificationCode:generalData.UnitIdentificationCode,
        DerivativeUIC:generalData.DerivativeUIC,
        CommandRelationship:1,
        LocationID:generalData.LocationID,
        Commander:generalData.Commander,
        UnitType:generalData.UnitType,
        UnitSpecialization:generalData.UnitSpecialization,
        ParentUnitID:generalData.ParentUnitID
      },
    });

  }

  handleBranchData = (generalData) => {
    

    this.setState({
      branch: generalData.branch    });

  }

  handleSearchData = (generalData) => {
    const { searchUnit } = this.state;

    this.setState({
      searchUnit: {
        ...searchUnit,
        COCOM: generalData.COCOM,
        BranchOfService: generalData.BranchOfService,
        AssignedUnit: generalData.AssignedUnit,
        DeployedUnit:generalData.DeployedUnit,
        TeamID: generalData.TeamID,
        DutyPosition: generalData.DutyPosition,
        LocationID: generalData.LocationID,
        MOS: generalData.MOS,
        FreeFormSearchText: generalData.FreeFormSearchText
      },
    });

    console.log(searchUnit);
  }

  renderDropdowns(dropdowns) {

      let langs = ['val 1', 'val 2'];

      return dropdowns.map((item, i) => {

        return (
          <div className="dropdown-block" key={i}>
            <div className="label-name">{item.name}</div>
            <Dropdown id={i} items={langs} className="form-control" dropdownDataUrl={item.ddID}/><br/>
          </div>
        )
      });
  }


  renderResults() {

    // const results = [
    //   {name: 'First Name', type: 'input'},
    //   {name: 'Middle Initial', type: 'input'},
    //   {name: 'Last Name', type: 'input'},
    //   {name: 'Rank', type: 'dropdown'},
    //   {name: 'Pay Grade', type: 'dropdown'},
    //   // {name: 'Nationality', type: 'dropdown'},
    //   // {name: 'Clearance Level', type: 'dropdown'},
    //   // {name: 'CAC ID', type: 'input'},
    //   // {name: 'Call Sign', type: 'input'},
    // ];
    let results = [];

    const { listPersonnel } = this.props;

    if (listPersonnel) {
      results = listPersonnel;
    }

      return results.map((item, i) => {

        return (
          <div className="accordion-results" key={i}>
            <div className="result-checkbox">
              <input type="checkbox" id={`checkbox${i}`} name={`checkbox${i}`}  onClick={() => this.handleChange(i)} checked={this.state.uncheckedResults.indexOf(i) === -1}/>
              <label htmlFor={`checkbox${i}`}><span /></label>
            </div>
            <div>
              <img className="result-avatar" src="/assets/img/admin/avatar.png" alt=""/>
            </div>
            <div className="result-user">
              <div className="result-name">
                {item.Name} 
              </div>
              <div className="result-from">
                {item.Unit}
              </div>
            </div>
          </div>
        )
      });
  }

  handleChange = (i) => {
    const {uncheckedResults} = this.state;

    let index = this.state.uncheckedResults.indexOf(i);
    if (index === -1) {
      uncheckedResults.push(i);
    } else {
      uncheckedResults.splice(index, 1);
    }
    this.setState({
      uncheckedResults
    }, () => { console.log(uncheckedResults); });
    
  };

  renderOrders() {

    const results = [
      {name: 'First Name', type: 'input'},
      {name: 'Middle Initial', type: 'input'},
      {name: 'Last Name', type: 'input'},
      {name: 'Rank', type: 'dropdown'},
      {name: 'Pay Grade', type: 'dropdown'},
      {name: 'Nationality', type: 'dropdown'},
      {name: 'Clearance Level', type: 'dropdown'},
      {name: 'CAC ID', type: 'input'},
      {name: 'Call Sign', type: 'input'},
    ];

    return results.map((item, i) => {
      return (
        <div className="accordion-orders" key={i}>
          <div className="order-checkbox" onClick={() => this.handleChange(i)} >
            <input type="checkbox" id={`checkbox${i}`} name={`checkbox${i}`} checked={this.state.uncheckedResults.indexOf(i) === -1}/>
            <label htmlFor={`checkbox${i}`}><span /></label>
          </div>
          <div>
            <img className="order-avatar" src="/assets/img/admin/avatar.png" alt=""/>
          </div>
          <div className="order-user">
            <div className="order-name">
              cmd larry pickering
            </div>
            <div className="order-from">
              82nd - OPORD - TF BRAVO
            </div>
            <div className="order-effective">
              Effective: 13-nov-2017
            </div>
          </div>
        </div>
      )
    });
  }

  renderRoster() {

    const roster = [
      {name: 'First Name', type: 'input'},
      {name: 'Middle Initial', type: 'input'},
      {name: 'Last Name', type: 'input'},
      {name: 'Rank', type: 'dropdown'},
      {name: 'Pay Grade', type: 'dropdown'},
      {name: 'Nationality', type: 'dropdown'},
      {name: 'Clearance Level', type: 'dropdown'},
      {name: 'CAC ID', type: 'input'},
      {name: 'Call Sign', type: 'input'},
    ];

      return roster.map((item, i) => {

        return (
          <div className="accordion-results" key={i}>
            <div>
              <img className="result-avatar" src="/assets/img/admin/avatar.png" alt=""/>
            </div>
            <div className="roster-user">
              <div className="result-name">
                cmd larry pickering
              </div>
              <div className="result-from">
                82nd Airborne Division
              </div>
            </div>
          </div>
        )
      });
  }

  renderColorizedPanel() {

    const colors = ['red','yellow','#4afd24','#00F4FF','blue','deeppink','white','lightskyblue','darkblue','#abab00','darkred'];

    return colors.map((item, i) => {
      return (
        <div className="color" style={{backgroundColor: item}} key={i} />
      )
    });
  }

  toggleOrgView = () => {
    console.log("Toggled");
    
  }

  stopset () {
    this.setState({clear:false});
  }

  handleSearchSubmit = () => {
      let { searchUnit } = this.state;
      this.props.fetchPersonnelsByFilter(searchUnit).then(() => {  this.toggleHeader(3);
        this.close(1); this.close(2); this.toggleHeader(3);});
  }

  submitBranch = () => {
     let { branch } = this.state;
     this.props.setBranch(branch);
  }

  handleAddSubmit = () => {
    let { editId } = this.state;
    let { addUnit } = this.state;
    let { TeamMembers } = this.state;
    if (editId !== undefined && editId !== '0') {
        addUnit.id = editId;
        this.props.updateUnit(editId, addUnit);
        showAlert("Org Added");
    }
    else {
      addUnit.CommandRelationship = '1';
    this.props.addOraganicOrg(addUnit).then( () => {
      showAlert("Org Added");
     this.setState({clear:true});
    });
  }
  }

  render() {

    const { listPersonnel } = this.props;
    console.log(listPersonnel);

    const { oneUnit } = this.props;
    console.log(oneUnit);

    const firstSectionDropdowns = [
      {name: 'COCOM', type: 'dropdown', ddID:'COCOM'},
      {name: 'Service', type: 'dropdown', ddID:'BranchOfService' },
      {name: 'Assigned Unit', type: 'dropdown', ddID:'Units/GetUnits'},
      {name: 'Deployed Unit', type: 'dropdown', ddID:'Units/GetUnits'},
      {name: 'Team', type: 'dropdown', ddID:'Units/GetUnits?onlyTeams=1'},
      {name: 'Duty Position', type: 'dropdown', ddID:'DutyPosition'},
      {name: 'Location', type: 'dropdown', ddID:'Locations/GetLocationsByCategory?Category=2'},
      {name: 'MOS', type: 'dropdown', ddID:'MOS'},
    ];

    const searchFields = [
      {name: 'COCOM', type: 'dropdown', ddID:'COCOM', domID: 'COCOM', valFieldID: 'COCOM'},
      {name: 'Service', type: 'dropdown', ddID:'BranchOfService', domID: 'BranchOfService', valFieldID: 'BranchOfService' },
      {name: 'Assigned Unit', type: 'dropdown', ddID:'Units/GetUnits', domID: 'AssignedUnit', valFieldID: 'AssignedUnit'},
      {name: 'Deployed Unit', type: 'dropdown', ddID:'Units/GetUnits', domID: 'DeployedUnit', valFieldID: 'DeployedUnit'},
      {name: 'Team', type: 'dropdown', ddID:'Units/GetUnits?onlyTeams=1', domID: 'TeamID', valFieldID: 'TeamID'},
      {name: 'Duty Position', type: 'dropdown', ddID:'DutyPosition', domID: 'DutyPosition', valFieldID: 'DutyPosition'},
      {name: 'Location', type: 'dropdown', ddID:'Locations/GetLocationsByCategory?Category=2', domID: 'LocationID', valFieldID: 'LocationID'},
      {name: 'MOS', type: 'dropdown', ddID:'MOS', domID: 'MOS', valFieldID: 'MOS'},
      {name: 'Search', type: 'input', domID: 'FreeFormSearchText', valFieldID: 'FreeFormSearchText'},
    ];

    const lastSectionDropdowns = [
      {name: 'Type (Unit, TF, Team)', type: 'dropdown', ddID:'UnitTypes/GetUnitType'},
      {name: 'Commander/Team Lead', type: 'dropdown', ddID:'Personnel/GetCommanderList'},
      {name: 'Unit Specialization', type: 'dropdown', ddID:'UnitSpecializations/GetUnitSpecializations'},
      {name: 'Location', type: 'dropdown', ddID:'Locations/GetLocationsByCategory?Category=2'},
      {name: 'Reports to Unit', type: 'dropdown', ddID:'Units/GetUnits'},
    ];


    const branchFields = [
      {name: 'Branch', type: 'dropdown', ddID:'BranchOfService/GetBranchOfService', domID: 'branch', valFieldID: 'branch'},
    ];

    const lastSectionFields = [
      { name: 'Name', type: 'input', domID: 'description', valFieldID: 'description' },
      { name: 'Unit Identification Code', type: 'input', domID: 'UnitIdentificationCode', valFieldID: 'UnitIdentificationCode' },
      { name: 'Derivative UIC', type: 'input', domID: 'DerivativeUIC', valFieldID: 'DerivativeUIC' },
      {name: 'Type (Unit, TF, Team)', type: 'dropdown', ddID:'UnitTypes/GetUnitType', domID: 'UnitType', valFieldID: 'UnitType'},
      {name: 'Commander/Team Lead', type: 'dropdown', ddID:'Personnel/GetCommanderList', domID: 'Commander', valFieldID: 'Commander'},
      {name: 'Unit Specialization', type: 'dropdown', ddID:'UnitSpecializations/GetUnitSpecializations', domID: 'UnitSpecialization', valFieldID: 'UnitSpecialization' },
      {name: 'Location', type: 'dropdown', ddID:'Locations/GetLocationsByCategory?Category=2', domID: 'LocationID', valFieldID: 'LocationID'},
      {name: 'Reports to Unit', type: 'dropdown', ddID:'Units/GetUnits', domID: 'ParentUnitID', valFieldID: 'ParentUnitID'},
    ];

    let langs = ['val 1', 'val 2'];

    return (
      <div className="custom-accordion">
      <div className="accordion-section" ref={`section0`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(0)}>
            <div>
              Branch
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${0}`}>
              <div className="content info-content">
                <ul>
                <ContentFull fields={branchFields} data={this.handleBranchData} initstate={this.state.unit} editId={this.state.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)}  />

                </ul> <br/>
                <button onClick={this.submitBranch}>Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section1`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(1)}>
            <div>
              View
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${1}`}>
              <div className="content info-content">
                <ul>
                  <li onClick={this.props.orgChart}>Organic Org View</li>
                  <li onClick={this.props.deployedChart}>Deployed Org View</li>
                  <li onClick={this.props.personnelChart}>Organic Personnel View</li>
                  <li onClick={this.props.deployedPersonneChart}>Deployed Personnel View</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section2`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(2)}>
            <div>
              Search / Filter
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${2}`}>
              <div className="content info-content form-content">
                {/* {this.renderDropdowns(firstSectionDropdowns)}
                <div className="accordion-search">
                <br/>
                  <input placeholder="Search/Filter Name, CAC ID"/>
                </div> */}
                <ContentFull fields={searchFields} data={this.handleSearchData} initstate={this.state.addUnit} editId={this.state.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)}  />
              </div>
              <button type="submit" onClick={this.handleSearchSubmit}>Submit</button> <br/><br/>
            </div>
          </div>
        </div>
        <div className="accordion-section" ref={`section${3}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(3)}>
            <div>
              results
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${3}`}>
              <div className="content results-content">
                {this.renderResults()}
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button onClick={this.toggleAddForm}>
                    Add
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
       { this.state.showAddForm ? 
        <div className="accordion-section" ref={`section4`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(4)}>
            <div>
              Create Org Unit/Team
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${4}`}>
              <div className="content info-content form-content">
                
                {/* <br/>
                <div className="custom-content">
                <div className="label-name">Name</div>
                  <input placeholder="Name"/> 
                </div>
                 <div className="custom-content">
                 <div className="label-name">Unit Identification Code</div>
                  <input placeholder="Unit Identification Code"/>
                  </div>

                  <div className="custom-content"> 
                  <div className="label-name">Derivative UIC</div>
                  <input placeholder="Derivative UIC"/>  
                  </div>
                
                { this.renderDropdowns(lastSectionDropdowns) }
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button onClick={() => this.close(4)}>
                    Close
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button onClick={this.handleAddSubmit}>
                    Add
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div> */}

          <ContentFull fields={lastSectionFields} data={this.handleGeneralData} initstate={this.state.unit} editId={this.state.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)}  />

                <div className="menu-button">
                  <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                  <button onClick={this.handleAddSubmit}>
                    Add
                  </button>
                  <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>

              </div>
            </div>
          </div>
        </div>
        : null
       }
    {   /* <div className="accordion-section" ref={`section${2}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(2)}>
            <div>
              view roster
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${2}`}>
              <div className="content view-roster">
                <div className="accordion-search">
                  <input placeholder="Search/Filter Name, CAC ID"/>
                </div>
                {this.renderRoster()}
              </div>
            </div>
          </div>
    </div> */}
   {/*     <div className="accordion-section" ref={`section${3}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(3)}>
            <div>
              create / edit role
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${3}`}>
              <div className="content create-role">
                <div className="role-label">
                  <div>
                    Role Title
                  </div>
                  <div className="accordion-search">
                    <input placeholder="Search/Filter Name, CAC ID"/>
                  </div>
                </div>
                <div>
                  <div className="dropdown-title">
                    Role Title
                  </div>
                  <div className="dropdown-block search-input">
                    <Dropdown items={langs}/>
                  </div>
                </div>
                <div className="role-label">
                  <div>
                    Assigned Members to Role
                  </div>
                  <div className="accordion-search">
                    <input placeholder="Begin typing or drag n'drop"/>
                  </div>
                </div>
                <div className="role-label">
                  <div>
                    Role also Reports to (dotted line)
                  </div>
                  <div className="accordion-search">
                    <input placeholder="Search/Filter Name, CAC ID"/>
                  </div>
                </div>
                <div className="role-label">
                  <div>
                    Colorize Role
                  </div>
                  <div className="colorized-role">
                    {this.renderColorizedPanel()}
                  </div>
                </div>
                <div className="role-buttons">
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    <button onClick={() => this.close(3)}>
                      close
                    </button>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                  </div>
                  <div className="menu-button">
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    <button onClick={this.save}>
                      create
                    </button>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */ }
      {/*  <div className="accordion-section" ref={`section${4}`}>
          <div className="accordion-header" onClick={() => this.toggleHeader(4)}>
            <div>
              generate orders
            </div>
            <img className="arrow pull-right" src="/assets/img/admin/small-arrow.png" alt=""/>
          </div>
          <div className="accordion-content">
            <div className={`accordion-content-wrapper${4}`}>
              <div className="content">
                {this.renderOrders()}
              </div>
            </div>
          </div>
      </div> */ }

      </div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.element,
  orgChart:PropTypes.func.isRequired,
  personnelChart:PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    // translations: state.localization.staticText,
    // onePlatform: state.status.onePlatform
  };
};

const mapDispatchToProps = {
  // fetchPlatformStatusById,
  // updatePlatformStatus
  addOraganicOrg,
  fetchPersonnelsByFilter,
  addOraganicPersonnel,
  fetchUnitById,
  updateUnit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accordion);
