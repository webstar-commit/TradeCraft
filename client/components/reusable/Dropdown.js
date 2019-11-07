import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { baseUrl, requestHeaders } from 'dictionary/network';

class Table extends React.Component {

    labelField= "description";
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
      let items = [{'label': '--Select Item--', 'value': 0}];

      if(this.props.dropdownDataUrl !== undefined && this.props.dropdownDataUrl !== null && this.props.dropdownDataUrl !== '') {
        
        const apiUrl = `${baseUrl}/${this.props.dropdownDataUrl}`;
        axios.get(apiUrl, {headers:requestHeaders})
          .then(response => {
            if(response.data) {
              response.data.map(item => {
                let val = item[this.valueField];
                if(typeof val === 'string') {
                  val = val.trim();
                }          
                items.push({ 'label': item[this.labelField], 'value': val });
              });
              this.setState({
                dropdownItems: items,
              });
            }
          })
          .catch((error) => {
            console.log('Exception comes:' + error);
          });

      }
        
      if(this.props.options) {
        this.setState({
          dropdownItems: this.props.options,
        });
      }

    }

    componentDidUpdate = () => {
      let { initValue } = this.props;
      const { selectedDropDownValue } = this.state;
      if(typeof initValue === 'string') {
        initValue = initValue.trim();
      }
      if(initValue !== selectedDropDownValue) {
        this.setState({
          selectedDropDownValue: initValue,
        });
      }
    }

    // Generates optins array
    renderItems = () => {
    
      return this.state.dropdownItems.map((data, key) => {
        if(key === 0) { data.value = ''; }
        return (
          <option key={key} value={data.value}>{ data.label }</option>
        );
      });
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      // const { selectedDropDownValue } = this.state;
      this.setState({
        selectedDropDownValue: value,
      }, () =>{
        this.props.dropdownData(value, name);
      });
    }

    render() {
      const key = this.props.id || 0;
      return (
        <div>
          
          {/* State {this.state.selectedDropDownValue} value
        Props {this.props.initValue} Value */}

          {/*  {this.props.required ?
            <select className="form-control" name={key} onChange={this.handleChange} value={this.state.selectedDropDownValue} required>
              {this.renderItems()}
            </select>
            :
            <select className="form-control" name={key} onChange={this.handleChange} value={this.state.selectedDropDownValue} >
              {this.renderItems()}
            </select>} */}

          {
            this.props.required ? (this.props.disabled ? <select className="form-control" name={key} onChange={this.handleChange} value={this.state.selectedDropDownValue} required disabled>
              {this.renderItems()}
            </select> 
              : 
              <select className="form-control" name={key} onChange={this.handleChange} value={this.state.selectedDropDownValue} required>
                {this.renderItems()}
              </select>)

              :
            
              this.props.disabled ?   <select className="form-control" name={key} onChange={this.handleChange} value={this.state.selectedDropDownValue} disabled>
                {this.renderItems()}
              </select> 
                :  
                <select className="form-control" name={key} onChange={this.handleChange} value={this.state.selectedDropDownValue} >
                  {this.renderItems()}
                </select>
          }
            
        </div>
      );
    }
}

Table.propTypes = {     
  children: PropTypes.element,
  dropdownData: PropTypes.func,
  id: PropTypes.string,
  initValue: PropTypes.any,
  required: PropTypes.bool,
};

export default Table;
