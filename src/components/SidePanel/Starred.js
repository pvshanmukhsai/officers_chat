import React from "react";
import { connect } from "react-redux";
import firebase from "../../firebase";
import { setCurrentChannel, setPrivateChannel } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";

class Starred extends React.Component {
  state = {
    user: this.props.currentUser,
    starredChannels: [],
    activeChannel: "",
    usersRef: firebase.database().ref("users"),
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  componentWillUnmount() {
    this.removeListeners();
  }
  removeListeners = () => {
    this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
  };

  addListeners = (userId) => {
    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_added", (snap) => {
        const starredChannel = { id: snap.key, ...snap.val() };
        this.setState({
          starredChannels: [...this.state.starredChannels, starredChannel],
        });
      });

    this.state.usersRef
      .child(userId)
      .child("starred")
      .on("child_removed", (snap) => {
        const channelToRemove = { id: snap.key, ...snap.val() };
        const filteredChannels = this.state.starredChannels.filter(
          (channel) => {
            return channel.id !== channelToRemove.id;
          }
        );
        this.setState({ starredChannels: filteredChannels });
      });
  };

  changeChannel = (channel) => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };
  setActiveChannel = (channel) => {
    this.setState({ activeChannel: channel.id });
  };
  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        style={{ opacity: 0.7 }}
        name={channel.name}
        active={channel.id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ));
  render() {
    const { starredChannels } = this.state;
    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> Starred
          </span>{" "}
          ({starredChannels.length})
        </Menu.Item>
        {/*  Channels */}
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    );
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
