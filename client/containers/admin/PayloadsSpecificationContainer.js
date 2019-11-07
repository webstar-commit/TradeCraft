import {connect} from 'react-redux';

import PayloadsSpecificationComponent from '../../components/admin/PayloadsSpecificationComponent';
import { fetchCocoms } from 'actions/cocom';
import { fetchLocationList } from 'actions/location';
import { addPayload, fetchPayloadList, fetchPayloads, fetchPayloadTypes, deletePayloadsById } from 'actions/payload';

const mapStateToProps = state => {
  return {
    translations: state.localization.staticText,
    allPayloads: state.payloads.allPayloads,
    payloadList: state.payloads.payloadList,
    payloadTypes: state.payloads.payloadTypes,
    isLoading: state.payloads.isFetching,
    locationList: state.locations.locationList,
    cocomList: state.cocoms.cocomList,
    payload: state.payloads.onePayload,
    isDeleted: state.payloads.isDeleted
  };
};

const mapDispatchToProps = {
  addPayload,
  fetchPayloadList,
  fetchPayloadTypes,
  fetchPayloads,
  fetchCocoms,
  fetchLocationList,
  deletePayloadsById,
};

export default connect(mapStateToProps, mapDispatchToProps)(PayloadsSpecificationComponent);
