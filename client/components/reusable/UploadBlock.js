import React from 'react';
import PropTypes from 'prop-types';

class UploadBlock extends React.Component {

    constructor(props) {
        super(props);
    }

    selectFile = (i) => {
        let fileName = document.getElementById(`upload${i}`).files[0].name;
        document.getElementById(`filename${i}`).value = fileName;
    };

    renderFields() {

        return this.props.uploadFields.map((item, i) => {
            return (
                <div className="upload-line" key={i}>
                    <div>
                        {item.name}
                    </div>
                    <input className="pull-right" id={`filename${i}`} type="text" readOnly/>
                    <label className="fileContainer pull-right">
                        <div className="upload-field">
                            <div className="browse-button">
                                Browse...
                            </div>
                            <input type="file" id={`upload${i}`} onChange={() => this.selectFile(i)}/>
                        </div>
                    </label>
                </div>
            )
        });
    }

    render() {
        return (
            <div className="col-md-4 upload-block">
                <div className="upload-imagery">
                    <img src="/assets/img/admin/upload_1.png" alt=""/>
                    <div className="header-text">
                        upload imagery & datasheets
                    </div>
                    <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
                </div>
                <div className="upload-content">
                    <div className="col-md-12">
                        <div className="col-md-4">Photo Image</div>
                        <div className="col-md-8"><input type="file" className="custom-file-input"/></div>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-4">Document</div>
                        <div className="col-md-8"><input type="file" className="custom-file-input"/></div>
                    </div>
                </div>

                {/* <div className="upload-imagery">
          <img src="/assets/img/admin/upload_1.png" alt=""/>
          <div className="header-text">
            upload imagery & datasheets
          </div>
          <img className="mirrored-X-image" src="/assets/img/admin/upload_1.png" alt=""/>
        </div>
        <div className="upload-content">
          {this.renderFields()}
        </div>*/}
            </div>
        );
    }
}

UploadBlock.propTypes = {
    children: PropTypes.element,

};

export default UploadBlock;
