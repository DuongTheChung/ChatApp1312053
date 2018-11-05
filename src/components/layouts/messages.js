import React from 'react';
import { Segment , Comment } from 'semantic-ui-react';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';

class Messages extends React.Component{

    state={
        user:this.props.user
    }
    
    componentDidMount(){
        const { user }=this.state;
        if(user){
            this.displayMessage();
        }
    }

    displayMessage(){
        let loadMessages=[];
        
    }


    render(){
        const { user }=this.state;

        return(
            <React.Fragment>
                <MessageHeader />
                
                <Segment>

                    <Comment.Group className="messages">
                    </Comment.Group>
                </Segment>

                <MessageForm user={user} />
            </React.Fragment>
        )
    }
}



export default Messages;