import React from 'react';
import { Modal, Grid, Header, Form, Ref } from 'semantic-ui-react';

import FilePicker from './FilePicker.js';
export default class FilePickerModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    setFileUrl = (fileUrl) => {
      console.log("FileURL:", fileUrl);
      this.setState({fileUrl})
    }
    openModal() {
        this.setState({open: true})
    }
    closeModal() {
        this.setState({open: false})
    }

    render(){
        return <Modal onOpen={this.openModal}
                      open={this.state.open}
                      trigger={this.props.trigger}
                      onClose={this.closeModal}
                      closeIcon
                >
                  <Modal.Content>
                      <FilePicker onLoad={this.setFileUrl} closeModal={this.closeModal}/>
                  </Modal.Content>
              </Modal>
    }
}
