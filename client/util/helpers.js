import moment from 'moment';
import { IntelConstants, DateConsts } from '../dictionary/constants';
import { confirmAlert } from 'react-confirm-alert';
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const defaultFilter = (filter, row) => {
  const id = filter.pivotId || filter.id;
  let retVal = true;

  if ((row[id] !== undefined && row[id] !== null && row[id] !== '')) {
    // if(typeof row[id] === 'string') {
    retVal = String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase());

    // }
  } else{
    retVal = false;
  }
  return retVal;
  //   return (row[id] !== undefined && row[id] !== null) ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true;
};

export const formatDate = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format(DateConsts.DATE_FORMAT);
};

export const formatDateTime = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format(DateConsts.DATETIME_FORMAT);
};

export const formatTime = (dateObj) => {
  moment.locale('en');
  return moment(dateObj).local().format(DateConsts.TIME_FORMAT);
};

export const getIntelStatusColor = (abbreviation) => {
  const status = IntelConstants.STATUS[abbreviation];
  let colorCode;
  if(status !== undefined) {
    colorCode = { 'color': status.color };
  }
  return colorCode;
};

export const getMissionStatusColor = (statusId) => {
  let status = {};
  const aoStatus = IntelConstants.STATUS;
  for (const key in aoStatus) {
    if (aoStatus.hasOwnProperty(key)) {
      status = aoStatus[key];
      if(status.id === statusId) {
        break;
      }
    }
  }

  let colorCode;
  if(status !== undefined) {
    colorCode = { 'color': status.color };
  }
  return colorCode;
};

// Will call when user click on some icon like Add/Delete/Update and we want to confirm from user as yes/no/ok/cancel etc.
// @param :
// confirmationMessage: Message to Display in Pop Up example Confirm you wish to Delete Yes/No
// yes: options when user want to proceed example Yes/Ok
// no: option when user donot want to proceed example No/Cancel
// callback: callback function as per requirement
export const getConfirmation = (confirmationMessage, yes, no, callback) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui popup text-center">
          <h2>{confirmationMessage}</h2>
          <div>
            <button onClick={onClose}>{no}</button>
            <button onClick={() => {
              onClose();
              callback();
            }}>
              {yes}
            </button>
          </div>
        </div>
      );
    },
  });

};

export const showAlert = (message, buttonLabel = 'OK') => {
  confirmAlert({
    // title,
    message,
    buttons: [
      {
        label: buttonLabel,       
      },
    ],
  });
};

export const getTime = (date, currentDate) => {
  //const oneDay = 1000 * 60 * 60 * 24;
  let startDate = date;
  startDate = new Date(startDate);
  // get total seconds between the times
  let differenceMS = Math.abs(startDate - currentDate) / 1000;
  // calculate (and subtract) whole days
  let days =  Math.floor(differenceMS / 86400);
  differenceMS -= days * 86400;
  // calculate (and subtract) whole hours
  let hours = Math.floor(differenceMS / 3600) % 24;
  differenceMS -= hours * 3600;
  // calculate (and subtract) whole minutes
  let minutes = Math.floor(differenceMS / 60) % 60;
  differenceMS -= minutes * 60;
  // what's left is seconds
  let seconds = Math.floor(differenceMS) % 60;
  return hours + ':' + minutes + ':' + seconds ;
}

export const getMissionProgressPercentage = (date, currentDate) => {
  const startDate = new Date(date);
  const numinator = startDate.getHours() - currentDate.getHours();
  const denominator = currentDate.getHours() - startDate.getHours();
  const pct = (numinator / denominator) * 100;
  return pct + '%';
};

export const getDiffInDays = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), 'days');
};

export const getDiffInHours = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), 'hours');
};

export const getDiffInMin = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), ' minutes');
};

export const getDiffInSec = (startDate, endDate) => {
  return moment(endDate).diff(moment(startDate), 'seconds');
};

function pad(num) {
  return ('0' + num).slice(-2);
}
export const getHHMMSSFromSec = (secs) => {
  let minutes = Math.floor(secs / 60);
  secs %= 60;
  const hours = Math.floor(minutes / 60)
  minutes %= 60;
  return pad(hours) + ':' + pad(minutes) + ':' + pad(secs);
};
