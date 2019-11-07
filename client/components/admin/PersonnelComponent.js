import React from 'react';
import PropTypes from 'prop-types';
import AddPersonnel from './personnel/AddPersonnelModal';
import Register from './personnel/Register';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { defaultFilter, formatDateTime, getConfirmation } from '../../util/helpers';
import { NoticeType, TableDefaults } from '../../dictionary/constants';
import Loader from '../reusable/Loader';

import { superAdmin } from '../../dictionary/auth';

class PersonnelComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPersonnelModalOpen: false,
      addRegisterModalOpen: false,
      tableRowDetailModalOpen: false,
      addshow: false,
      editId: '0',
      editForm:false,
    };
  }

  componentDidMount() {
    this.props.fetchPersonnels();
  }

  // renderItems(optionItem) {
  //   let items = [{"label": "-Select Item-", "value": 0}];
  //   optionItem.map((item, i) => {
  //       items.push({"label": item.description, "value": i});
  //   });
  //   return items.map(function(data, key){
  //       if(data.label == "-Select Item-"){
  //         return ( <option key={key} value=""> {data.label} </option>) ;
  //       } else {
  //         return (<option key={key} value={data.label}>{data.label}</option> );
  //       }
  //   })
  // }


  openPersonnelForm = (row) => {
    this.setState({
      editId: row,
      addPersonnelModalOpen: true,
    });
  
  }

  openRegisterForm = (row) => {
    this.setState({
      editId: row,
      addRegisterModalOpen: true,
    });
  
  }


  // openPersonnelForm = (row) => {
  //   this.setState({counter:this.state.counter + 1});
  //   console.log("Invoked");
  //   console.log("Row"+row);
  //   console.log("Edit ID"+this.state.editId);
  //   console.log("Counter"+this.state.counter);

  //   if (this.state.counter == 0)
  //   {
  //     this.setState({
  //     editId: row,
  //     addPersonnelModalOpen: true
  //   });
  // }
  // else {
  //   this.setState({
  //     editId: row,
  //     addPersonnelModalOpen: true
  //   }, () => { console.log("State Updated");
  //     this.setState({
  //       editForm: true
  //     }); });
  // }
  // }

closePersonnelForm = (actionType) => {
  this.loadData(actionType);
  this.setState({
    editId: '0',
    addPersonnelModalOpen: false,
  });
}

loadData = (actionType) => {
  this.notify(actionType);
  this.props.fetchPersonnels();
}


notify =(actionType)=>{
  const { translations } = this.props;
  if (NoticeType.DELETE != actionType) {
    if(NoticeType.NOT_DELETE === actionType){
      NotificationManager.error(translations['DeleteUnSuccessfull'],translations['personnel'], 5000);
    }
    else if (this.state.editId !== undefined && this.state.editId !== '0') {
      NotificationManager.success(translations['UpdatedSuccesfully'], translations['personnel'], 5000);
    }else{
      NotificationManager.success(translations['AddedSuccesfully'], translations['personnel'], 5000);
    }
  }else{
    NotificationManager.success(translations['DeletedSuccesfully'],translations['personnel'], 5000);
  }
}



stopupdate = () => 
  {
    this.setState({editForm:false});
  }

// This will get call when user click on Yes to Delete a Record
  deleteLogic(value) {
	  if (value !== undefined && value !== '0') {
      // Start Loader
      this.setState({loading:true});
	    this.props.deletePersonnelById(value).then(() => {
        //this.setState({ editId: '0' });
        // End Loader
        this.setState({loading:false});
        if(this.props.isDeleted){
          this.loadData(NoticeType.DELETE);
        }
        else{
          // Display Error Message
          this.notify(NoticeType.NOT_DELETE);
        }
        //this.props.fetchPersonnels();
        //this.notify('DELETE');
	    });
    }
  }
  
  // will call when user click on Delete Button
  deletePersonnel = (value) => {
    const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No 
    getConfirmation(translations['DeleteConfirmation'],
                    translations['Yes'],
                    translations['No'],
                    () => this.deleteLogic(value)
                    );
  }

render() {

  const { translations } = this.props;
  const { allPersonnels } = this.props;

  let ses = JSON.parse(localStorage.getItem('session'));
  let roles = ses.UserRoles;
  let roles2 = JSON.parse(roles);
  let access = roles2.some(v => superAdmin.includes(v));

  const columns = [
    {
      Header: translations['First Name'],
      accessor: 'firstName',
    },
    {
      Header: translations['Last Name'],
      accessor: 'lastName',
    },
    {
      Header: translations['Branch'],
      accessor: 'branchOfService',
    },
    {
      Header: translations['Assigned Unit'],
      accessor: 'assignedUnit',
    },
    {
      Header: translations['Deployed Unit'],
      accessor: 'deployedUnit',
    },
    
    {
      Header: translations['Rank'],
      accessor: 'rank',

    },
    {
      Header: translations['CAC ID'],
      accessor: 'CACID',
      maxWidth: 100,
    },
    {
      Header: translations['view'],
      accessor: 'ID',
      filterable: false,
      Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-sm" onClick={() => this.openPersonnelForm(row.value)} title="Edit"><span className="glyphicon glyphicon-edit"/></a>&nbsp; 
                        {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow" title="Action Not Allowed" > <span className="glyphicon glyphicon-trash"/></a> :
                     <a href="javaScript:void('0');" onClick={() => this.deletePersonnel(row.value)} className="btn btn-danger btn-sm" title="Delete"> <span className="glyphicon glyphicon-trash"/></a>}
                    </div>,
    },
  ];

  const sortOn = [
    {
      id: 'firstName',
      desc: true,
    },
  ];

  return (
    <div>
      <Loader loading={this.state.loading} />
      <div className="row orders-assets">
        <div className="header-line">
          <img src="/assets/img/admin/personnel_1.png" alt=""/>
          <div className="header-text">
          
          {!this.state.addPersonnelModalOpen ? 
          
          <span>
            {translations.summary} &nbsp;
          { access ? <a className="btn btn-info btn-xs add-data" onClick={() => this.openPersonnelForm('0')}><i className="fa fa-plus"/>&nbsp;{translations.Add}</a> : null }
          </span>
         
          : translations.form }
          &nbsp;
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt=""/>
        </div>
        {/* {!this.state.addPersonnelModalOpen ? 
        <div className="col-md-12 filter-line">
          <div className="add-button">
            <button className="ccir-button" onClick={() => this.openPersonnelForm('0')} >{translations["Add Personnel"]}</button>
          </div>  
        </div> :  ''
        } */}
        {this.state.addPersonnelModalOpen ?
          <AddPersonnel editId = {this.state.editId} onClose={this.closePersonnelForm} translations = {translations} /* editForm = {this.state.editForm} */ stopupdate={this.stopupdate}/>
          : null
        }

         {this.state.addRegisterModalOpen ?
          <Register editId = {this.state.editId} onClose={this.closePersonnelForm} translations = {translations} /* editForm = {this.state.editForm} */ stopupdate={this.stopupdate}/>
          : null
        }
        <div className="col-md-12">
          <ReactTable
            data={allPersonnels}
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

PersonnelComponent.propTypes = {
  children: PropTypes.element,
};

export default PersonnelComponent;
