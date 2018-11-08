import React from 'react';
import { Grid, Form , Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link  } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'

class Login extends React.Component{
    state={
        email: "",
        password: "",
        firebase:this.props.firebase,
        usersRef: this.props.firebase.database().ref("users"),
        errors: [],
        loading: false
    }

    displayErrors = errors =>
        errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /*Login with email vs password */
    handleClickWithEmailPass = event => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
        this.setState({ errors: [], loading: true });
        this.state.firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
            console.log(signedInUser);
            })
            .catch(err => {
            console.error(err);
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            });
            });
        }
    };
    
    /* Login with google */
    handleClickWithGoogle=()=>{
        var provider = new this.state.firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.setState({ errors: []});
        this.state.firebase
        .auth()
        .signInWithPopup(provider)
        .then((user)=>{
            this.saveUser(user).then(() => {
                console.log("user saved");
            });
        })
        .catch(err=>{
            this.setState({
                errors: this.state.errors.concat(err),
                loading: false
            });
        });
    }

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName))
        ? "error"
        : "";
    };

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
    });
    };

    render(){
        const {email, password, errors, loading }=this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" >
            <Grid.Column style={{maxWidth: 450 }}>
            <Header as="h1" icon color="violet" textAlign="center">
                <Icon name="user" color="violet" />
                Login for AppChat
            </Header>
            <Form size="large" >
                <Segment stacked>

                    <Form.Input 
                        fluid 
                        name="email" 
                        icon="mail" 
                        iconPosition="left" 
                        placeholder="Email Address" 
                        type="email"
                        onChange={this.handleChange}
                        value={email}
                        className={this.handleInputError(errors, "email")}
                    />

                    <Form.Input 
                        fluid name="password" 
                        icon="user" 
                        iconPosition="left" 
                        placeholder="Password" 
                        type="password"
                        onChange={this.handleChange}
                        value={password}
                        className={this.handleInputError(errors, "password")}
                    />

                    <Button.Group icon widths="2">
                        <Button
                            onClick={this.handleClickWithEmailPass}
                            disabled={loading}
                            className={loading ? "loading" : ""}
                            color="violet"
                            fluid
                            size="large"
                        >
                        Submit
                        </Button>
                        <Button
                            onClick={this.handleClickWithGoogle} 
                            color="blue" size="large" 
                        >
                        Login with Google
                        </Button>
                    </Button.Group>   
                </Segment>
            </Form>
            {errors.length > 0 && (
                <Message error>
                <h3>Error</h3>
                {this.displayErrors(errors)}
                </Message>
            )}
            <Message>Don't have an account ?<Link to= "/register">Register</Link> </Message>
        </Grid.Column>
        </Grid>
    )
    }
}

export default withFirebase(Login);