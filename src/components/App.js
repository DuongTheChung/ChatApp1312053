import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import SideBar from './layouts/Sidebar';
import Messages from './layouts/Messages';
import { connect } from 'react-redux';

class App extends React.Component{
    render(){
        const { user }=this.props;
        return (
        <Grid columns="equal" className="app" >
            <SideBar user={user} />
            <Grid.Column style={{marginLeft:320}} >
                <Messages user={user} />
            </Grid.Column>
        </Grid>
        )
    }
}

const mapStateToProps=state=>({
    user:state.user.currentUser
});

export default connect(mapStateToProps)(App);
