import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from "../reusable/Dropdown";
import CustomDatePicker from '../reusable/CustomDatePicker';
import {InputAttributes} from '../../dictionary/constants';
import { showAlert } from '../../util/helpers';


class ContentFull extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: []
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    //    this.state.content = this.props.initstate ;
    this.setState({
      content: this.props.initstate,
    });
  }


  componentDidUpdate() {

    const { content } = this.state;
    const { initstate, editId } = this.props;
    const { editFetched } = this.props;

    // if(Object.keys(content).length === 0 && content.constructor === Object && editId !== undefined && editId !== '0') {
    //   // if(editId !== undefined && editId !== '0') {
    //     console.log("Is it called?");
    //   this.setState({
    //     content: initstate,
    //   });
    //   this.props.data(this.state.content);
    // }

    if (editFetched) {
      console.log(this.props.initstate);
      this.props.stopupd();
      this.setState({ content: initstate }, () => { console.log("Init State Updated"); console.log(this.state.content); this.props.data(this.state.content); });

    }

    const { clearit } = this.props;
    if (clearit) {
      this.setState({ content: [] });
      this.props.stopset();
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.updateContent(name, value);
  }

  handleChangeNumber = (e) => {
    const { name, value } = e.target;
    this.updateContent(name, Number(value));
  }

  handleChangeCheck = (e) => {
    const { name, value } = e.target;

    let parameterValue = '';
    if (value === 'on') {
      parameterValue = true;
    }
    else {
      parameterValue = false;
    }
    this.updateContent(name, parameterValue);
  }

  handleDropdownSelectedData = (dropdownData, name) => {
    this.updateContent(name, dropdownData.trim());
  }

  handleChangeDate = (changeDate, name) => {
    this.updateContent(name, changeDate._d);
  }


  /**
     * This method is use for handle the selected file by browse.
     */
    handleSelectedFile = (event) => {
      const name = event.target.name;
      const id = event.target.id;
      const file = event.target.files[0];
      if(file.size > 5242880){
        showAlert("File size should be less than 5 MB.");
        document.getElementById(id).value= null;
        this.updateContent(name, new File([""], ""));
      }else {
        this.updateContent(name, file);
      };
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

        if (item.valFieldID !== undefined && this.state.content[item.valFieldID] !== undefined && this.state.content[item.valFieldID] !== null) {
          value = this.state.content[item.valFieldID];
        }
        // console.log('value of ' +item.valFieldID+ ' is => ' + this.props.initstate[item.valFieldID]+' final  ' + value);
        //  console.log('value of ' +item.valFieldID+ ' is => ' + this.state.content[item.valFieldID]+' final  '+ value);
        // if(value === null || value === 'undefined') {
        //     value = 'NA';
        // }

        switch (item.type) {
          case 'input':
            let maxlength = InputAttributes.MAX_LENGTH;
            if(item.maxlength) {
              maxlength = item.maxlength;
            }
            if (item.required) {
              if (item.validationIcon) {
                input = (<div className="input-group"><input type="text" className="form-control" value={value} id={item.domID} name={item.valFieldID} onChange={this.handleChange} required maxLength={maxlength}/><span className="input-group-addon-validation-icon"> <img id="validationIcon" src="" /></span> </div>);
              } else {
                input = (<input type="text" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} maxLength={maxlength} required />);
              }
            }
            else {
              input = (<input type="text" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} maxLength={maxlength} />)
            }
            break;

          case 'textarea':
            if (item.required) {
              input = (<textarea rows="3" className="instruction" value={value} name={item.valFieldID} onChange={this.handleChange} required/>);
            } else {
              input = (<textarea rows="3" className="instruction" value={value} name={item.valFieldID} onChange={this.handleChange} />);
            }
            break;

          case 'email':
            if (item.required) {
              input = (<input type="email" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} required />);
            } else {
              input = (<input type="email" className="form-control" value={value} name={item.valFieldID} onChange={this.handleChange} />);
            }
            break;

          case 'number':
            let minValue = 0;
            if (item.minValue) {
              minValue = item.minValue;
            }
            if (item.required) {
              if(item.isDecimal) {
                input = (<input type="number" step="any" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} required />);
              }else {
                input = (<input type="number" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} required />);
              }
            } else {
              if(item.isDecimal) {
                input = (<input type="number" step="any" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
              } else {
                input = (<input type="number" min={minValue} value={value} className="form-control" name={item.valFieldID} onChange={this.handleChangeNumber} />);
              }
            }
            break;

          case 'dropdown':
            let req = false;
            if (item.required) {
              req = true;
            }
            // if(value === '') {
            //   value = 11;
            // }
            input = (
              <Dropdown id={item.valFieldID} initValue={value} dropdownDataUrl={item.ddID} labelName={item.label} finalValue={item.value} options={item.options} dropdownData={this.handleDropdownSelectedData} required={req} />

            );
            break;

          case 'date':
            if (value === '') {
              value = new Date();
            }
            input = (
              <div>
                <CustomDatePicker name={item.valFieldID} defaultValue={value} changeDate={this.handleChangeDate} />
              </div>
            );
            break;
          case 'checkbox':
            input = (
              <div>

                <input type="checkbox" id={`checkbox${i}`} name={item.valFieldID} onChange={this.handleChangeCheck} />
                <label htmlFor={`checkbox${i}`}><span /></label>
              </div>
            );
            break;
          case 'file':
            input = (<input type="file" id={`uploadFile${i}`} className="hidden_input" name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} />);
            break;

        }

        return (
          <div className="col-md-12 form-fields-gap" key={'elem' + i}>
            <div className="col-md-12 label-title">{item.name}</div>
            <div className="col-md-12 ">{input}</div>
          </div>
        /* <div className="info-line" key={i}>
                <div>
                    {item.name}
                </div>
                <div >
                    {input}
                </div>
            </div>*/
        );
      });
    }

    render() {


      return (
        <div className="col-md-12 info-block">
          <div className="info-header">
            <img src={this.props.headerLine} alt="" />
            <div className="header-text">
              {this.props.title}
            </div>
            <img className="mirrored-X-image" src={this.props.headerLine} alt="" />
          </div>
          <div className={`${this.props.bigBackground ? 'big-background' : ''} col-md-12`}>
            {this.renderFields()}
          </div>
        </div>
      );
    }
}

ContentFull.propTypes = {
  children: PropTypes.element,
  data: PropTypes.func,
  editFetched: PropTypes.bool,
};

export default ContentFull;
