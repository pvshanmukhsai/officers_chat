import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const App = ({
  currentUser,
  currentChannel,
  isPrivateChannel,
  userPosts,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <Grid
      columns="equal"
      className="app"
      style={{ background: secondaryColor }}
    >
      <ColorPanel
        key={currentUser && currentUser.name}
        currentUser={currentUser}
      />
      <SidePanel
        key={currentUser && currentUser.uid}
        currentChannel={currentChannel}
        currentUser={currentUser}
        primaryColor={primaryColor}
      />
      <GridColumn style={{ marginLeft: 320 }}>
        <Messages
          key={currentChannel && currentChannel.id}
          currentUser={currentUser}
          currentChannel={currentChannel}
          isPrivateChannel={isPrivateChannel}
        />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPanel
          userPosts={userPosts}
          currentChannel={currentChannel}
          key={currentChannel && currentChannel.name}
          isPrivateChannel={isPrivateChannel}
        />
      </GridColumn>
    </Grid>
  );
};

const mapStatesToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    userPosts: state.channel.userPosts,
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor,
  };
};

export default connect(mapStatesToProps)(App);
