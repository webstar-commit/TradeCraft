import {connect} from 'react-redux';

 import PayloadsComponent from '../../components/admin/PayloadsComponent';
// import { fetchCocoms } from 'actions/cocom';
// import { fetchLocationList } from 'actions/location';
import { fetchPayloadInventory, deletePayloadInventoryById } from 'actions/payloadinventory';

const mapStateToProps = state => {
  
  return {
    translations: state.localization.staticText,
    // payloadList: state.payloads.payloadList,
    // payloadTypes: state.payloads.payloadTypes,
    // fetchingPayloads: state.payloads.isFetching,
    // locationList: state.locations.locationList,
    // cocomList: state.cocoms.cocomList,
    // payload: state.payloads.onePayload, 
    isLoading: state.payloadinventory.isFetching,
    allPayloadInventory: state.payloadinventory.allPayloadInventory,
    isDeleted: state.payloadinventory.isDeleted

  };
};

const mapDispatchToProps = {
  // addPayload,
  // fetchPayloadList,
  // fetchPayloadTypes,
  fetchPayloadInventory,
  deletePayloadInventoryById,
  // fetchCocoms,
  // fetchLocationList,
  // fetchPayloadById 
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsComponent);
