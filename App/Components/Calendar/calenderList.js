import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { HEIGHT, WIDTH, FONT, COLORS } from '../../Utils/constants';
import moment from 'moment'
import EventListCard from './eventListCard';



export default function CalenderList({events, selectedDay}) {
  console.log("DayTest",events);
  const isToday = moment(selectedDay).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
  let noEvent = true
  const [isEmpty, setEmpty] = useState(true)
 
  useEffect(() => {
    setEmpty(noEvent)
  }, [selectedDay])

  return (
    <View style={styles.container}>
      <View style={styles.day}>
        <Text style={styles.dayText}>{`${isToday ? "Today -" : ''}`} {moment(selectedDay).format(' LL')}</Text>
        <Image source={require('../../Assets/Home/eye2.png')} style={{height: HEIGHT * 0.09, width: WIDTH * 0.14, marginTop: -15}} resizeMode="contain" />
      </View>
     {events.map(event => {
       noEvent = false
       if(event.start_date == moment(selectedDay).format("YYYY-MM-DD")) {
        return(
         <>
           <EventListCard event={event}/>
         </>
       )}
     })}
     {events.length === 0 || isEmpty ?
      <View style={{alignItems: 'center'}}>
          <Text style={styles.emptyText}>No event or travel saved for this day.</Text>
      </View> : null
      } 
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH * 0.05,
    marginTop: HEIGHT * 0.035
  },
  day: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dayText: {
    alignItems: 'center',
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.REGULAR,
    color: 'gray'
  },
  emptyText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    marginTop: HEIGHT * 0.1,
    color: COLORS.GRAY,
    textTransform: 'uppercase'
  }
})