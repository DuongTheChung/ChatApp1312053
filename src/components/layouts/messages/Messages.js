import React from 'react';
import { Segment , Comment } from 'semantic-ui-react';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import { withFirebase } from 'react-redux-firebase';
import Message from './Message';


class Messages extends React.Component{
    state = {
        firebase:this.props.firebase,
        privateChannel: this.props.isPrivateChannel,
        privateMessagesRef: this.props.firebase.database().ref("privateMessages"),
        messagesRef: this.props.firebase.database().ref("messages"),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser
      };
    
    
    componentDidMount(){
        const { channel, user } = this.state;
        if (channel && user) {
          console.log(channel);
        this.addListeners(channel.id);
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
      };
    
      addMessageListener = channelId => {
        let loadedMessages = [];
        const ref = this.getMessagesRef();
        ref.child(channelId).on("child_added", snap => {
          loadedMessages.push(snap.val());
          this.setState({
            messages: loadedMessages,
            messagesLoading: false
          })
        });
      };
    
      getMessagesRef = () => {
        const { messagesRef, privateMessagesRef, privateChannel } = this.state;
        return privateChannel ? privateMessagesRef : messagesRef;
      };

  
      displayMessages = messages =>
        messages.length > 0 &&
        messages.map(message => (  
          <Message
            key={message.timestamp}
            message={message}
            user={this.state.user}
          />
        ));
    
        
      displayChannelName = channel => {
        return channel
        ? `${this.state.privateChannel ? "" : ""}${channel.name}`
        : "";
      };

              
      displayChannelAvatar = channel => {
        return channel
        ? `${this.state.privateChannel ? "" : ""}${channel.avatar}`
        : "";
      };



    render(){
        const { messagesRef,messages, channel, user, privateChannel }=this.state;

        return(
            <React.Fragment>
                <MessageHeader 
                    channelName={this.displayChannelName(channel)}
                    isPrivateChannel={privateChannel}
                    channelAvatar={this.displayChannelAvatar(channel)}
                />
                <Segment>
                  <Comment.Group className="messages">
                    {this.displayMessages(messages)}
                  </Comment.Group>
                </Segment>

                <MessageForm 
                   messagesRef={messagesRef}
                   currentChannel={channel}
                   currentUser={user}
                   isPrivateChannel={privateChannel}
                   getMessagesRef={this.getMessagesRef}
                />
            </React.Fragment>
        )
    }
}


export default withFirebase(Messages);