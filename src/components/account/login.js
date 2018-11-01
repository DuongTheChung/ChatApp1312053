import React from 'react';
import { Grid, Form , Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link  } from 'react-router-dom';
import { connect } from 'react-redux';
import { signInWithGoogle } from '../../actions/authentication';

class Login extends React.Component{
    handleClick=()=>{
        this.props.signWithGoogle();
    }
    render(){
        return(
            <Grid textAlign="center" verticalAlign="middle" >
            <Grid.Column style={{maxWidth: 450 }}>
             <Header as="h1" icon color="violet" textAlign="center">
                 <Icon name="code branch" color="violet" />
                 Login for AppChat
             </Header>
             <Form size="large">
                 <Segment stacked>

                      <Form.Input 
                         fluid 
                         name="email" 
                         icon="mail" 
                         iconPosition="left" 
                         placeholder="Email Address" 
                         type="email"
                     />

                     <Form.Input 
                         fluid name="password" 
                         icon="user" 
                         iconPosition="left" 
                         placeholder="Password" 
                         type="password"
                     />
                     <Button  color="violet" size="large" >Submit</Button>
                     <Button onClick={this.handleClick} color="blue" size="large" >Login with Google</Button>     
                 </Segment>
             </Form>
             <Message>Don't have an account ?<Link to= "/register">Register</Link> </Message>
         </Grid.Column>
        </Grid>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        signWithGoogle:()=>dispatch(signInWithGoogle())
    }
}

export default connect(null,mapDispatchToProps)(Login);