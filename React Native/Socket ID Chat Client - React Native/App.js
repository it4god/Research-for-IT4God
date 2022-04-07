import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView } from 'react-native';
import io from "socket.io-client";
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import VideoPlayer from 'react-native-video-controls';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      messages: []
    };
  }
  onSend(messages = []) {

    this.socket.emit('chat', messages);
    this.setState({ chatMessage: '' });



  }

  componentDidMount() {
    this.socket = io("http://192.168.31.26:3000");
    this.socket.on("chat", msg => {
      console.log(msg)
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, msg),
      }))

    });
  } render() {

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3.5 }}>
          <VideoPlayer
            disableFullscreen={true}
            source={{ uri: 'https://asset.ref21.id/videos/857490c7-d1d7-42b3-bc15-ef57eb99b575/360p.m3u8' }}
          />
        </View>
        <View style={styles.container}>
          <GiftedChat
            style={{ flex: 1 }}
            renderInputToolbar={this.renderInputToolbar}
            renderSend={this.renderSend}
            alwaysShowSend={true}
            showUserAvatar={true}
            showAvatarForEveryMessage={true}
            renderUsernameOnMessage={true}

            messages={this.state.messages}
            listViewProps={{ styles: { backgroundColor: "black" } }}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 4,
              name: 'Laura Lee',
              avatar: 'https://placeimg.com/140/140/any',

            }}
          />
        </View>
      </View>
    );
  }
  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={{ borderTopColor: "#800000" }} />
  }
  renderSend(props) {
    return (
      <Send
        {...props}
      >
        <View style={{ marginRight: 10, marginBottom: 12 }}>
          <Text style={{ color: "#800000", fontSize: 20 }}>Send</Text>
        </View>
      </Send>
    );
  }
  submitChatMessage(messages) {


  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 6.5,
    backgroundColor: 'black',
    flexDirection: "column-reverse"
  },
});