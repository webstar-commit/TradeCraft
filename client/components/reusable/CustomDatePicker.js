import React from 'react';
import PropTypes from 'prop-types';

import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
// import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/en-ca';
import 'moment/locale/en-gb';
import { DateConsts } from '../../dictionary/constants';

// const format = DateConsts.DB_DATETIME_FORMAT;
const DBFormat = DateConsts.DB_DATETIME_FORMAT;
const UIFormat = DateConsts.UI_DATETIME_FORMAT;
// const cn = location.search.indexOf('cn') !== -1;
moment.locale('en');
// const now = moment();
// now.locale('en-ca').utcOffset(8);
// if (cn) {
//     now.locale('zh-cn').utcOffset(8);
// } else {
// now.locale('en-gb').utcOffset(0);
// }

function getFormat(time) {
  return time ? UIFormat : DateConsts.UI_DATE_FORMAT;
}
/*

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month'); */

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:20', DateConsts.DB_TIME_FORMAT)}/>;

function disabledTime(date) {
  if (date && (date.date() === 15)) {
    return {
      disabledHours() {
        return [3, 4];
      },
    };
  }
  return {
    disabledHours() {
      return [1, 2];
    },
  };
}

function disabledDate(current) {
  if (!current) {
    // allow empty select
    return false;
  }
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return current.valueOf() < date.valueOf(); // can not select days before today */
}

class CustomDatePicker extends React.Component {

    static propTypes = {
      defaultCalendarValue: PropTypes.object,
      defaultValue: PropTypes.object,
    }

    constructor(props) {
      super(props);
      this.state = {
        showTime: true,
        showDateInput: true,
        disabled: false,
        value: moment(props.defaultValue, UIFormat),
      };
    }

    componentWillMount = () => {
      this.onChange(moment(this.props.defaultValue, DBFormat));
    }

    componentDidUpdate = () => {
      const defaultValue = moment(this.props.defaultValue, DBFormat);
      const { value } = this.state;
      if(!defaultValue.isSame(value)) {
        this.setState({
          value: defaultValue,
        });
      }

    }

    onChange = (value) => {
      if(value !== null && value !== undefined ) {
        const name = this.props.name;
        /*  value = moment(this.props.defaultValue, DBFormat);
      value.set({hour:0,minute:0,second:0,millisecond:0}) */
        this.setState({
          value,
        }, () => {
          const strValue = moment(this.state.value).format(DBFormat);
          this.props.changeDate(strValue, name);
        });
      }
    }

    render() {

      const state = this.state;
      let disabledDateLogic = disabledDate;
      if((this.props.disablePreviousDate !== undefined && this.props.disablePreviousDate !== null && this.props.disablePreviousDate !== '' && !(this.props.disablePreviousDate))) {
        disabledDateLogic = () => {};
      }
      
      const calendar = (<Calendar
        className="custom-calendar"
        locale={enUS}
        style={{ zIndex: 1000, background: '#002034' }}
        dateInputPlaceholder="please input"
        formatter={getFormat(state.showTime)}
        disabledTime={state.showTime ? disabledTime : null}
        timePicker={state.showTime ? timePickerElement : null}
        defaultValue={this.props.defaultValue}
        showDateInput={state.showDateInput}
        disabledDate={disabledDateLogic}
      />);

      return (
        <div>
          <div style={{
            boxSizing: 'border-box',
            position: 'relative',
            display: 'block',
            lineHeight: 1.5,
          }}
          >
            <DatePicker
              animation="slide-up"
              disabled={state.disabled}
              calendar={calendar}
              value={state.value}
              onChange={this.onChange}
            >
              {
                ({ value }) => {
                  return (
                    <span tabIndex="0">
                      <div className="input-group">
                        <input
                          placeholder={this.props.headerText}
                          disabled={state.disabled}
                          readOnly
                          tabIndex="-1"
                          className="ant-calendar-picker-input ant-input"
                          value={value && value.format(getFormat(state.showTime)) || ''}
                        />
                        <span className="input-group-addon">
                          <img className="calendar" src="/assets/img/admin/calendar.png" alt=""/>
                        </span>
                      </div>
                    </span>
                  );
                }
              }
            </DatePicker>
          </div>
        </div>
      );
    }
}

CustomDatePicker.propTypes = {
  children: PropTypes.element,

};

export default CustomDatePicker;
