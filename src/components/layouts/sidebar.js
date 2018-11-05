import React from "react";
import { Menu } from "semantic-ui-react";
import UserSidebar from "./UserSidebar";
import ListUsers from './ListUsers';

class SidePanel extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserSidebar user={user} />
        <ListUsers user={user} />
      </Menu>
    );
  }
}

export default SidePanel;
