import React, { Component } from 'react';
import { Segment, Button ,Input } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase'

class MessageForm extends Component {

    state={
        firebase:this.props.firebase,
        user:this.props.user,
        message:''
    }

    sendMessage=()=>{

    }

    handleChange=event=>{
        this.setState({[event.target.name]:event.target.value});
    }


    render() {
        return (
            <Segment className="message_form">
                <Input
                    fluid
                    name="message"
                    style={{marginBottom:'0.7em'}}
                    label={<Button icon={'add'}/>}
                    labelPosition="left"
                    placeholder="Write your message"
                    onChange={this.handleChange}
                />
                <Button.Group>
                    <Button
                        color="orange"
                        content="Add message"
                        labelPosition="left"
                        icon="edit"
                        onClick={this.sendMessage}
                    />
                </Button.Group>
            </Segment>
        );
    }
}
export default withFirebase(MessageForm);