import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class NumBlock extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="num-block">
				<div className="block-header">
					{this.props.headerText}
				</div>
				<div className="block-value">
					{this.props.blockValue}
				</div>
			</div>
		);
	}
}

NumBlock.propTypes = {
  children: PropTypes.element,

};

export default NumBlock;