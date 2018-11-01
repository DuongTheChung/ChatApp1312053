import React from 'react';
import { Grid , Header ,Dropdown} from 'semantic-ui-react';

class UserSideBar extends React.Component {

    dropdownOptions=()=> [
        {
            key: "user",
            text: (
              <span>
                Signed in as <strong>user</strong>
              </span>
            ),
            disabled: true
          },
          {
            key: "avatar",
            text: <span>Change Avatar</span>
          },
          {
            key: "signout",
            text: <span>Sign Out</span>
          }
    ];
    
    render(){
            return(
                <Grid style={{background: "#4c3c4c"}}>
                    <Grid.Column>
                        <Grid.Row className="usergrid_row">
                            <Header inverted floated="left" as="h2">
                                <Header.Content>Nguoi dung</Header.Content>
                            </Header>
                        </Grid.Row>
                        <Header style={{padding:'0.25em'}} inverted  as="h4">
                            <Dropdown 
                            trigger={
                            <span> 
                                user
                            </span>
                            } 
                            options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Column>
                </Grid>
        )
    }
}

export default UserSideBar;