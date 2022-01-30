import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { HEIGHT, COLORS, FONT, WIDTH } from '../../Utils/constants';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native'

export default function RouteSuggesionCard({item,type}) {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headText}>{item.route_name}</Text>
        <View style={{flexDirection: 'row', flex: 0.45, }}>
          <AirbnbRating
            count={5}
            defaultRating={item.avg_rating}
            size={15}
            showRating={false}
            isDisabled={true}
          />
          <TouchableOpacity onPress={() => {
            if(type == 'myroute') {
            navigation.navigate('Home', {
              screen: 'Home',
              params: {locations: item.locations, type: 'SUGGESION'},
            }) 
          } else {
            navigation.navigate('Home', {locations: item.locations, type: 'SUGGESION'})
          }
          }}>
            <Image resizeMode="contain"  source={require('../../Assets/Home/eye.png')} style={{height: HEIGHT * 0.04, width: WIDTH * 0.07, marginLeft: WIDTH * 0.02}} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.subText}>{item.to.name}</Text>
    </View>
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
  }
})