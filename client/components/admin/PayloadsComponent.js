import React from 'react';
import PropTypes from 'prop-types';
import FilterDatePicker from '../reusable/FilterDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import ReactTable from 'react-table';
import AddPayloadsInventory from './payloads/AddPayloadsInventory';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import {TableDefaults, NoticeType} from '../../dictionary/constants';
import Loader from '../reusable/Loader';
import {  getConfirmation } from '../../util/helpers';

class PayloadsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      filter: [],
      addPayloadsInventoryOpen: false,
      editId: '0',
      editForm: false,
      loading: false,
      		// counter:0
    };
  }

  componentDidMount() {
    this.props.fetchPayloadInventory();
  }

  openPayloadsForm = (row) => {
    this.setState({
      editId: row,
      addPayloadsInventoryOpen: true,
    });
  }

	closePayloadsForm = (actionType) => {
	  this.notify(actionType);
	  this.props.fetchPayloadInventory();
	  this.setState({
	    editId: '0',
	    addPayloadsInventoryOpen: false,
	  });
	}

	loadData = (actionType) => {
	  this.notify(actionType);
	  this.props.fetchPayloadInventory();
	}

  // This will get call when user click on Yes to Delete a Record
	deleteLogic(value){
		if (value !== undefined && value !== '0') {
	    this.setState({loading:true});
	    this.props.deletePayloadInventoryById(value).then(() => {
	      //this.setState({ editId: '0' });
	      this.setState({loading:false});
	      if(this.props.isDeleted)
	        this.loadData(NoticeType.DELETE);
	      else
	        this.notify(NoticeType.NOT_DELETE);

	    });
	  }
	}

  // will call when user click on Delete Button
	deletePayloadInventory = (value) => {
 		const { translations } = this.props;
    // Get Confirm user wish to Delete Yes/No 
    getConfirmation(translations['DeleteConfirmation'],
                    translations['Yes'],
                    translations['No'],
                    () => this.deleteLogic(value)
                    );
	}

	notify = (actionType) => {
	  const { translations } = this.props;
		
	  if(NoticeType.NOT_DELETE === actionType) {
	    NotificationManager.error(translations.DeleteUnSuccessfull, translations['Payload Inventory Title'], 5000);
	  } else if (NoticeType.DELETE != actionType) {
	    if (this.state.editId !== undefined && this.state.editId !== '0') {
	      NotificationManager.success(translations.UpdatedSuccesfully, translations['Payload Inventory Title'], 5000);
	    } else {
	      NotificationManager.success(translations.AddedSuccesfully, translations['Payload Inventory Title'], 5000);
	    }
	  } else {
	    NotificationManager.success(translations.DeletedSuccesfully, translations['Payload Inventory Title'], 5000);
	  }
	}

	stopupdate = () => 
	{
	  this.setState({editForm:false});
	}

	render() {
	  const { translations, allPayloadInventory } = this.props;

	  const columns = [{
	    Header: translations.type,
	    accessor: 'typeDesc',
	  },
	  {
	    Header: translations.Manufacture,
	    accessor: 'manufacturer',

	  },
	  {
	    Header: translations.Name,
	    accessor: 'name',

	  },
	  {
	    Header: translations['serial#'],
	    accessor: 'serialNumber',
	  },
	  {
	    Header: translations.Branch,
	    accessor: 'branch',
	  },
	  {
	    Header: translations.cocom,
			accessor: 'COCOM',
			maxWidth: 150,
	  },
	  {
	    Header: translations['Owning Unit'],
	    accessor: 'owningUnit',
	  },
	  {
	    Header: translations.Location,
	    accessor: 'location',
	  },
	  {
	    Header: translations.view,
	    accessor: 'ID',
			filterable: false,
			maxWidth: 150,
	    Cell: row => <div><a href="javaScript:void('0');" className="btn btn-primary btn-sm" onClick={() => this.openPayloadsForm(row.value)} title={translations["Edit"]} ><span className="glyphicon glyphicon-edit"/></a>&nbsp; 
	      {this.state.editId == row.value ? <a href="javaScript:void('0');" className="btn btn-danger action-not-allow btn-sm" title={translations["Action Not Allowed"]} > <span className="glyphicon glyphicon-trash"/></a> :
	        <a href="javaScript:void('0');" onClick={() => this.deletePayloadInventory(row.value)} className="btn btn-danger btn-sm" title={translations["Delete"]}> <span className="glyphicon glyphicon-trash"/></a>}
	    </div>,

	  }
	  ];

	  return (
	    <div>
	      <div className="row orders-assets">
	        <Loader loading={this.state.loading} />
	        <div className="header-line">
	          <img src="/assets/img/admin/personnel_1.png" alt="" />
	          <div className="header-text">
						  {translations.inventory} &nbsp;
	            {!this.state.addPayloadsInventoryOpen ?
	              <span>
	                <a className="btn btn-info btn-xs add-data" onClick={() => this.openPayloadsForm('0')}><i className="fa fa-plus"/>&nbsp;{translations.Add}</a>
	              </span>
	              : '' }
	          </div>
	          <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
	        </div>
	        {/* {!this.state.addPayloadsInventoryOpen ?
	          <div className="col-md-12 filter-line">
	          <div className="add-button">
	            <button className="ccir-button" onClick={() => this.openPayloadsForm('0')} >{translations["Add Payload"]}</button>

	          </div>
	          </div> : null} */}
					
	        {this.state.addPayloadsInventoryOpen ?
	          <AddPayloadsInventory editId={this.state.editId} onClose={this.closePayloadsForm} translations={translations} editForm = {this.state.editForm} stopupdate={this.stopupdate}/>
	          : null
	        }
	        <NotificationContainer />
	        <div className="col-md-12">
	          <ReactTable
	            data={allPayloadInventory}
	            columns={columns}
	            defaultPageSize={TableDefaults.PAGE_SIZE}
						  minRows={TableDefaults.MIN_ROWS}
	            loading={this.props.isLoading}
	            className="-striped -highlight"
	            filterable={true}
	            defaultFilterMethod={(filter, row) => {
	              const id = filter.pivotId || filter.id
	              return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
	            }}
	          />
	        </div>
	      </div>
	    </div>
	  );
	}
}

PayloadsComponent.propTypes = {
  children: PropTypes.element,
};

export default PayloadsComponent;
