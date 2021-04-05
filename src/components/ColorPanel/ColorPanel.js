import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setColors } from "../../actions";
import { SliderPicker } from "react-color";
import {
  Button,
  Divider,
  Menu,
  Sidebar,
  Modal,
  Icon,
  Label,
  Segment,
  Header,
} from "semantic-ui-react";

class ColorPanel extends React.Component {
  state = {
    modal: false,
    primary: "",
    secondary: "",
    usersRef: firebase.database().ref("users"),
    user: this.props.currentUser,
    userColors: [],
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListener(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  removeListeners = () => {
    this.state.usersRef.child(`${this.state.user.uid}/colors`).off();
  };

  addListener = (userId) => {
    let userColors = [];
    this.state.usersRef.child(`${userId}/colors`).on("child_added", (snap) => {
      userColors.unshift(snap.val());
      this.setState({ userColors });
    });
  };

  handleSaveColors = () => {
    if (this.state.primary && this.state.secondary) {
      this.saveColors(this.state.primary, this.state.secondary);
    }
  };

  saveColors = (primary, secondary) => {
    this.state.usersRef
      .child(`${this.state.user.uid}/colors`)
      .push()
      .update({
        primary,
        secondary,
      })
      .then(() => {
        console.log("color added");
        this.closeModal();
      })
      .catch((err) => console.log(err));
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  handleChangePrimary = (color) => this.setState({ primary: color.hex });

  handleChangeSecondary = (color) => this.setState({ secondary: color.hex });

  displayUserColors = (colors) =>
    colors.length > 0 &&
    colors.map((color, id) => (
      <React.Fragment key={id}>
        <Divider />
        <div
          className="color__container"
          onClick={() => this.props.setColors(color.primary, color.secondary)}
        >
          <div className="color__square" style={{ background: color.primary }}>
            <div
              className="color__overlay"
              style={{ background: color.secondary }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    ));

  defaultUserColors = () => {
    const primaryColor = "4c3c4c";
    const secondaryColor = "#eee";
    return (
      <React.Fragment>
        <Divider />
        <div
          className="color__container"
          onClick={() => this.props.setColors(primaryColor, secondaryColor)}
        >
          <div className="color__square" style={{ background: primaryColor }}>
            <div
              className="color__overlay"
              style={{ background: secondaryColor }}
            ></div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    const { modal, primary, secondary, userColors } = this.state;
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button icon="add" size="small" color="blue" onClick={this.openModal} />
        {this.defaultUserColors()}
        {this.displayUserColors(userColors)}

        {/* ColorPicker Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Choose App Colors</Modal.Header>
          <Modal.Content>
            <Segment inverted>
              <Label content="primary" />
              <SliderPicker
                color={primary}
                onChange={this.handleChangePrimary}
              />
            </Segment>
            <Segment inverted>
              <Label content="secondary" />
              <SliderPicker
                color={secondary}
                onChange={this.handleChangeSecondary}
              />
            </Segment>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSaveColors}>
              <Icon name="checkmark" />
              Save Colors
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" />
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Sidebar>
    );
  }
}

export default connect(null, { setColors })(ColorPanel);
