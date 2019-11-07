import React from 'react';
import PropTypes from 'prop-types';


import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import 'rc-calendar/assets/index.css';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';


const format = 'YYYY-MM-DD HH:mm:ss';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
// if (cn) {
//     now.locale('zh-cn').utcOffset(8);
// } else {
    now.locale('en-gb').utcOffset(0);
// }

function getFormat(time) {
    return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = <TimePickerPanel defaultValue={moment('00:00:20', 'HH:mm:ss')}/>;

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
    return current.valueOf() < date.valueOf();  // can not select days before today
}


class FilterDatePicker extends React.Component {

    static propTypes = {
        defaultValue: PropTypes.object,
        defaultCalendarValue: PropTypes.object,
    }

    constructor(props) {
        super(props);

        this.state = {
            showTime: true,
            showDateInput: true,
            disabled: false,
            value: props.defaultValue,
        };
    }

    onChange = (value) => {
        const name = this.props.name;
        console.log('DatePicker change: ', (value && value.format(format)));
        this.setState({
            value,
        }, () =>{
            this.props.onChange(this.state.selectedDropDownValue);
            this.props.value = this.state.selectedDropDownValue;
        });
    }

    onShowTimeChange = (e) => {
        this.setState({
            showTime: e.target.checked,
        });
    }

    onShowDateInputChange = (e) => {
        this.setState({
            showDateInput: e.target.checked,
        });
    }

    toggleDisabled = () => {
        this.setState({
            disabled: !this.state.disabled,
        });
    }

    render() {

        const state = this.state;
        const calendar = (<Calendar
            className="custom-calendar"
            locale={cn ? zhCN : enUS}
            style={{zIndex: 1000, background: '#002034'}}
            dateInputPlaceholder="please input"
            formatter={getFormat(state.showTime)}
            disabledTime={state.showTime ? disabledTime : null}
            timePicker={state.showTime ? timePickerElement : null}
            defaultValue={this.props.defaultCalendarValue}
            showDateInput={state.showDateInput}
            disabledDate={disabledDate}
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
                            ({value}) => {
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

FilterDatePicker.propTypes = {
    children: PropTypes.element,

};

export default FilterDatePicker;
