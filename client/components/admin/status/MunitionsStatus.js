import { uploadFile } from 'actions/file';
import { fetchMunitionsStatusById, updateMunitionStatus } from 'actions/status';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from "../../reusable/ContentBlock";
import { baseUrl } from 'dictionary/network';
import axios from 'axios';
import ContentFull from '../../reusable/ContentFull';



class MunitionStatus extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: '',
      clear:false,
      imagePreviewUrl: '',
      locationcategory: '',
      inventoryId: '0',
      isUpdated: false,
       munition: {
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
      onePayload: {},
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount = () => {
    const { editId } = this.props;
    this.setState({ clear: true });
    if (editId !== '0') {
      this.props.fetchMunitionsStatusById(editId).then(() => {
        this.setState({
          isUpdated: true,
          munition: this.props.oneMunition,
        });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if(editId !== '0' && prevProps.editId !== editId) {
      this.props.fetchMunitionsStatusById(editId).then(() => {
        this.setState({
          isUpdated: true,
          munition: this.props.oneMunition,
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
  
  handlePayloadGeneralData = (generalData) => {
    const { munition } = this.state;
    
    this.setState({
      munition: {
        ...munition,
        StatusCode: generalData.StatusCode,
        ETIC: generalData.ETIC,
        Remark: generalData.Remark,
      },
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let { munition } = this.state;
    const { editId } = this.props;
    
    if (editId !== undefined && editId !== '0') {
      
      this.props.updateMunitionStatus(editId, munition).then( () => {this.props.onClose();});
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
      {name:translations["Status"], type: 'dropdown', ddID: 'StatusCodes/GetAssetStatusCodes', domID: 'StatusCode', valFieldID: 'StatusCode', required: true },
      {name: translations["ETIC"], type: 'number', domID: 'ETIC', valFieldID: 'ETIC',required:true},
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
                Edit Munition
              </div>

              <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" />
            </div>
          </div>

          <div className="row personnel" >
            
               <div className="col-md-4 info-block"></div> 
              <ContentFull fields={generalFields} data={this.handlePayloadGeneralData} initstate={this.props.oneMunition} editId={this.props.editId} stopupd={this.stopUpdate} editFetched={this.state.isUpdated} clearit={this.state.clear} stopset={this.stopset.bind(this)} />
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

MunitionStatus.propTypes = {
  children: PropTypes.node,
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneMunition: state.status.oneMunition,
  };
};

const mapDispatchToProps = {
  fetchMunitionsStatusById,
  updateMunitionStatus

};

export default connect(mapStateToProps, mapDispatchToProps)(MunitionStatus);
