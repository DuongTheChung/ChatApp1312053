import React from 'react';
import { Grid, Form , Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link  } from 'react-router-dom';

class Register extends React.Component{

    render(){
        return(
            <Grid textAlign="center" verticalAlign="middle" >
                   <Grid.Column style={{maxWidth: 450 }}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for AppChat
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input 
                                fluid 
                                name="username" 
                                icon="user" 
                                iconPosition="left" 
                                placeholder="Username" 
                                type="text"
                
                            />

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
                            <Form.Input 
                                fluid name="passwordConfirmation" 
                                icon="repeat" 
                                iconPosition="left" 
                                placeholder="Password Confirmation" 
                                type="password"
            
                            />
                            <Button color="orange" size="large" >Submit</Button>
                            
                        </Segment>
                    </Form>
                    <Message>Already a user ?<Link to= "/login">Login</Link> </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;