import { combineReducers } from 'redux';

import cocoms from 'reducers/cocoms';
import localization from 'reducers/localization';
import locations from 'reducers/locations';
import munitions from 'reducers/munitions';
import munitionsinventory from 'reducers/munitionsinventory';
import payloads from 'reducers/payloads';
import payloadinventory from 'reducers/payloadinventory';
import personnels from 'reducers/personnels';
import platforms from 'reducers/platforms';
import platforminventory from 'reducers/platforminventory';
import paygrades from 'reducers/paygrade';
import ranks from 'reducers/ranks';
import ccirpir from 'reducers/ccirpir';
import status from 'reducers/status';
import intelrequest from 'reducers/intel';
import inteleei from 'reducers/inteleei';
import collections from 'reducers/collections';
import organicorgs from 'reducers/organicorg';
import organicpersonnels from 'reducers/organicpersonnel';
import mssionmgts from 'reducers/mssionmgts';
import dashboards from 'reducers/dashboards';
import auth from 'reducers/auth';
import intellibraries from 'reducers/intellibrarys';

export default function createReducer() {
  return combineReducers({
    cocoms,
    ranks,
    paygrades,
    localization,
    locations,
    munitions,
    munitionsinventory,
    payloads,
    payloadinventory,
    personnels,
    platforms,
    platforminventory,
    ccirpir,
    status,
    intelrequest,
    inteleei,
    collections,
    organicorgs,
    organicpersonnels,
    mssionmgts,
    auth,
    dashboards,
    intellibraries,
  });
}
