import React,{useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import CalendarScreen from '../../Components/Calendar/calendar';
import {useNavigation} from '@react-navigation/native';
import {WIDTH, HEIGHT, FONT, COLORS} from '../../Utils/constants';
import Loader from '../../Components/Common/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import CalenderList from '../../Components/Calendar/calenderList';
import moment from 'moment'

export default function MyCalendar() {
  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Image
          source={require('../../Assets/Home/menu.png')}
          resizeMode="contain"
          style={{
            width: WIDTH * 0.055,
            height: HEIGHT * 0.033,
            marginLeft: WIDTH * 0.043,
          }}
        />
      </TouchableOpacity>
    ),
  });
  const [myEvents, setMyEvents] = useState([])
  const [loading, setLoading] = useState(false)

  const [selectedDay, setSelectedDay] = useState(moment().format("YYYY-MM-DD"))
  useEffect(() => { 
    // fetchMyRoute()   
    const unsubscribe = navigation.addListener('focus', () => {
      const month = new Date()
      fetchMonthlyRoutes(month)
    });

  }, [navigation])

  const fetchMonthlyRoutes = async (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setLoading(true)
    const user = await AsyncStorage.getItem('@user')
    const token = JSON.parse(user).authtoken
    const postData = {
      startdate_from: firstDay,
      startdate_to: lastDay,
      token
    }

    Network('/route/self_route_list', 'post', postData).then(res => {
      setLoading(false)
      if(res.success) {
        setMyEvents(res.response.docs)
      } else {
        Toast.show(res.message)
      }    
    }).catch(err => {
      setLoading(false)
    })
  }

  const daySelect = (day) => {
    setSelectedDay(day.dateString)
  }

  const onMonthChange = (date) => {
    fetchMonthlyRoutes(date)
  }

  return (
    <ScrollView style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.topSection}>
        <Text style={styles.text}>Select Event</Text>
        <Text style={styles.text} onPress={() => navigation.navigate('Home')}>+ ADD</Text>
        {/* <Image source={} /> */}
      </View>
      
      <CalendarScreen events={myEvents} onDaySelect={(day) => daySelect(day)} monthChange={(date) => onMonthChange(date)}/>
      <CalenderList events={myEvents} selectedDay={selectedDay}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    justifyContent: 'space-between', 
    flexDirection: 'row', 
    marginHorizontal: WIDTH * 0.05, 
    marginVertical: 20,
    marginBottom: -10 
  },
  text: {
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.REGULAR,
    color: COLORS.SECONDARY
  }
});
