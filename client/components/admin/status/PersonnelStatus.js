import { uploadFile } from 'actions/file';
import { fetchPersonnelStatusById, updatePersonnelStatus } from 'actions/status';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import { baseUrl } from 'dictionary/network';
import axios from 'axios';
import ContentFull from '../../reusable/ContentFull';



class PersonnelStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      imagePreviewUrl: '',
      locationcategory: '',
      inventoryId: '0',
      isUpdated: false,
       personnel: {
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
      onePersonnel: {},
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchPersonnelStatusById(editId).then(() => {
        this.setState({
          isUpdated: true,
          personnel: this.props.onePersonnel
        });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchPersonnelStatusById(editId).then(() => {
        this.setState({
          isUpdated: true,
          personnel: this.props.onePersonnel
        });

      });
    }

    
  }

  stopUpdate = ()=> {
    this.setState({
      isUpdated: false,
    });
  }
  
  handlePlatformGeneralData = (generalData) => {
    const { personnel } = this.state;
    this.setState({
      personnel: {
        ...personnel,
        StatusCode: generalData.StatusCode,
        ArrivalDate: generalData.ArrivalDate,
        DepartureDate: generalData.DepartureDate,
        Remark: generalData.Remark,
      },
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let { personnel } = this.state;
    const { editId } = this.props;
    if (editId !== undefined && editId !== '0') {
      
      this.props.updatePersonnelStatus(editId, personnel).then( () => {this.props.onClose();});
    } else {
      
    }
  }



  stopset () {
    this.setState({clear:false});
  }


  resetForm() {
    const {translations}= this.props;
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
    // if (!this.props.show) {
    //   return null;
    // }
   
    const { translations } = this.props;

    const generalFields = [
      {name: translations["Status"], type: 'dropdown', ddID: 'StatusCodes/GetPersonnelStatusCodes', domID: 'StatusCode', valFieldID: 'StatusCode', required: true },
      {name: translations["Arrival Date"], type: 'date', domID: 'ArrivalDate',  valFieldID: 'ArrivalDate'},
      {name: translations["Departure Date"], type: 'date', domID: 'DepartureDate', valFieldID: 'DepartureDate' },
      {name: translations["Remark"], type: 'textarea', domID: 'Remark',valFieldID: 'Remark',required:true}
    ];


    return (

      <form action="" onSubmit={this.handleSubmit} >
          <div className="close-button" >
          <img src="/assets/img/general/close.png" onClick={this.props.onClose} />
        </div> 
        <div className="payload-content">
          <div className="row personnel" >

            <div className="header-line">
              <img src="/assets/img/admin/personnel_1.png" alt="" />
              <div className="header-text">
                Edit Personnel Status
              </div>

              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
          </div>

          <div className="row personnel" >
            
               <div className="col-md-4 info-block"></div> 
              <ContentFull fields={generalFields} data={this.handlePlatformGeneralData} initstate={this.props.onePersonnel} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
              <div className="col-md-4 info-block"></div>  
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
              {/* {(this.props.editId != undefined && this.props.editId !='0') ?translations['update']:translations['save']} */}
              {translations['submit']}

            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div>
        </div>

      </form>

    );
  }
}

PersonnelStatus.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    onePersonnel: state.status.onePersonnel
  };
};

const mapDispatchToProps = {
  fetchPersonnelStatusById,
  updatePersonnelStatus

};

export default connect(mapStateToProps, mapDispatchToProps)(PersonnelStatus);
