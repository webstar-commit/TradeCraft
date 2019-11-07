import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../reusable/Dropdown';
import CustomDatePicker from '../reusable/CustomDatePicker';
import { InputAttributes } from '../../dictionary/constants';
import moment from 'moment';

class ModalFormBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    //    this.state.content = this.props.initstate ;
    this.setState({
      content: this.props.initstate,
    });
  }

  componentDidUpdate() {

    const { initstate, editFetched } = this.props;
    if (editFetched) {
      this.props.stopupd();
      this.setState({ content: initstate }, () => {this.props.data(this.state.content); });

    }

    const { clearit } = this.props;
    if(clearit) {
      this.setState({ content: [] });
      this.props.stopset();
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.updateContent(name, value);
  }

  handleChangeNumber = (e) =>{
    const { name, value } = e.target;
    this.updateContent(name, Number(value));
  }

  handleChangeCheck = (e) =>{
    const { name, value } = e.target;

    let parameterValue = '';
    if (value === 'on') {
      parameterValue = true;
    } else {
      parameterValue = false;
    }
    this.updateContent(name, parameterValue);
  }

  handleDropdownSelectedData = (dropdownData, name) => {
    this.updateContent(name, dropdownData.trim());
  }

  handleChangeDate = (changeDate, name) => {
    this.updateContent(name, changeDate);
  }

  updateContent(name, value) {
    const { content } = this.state;
    this.setState({
      content: {
        ...content,
        [name]: value,
      },
    }, () => {
      this.props.data(this.state.content);
    });
  // this.props.initstate[name] = value;
  // const { initstate } = this.props;
  // this.props.data(initstate);
  }

  renderFields() {
    return this.props.fields.map((item, i) => {
      let input;
      let value = '';

      // if(item.valFieldID !== undefined && this.props.initstate[item.valFieldID] !== undefined && this.props.initstate[item.valFieldID] !== null){
      //   value = this.props.initstate[item.valFieldID];
      // }

      if(item.valFieldID !== undefined && this.state.content[item.valFieldID] !== undefined && this.state.content[item.valFieldID] !== null) {
        value = this.state.content[item.valFieldID];
      }
      // console.log('value of ' +item.valFieldID+ ' is => ' + this.props.initstate[item.valFieldID]+' final  ' + value);
      // console.log('value of ' + item.valFieldID + ' is => ' + this.state.content[item.valFieldID] + ' final  ' + value);
      // if(value === null || value === 'undefined') {
      //     value = 'NA';
      // }

      switch (item.type) {
        case 'input':
          let readOnly = false;
          let maxlength = InputAttributes.MAX_LENGTH;
          if(item.maxlength) {
            maxlength = item.maxlength;
          }

          if(item.readOnly) {
            readOnly = true;
          }
          if(item.required) {
            input = (<input type="text" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} readOnly={readOnly} maxLength={maxlength} required />);
          } else {
            input = (<input type="text" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} readOnly={readOnly} maxLength={maxlength} />);
          }
          break;

        case 'textarea':
          input = (<textarea rows="3" className="instruction" value={value} name={item.valFieldID} onChange={this.handleChange} />);
          break;

        case 'email':
          if(item.required) {
            input = (<input type="email" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} required/>);
          }else {
            input = (<input type="email" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} />);
          }
          break;

        case 'number':
          let minValue = 0;
          if(item.minValue) {
            minValue = item.minValue;
          }
          if(item.required) {
            input = (<input type="number" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
          }else {
            input = (<input type="number" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} required/>);
          }
          break;

        case 'dropdown':
          let req = false;
          let disabled = false;
          if(item.required) {
            req = true;
          }

          if(item.disabled) {
            disabled = true;
          }

          // if(value === '') {
          //   value = 11;
          // }
          input = (
            <Dropdown id={item.valFieldID} initValue={value} dropdownDataUrl={item.ddID} labelName={item.label} finalValue={item.value} options={item.options} dropdownData={this.handleDropdownSelectedData} required={req} disabled={disabled}/>
          );
          break;

        case 'date':
          if(value === '') {
            value = moment();
          }else {
            value = moment(value);
          }
          input = (
            <div>
              <CustomDatePicker name={item.valFieldID} defaultValue={value} changeDate={this.handleChangeDate}/>
            </div>
          );
          break;
        case 'checkbox':
          input = (
            <div>

              <input type="checkbox" id={`checkbox${i}`} name={item.valFieldID} onChange={this.handleChangeCheck}/>
              <label htmlFor={`checkbox${i}`}><span/></label>
            </div>
          );
          break;

      }

      return (

        <div className="col-md-12 form-fields-gap" key={'elem' + i}>
          <div className="col-md-12 label-title" style={{ padding: 0 }}>{item.name}</div>
          <div className="col-md-12" style={{ padding: 0 }}>{input}</div>
        </div>
      );
    });
  }

  render() {

    return (
      <div className="col-md-12 info-block">
        <div className={`${this.props.bigBackground ? 'big-background' : ''} info-content`}>
          {this.renderFields()}
        </div>
      </div>
    );
  }
}

ModalFormBlock.propTypes = {
  children: PropTypes.element,
  editFetched: PropTypes.bool,
  initstate: PropTypes.any,

};

export default ModalFormBlock;
