import React, { Component } from 'react';
import { Menu , Icon  ,Image, Input, Segment }  from 'semantic-ui-react';
import { setCurrentChannel, setPrivateChannel } from "../../../actions/index";
import { connect } from 'react-redux'

class ListUsers extends Component {
    state={
        activeChannel: "",
        user:this.props.currentUser,
        users:[],
        usersRef:this.props.usersRef,
        connectedRef:this.props.connectedRef,
        presenceRef:this.props.presenceRef,
        searchString: "",
        searchLoading: false,
        searchResults: []
    }

    componentDidMount(){
        if(this.state.user){
            this.addListteners(this.state.user.uid);
        }
    }

    addListteners=currentUserUid=>{
        let loadedUsers=[];
        this.state.usersRef.on("child_added", snap => {
            if (currentUserUid !== snap.key) {
              let user = snap.val();
              user["uid"] = snap.key;
              user["status"] = "offline";
              loadedUsers.push(user);  
              this.setState({ users: loadedUsers });       
            }
          });

          this.state.connectedRef.on("value", snap => {
            if (snap.val() === true) {
              const ref =  this.state.presenceRef.child(currentUserUid);
              ref.set(true);
              ref.onDisconnect().remove(err => {
                if (err !== null) {
                  console.error(err);
                }
              });
            }
          });
      
          this.state.presenceRef.on("child_added", snap => {
            if (currentUserUid !== snap.key) {
              this.addStatusToUser(snap.key);
            }
          });
      
          this.state.presenceRef.on("child_removed", snap => {
            if (currentUserUid !== snap.key) {
              this.addStatusToUser(snap.key, false);
            }
        });
    
    }

    addStatusToUser = (userId, connected = true) => {
        const updatedUsers = this.state.users.reduce((acc, user) => {
          if (user.uid === userId) {
            user["status"] = `${connected ? "online" : "offline"}`;
          }
          return acc.concat(user);
        }, []);
        this.setState({ users: updatedUsers });
    };
    
    isUserOnline = user => user.status === "online";

    changeChannel = user => {
        const channelId = this.getChannelId(user.uid);
        const channelData = {
          id: channelId,
          name: user.name,
          avatar:user.avatar
        };
        this.props.setCurrentChannel(channelData);
        this.props.setPrivateChannel(true);
        this.setActiveChannel(user.uid);
      };
    
      getChannelId = userId => {
        const currentUserId = this.state.user.uid;
        return userId < currentUserId
          ? `${userId}/${currentUserId}`
          : `${currentUserId}/${userId}`;
      };
    
      setActiveChannel = userId => {
        this.setState({ activeChannel: userId });
      };

      
      /*Search user with key word  */
      handleSearchChange = event => {
        this.setState(
          {
            searchString: event.target.value,
            searchLoading: true
          },
          () => this.handleSearchMessages()
        );
      };

      handleSearchMessages = () => {
        const usersSearch = [...this.state.users];
        const regex = new RegExp(this.state.searchString, "gi");
        const searchResults = usersSearch.reduce((acc, user) => {
          if (user.name && user.name.match(regex)) {
            acc.push(user);
          }
          return acc;
        }, []);
        this.setState({ searchResults });
        console.log(searchResults);
        setTimeout(() => this.setState({ searchLoading: false }), 1000);   
      };

    render() {
        const { users, activeChannel, searchString, searchResults, searchLoading }=this.state;
        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="user" /> Users
                    </span>{" "}
                    ({users.length})
                </Menu.Item>

                <Menu.Item>
                  <Input
                    loading={searchLoading}
                    onChange={this.handleSearchChange}
                    size="mini"
                    icon="search"
                    name="searchString"
                    placeholder="Search Messages"
                  />
                </Menu.Item>
                {searchString ?
                searchResults.map(user => (
                  <Menu.Item
                    key={user.uid}
                    active={user.uid === activeChannel}
                    onClick={() => this.changeChannel(user)}
                    style={{ opacity: 0.7, fontStyle: "italic" }}
                  >
                  <Image src={user.avatar} spaced="right" avatar />
                    <Icon
                    name="circle"
                    color={this.isUserOnline(user) ? "green" : "red"}
                    />
                    {user.name}
                  </Menu.Item>
                )):
                users.map(user => (
                  <Menu.Item
                    key={user.uid}
                    active={user.uid === activeChannel}
                    onClick={() => this.changeChannel(user)}
                    style={{ opacity: 0.7, fontStyle: "italic" }}
                  >
                  <Image src={user.avatar} spaced="right" avatar />
                    <Icon
                    name="circle"
                    color={this.isUserOnline(user) ? "green" : "red"}
                    />
                    {user.name}
                  </Menu.Item>
                ))}
          </Menu.Menu>
        );
    }
}

export default connect(
  null,
  { setCurrentChannel, setPrivateChannel }
)(ListUsers);
