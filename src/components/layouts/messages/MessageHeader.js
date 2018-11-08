import React, { Component } from 'react';
import { Header , Segment, Image } from 'semantic-ui-react';

class MessageHeader extends Component {
    render() {
        const { channelName ,channelAvatar} = this.props;
      
          return (
            <Segment clearing>
              <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
                <span>
                  {channelAvatar?<Image src={channelAvatar} spaced="right" avatar />:""}
                  {channelName}
                </span>
              </Header>
            </Segment>
          );
    }
}

export default MessageHeader;