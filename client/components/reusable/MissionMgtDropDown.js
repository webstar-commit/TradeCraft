import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';

class MissionMgtDropDown extends React.Component {

    labelField = 'description';
    valueField = 'id';

    constructor(props) {
      super(props);
      this.state = {
        dropdownItems: [],
        selectedDropDownValue: '',
        // selectedDropDownType: 1,
      };

      this.handleChange = this.handleChange.bind(this);
      if(undefined !== props.labelName) {
        this.labelField = props.labelName;
      }
      if(undefined !== props.valueName) {
        this.valueField = props.valueName;
      }
    }

    componentWillMount() {
      const { dropdownDataUrl } = this.props;
      const { options } = this.props;
      if(dropdownDataUrl) {
        
        const items = [{ 'label': '--' + 'Select ' + '--', 'value': 0 }];
        axios.get(`${baseUrl}/${this.props.dropdownDataUrl}`, {headers: requestHeaders })
          .then(response => {
            response.data.map(item => {
              items.push({ 'label': item[this.labelField], 'value': item[this.valueField] });
            });
            this.setState({
              dropdownItems: items,
            });
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });
      }else if(options) {
        const items = [{ 'label': '--' + 'Select ' + '--', 'value': 0 }];
        options.map(item => {
          items.push({ 'label': item[this.labelField], 'value': item[this.valueField] });
        });
        this.setState({
          dropdownItems: items,
        });
      }
    }

    componentDidUpdate = () => {
      let { defaultValue } = this.props;
      const { selectedDropDownValue } = this.state;
      if(typeof defaultValue === 'string') {
        defaultValue = defaultValue.trim();
      }
      if(defaultValue !== selectedDropDownValue) {
        this.setState({
          selectedDropDownValue: defaultValue,
        });
      }
    }
    

    // render dropdown list of lang switcher
    renderItems() {
      return this.state.dropdownItems.map((data, key) => {
        return (
          <option key={key} value={data.value}>{data.label}</option>
        );
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
    
      // const { selectedDropDownValue } = this.state;
      this.setState({
        selectedDropDownValue: value,
      }, () =>{
        this.props.data( name, value);
      });
    }

    render() {
      const { label, name } = this.props;
      let { disable } = this.props;
      // if(disable) {
      //   disable = true;
      // }else{
      //   disable = false;
      // }
      return (
        <div className="each-select text-left">
          <label>{label}</label>
          <select className="form-control" disabled={disable} name={name} onChange={this.handleChange} value = {this.state.selectedDropDownValue}>
            {this.renderItems()}
          </select>
        </div>
      );
    }
}

MissionMgtDropDown.propTypes = {
  children: PropTypes.element,
  data: PropTypes.func,
  defaultValue: PropTypes.any,
  disable: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default MissionMgtDropDown;
