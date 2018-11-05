import React, { Component } from 'react';
import { Menu , Icon   }  from 'semantic-ui-react';
import { connect } from 'react-redux';

class ListUsers extends Component {
    state={
        user:this.props.user,
        users:[]
    }

    componentDidMount(){

    }
    
    render() {
        const { users }=this.state;
        return (
            <Menu.Menu className="menu">
            <Menu.Item>
              <span>
                <Icon name="mail" /> List user
              </span>{" "}
              ({users.length})
            </Menu.Item>
          </Menu.Menu>
        );
    }
}

export default ListUsers;