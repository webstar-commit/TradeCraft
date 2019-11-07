import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShortHeaderLine from './ShortHeaderLine';

class ButtonsBlock extends React.Component {
	constructor(props){
		super(props);
	}

	

	renderButtons(){
		return this.props.buttons.map((item, i) => {
	      	return (
		        <div className="menu-button" key={i}>
		          	<img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
		          	<button className="highlighted-button" onClick={() => this.props.cl(i)}>
		            	{item}
		          	</button>
		          	<img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
		        </div>
	      	)
	    })

	}

	render(){
		return(
			<div className="button-block">
				<div className="col-md-12">
					
				</div>
				<div className="col-md-12 " >
					<div className="config-buttons">
			    		{this.renderButtons()}
			    	</div>
			    </div>
			</div>
		)
	}

}

ButtonsBlock.propTypes = {
    children: PropTypes.element,
};

export default ButtonsBlock;