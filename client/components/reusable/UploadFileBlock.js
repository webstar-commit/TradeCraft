import PropTypes from 'prop-types';
import React from 'react';
import { showAlert } from '../../util/helpers';

/**
 * This is common reusable component for "Upload Imagery & Datasheets" section.
 */
class UploadFileBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            previewFile: {
                name: '',
                originalFile: null
            },
            editMode:false
        },
            this.handleSelectedFile = this.handleSelectedFile.bind(this);
            // Array To hold file names whose link will be hidden
            this.arrFilesNotShow = [];
    }


    componentWillMount() {
        this.setState({
            content: this.props.initstate,
        });
    }

    /**
     * This method is use for handle the selected file by browse.
     */
    handleSelectedFile = (event) => {
        const name = event.target.name;
        const id = event.target.id;
        const file = event.target.files[0];
        const extension = event.target.getAttribute('data-extension');

        this.arrFilesNotShow.push(name);
       
        // Size 5 Mb
        let fileSize = 5242880;
        let fileSizeToDisplay = '5 MB';

        // check extension of file if extension mentioned
        if(extension !== undefined && extension !== '' && extension !== null) {
            if(file.name.split('.').pop() !== extension){
                showAlert('Select a valid '+ extension+ ' File ');
                document.getElementById(id).value= null;
                return;
            }else{
                if(extension === 'kml')
                    {
                        // Size 2 Mb
                        fileSize = 2097152;
                        fileSizeToDisplay = '2 MB';
                    }
            }


        }
        if(file.size > fileSize){
            showAlert('File size should be less than '+fileSizeToDisplay);
            document.getElementById(id).value= null;
            if(this.props.isImagedRequired){
                this.updateContent(name, new File([""], ""));
            }
         }else {
            this.updateContent(name, file);
         };
    }

    componentDidUpdate() {
        const { initstate, editFetched } = this.props;

        if (editFetched) {
            this.setState({
                editMode: true
            });
            this.props.stopupd();
            this.setState({ content: initstate }, () => { this.props.data(this.state.content); });
      
          }

          const { clearit } = this.props;
          if (clearit) {
            this.setState({ content: [] });
            this.props.stopset();
          }
          
    }

    /**
     * This method is use for update the content state.
     * @param {*} name 
     * @param {*} file 
     */
    updateContent(name, file) {
        const { content } = this.state;
        const { previewFile } = this.state;
        this.setState({
            content: {
                ...content,
                [name]: file,
            },
            previewFile: {
                ...previewFile,
                name: name,
                originalFile: file
            }
        }, () => {
            this.props.data(this.state.content);
            this.props.previewFile(this.state.previewFile);
        });
    }

    renderFields() {
        const isEditRecord = this.props.isImagedRequired;
        //const {  showFile } = this.props;
        return this.props.fields.map((item, i) => {
            let input;
            let value = '';
            let showFileDownload = true;
            if (item.valFieldID !== undefined && this.state.content[item.valFieldID] !== undefined && this.state.content[item.valFieldID] !== null) {
                value = this.state.content[item.valFieldID];
              }

              if(this.arrFilesNotShow.indexOf(item.valFieldID) > -1) {
               showFileDownload = false;
              }
              
            switch (item.fileType) {
                case 'image':
                        input = (<div className="main-u">
                        <input type="file" id={`uploadFile_${i}`} className="hidden_input pull-right" name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} accept="image/*" />
                        <br/>
                        { value !== '' && showFileDownload ? <a className="name-link" href={value} target="_blank" >Show {item.name} </a> : ''}
                        </div>);
                    break;
                case 'file':
                if(item.required){
                        input = (<div className="main-u">
                            <input type="file" id={`uploadFile${i}`} className="hidden_input pull-right"  name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} required />
                            <br />
                            {value !== '' && showFileDownload ? <a href={value} target="_blank" className="name-link" >Download {item.name} </a> : ''}
                        </div>);
                }
                else{
                    input = (<div className="main-u">
                            <input type="file" id={`uploadFile${i}`} className="hidden_input pull-right"  name={item.valFieldID} onChange={this.handleSelectedFile.bind(this)} />
                            <br />
                            {value !== '' && showFileDownload ? <a href={value} target="_blank" className="name-link" >Download {item.name} </a> : ''}
                        </div>);
                }
                    break;
            }
            return (
                <div key={'elem' + i}>
                    <div>
                        {item.name}
                    </div>
                    {input}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="col-md-4 upload-block">
                <div className="upload-imagery">
                    <img src={this.props.headerLine} alt="" />
                    <div className="header-text">
                        {this.props.title}
                    </div>
                    <img className="mirrored-X-image" src={this.props.headerLine} alt="" />
                </div>
                <div className="upload-content">
                    {this.renderFields()}
                </div>
            </div>
        );
    }
}

UploadFileBlock.propTypes = {
    children: PropTypes.element,
};

export default UploadFileBlock;
