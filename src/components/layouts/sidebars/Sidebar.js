import React from "react";
import { Menu } from "semantic-ui-react";
import UserSidebar from "./UserSidebar";
import ListUsers from './ListUsers';
import { withFirebase } from 'react-redux-firebase';

class SideBar extends React.Component {
  render() {
    const { currentUser } = this.props;
    const usersRef =this.props.firebase.database().ref('users');
    const connectedRef= this.props.firebase.database().ref('.info/connected');
    const presenceRef=this.props.firebase.database().ref('presence');
    console.log(usersRef);
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserSidebar currentUser={currentUser} />
        <ListUsers currentUser={currentUser} usersRef={usersRef} connectedRef={connectedRef} presenceRef={presenceRef}/>
      </Menu>
    );
  }
}

export default withFirebase(SideBar);
