import React from 'react';
import { Grid , Header ,Dropdown,Image} from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase'

class UserSideBar extends React.Component {
    state={
        firebase:this.props.firebase,
    };
    handleSigout=()=>{
        this.state.firebase
        .auth()
        .signOut()
        .then(() => console.log("signed out!"));
    }

    dropdownOptions=()=> [
        {
            key: "signout",
            text: <span onClick={this.handleSigout}>Sign Out</span>
        }
    ];
    
    render(){
        const { currentUser }=this.props;
            return(
                <Grid className="usergrid">
                    <Grid.Column>
                        <Grid.Row className="usergrid_row">
                            <Header inverted floated="left" as="h2">
                                <Header.Content>ChatApp</Header.Content>
                            </Header>
                        </Grid.Row>
                        <Header style={{padding:'0.25em'}} inverted  as="h4">
                            <Dropdown 
                            trigger={
                                <span>
                                    <Image src={currentUser.photoURL} spaced="right" avatar />
                                    {currentUser.displayName}
                                </span>
                            } 
                            options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Column>
                </Grid>
        )
    }
}


export default withFirebase(UserSideBar);