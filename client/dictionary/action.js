import { createActionType } from 'util/action';

export const COCOM_LIST__FETCH = createActionType('COCOM_LIST__FETCH');

export const RANK_LIST__FETCH = createActionType('RANK_LIST__FETCH');

export const PAYGRADE_LIST__FETCH = createActionType('PAYGRADE_LIST__FETCH');

export const FILE__UPLOAD = createActionType('FILE__UPLOAD');

export const INTEL_EEI__ADD = createActionType('INTEL_EEI__ADD');
export const INTEL_EEI__UPDATE = createActionType('INTEL_EEI__UPDATE');
export const INTEL_EEI__FETCH = createActionType('INTEL_EEI__FETCH');
export const INTEL_EEI__FETCH_ONE = createActionType('INTEL_EEI__FETCH_ONE');
export const INTEL_EEI__DELETE = createActionType('INTEL_EEI__DELETE');

export const INTEL_REQUEST__ADD = createActionType('INTEL_REQUEST__ADD');
export const INTEL_REQUEST__UPDATE = createActionType('INTEL_REQUEST__UPDATE');
export const INTEL_REQUEST__FETCH = createActionType('INTEL_REQUEST__FETCH');
export const INTEL_REQUEST__FETCH_ONE = createActionType('INTEL_REQUEST__FETCH_ONE');
export const INTEL_REQUEST__DELETE = createActionType('INTEL_REQUEST__DELETE');


export const LOCALIZATION__UPDATE = createActionType('LOCALIZATION__UPDATE');

export const LOCATION__ADD = createActionType('LOCATION__ADD');
export const LOCATION__UPDATE = createActionType('LOCATION__UPDATE');
export const LOCATION__FETCH = createActionType('LOCATION__FETCH');
export const LOCATION__FETCH_ONE = createActionType('LOCATION__FETCH_ONE');
export const LOCATION_LIST__FETCH = createActionType('LOCATION_LIST__FETCH');
export const LOCATION_TYPE__FETCH = createActionType('LOCATION_TYPE__FETCH');
export const LOCATION__DELETE_ONE = createActionType('LOCATION__DELETE_ONE');

export const MUNITION__ADD = createActionType('MUNITION__ADD');
export const MUNITION__UPDATE = createActionType('MUNITION__UPDATE');
export const MUNITION__FETCH = createActionType('MUNITION__FETCH');
export const MUNITION__FETCH_ONE = createActionType('MUNITION__FETCH_ONE');
export const MUNITION__DELETE_ONE = createActionType('MUNITION__DELETE_ONE');

export const MUNITION_INVENTORY__ADD = createActionType('MUNITION_INVENTORY__ADD');
export const MUNITION_INVENTORY__UPDATE = createActionType('MUNITION_INVENTORY__UPDATE');
export const MUNITION_INVENTORY__FETCH = createActionType('MUNITION_INVENTORY__FETCH');
export const MUNITION_INVENTORY__FETCH_ONE = createActionType('MUNITION_INVENTORY__FETCH_ONE');
export const MUNITION_INVENTORY__DELETE_ONE = createActionType('MUNITION_INVENTORY__DELETE_ONE');


export const PAYLOAD__ADD = createActionType('PAYLOAD__ADD');
export const PAYLOAD__UPDATE = createActionType('PAYLOAD__UPDATE');
export const PAYLOAD__FETCH = createActionType('PAYLOAD__FETCH');
export const PAYLOAD__FETCH_ONE = createActionType('PAYLOAD__FETCH_ONE');
export const PAYLOAD__DELETE_ONE = createActionType('PAYLOAD__DELETE_ONE');
export const PAYLOAD_LIST__FETCH = createActionType('PAYLOAD_LIST__FETCH');
export const PAYLOAD_TYPE__FETCH = createActionType('PAYLOAD_TYPE__FETCH');

export const PAYLOAD_INVENTORY__ADD = createActionType('PAYLOAD_INVENTORY__ADD');
export const PAYLOAD_INVENTORY__UPDATE = createActionType('PAYLOAD_INVENTORY__UPDATE');
export const PAYLOAD_INVENTORY__FETCH = createActionType('PAYLOAD_INVENTORY__FETCH');
export const PAYLOAD_INVENTORY__FETCH_ONE = createActionType('PAYLOAD_INVENTORY__FETCH_ONE');
export const PAYLOAD_INVENTORY__DELETE_ONE = createActionType('PAYLOAD_INVENTORY__DELETE_ONE');

export const PERSONNEL__ADD = createActionType('PERSONNEL__ADD');
export const PERSONNEL__UPDATE = createActionType('PERSONNEL__UPDATE');
export const PERSONNEL__FETCH = createActionType('PERSONNEL__FETCH');
export const PERSONNEL__FETCH_ONE = createActionType('PERSONNEL__FETCH_ONE');
export const PERSONNEL__DELETE_ONE = createActionType('PERSONNEL__DELETE_ONE');

export const CCIRPIR__ADD = createActionType('CCIRPIR__ADD');
export const CCIRPIR__UPDATE = createActionType('CCIRPIR__UPDATE');
export const CCIRPIR__FETCH = createActionType('CCIRPIR__FETCH');
export const CCIRPIR__FETCH_ONE = createActionType('CCIRPIR__FETCH_ONE');
export const CCIRPIR__DELETE_ONE = createActionType('CCIRPIR__DELETE_ONE');


export const PLATFORM__ADD = createActionType('PLATFORM__ADD');
export const PLATFORM__UPDATE = createActionType('PLATFORM__UPDATE');
export const PLATFORM__FETCH = createActionType('PLATFORM__FETCH');
export const PLATFORM__FETCH_ONE = createActionType('PLATFORM__FETCH_ONE');
export const PLATFORM__DELETE_ONE = createActionType('PLATFORM__DELETE_ONE');

export const PLATFORM_INVENTORY__ADD = createActionType('PLATFORM_INVENTORY__ADD');
export const PLATFORM_INVENTORY__UPDATE = createActionType('PLATFORM_INVENTORY__UPDATE');
export const PLATFORM_INVENTORY__FETCH = createActionType('PLATFORM_INVENTORY__FETCH');
export const PLATFORM_INVENTORY__FETCH_ONE = createActionType('PLATFORM_INVENTORY__FETCH_ONE');
export const PLATFORM_INVENTORY__DELETE_ONE = createActionType('PLATFORM_INVENTORY__DELETE_ONE');


export const STATUS_PLATFORM__FETCH = createActionType('STATUS_PLATFORM__FETCH');
export const STATUS_PAYLOAD__FETCH = createActionType('STATUS_PAYLOAD__FETCH');
export const STATUS_PERSONNEL__FETCH = createActionType('STATUS_PERSONNEL__FETCH');
export const STATUS_MUNITION__FETCH = createActionType('STATUS_MUNITION__FETCH');
export const STATUS_PLATFORM__FETCH_ONE = createActionType('STATUS_PLATFORM__FETCH_ONE');
export const STATUS_PAYLOAD__FETCH_ONE = createActionType('STATUS_PAYLOAD__FETCH_ONE');
export const STATUS_PERSONNEL__FETCH_ONE = createActionType('STATUS_PERSONNEL__FETCH_ONE');
export const STATUS_MUNITION__FETCH_ONE = createActionType('STATUS_MUNITION__FETCH_ONE');
export const STATUS_PLATFORM__UPDATE = createActionType('STATUS_PLATFORM__UPDATE');
export const STATUS_PAYLOAD__UPDATE = createActionType('STATUS_PAYLOAD__UPDATE');
export const STATUS_PERSONNEL__UPDATE = createActionType('STATUS_PERSONNEL__UPDATE');
export const STATUS_MUNITION__UPDATE = createActionType('STATUS_MUNITION__UPDATE');
export const UNIT_LOGO__FETCH = createActionType('UNIT_LOGO__FETCH');

export const COLLECTION_PLAN__FETCH = createActionType('COLLECTION_PLAN__FETCH');
export const MOVE_TO_COLLECTION__PLAN = createActionType('MOVE_TO_COLLECTION__PLAN');
export const MOVE_TO_INTEL__REQUEST = createActionType('MOVE_TO_INTEL__REQUEST');
export const DELETE_COLLECTION__PLAN = createActionType('DELETE_COLLECTION__PLAN');
export const INTEL_APPROVED_REQUEST__FETCH = createActionType('INTEL_APPROVED_REQUEST__FETCH');
export const INTEL_APPROVED_REQUEST__DELETE_ONE = createActionType('INTEL_APPROVED_REQUEST__DELETE_ONE');
export const INTEL_APPROVED_VALIDATED__STATUS_UPDATE = createActionType('INTEL_APPROVED_VALIDATED__STATUS_UPDATE');
export const ROUTE_COLLECTION__PLAN = createActionType('ROUTE_COLLECTION__PLAN');

export const ORGANIC_ORG__FETCH = createActionType('ORGANIC_ORG__FETCH');
export const ORGANIC_ORG__ADD = createActionType('ORGANIC_ORG__ADD');
export const ORGANIC_PERSONNEL__FETCH = createActionType('ORGANIC_PERSONNEL__FETCH');
export const ORGANIC_PERSONNEL__ADD = createActionType('ORGANIC_PERSONNEL__ADD');
export const ORGANIC_PERSONNEL__FETCH_LIST = createActionType('ORGANIC_PERSONNEL__FETCH_LIST');
export const DEPLOYED_ORG__FETCH = createActionType('DEPLOYED_ORG__FETCH');
export const DEPLOYED_PERSONNEL__FETCH = createActionType('DEPLOYED_PERSONNEL__FETCH');
export const ORGANIC_ORG__FETCH_ONE = createActionType('ORGANIC_ORG__FETCH_ONE');
export const UNIT__FETCH_ONE = createActionType('UNIT__FETCH_ONE');
export const UNIT__UPDATE = createActionType('UNIT__UPDATE');
export const UNIT__NEXT_HIGHER = createActionType('NEXT_HIGHER_UNIT');

 
export const ATO_COLLECTION_PLAN__FETCH = createActionType('ATO_COLLECTION_PLAN__FETCH');
export const ATO_GENERATION__FETCH = createActionType('ATO_GENERATION__FETCH');

export const FOP_ATO_PLATFORM__FETCH = createActionType('FOP_ATO_PLATFORM__FETCH');
export const FOP_PLATFORM__FETCH = createActionType('FOP_PLATFORM__FETCH');

export const FOP_ATO_CREW__FETCH = createActionType('FOP_ATO_CREW__FETCH');
export const FOP_CREW__FETCH = createActionType('FOP_CREW__FETCH');

export const PED_TASKS__FETCH = createActionType('PED_TASKS__FETCH');
export const PED_TASKS_ATO_GENERATION__FETCH = createActionType('PED_TASKS_ATO_GENERATION__FETCH');

export const COLLECTION_PLAN_TO_ATO_GENERATION = createActionType('COLLECTION_PLAN_TO_ATO_GENERATION');
export const ATO_GEN_TO_COLLECTION_PLAN__MOVE = createActionType('ATO_GEN_TO_COLLECTION_PLAN__MOVE');
export const ROUTE_ATO_GENERATION = createActionType('ROUTE_ATO_GENERATION');

export const MISSION_REPORT_UPLOAD = createActionType('MISSION_REPORT_UPLOAD');
export const ATO_GEN_TO_FLIGHT_OPS__MOVE = createActionType('ATO_GEN_TO_FLIGHT_OPS__MOVE');
export const FLIGHT_OPS_TO_ATO_GEN__MOVE = createActionType('FLIGHT_OPS_TO_ATO_GEN__MOVE');

export const ATO_GEN_TO_PED_TASK__MOVE = createActionType('ATO_GEN_TO_PED_TASK__MOVE');
export const PED_TASK_TO_ATO_GEN__MOVE = createActionType('PED_TASK_TO_ATO_GEN__MOVE');

export const SEARCH_MISSION_FILTER = createActionType('SEARCH_MISSION_FILTER');
export const MISSION_SUMMARY__FETCH = createActionType('MISSION_SUMMARY__FETCH');
export const MISSION_DETAIL__FETCH = createActionType('MISSION_DETAIL__FETCH');


export const ACCOUNT__REGISTER = createActionType('ACCOUNT__REGISTER');
export const ACCOUNT__CHANGE_PASSWORD = createActionType('ACCOUNT__CHANGE_PASSWORD');
export const ACCOUNT__LOGIN = createActionType('ACCOUNT__LOGIN');
export const ACCOUNT__LOGOUT = createActionType('ACCOUNT__LOGOUT');
export const REFRESH__TOKEN = createActionType('REFRESH__TOKEN');

export const FETCH_DASHBOARD_OPS_PAYLOAD = createActionType('FETCH_DASHBOARD_OPS_PAYLOAD');
export const FETCH_DASHBOARD_OPS_PLATFORM = createActionType('FETCH_DASHBOARD_OPS_PLATFORM');
export const FETCH_DASHBOARD_OPS_MISSION = createActionType('FETCH_DASHBOARD_OPS_MISSION');
export const FETCH_A_ISR_OPERATION_MISSION = createActionType('FETCH_A_ISR_OPERATION_MISSION');
export const FETCH_LATEST_INTELLIGENCE = createActionType('FETCH_LATEST_INTELLIGENCE');
export const FETCH_UPCOMING_MISSION = createActionType('FETCH_UPCOMING_MISSION');
export const FETCH_LIVE_OPERATION = createActionType('FETCH_LIVE_OPERATION');


export const INTEL_LIBRARY_REQUEST__FETCH_ONE = createActionType('INTEL_LIBRARY_REQUEST__FETCH_ONE');
export const INTEL_LIBRARY_REQUEST__FETCH = createActionType('INTEL_LIBRARY_REQUEST__FETCH');
export const INTEL_LIBRARY_SEND__EMAIL = createActionType('INTEL_LIBRARY_SEND__EMAIL');


