import React from 'react';
import UserSideBar from './userSidebar';
import { Menu } from 'semantic-ui-react';

class SideBar extends React.Component {
    render(){
        const { user }=this.props;
        return(
            <Menu
                className="sidepannel"
                size="large"
                inverted
                fixed="left"
                vertical
                
            >
            <UserSideBar user={user}/>
            </Menu>
        )
    }
}

export default SideBar;
