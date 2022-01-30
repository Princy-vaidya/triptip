import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { HEIGHT, COLORS, FONT, WIDTH } from '../../Utils/constants';
import {useNavigation} from '@react-navigation/native'


export default function EventListCard({event}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Home', {
        screen: 'Home',
        params: {locations: event.locations, type: 'SUGGESION'},
      }) 
    } } style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headText}>{event.route_name}</Text>
        <View style={{flexDirection: 'row',}}>
         <Image source={require('../../Assets/Home/time.png')} style={{height: HEIGHT * 0.025, width: WIDTH * 0.045}} resizeMode="contain" />
         <Text style={styles.timeText}>{event.start_time}</Text>
         <Text style={styles.timeText}>({event.privacy})</Text>
        </View>
      </View>
      <Text style={styles.subText}>Saved for travel</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: HEIGHT * 0.032,
    width: '100%', 
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    marginBottom: HEIGHT * 0.03
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headText: {
    flex: 0.55,
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    flexWrap: 'wrap'
  },
  subText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
  },
  timeText: {
      fontFamily: FONT.FAMILY.REGULAR,
      fontSize: FONT.SIZE.SMALL,
      marginLeft: 5
  }
})