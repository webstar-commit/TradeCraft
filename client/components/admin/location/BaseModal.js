import { uploadFile } from 'actions/file';
import { addLocation, fetchLocationById, fetchLocations, updateLocation } from 'actions/location';
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ContentBlock from '../../reusable/ContentBlock';
import UploadFileBlock from '../../reusable/UploadFileBlock';
import Loader from '../../reusable/Loader';
import Map, { viewerSize } from 'components/reusable/Map';
import { viewerIdentifiers } from 'map/viewer';

class BaseModal extends React.Component {

  constructor(props) {
    super(props);
    this.updateLatLong = this.updateLatLong.bind(this);
    const session = JSON.parse(localStorage.getItem('session'));
    this.state = {
      file: '',
      clear: false,
      locationPhotoPreviewUrl: '/assets/img/admin/map2.png',
      mapImagePreviewUrl: '/assets/img/admin/map2.png',
      editFetched: false,
      location: {
        LocationID: '',
        LocationReferenceCode: '',
        LocationPhoto: '',
        LocationDocument: '',
        LocationMapImage: '',
        LocationName: '',
        LocationStreet: '',
        LocationCity: '',
        LocationPostalCode: '',
        LocationCountry: '',
        LocationCOCOM: '',
        LocationRegion: '',
        LocationLatitude: '',
        LocationLongitude: '',
        LocationMGRS: '',
        LocationElevation: '',
        LocationPointofContact: session.FirstName + ' ' + session.LastName,
        LocationDSN: session.Telephone,
        LocationEmailNIPR: session.EmailNIPR,
        LocationEmailSIPR: session.EmailSIPR,
        LocationChatID: session.ChatID,
        LocationFrequency: '',
        KML: '',
        LocationCategory: '',
        LocationDescription: '',
        LastUpdate: '',
        LocationNai: '',
        StateAbbrev: '',
        webAddress: '',
        IATA: '',
        ICAO: '',
        FAA: '',
        UserLocationID: '',
      },
      oneLocation: {},
      locationFiles: {
        LocationPhoto: null,
        LocationMapImage: null,
        LocationDocument: null,
        KML: null,
      },
      isImagedRequired: true,
    };

    this.resetForm = this.resetForm.bind(this);
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    const { editId } = this.props;
    // this.setState({
    //   clear: true,
    // });
    if (editId !== '0') {
      this.editComponent(editId);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { editId } = this.props;
    if (editId !== '0' && prevProps.editId !== editId) {
      this.editComponent(editId);
    }
    if (editId === '0' && prevProps.editId !== editId) {
      this.setState({ 
        // clear: true,
        locationPhotoPreviewUrl: '',
        mapImagePreviewUrl: '',
      });
    }
  }

  editComponent = (editId) => {
    this.setState({
      locationPhotoPreviewUrl: '',
      mapImagePreviewUrl: '',
    });
    this.props.fetchLocationById(editId).then(() => {
      const { oneLocation } = this.props;
      const session = JSON.parse(localStorage.getItem('session'));
      this.setState(
        {
          editFetched: true,
          location: {
            ...oneLocation,
            LocationPointofContact: session.FirstName + ' ' + session.LastName,
            LocationDSN: session.Telephone,
            LocationEmailNIPR: session.EmailNIPR,
            LocationEmailSIPR: session.EmailSIPR,
            LocationChatID: session.ChatID,
          },
          locationPhotoPreviewUrl: this.props.oneLocation.LocationPhoto,
          mapImagePreviewUrl: this.props.oneLocation.LocationMapImage,
          isImagedRequired: false,
        });
    });
  }

  stopupd = () => {
    this.setState({ editFetched: false });
  }

  handleLocationGeneralData = (generalData) => {
    const { location } = this.state;
    this.setState({
      location: {
        ...location,
        LocationName: generalData.LocationName,
        LocationStreet: generalData.LocationStreet,
        LocationCity: generalData.LocationCity,
        LocationCountry: generalData.LocationCountry,
        LocationCOCOM: generalData.LocationCOCOM,
        LocationRegion: generalData.LocationRegion,

      },
    });
  }

  updateLatLong = (positionData) => {
    const { location } = this.state;
    if(positionData.length) {
      console.log('pos data' + JSON.stringify(positionData));
      this.setState({
        editFetched: true,
        location: {
          ...location,
          LocationLatitude: positionData[1],
          LocationLongitude: positionData[0],
        },
      });

    }
  }

  handleLocationPositionData = (positionData) => {
    const { location } = this.state;
    const userLocationId = location.UserLocationID;

    // console.log('loca pos data'+JSON.stringify(positionData));
    this.setState({
      location: {
        ...location,
        LocationCategory: positionData.LocationCategory,
        LocationLatitude: positionData.LocationLatitude,
        LocationLongitude: positionData.LocationLongitude,
        LocationMGRS: positionData.LocationMGRS,
        LocationElevation: positionData.LocationElevation,
        UserLocationID: positionData.UserLocationID,
      },
    }, () => {
      if(positionData.UserLocationID && positionData.UserLocationID !== userLocationId) {
        document.getElementById('validationIcon').src = '';
      }
    });
  }

  checkLocationId() {
    const { editId } = this.props;
    const { location } = this.state;
    const userLocationId = location.UserLocationID;
    if (userLocationId) {
      let isUserLocationIdExits;
      axios.get(`${baseUrl}/Locations/GetUserLocationIDUnique?userLocID=${userLocationId}`, { headers: requestHeaders })
        .then(response => {
          isUserLocationIdExits = response.data;
          document.getElementById('LocationID').placeholder = '';
          if (isUserLocationIdExits === false) {
            if (this.props.oneLocation.UserLocationID !== 'undefined') {
              if (this.props.oneLocation.UserLocationID !== userLocationId) {
                const { location } = this.state;
                this.setState({
                  location: {
                    ...location,
                    UserLocationID: '',
                  },
                });
                this.handleLocationPositionData(this.state.location);
                document.getElementById('LocationID').value = '';
                document.getElementById('LocationID').placeholder = `${userLocationId} already exists`;
                document.getElementById('validationIcon').src = '/assets/img/failure-icon.png';
              } else{
                this.submitData();
              }
            } else {
              const { location } = this.state;
              this.setState({
                location: {
                  ...location,
                  UserLocationID: '',
                },
              });
              document.getElementById('LocationID').value = '';
              document.getElementById('LocationID').placeholder = `${userLocationId} already exists`;
              document.getElementById('validationIcon').src = '/assets/img/failure-icon.png';
            }
          } else {
            document.getElementById('validationIcon').src = '/assets/img/success-icon.png';
            this.submitData();
          }
        });
    }
  }

  handleLocationInfoData = (infoData) => {
    const { location } = this.state;
    const session = JSON.parse(localStorage.getItem('session'));
    
    this.setState({
      location: {
        ...location,
        LocationPointofContact: infoData.LocationPointofContact,
        LocationDSN: session.Telephone,
        LocationEmailNIPR: session.EmailNIPR,
        LocationEmailSIPR: session.EmailSIPR,
        LocationChatID: session.ChatID,
        LocationFrequency: infoData.LocationFrequency,
      },
    });
  }

  /**
   * This is callback method called automatically and update state with locationFiles.
   */
  handleUploadFileData = (uploadFileData) => {
    const { locationFiles } = this.state;
    this.setState({
      locationFiles: {
        ...locationFiles,
        LocationPhoto: uploadFileData.LocationPhoto,
        LocationMapImage: uploadFileData.LocationMapImage,
        LocationDocument: uploadFileData.LocationDocument,
        KML: uploadFileData.KML,
      },
    }, () => {
      // console.log("New state in ASYNC callback of UPLOAD IMAGERY & DATASHEETS() LOcation screen :", this.state.locationFiles);
    });
  }

  /**
   * This is callback method called automatically and show selected image preview.
   */
  handlePhotoPreviewURL = (uploadedFile) => {
    const reader = new FileReader();
    const file = uploadedFile.originalFile;

    if (uploadedFile.name === 'LocationPhoto') {

      reader.onloadend = () => {
        this.setState({
          locationPhotoPreviewUrl: reader.result,
        });

      };
    } else if (uploadedFile.name === 'LocationMapImage') {

      reader.onloadend = () => {
        this.setState({
          mapImagePreviewUrl: reader.result,
        });




      };

    }
    reader.readAsDataURL(file);
  }
  submitData = () => {

    const { location, locationFiles } = this.state;
    const { editId } = this.props;

    // We are going to upload files with JSON request body.
    const formData = new FormData();
    if (locationFiles.LocationPhoto) {
      formData.append('LocationPhoto', locationFiles.LocationPhoto, locationFiles.LocationPhoto.name);
    }
    if (locationFiles.LocationMapImage) {
      formData.append('LocationMapImage', locationFiles.LocationMapImage, locationFiles.LocationMapImage.name);
    }
    if (locationFiles.LocationDocument) {
      formData.append('LocationDocument', locationFiles.LocationDocument, locationFiles.LocationDocument.name);
    }
    if (locationFiles.KML) {
      formData.append('KML', locationFiles.KML, locationFiles.KML.name);
    }

    // Start Loader
    this.setState({ loading: true });
    if (editId !== undefined && editId !== '0') {
      location.LocationID = editId;
      formData.append('locationFormData', JSON.stringify(location));
      this.props.updateLocation(editId, formData).then(() => {
        // End Loader
        this.setState({ loading: false });
        this.props.onClose();
      });
    } else {
      formData.append('locationFormData', JSON.stringify(location));
      this.props.addLocation(formData).then(() => {
        // End Loader
        this.setState({ loading: false });
        this.props.onClose();
      });
    }
  }

   handleSubmit = event => {
     event.preventDefault();
     this.checkLocationId();
   }

   stopset() {
     this.setState({ clear: false });
   }

   resetForm() {
     const {translations}=this.props;
     this.setState(this.baseState);
     if (confirm(translations['ClearConfirmation'])) {
       this.setState({
         clear: true,
         locationPhotoPreviewUrl: '/assets/img/admin/map2.png',
         mapImagePreviewUrl: '/assets/img/admin/map2.png',
       });
       document.getElementById('locationform').reset();
     } else {

     }
   }

   render() {
     // Render nothing if the "show" prop is false

     const { locationPhotoPreviewUrl, mapImagePreviewUrl } = this.state;
     let $locationPhoto = '';
     let $mpaImage = '';
     // const locationPhotoUrl = this.props.oneLocation.LocationPhoto;
     // const locationMapImageUrl = this.props.oneLocation.LocationMapImage;

     if (locationPhotoPreviewUrl || locationPhotoPreviewUrl === '') {
       $locationPhoto = (<img src={locationPhotoPreviewUrl} alt="" className="photo" alt="" />);
     } else {
       $locationPhoto = (<img src="/assets/img/admin/map2.png" className="photo" alt="" />);
     }

     if (mapImagePreviewUrl || mapImagePreviewUrl === '') {
       $mpaImage = (<img src={mapImagePreviewUrl} alt="" className="photo" alt="" />);
     } else {
       $mpaImage = (<img src="/assets/img/admin/map1.png" className="photo" alt="" />);
     }


     const { translations } = this.props;
     const generalFields = [
       { name: translations.Name, type: 'input', domID: 'LocationName', valFieldID: 'LocationName', required: true },
       { name: translations['Street/Road'], type: 'input', domID: 'LocationStreet', valFieldID: 'LocationStreet' },
       { name: translations['City/Town'], type: 'input', domID: 'LocationCity', valFieldID: 'LocationCity' },
       { name: translations.Country, type: 'dropdown', domID: 'dispLocationCountry', ddID: 'Countries', valFieldID: 'LocationCountry', required: true },
       { name: translations.COCOM, type: 'dropdown', domID: 'dispLocationCOCOM', ddID: 'COCOM', valFieldID: 'LocationCOCOM' },
       { name: translations.Region, type: 'dropdown', domID: 'dispLocationRegion', ddID: 'Regions', valFieldID: 'LocationRegion', required: true },
     ];

     const locationFields = [
       { name: translations.LocationType, type: 'dropdown', domID: 'LocationType', ddID: 'LocationCategory', valFieldID: 'LocationCategory', required: true },
       { name: translations.Lat, type: 'input', domID: 'LocationLat', valFieldID: 'LocationLatitude', required: true  },
       { name: translations.Lon, type: 'input', domID: 'LocationLon', valFieldID: 'LocationLongitude', required: true  },
       { name: translations.Elevation, type: 'number', domID: 'LocationElevation', valFieldID: 'LocationElevation' },
       { name: translations.MGRS, type: 'input', domID: 'LocationMGRS', valFieldID: 'LocationMGRS' },
       { name: translations.LocationID, type: 'input', domID: 'LocationID', ddID: '', valFieldID: 'UserLocationID', required: true, validationIcon: true },

     ];

     const contactFields = [
       { name: translations['Point of Contact'], type: 'input', domID: 'dispLocationPointofContact', valFieldID: 'LocationPointofContact' },
       { name: translations.Telephone, type: 'input', domID: 'DSN', valFieldID: 'LocationDSN' },
       { name: translations['Email-NIPR'], type: 'email', domID: 'EmailNIPR', valFieldID: 'LocationEmailNIPR' },
       { name: translations['Email-SIPR'], type: 'email', domID: 'EmailSIPR', valFieldID: 'LocationEmailSIPR' },
       { name: translations.Frequency, type: 'number', domID: 'LocationFrequency', valFieldID: 'LocationFrequency' },
       { name: translations['Chat ID'], type: 'input', domID: 'ChatID', valFieldID: 'LocationChatID' },
     ];

     const uploadFileFields = [
       { name: translations['Photo Image'], type: 'file', domID: 'LocationPhoto', valFieldID: 'LocationPhoto', fileType: 'image' },
       { name: translations['Map Image'], type: 'file', domID: 'LocationMapImage', valFieldID: 'LocationMapImage', fileType: 'image' },
       { name: translations.Document, type: 'file', domID: 'LocationDocument', valFieldID: 'LocationDocument', fileType: 'file' },
       { name: translations['KML Marker'], type: 'file', domID: 'KML', valFieldID: 'KML', fileType: 'file', extension: 'kml' },
     ];

     return (

       <form action="" onSubmit={this.handleSubmit} id="locationform">
         <div className="row personnel" >
           <Loader loading={this.state.loading} />
           {/* <div className="header-line">
            <img src="/assets/img/admin/personnel_1.png" alt="" style={{ width: "35%" }} />
            <div className="header-text" style={{ width: "30%" }}>
              {translations["Base Location Administration"]}
            </div>
            <img className="mirrored-X-image" src="/assets/img/admin/personnel_1.png" alt="" style={{ width: "35%" }} />
          </div> */}
           <div className="personnel-content">
             <div className="col-md-4 image-block">
               {$locationPhoto}
             </div>
             <div className="col-md-4 image-block">
               {$mpaImage}
             </div>
             <UploadFileBlock headerLine="/assets/img/admin/upload_1.png" title={translations['Upload Imagery & Datasheets']} fields={uploadFileFields}
               data={this.handleUploadFileData} initstate={this.props.oneLocation} previewFile={this.handlePhotoPreviewURL} isImagedRequired={this.state.isImagedRequired}
               clearit={this.state.clear} stopset={this.stopset.bind(this)}
               editFetched={this.state.editFetched} stopupd={this.stopupd} />
           </div>
         </div>
         <div className = "row personnel">
            <div className="col-md-12">
             Map size="100" viewerId={viewerIdentifiers.location} updateLatLong={this.updateLatLong} />
           </div>
         </div>
         <div className="row personnel" >
           <div className="under-location-content">
             <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations.General} fields={generalFields}
               data={this.handleLocationGeneralData} initstate={this.state.location} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched={this.state.editFetched} stopupd={this.stopupd} />
             <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations.Location} fields={locationFields}
               data={this.handleLocationPositionData} initstate={this.state.location} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched={this.state.editFetched} stopupd={this.stopupd} />
             <ContentBlock headerLine="/assets/img/admin/upload_1.png" title={translations['Contact Information']} fields={contactFields}
               data={this.handleLocationInfoData} initstate={this.state.location} editId={this.props.editId} clearit={this.state.clear} stopset={this.stopset.bind(this)} editFetched={this.state.editFetched} stopupd={this.stopupd} />
           </div>
         </div>
         <div className="row action-buttons">
           <div className="menu-button">
             <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
             <button type="button" className="highlighted-button" onClick={this.resetForm.bind(this)}>
               {translations.clear}
             </button>
             <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
           </div>
           {/* <div className="menu-button">
            <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
            <button className='highlighted-button'>
              {translations['Delete']}
            </button>
            <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
          </div> */}
           <div className="menu-button">
             <img className="line" src="/assets/img/admin/edit_up.png" alt="" />
             <button type="submit" className="highlighted-button">
               {/* {translations['save']} */}
               {translations.submit}
             </button>
             <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt="" />
           </div>
         </div>

       </form>

     );
   }
}

BaseModal.propTypes = {
  editId: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    oneLocation: state.locations.oneLocation,
  };
};

const mapDispatchToProps = {
  addLocation,
  updateLocation,
  fetchLocations,
  fetchLocationById,
  uploadFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseModal);
