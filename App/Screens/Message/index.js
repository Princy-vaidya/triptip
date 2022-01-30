import React,{useEffect, useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'


export default function Message() {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])
 
  return (
    <View style={styles.container}>
      
      <Text style={styles.link} onPress={() => navigation.navigate('Home')}>Go Back</Text>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // width: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    marginVertical: 30
  }
});
