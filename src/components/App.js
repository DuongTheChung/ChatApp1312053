import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import SidePanel from './layouts/sidebar';
import Messages from './layouts/messages';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid columns="equal" className="app" >
        <SidePanel />
        <Grid.Column style={{marginLeft:320}} >
        <Messages />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
