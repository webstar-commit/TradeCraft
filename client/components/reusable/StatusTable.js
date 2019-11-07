import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TableDefaults } from '../../dictionary/constants';
import { defaultFilter } from '../../util/helpers';
import ReactTable from 'react-table';

class StatusTable extends React.Component {

  constructor(props) {
    super(props);
  }

  renderThead() {

    return this.props.thead.map((item, i) => {
      return (
        <td key={i}>
          <div className="th-image">
            {item}
          </div>
        </td>
      );
    });
  }

  renderTd(line, i) {
    return Object.values(line).map((item, j) => {
      let color;

      switch(item) {
        case 'flight ready':
          color = '#00fe00';
          break;

        case 'ready':
          color = '#00fe00';
          break;

        case 'off-line':
          color = '#ee1d23';
          break;

        case 'low':
          color = '#ee1d23';
          break;

        case '15p':
          color = '#00fe00';
          break;

        case '15k':
          color = '#00fe00';
          break;

        case '15o':
          color = '#ee1d23';
          break;

        case '15n':
          color = '#ee1d23';
          break;

        case 'air repair sup.':
          color = '#00fe00';
          break;

        default:
          color = '#84888a'
      }

      if(item =='view') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/eye_icon.png" />
          </td>
        )        
      }

      if(item =='update') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/eye_icon.png" onClick={this.props.fun} />
          </td>
        )        
      }

      else if(item =='detail') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/detail_icon.png" />
          </td>
        )        
      }

      else if(item =='email') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/email_icon.png" />
          </td>
        )        
      }
      else if(item =='export') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/export_icon.png" />
          </td>
        )        
      }

      else if(item =='edit') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/pen_icon.png" />
          </td>
        )        
      }
      else if(item =='del') {
        return (
          <td key={j} style={{color}} className="other-item">
            <img src="/assets/img/general/trash_icon.png" />
          </td>
        )        
      }

      else if(item =='check') {
        return (
          <td key={j} style={{color}}>
            <input type="checkbox" id={`checkbox${i}${j}`} name={`checkbox${i}{j}`}/>
            <label htmlFor={`checkbox${i}${j}`}><span /></label>
          </td>
        )        
      }

      
        return (
          <td key={j} style={{color}}>
            {item}
          </td>
        )  
      
    });
  }

  renderLines() {

    return this.props.lines.map((line, i) => {
      return (
        <tr className={`${i % 2 === 0 ? 'striped' : 'no-striped'} tr`} key={i}>
          {this.renderTd(line, i)}
        </tr>);
    });
  }

  render() {
    const { translations } = this.props;
    const { lines } = this.props;
    const pageSize = lines.length;
    console.log('lines len=> '+lines.length);
    return (
      <div>
        {/* <table className="table">
        <thead className="thead">
        <tr className="tr">
          {this.renderThead()}
        </tr>
        </thead>

        <tbody className="tbody">
          {this.renderLines()}
        </tbody>

      </table> */}

        <ReactTable
          data={lines}
          columns={this.props.thead}
          defaultPageSize={pageSize}
          // minRows={this.props.lines.length}
          className="-striped -highlight"
          filterable={false}
          showPageSizeOptions={false}
          showPagination={false}
          previousText="&#8678;"
          nextText="&#8680;"
          defaultFilterMethod={defaultFilter}
        />
      </div>

    );
  }
}

StatusTable.propTypes = {
  children: PropTypes.element,

};

export default StatusTable;
