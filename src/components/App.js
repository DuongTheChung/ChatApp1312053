import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import SideBar from './layouts/sidebars/Sidebar';
import Messages from './layouts/messages/Messages';
import { connect } from 'react-redux';

class App extends React.Component{
    render(){
        const { currentUser, currentChannel, isPrivateChannel }=this.props;
        return (
        <Grid columns="equal" className="app" >
            <SideBar key={currentUser && currentUser.uid} currentUser={currentUser}  />
            <Grid.Column style={{ marginLeft: 320 }} >
                <Messages
                    key={currentChannel && currentChannel.id}
                    currentChannel={currentChannel}
                    currentUser={currentUser}
                    isPrivateChannel={isPrivateChannel}
                />
            </Grid.Column>
        </Grid>
        )
    }
}

const mapStateToProps=state=>({
    currentUser:state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(App);
