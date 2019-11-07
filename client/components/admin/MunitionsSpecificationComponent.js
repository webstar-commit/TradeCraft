import React from 'react';
import PropTypes from 'prop-types';

import DropDownButton from '../reusable/DropDownButton';

import MissileModal from './munitions/MissileModal';
import RocketModal from './munitions/RocketModal';
import GunModal from './munitions/GunModal';
import 'react-datepicker/dist/react-datepicker.css';

import "react-table/react-table.css";
import ReactTable from 'react-table';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { defaultFilter, getConfirmation } from '../../util/helpers';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import DropDownButtonSpec from '../reusable/DropDownButtonSpec';

class MunitionsSpecificationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
      tableRowDetailModalOpen: false,
      addMunitionsSpecificationOpen: false,
      serialVal: '',
      nameVal: '',
      form: {
        type: 'Test'
      },
      editId: '0',
      munitionType: 0,
      munitionTypes: {
        missile: 1,
        rocket: 2,
        gun: 3,
      },
      loading: false,
      selectedSpecText: '',

    }
  }

  onFind() {
    console.log("find");
  }

  missileModal = () => {
    const { translations } = this.props;
    this.setState({
      editId: '0',
      munitionType: this.state.munitionTypes.missile,
      missileModalOpen: true,
      rocketModalOpen: false,
      gunModalOpen: false,
      selectedSpecText: translations['Missile'],
    });
  }

  rocketModal = () => {
    const { translations } = this.props;
    this.setState({
      editId: '0',
      munitionType: this.state.munitionTypes.rocket,
      missileModalOpen: false,
      rocketModalOpen: true,
      gunModalOpen: false,
      selectedSpecText: translations['Rocket'],
    });
  }

  gunModal = () => {
    const { translations } = this.props;
    this.setState({
      editId: '0',
      munitionType: this.state.munitionTypes.gun,
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: true,
      selectedSpecText: translations['Guns'],
    });
  }

  tableRowDetailModal = () => {
    this.setState({
      tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen,
    });
  }



  componentWillMount() {
    this.props.fetchMunitions();
  }


  modelStateReset = () => {
    this.setState({
      munitionType: 0,
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
    });
  }

  //This method called when we select a row from table.
  //TODO: i found there is no chnages in UI in Missile, Rocket and Gun Section all showing same UI. 
  //So for now i am using Missile Scetion.
  openMunitionsSpecificationForm = (row) => {
    let value = row.value;
    let munitionType = row.original.munitionType;
    console.log(value);
    this.setState({
      editId: value,
      munitionType:munitionType,
      missileModalOpen: 1 === munitionType ? true : false,
      rocketModalOpen: 2 === munitionType ? true : false,
      gunModalOpen: 3 === munitionType ? true : false,
    });
  }

  closeMunitionSpecifiction = (actionType) => {
    this.loadData(actionType);
    this.setState({
      munitionType: 0,
      editId: '0',
      missileModalOpen: false,
      rocketModalOpen: false,
      gunModalOpen: false,
      selectedSpecText: '',
    });

  }

  loadData = (actionType) => {
    this.notify(actionType);
    this.props.fetchMunitions();
  }

// This will get call when user click on Yes to Delete a Record
  deleteLogic(value){
    if (value !== undefined && value !== '0') {
      this.setState({loading: true});
      this.props.deleteMunitionsById(value).then(() => {
       // this.setState({ editId: '0' });
       this.setState({loading: false});
       if(this.props.isDeleted){
        this.props.fetchMunitions();
        this.notify(NoticeType.DELETE);
       }
       else{
        this.notify(NoticeType.NOT_DELETE);
       }
      });
    }
  }

  // will call when user click on Delete Button
  deleteMunitions = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No 
    getConfirmation(translations['DeleteConfirmation'],
                    translations['Yes'],
                    translations['No'],
                    () => this.deleteLogic(value)
                    );
  }

  //actionType means ADD, UPDATE, DELETE
  notify = (actionType) => {
    const { translations } = this.props;
    if(NoticeType.NOT_DELETE === actionType){
      NotificationManager.error(translations['DeleteUnSuccessfull'],translations['Munition Library Title'], 5000);
    }
    else if (NoticeType.DELETE != actionType) {
      if (this.state.editId !== undefined && this.state.editId !== '0') {
        NotificationManager.success(translations['UpdatedSuccesfully'], translations['Munition Library Title'], 5000);
      } else {
        NotificationManager.success(translations['AddedSuccesfully'], translations['Munition Library Title'], 5000);
      }
    } else {
        NotificationManager.success(translations['DeletedSuccesfully'],translations['Munition Library Title'], 5000);
    }
  }

  handleChange(value) {
    console.log(value);
  }

  handleForm = () => {
    console.log("here");
    this.setState({
      form: {
        type: 'Air-to-surface'
      }
    }, () => {
      // console.log("New state in ASYNC callback:22222", this.state.intelRequest);
    });
  }

  munitionTypeFilter = (filter, row) => {
  
    const id = filter.pivotId || filter.id
    return (row.value !== undefined && row.value !== null) ? String(row.value.toLowerCase()).startsWith(filter.value.toLowerCase()) : true;

  }

  render() {

    const { translations } = this.props;

    const munitions = [
      { name: translations['Missile'], onClick: this.missileModal },
      { name: translations['Rocket'], onClick: this.rocketModal },
      { name: translations['Guns'], onClick: this.gunModal }
    ];

    const { allMunitions } = this.props;

    const columns = [
      
      {
        Header: translations["Type"],
        accessor: 'munitionType',        
        maxWidth: 150,
        // Cell: row => <div>{
        //   row.value === 1 ? translations['Missile']
        //     : row.value === 2 ? translations['Rocket']
        //       : row.value === 3 ? translations['Guns']
        //         : 'Unknown'
        // }
        // </div>,
        Cell: ({ value }) => (value === 1 ? translations['Missile'] : value === 2 ? translations['Rocket'] : value === 3 ? translations['Guns'] : 'Unknown'),
        filterMethod: (filter, row) =>{
          if (filter.value === "all") {
            return true;
          }
          if (filter.value === "1") {
            return row[filter.id] === 1;
          }
          if (filter.value === "2") {
            return row[filter.id] === 2;
          }
          return row[filter.id] === 3;
       
        },
        
        Filter: ({ filter, onChange }) =>
          <select onChange={event => onChange(event.target.value)}  style={{ width: "100%" }} value={filter ? filter.value : "all" } >
            <option value="all">All</option>
            <option value="1">{translations['Missile']}</option>
            <option value="2">{translations['Rocket']}</option>
            <option value="3">{translations['Guns']}</option>
          </select>
      },
      
      {
        
        Header:translations["Manufacturer"],
        accessor: 'company',
      },
      {
        Header:translations["Munition Name"],
        accessor: 'name',
      
      },
      {
        Header:translations["Mission Role"],
        accessor: 'role',
      },
      {
        Header: translations["Ops range"],
        accessor: 'opsRange',
        maxWidth: 110,
        filterMethod: (filter, row) => {
          return String(row[filter.id]).startsWith(filter.value) 
        }
      },
      {
        Header:translations ["Weight"],
        accessor: 'weight',
        maxWidth: 70,
        filterMethod: (filter, row) => {
          return String(row[filter.id]).startsWith(filter.value) 
        }
      },
      {
        Header: translations['view'],
        accessor: 'ID',
        filterable: false,
        maxWidth: 160,
        Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-sm" onClick={() => this.openMunitionsSpecificationForm(row)} title={translations["Edit"]} ><span className="glyphicon glyphicon-edit"/></a>&nbsp; 
                          {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow btn-sm" title={translations["Action Not Allowed"]} > <span className="glyphicon glyphicon-trash"/></a> :
                          <a href="javaScript:void('0');" onClick={() => this.deleteMunitions(row.value)} className="btn btn-danger btn-sm" title={translations["Delete"]}> <span className="glyphicon glyphicon-trash"/></a>}
                    </div>,
      }
    ];
    
    return (
      <div>
        <div className="row orders-assets">
          <div className="header-line">
          <Loader loading={this.state.loading} />
            <img src="/assets/img/admin/personnel_1.png" alt="" />
            <div className="header-text">
								<div className="col-md-12 filter-line text-center">
									
                  {!this.state.missileModalOpen && !this.state.rocketModalOpen && !this.state.gunModalOpen ?
											<div>
                          <span className="specifi-text">{translations.Specifications} &nbsp;</span>
                          <div className="add-button">
                            <DropDownButtonSpec key = "1" label={translations.Add} id="1" items={munitions} />
                          </div>
                      </div>
										: <span className="specifi-text">{this.state.selectedSpecText !== '' ? (this.state.selectedSpecText + ' ' + translations.Specifications) : translations.Specifications} &nbsp;</span>} 
								</div>
						</div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
          </div>
          {this.state.missileModalOpen ?
            <MissileModal editId={this.state.editId} munitionType={this.state.munitionType} show={this.state.missileModalOpen} onClose={this.closeMunitionSpecifiction} translations={translations} />
            : null
          }
          {this.state.rocketModalOpen ?
            <RocketModal editId={this.state.editId} munitionType={this.state.munitionType} show={this.state.rocketModalOpen} onClose={this.closeMunitionSpecifiction} translations={translations} />
            : null
          }
          {this.state.gunModalOpen ?
            <GunModal editId={this.state.editId} munitionType={this.state.munitionType} show={this.state.gunModalOpen} onClose={this.closeMunitionSpecifiction} translations={translations} />
            : null
          }

          <div className="col-md-12">
            <ReactTable
              data={allMunitions}
              columns={columns}
              defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.MIN_ROWS}
              loading={this.props.isLoading}
              className="-striped -highlight"
              filterable={true}
              defaultFilterMethod={defaultFilter}

            />
          </div>
        </div>
        
      </div>
    );
  }
}

MunitionsSpecificationComponent.propTypes = {
  children: PropTypes.element,

};

export default MunitionsSpecificationComponent;
