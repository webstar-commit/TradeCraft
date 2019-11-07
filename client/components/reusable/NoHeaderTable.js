import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Table extends React.Component {

  constructor(props) {
    super(props);
  }


  renderTd(line) {
    return Object.values(line).map((item, i) => {
      let color;

      if (item == 'del'){
        return (
          <td key={i}>
            <img src="/assets/img/general/trash_icon.png"/>
          </td>
        )  
      }

      else{
        return (
          <td key={i} className="col-md-3">
            {item}
          </td>
        )
      }

    });
  }

  renderLines() {
    return this.props.lines.map((line, i) => {
      return (
        <tr className={`${i % 2 === 0 ? 'striped' : ''} tr`} key={i}>
          {this.renderTd(line)}
        </tr>)
    });
  }

  render() {
    return (
      <table className="table">
        <tbody className="tbody">
          {this.renderLines()}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  children: PropTypes.element,

};

export default Table;
