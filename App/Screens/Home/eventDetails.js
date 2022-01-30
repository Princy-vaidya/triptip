import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, StatusBar} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native'
import { HEIGHT, WIDTH, COLORS, FONT } from '../../Utils/constants';
import moment from 'moment'
import Button from '../../Components/Common/Button';
import { fetchDistance } from '../../Services/api';
import { useSelector } from 'react-redux';

export default function EventDetails() {
  const nav = useNavigation()
  const route = useRoute()
  const [event, setEvent] = useState(null)
  const [distance, setDistance] = useState('N/A')
  nav.setOptions({ headerTitle:  route.params.item.name})
  useEffect(() => {
    if(route.params){
      setEvent(route.params.item)
      fetchDistanceToVenue()
    }
  }, [route])

  const location = useSelector((state) => state.location);

  const fetchDistanceToVenue = () => {
    const {coords: {latitude,longitude}} = location
    const lat = event && event._embedded.venues[0].location.latitude
    const lng = event && event._embedded.venues[0].location.longitude
    fetchDistance(`${latitude}, ${longitude}`, `${lat}, ${lng}`).then(res => {
      if(res.length > 0) {
        setDistance(res[0].elements[0].distance.text)
      }
    }).catch(error => {
      console.log("error", error);
    })
  }

  const viewRoute = () => {
    const lat = event && event._embedded.venues[0].location.latitude
    const lng = event && event._embedded.venues[0].location.longitude
    const name = event && event._embedded.venues[0].address.line1
    nav.navigate('Home', {coords: {latitude: lat, longitude: lng, name}, type: 'event'})
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <Image source={{uri: event && event.images[0].url}} style={styles.banner} />
      <View style={styles.actionButtons}>
        <View style={styles.btnContainer}>
           <Image resizeMode="contain" source={require('../../Assets/Home/distance.png')} style={styles.btnImg} />
          <Text style={styles.btnText}>{event && distance}</Text>
        </View>
        <View>
          <Text style={{color: 'lightgray'}}>    || </Text>
        </View>
        <View style={styles.btnContainer}>
           <Image resizeMode="contain" source={require('../../Assets/Home/mappath.png')} style={styles.btnImg} />
           <Text onPress={viewRoute} style={styles.btnText}>View Route</Text>
        </View>
      </View>

      <Text style={styles.headText}>{event && event.name}</Text>
      <ScrollView style={styles.infoScroll}>
        <Text style={styles.infoText}>{event && event.info}</Text>
      </ScrollView>
      <Text style={styles.dateText}>Date: {event && moment(event.dates.start.dateTime).format('LL')}</Text>
      <Text style={styles.dateText}>Time: {event && moment(event.dates.start.dateTime).format('hh:mm a')}</Text>

      <Button title="Interested" width="80%" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
   // backgroundColor: 'gray',
  },
  banner: {
    height: HEIGHT * 0.35,
    width: WIDTH * 1
  },
  actionButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: HEIGHT * 0.028,
    backgroundColor: COLORS.WHITE,
    borderRadius: 40,
    marginTop: -HEIGHT * 0.035,
    width: WIDTH * 0.75,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnImg: {
    width: WIDTH * 0.1,
    height: HEIGHT * 0.023
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.MEDIUM,
  },
  infoText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.MEDIUM,
  },
  infoScroll: {
    maxHeight: HEIGHT * 0.2,
    marginHorizontal: WIDTH * 0.05,
    marginTop: HEIGHT * 0.025,
    marginBottom: HEIGHT * 0.01
  },
  headText: {
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.EXTRALARGE,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginHorizontal: WIDTH * 0.05,
    marginTop: HEIGHT * 0.02
  },
  dateText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginHorizontal: WIDTH * 0.05,
    marginVertical: HEIGHT * 0.01
  }
})
