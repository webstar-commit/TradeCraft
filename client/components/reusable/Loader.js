import React from 'react';
import PropTypes from 'prop-types';

class Loader extends React.Component {

    constructor(props){
		super(props);
	}

	render(){
        let loaderDiv = this.props.loading ? <div className="loading">Loading&#8230;</div> :'';
		return(
			<div>
				      {loaderDiv}
			</div>
		)
	}
}

Loader.propTypes = {
    children: PropTypes.element,
};

export default Loader;