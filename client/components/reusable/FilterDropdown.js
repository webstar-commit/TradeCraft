import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';

class Table extends React.Component {

    labelField = 'description';
    valueField = 'id';

    constructor(props) {
      super(props);
      this.state = {
        dropdownItems: [],
        selectedDropDownValue: 0,
      };

      this.handleChange = this.handleChange.bind(this);
      if(undefined !== props.labelName) {
        this.labelField = props.labelName;
      }
      if(undefined !== props.finalValue) {
        this.valueField = props.finalValue;
      }
    }

    componentWillMount() {
      const items = [{ 'label': '-Select Item-', 'value': '' }];

      console.log('this.props.dropdownDataUrl' + this.props.dropdownDataUrl);
      if (this.props.dropdownDataUrl) {

        axios.get(`${baseUrl}/${this.props.dropdownDataUrl}`, { headers: requestHeaders })
          .then(response => {
            response.data.map(item => {
              items.push({ 'label': item[this.labelField], 'value': item[this.valueField] });
            });
            this.setState({
              dropdownItems: items,
            }, () => {
              this.updateDefaults();
            });
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });

      }
    }

    componentDidUpdate = () => {
      this.updateDefaults();
    }

    updateDefaults = () => {
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

    renderItems() {
      return this.state.dropdownItems.map((data, key) => {
        return (
          <option key={key} value={data.value}>{data.label}</option>
        );
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        selectedDropDownValue: value,
      }, () =>{
        this.props.dropdownData(name, value);
      });
    }

    render() {

      return (
        <div>
          <select name={ this.props.name } onChange={this.handleChange} value = {this.state.selectedDropDownValue}>
            {this.renderItems()}
          </select>
        </div>
      );
    }
}

Table.propTypes = {
  children: PropTypes.element,
  defaultValue: PropTypes.any,
  dropdownData: PropTypes.func,
  name: PropTypes.string,

};

export default Table;
