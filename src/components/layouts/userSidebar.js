import React from 'react';
import { Grid , Header ,Dropdown,Image} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authentication';

class UserSideBar extends React.Component {
    state={
        user:this.props.user
    };
    handleSigout=()=>{
        this.props.signOut();
    }

    dropdownOptions=()=> [
        {
            key: "signout",
            text: <span onClick={this.handleSigout}>Sign Out</span>
        }
    ];
    
    render(){
        const { user }=this.state;
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
                                <Image src={user.photoURL} spaced="right" avatar />
                                {user.displayName}
                            </span>
                            } 
                            options={this.dropdownOptions()} />
                        </Header>
                    </Grid.Column>
                </Grid>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        signOut:()=>dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(UserSideBar);