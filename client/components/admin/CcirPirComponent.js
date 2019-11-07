import PropTypes from 'prop-types';
import React from 'react';
import { NotificationManager } from 'react-notifications';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import CcirPirModal from './ccir-pirs/CcirPirModal';
import { defaultFilter, getConfirmation  } from '../../util/helpers';
import { TableDefaults, NoticeType } from '../../dictionary/constants';
import Loader from '../reusable/Loader';

class CcirPirComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      ccirModalOpen:false,
      tableRowDetailModalOpen: false     ,
      addCcirPirModalOpen: false,
      editId: '0', 
      loading:false
    }
  }

  // ccirModal = () => {
  //   this.setState({
  //     ccirModalOpen: !this.state.ccirModalOpen
  //   })
  // }

  componentDidMount() {
    // Fetch List of Records 
    this.props.fetchCcirPirs();
  }



  // Open form Add/Edit Rerocd
  openCcirPirForm = (row) => {
    this.setState({
      editId: row,
      addCcirPirModalOpen: true,
    });
  }

  // Close Add/Edit Form
closeCcirPirForm = (messageType) => {
  //show Success Message
  this.loadData(messageType);
  this.props.fetchCcirPirs();
  this.setState({
    editId: '0',
    addCcirPirModalOpen: false,
  });
}


loadData = (actionType) => {
  this.notify(actionType);
  this.props.fetchCcirPirs();
}

// will call from onClose in CcirPirModal
callCloseCcirPirForm = () =>{
  this.closeCcirPirForm('');
}

// This will get call when user click on Yes to Delete a Record
deleteLogic(row){
   // Start Loader
   this.setState({loading:true});
   this.props.deleteCcirPirById(row).then(() => {
     // Stop Loader
     this.setState({loading:false});
     //if Deleted Successfully
     if(this.props.isDeleted){
       this.loadData(NoticeType.DELETE);
     }
     else{
       this.notify(NoticeType.NOT_DELETE);
     }
     
   });
}

// Delete Record will call when user click on Delete Button
deleteCcirPirRecord(row){
  const { translations } = this.props;
  // Get Confirm user wish to Delete Yes/No 
  getConfirmation(translations['DeleteConfirmation'],
                  translations['Yes'],
                  translations['No'],
                  () => this.deleteLogic(row)
                  );
}

// function to Display Success Messages
notify =(type)=>{
  const { translations } = this.props;
  if(type === NoticeType.NOT_DELETE){
    NotificationManager.error(translations['DeleteUnSuccessfull'], translations['CCIRPIR Title'], 5000);
  }
  else if(type === NoticeType.DELETE){
    NotificationManager.success(translations['DeletedSuccesfully'], translations['CCIRPIR Title'], 5000);

  }
  else if(type === NoticeType.ADD){
    //NotificationManager.success(translations['Delete CCIRPIR Message'], translations['CCIRPIR Title'], 5000);
    NotificationManager.success(translations['AddedSuccesfully'], translations['CCIRPIR Title'], 5000);
  }
  else if(type === NoticeType.UPDATE){
    NotificationManager.success(translations['UpdatedSuccesfully'], translations['CCIRPIR Title'], 5000);
  }
  else{

  }
}


// tableRowDetailModal = () => {
//   this.setState({
//     tableRowDetailModalOpen: !this.state.tableRowDetailModalOpen
//   })
// }

// onFind(){
//   console.log("find");
// }


render() {

    
  const {translations} = this.props;
  const {allCcirPirs} = this.props;

  // Set Columns and Data to display in the Table List
  const columns = [
    {
      Header: translations['Mission Name'],
      accessor: 'MissionName',
    },
    {
      Header: translations['COCOM'],
      accessor: 'COCOM',
      maxWidth: 150,
    },
    {
      Header: translations['Region'],
      accessor: 'RegionName',
      maxWidth: 500,
    },
    {
      Header: translations['Country'],
      accessor: 'CountryName',
    },
    {
      Header: translations['Unit'],
      accessor: 'UnitName',
    },
    {
      Header: translations.Branch,
      accessor: 'BranchName',
       
    },
    {
      Header: translations.view,
      accessor: 'CCIRPIRId',
      filterable: false,
      maxWidth: 150,
      Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-sm" onClick={() => this.openCcirPirForm(row.value)} title={translations["Edit"]} ><span className="glyphicon glyphicon-edit"/></a>&nbsp; 
        {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger btn-sm action-not-allow" title={translations["Action Not Allowed"]} > <span className="glyphicon glyphicon-trash"/></a> :
          <a href="javaScript:void('0');" onClick={() => this.deleteCcirPirRecord(row.value)} className="btn btn-danger btn-sm" title={translations["Delete"]}> <span className="glyphicon glyphicon-trash"/></a>}
      </div>,

    } 
  ];

  return (
    <div>
      
      <div className="row orders-assets">
        <div className="header-line">
          <Loader loading={this.state.loading} />
          <img src="/assets/img/admin/personnel_1.png" alt=""/>
          <div className="header-text">
            {!this.state.addCcirPirModalOpen ?
              <span>
                {translations.summary} &nbsp;
                <a className="btn btn-info btn-xs add-data" onClick={() => this.openCcirPirForm('0')}><i className="fa fa-plus"/>&nbsp;{translations.Add}</a>
              </span>
              : translations.form }
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
        </div>
        {/* {!this.state.addCcirPirModalOpen ? <div className="col-md-12 filter-line">
          <div className="add-button">
            <button className="ccir-button" onClick={() => this.openCcirPirForm('0')} >{translations["Add Ccir/Pirs"]}</button>
          </div>
        </div>:null} */}
        {this.state.addCcirPirModalOpen ?
          <CcirPirModal  editId = {this.state.editId} onClose={this.closeCcirPirForm} translations = {translations} />
          : null
        }
        
        <div className="col-md-12">
          <ReactTable
            data={allCcirPirs}
            columns={columns}
            defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.MIN_ROWS}
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

CcirPirComponent.propTypes = {
  children: PropTypes.element,

};

export default CcirPirComponent;
