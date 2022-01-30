import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking} from 'react-native';
import { HEIGHT, WIDTH, COLORS, FONT } from '../../Utils/constants';
import moment from 'moment'
import {useNavigation} from '@react-navigation/native'

const FILTER_TODAY = 'today'
const FILTER_WEEK = 'week'
const FILTER_WEEKEND = 'weekend'
const FILTER_MONTH = 'month'

export default function EventsList({events, filter, activeFilter}) {
  const navigation = useNavigation()
  const openEventLink = (url) => {
    Linking.openURL(url)
  }
  const renderList = (item) => {
    if(item){
    return(
      <TouchableOpacity onPress={() => navigation.navigate('EventDetails', {item})} style={styles.listContainer}>
        <Image source={{uri:item && item.images[0].url}} style={styles.eventImage} />
          <View style={styles.eventContent}>
            <Text style={styles.dateTime}>{moment(item && item.dates.start.dateTime).format('LLLL')}</Text>
            <Text style={styles.name}>{item && item.name}</Text>
            <Text style={styles.address}>{item && item._embedded.venues[0].name}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button]}>
              <Text style={styles.btnText}>Interested</Text>
            </TouchableOpacity>
         
            <TouchableOpacity onPress={() => openEventLink(item.url)} style={{flex: 0.3}}>
               <Image source={require('../../Assets/share.png')} resizeMode="contain" style={{height: HEIGHT * 0.08, width: WIDTH * 0.1}}/>
            </TouchableOpacity>
          </View>
      </TouchableOpacity>
    )
    }
  }

  const filterEvents = (type) => {
    console.log("type", type);
    filter(type)
  }

  const Empty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No events found</Text>
    </View>
  )

  const RenderFilterBox = ({title, id}) => (
    <TouchableOpacity onPress={() => filterEvents(id)} style={[styles.fBox, activeFilter === id && {backgroundColor: COLORS.PRIMARY, color: COLORS.WHITE}]}>
      <Text style={[styles.btnText, activeFilter === id ? {color: COLORS.WHITE} : {color: 'gray'}]}>{title}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>Discover online Events</Text>
      <FlatList
        // contentContainerStyle={{height: HEIGHT * 0.3}}
        ListEmptyComponent={<Empty />}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={events}
        extraData={events}
        renderItem={({item}) => renderList(item)}
      />
      <View style={styles.filterContainer}>
        <Text style={[styles.headText]}>Events Nearby</Text>
       <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
        <RenderFilterBox id={FILTER_TODAY} title="Today" />
        <RenderFilterBox id={FILTER_WEEK} title="This week" />
        <RenderFilterBox id={FILTER_WEEKEND} title="This weekend" />
        <RenderFilterBox id={FILTER_MONTH} title="This month" />
       </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT * 0.8,
    width: WIDTH,
    marginTop: HEIGHT * 0.03,
    backgroundColor: COLORS.GRAY,
    zIndex: 99999,
    paddingHorizontal: WIDTH * 0.03
  },
  headText: {
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.EXTRALARGE,
    color: COLORS.WHITE,
    marginTop: -HEIGHT * 0.032
  },
  listContainer: {
    marginTop: HEIGHT * 0.02,
    // alignItems: 'center',
    height: HEIGHT * 0.45,
    width: WIDTH * 0.72,
    marginRight: WIDTH * 0.045,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  eventImage: {
    height: HEIGHT * 0.22,
    width: '100%'
  },
  eventContent: {
    marginHorizontal: HEIGHT * 0.02,
    marginTop: HEIGHT * 0.02,
    alignItems:'flex-start',
    height: HEIGHT * 0.11
  },
  dateTime: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    color: COLORS.PRIMARY,
    textAlign: 'left',
    marginBottom: HEIGHT * 0.007
  },
  name: {
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.EXTRALARGE,
    textAlign: 'left'
  },
  address: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.MEDIUM,
    textAlign: 'left',
    color: 'gray',
    marginTop: HEIGHT * 0.007
  },
  buttonContainer: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: HEIGHT * 0.016,
    marginRight: WIDTH * 0.05,

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    height: HEIGHT * 0.045,
    width: '60%',
    marginHorizontal: WIDTH * 0.04
  },
  btnText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    textTransform: 'uppercase'
  },
  empty: {
    alignSelf: 'center',
  //  alignItems: 'center',
  //  justifyContent: 'center',
  },
  emptyText: {
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.EXTRALARGE,
    color: COLORS.WHITE,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  filterContainer: {
   //marginTop: HEIGHT * 0.6,
    // backgroundColor: 'red',
    height: HEIGHT * 0.24,
    // flexDirection: 'row',
    alignItems: 'flex-start',

  },
  fBox: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: WIDTH * 0.02,
    marginVertical: HEIGHT * 0.01,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }
});
