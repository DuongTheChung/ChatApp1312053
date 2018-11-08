import React, { Component } from 'react';
import { Segment, Button ,Input } from 'semantic-ui-react';
import { withFirebase } from 'react-redux-firebase';

class MessageForm extends Component {

    state={
        firebase:this.props.firebase,
        message: "",
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        loading: false,
        errors: [],
    }

    handleChange=event=>{
        this.setState({[event.target.name]:event.target.value});
    }

    createMessage = () => {
        const message = {
          timestamp: this.state.firebase.database.ServerValue.TIMESTAMP,
          user: {
            id: this.state.user.uid,
            name: this.state.user.displayName,
            avatar: this.state.user.photoURL
          }
        };
        message["content"] = this.state.message;
        return message;
    };
    
    sendMessage = () => {
        const { getMessagesRef } = this.props;
        const { message, channel } = this.state;
    
        if (message) {
          if(channel==null){
            alert('No user to send message');
            return;
          }
          this.setState({ loading: true });
          getMessagesRef()
            .child(channel.id)
            .push()
            .set(this.createMessage())
            .then(() => {
              this.setState({ loading: false, message: "", errors: [] });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                loading: false,
                errors: this.state.errors.concat(err)
              });
            });
        } else {
          this.setState({
            errors: this.state.errors.concat({ message: "Add a message" })
          });
        }
    };

    
    render() {
        const { errors }=this.state;
        return (
            <Segment className="message_form">
                <Input
                    fluid
                    name="message"
                    style={{marginBottom:'0.7em'}}
                    label={<Button icon={'add'}/>}
                    labelPosition="left"
                    className={
                        errors.some(error => error.message.includes("message"))
                          ? "error"
                          : ""
                      }
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