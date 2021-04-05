import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

class FileModal extends React.Component {
  state = {
    file: null,
    authorized: ["image/jpeg", "image/png"],
  };

  addFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file: file });
    }
  };

  isAuthorized = (type) => {
    return this.state.authorized.includes(type);
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;
    if (file !== null) {
      if (this.isAuthorized(file.type)) {
        const metadata = { contentType: file.type };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      } else {
        console.log("Wrong file type");
      }
    }
  };
  clearFile = () => {
    this.setState({ file: null });
  };

  render() {
    const { modal, closeModal } = this.props;
    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header>Select an Image File</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            onChange={this.addFile}
            label="File Types: jpg,png"
            type="file"
            name="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.sendFile} inverted color="green">
            <Icon name="checkmark" />
            Send
          </Button>
          <Button inverted color="red" onClick={closeModal}>
            <Icon name="remove" />
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;
