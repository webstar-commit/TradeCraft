import React from 'react';
import PropTypes from 'prop-types';

class ButtonsList extends React.Component {

    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
    }

    edit = () => {
        console.log('editing');
    };

    clear = () => {
        console.log('clear fields');
        /*if (confirm("Do you want to clear all data from this form?")) {
            let inputs = document.body.getElementsByTagName('input');
            for (let item of inputs) {
                item.value = '';
            }
        }*/
        this.props.resetFormData();

    };

    deletes = () => {
        console.log('deleting');
    };

    save = () => {
        console.log("save");
    };

    renderButtons() {
        let buttons = [
            {name: 'Edit', onClick: this.edit},
            {name: 'Clear', onClick: this.clear},
            {name: 'Delete', onClick: this.deletes},
            {name: 'Save', onClick: this.save},
        ];

        return buttons.map((item, i) => {
            return (
                <div className="menu-button" key={i}>
                    <img className="line" src="/assets/img/admin/edit_up.png" alt=""/>
                    <button className='highlighted-button' onClick={item.onClick}>
                        {item.name}
                    </button>
                    <img className="line mirrored-Y-image" src="/assets/img/admin/edit_up.png" alt=""/>
                </div>
            )
        })
    }

    render() {

        return (
            <div className="row action-buttons">
                {this.renderButtons()}
            </div>
        );
    }
}

ButtonsList.propTypes = {
    children: PropTypes.element,

};

export default ButtonsList;
