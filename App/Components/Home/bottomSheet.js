import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Animated, Alert} from 'react-native';
import {HEIGHT, WIDTH, COLORS, FONT} from '../../Utils/constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../Common/Button';
import getDirections from 'react-native-google-maps-directions'
import {useNavigation} from '@react-navigation/native'
import SaveRoutePopup from './saveRoutePopup';
import Network from '../../Services/Network';
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Toast from 'react-native-root-toast';

export default function BottomSheet({onStartPress, onJouernyStope, onSave, onCancel, selectedListItem, wayPoints, showCard, isViewOnly, closeViewMood, viewCoords}) {
  const [showDatePicker, setDatePicker] = useState(false);
  const [showTimePicker, setTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [radioType, setRadio] = useState('Public');
  const [isStarted, setStart] = useState(false);
  const [popUpVisible, setPop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  //const [showCard, setShowCard] = useState(false)
  const [cardVisibility] = useState(new Animated.Value(HEIGHT * 7))
  const [topOptionCard] = useState(new Animated.Value(-HEIGHT * 2.5))

  const navigation = useNavigation()

  const toggleRadio = (type) => {
    setRadio(type);
  };

  const onDateChange = (value) => {
    setDate(value)
    setDatePicker(false)
  }

  const onChangeTime = (value) => {
    setTime(value)
    setTimePicker(false)
  }

  useEffect(() => {
    console.log("viewMood", isViewOnly);
    
    if(showCard === true) {
      showBottomSheet()
    } else {
      closeBottomSheet()
    }
    
  }, [showCard])

  const onStart = () => {
    // const data = {
    //   source: {
    //     latitude: selectedListItem.length > 0 ? selectedListItem[selectedListItem.length - 1].latitude : -33.8356372,
    //     longitude: selectedListItem.length > 0 ? selectedListItem[selectedListItem.length - 1].longitude : 18.6947617
    //   },
    //   destination: {
    //     latitude: selectedListItem.length > 0 ? selectedListItem[0].latitude : -33.8600024,
    //     longitude: selectedListItem.length > 0 ? selectedListItem[0].longitude : 18.697459
    //   },
    //   params: [{
    //       key: "travelmode",
    //       value: "driving"        // may be "walking", "bicycling" or "transit" as well
    //     },
    //     {
    //       key: "dir_action",
    //       value: "navigate"       // this instantly initializes navigation using the given travel mode
    //     }],
    //   waypoints: wayPoints
    // }
    // getDirections(data)
    setStart(true)
    onStartPress()
  }

  const onStop = () => {
    setStart(false)
    closeBottomSheet()
    Alert.alert('Jouerny stopped !', 'Thank you')
    onJouernyStope()
  }

  const closeBottomSheet = () => {
    Animated.timing(cardVisibility, {
      toValue: HEIGHT * 7,
      duration: 1000,
      useNativeDriver: false
    }).start();
    Animated.timing(topOptionCard, {
      toValue: -HEIGHT * 0.25,
      duration: 1000,
      useNativeDriver: false
    }).start();
    onCancel()
    setStart(false)
  }

  const showBottomSheet = () => {
    Animated.timing(cardVisibility, {
      toValue: HEIGHT * 0.45,
      duration: 1000,
      useNativeDriver: false
    }).start();
    Animated.timing(topOptionCard, {
      toValue: -HEIGHT * 0.065,
      duration: 1000,
      useNativeDriver: false
    }).start();
   // onCancel()
  }

  const onSaveRoute = () => {
    setPop(true)
  // onSave()
  }

  const saveThisRoute = async (data) => {
    setLoading(true)
    const user = await AsyncStorage.getItem('@user')
    const token = JSON.parse(user).authtoken
    const postData = {
      route_name: data.routeName,
      note: data.routeNote,
      waypoints: JSON.stringify(selectedListItem),
      is_active: true,
      privacy: radioType,
      start_date: date,
      start_time: time,
      rating
    }
    Network('/route/add_route', 'post', postData, token).then(res => {
      if(res.success) {
        setLoading(false)
        clearFields()
        setPop(false)
      } else {
        setLoading(false)
        Toast.show(res.message)
      }
    }).catch(err => {
      setLoading(false)
    })
  }

  const clearFields = () => {
    setRating(0)
  }

  const ratingCompleted  = (rating) => {
    setRating(rating)
  }
  // console.log("ViewMood". selectedListItem);
  

  return (
    <>
    <SaveRoutePopup visible={popUpVisible} loading={loading} onSaveRoute={(data) => saveThisRoute(data)} close={() => setPop(false) }/>
    {!isViewOnly && <Animated.View style={[styles.topOptionContainer, {top: topOptionCard}]}>
      <TouchableOpacity onPress={() => navigation.navigate('CurrentTravel')} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}>
         <Text style={styles.valuetext}>Current Travel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RouteSuggesion', {selectedListItem})} hitSlop={{top: 20, left: 20, bottom: 20, right: 20}} style={styles.valuetext}>
        <Text>Route Suggesion</Text>
      </TouchableOpacity>
     </Animated.View> }

    <Animated.View style={[styles.bottomSheet, {top: cardVisibility}, isViewOnly ? {height: HEIGHT * 0.2, top: HEIGHT * 0.565} : {}]}>
    {!isStarted && <View style={styles.ratingBox}>
      <Text style={styles.valuetext}>Rate route: </Text>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "OK", "Good", "Awesome"]}
        defaultRating={0}
        size={20}
        showRating={false}
        onFinishRating={ (rat) => ratingCompleted(rat)}
      />
      </View>}
      {!isStarted && !isViewOnly ? 
      <>
      <View style={styles.dateContainer}>
        <Text style={styles.textGray}>
          Start Date :{' '}
          <Text onPress={() => setDatePicker(true)} style={styles.valuetext}>
            {moment(date).format('LL')}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => setDatePicker(true)}>
          <Image
            resizeMode="contain"
            source={require('../../Assets/Home/calendar.png')}
            style={styles.icons}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          //onChange={(date) => onDateChange(date)}
          onConfirm={onDateChange}
          onCancel={() => setDatePicker(false)}
        />
      </View>
      <View style={[styles.dateContainer, {marginTop: 7}]}>
        <Text style={styles.textGray}>
          Start Time :{' '}
          <Text onPress={() => setTimePicker(true)} style={styles.valuetext}>
            {moment(time).format('hh:mm A')}
          </Text>
        </Text>
        <TouchableOpacity onPress={() => setTimePicker(true)}>
          <Image
            resizeMode="contain"
            source={require('../../Assets/Home/clock.png')}
            style={styles.icons}
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showTimePicker}
          mode="time"
          onConfirm={onChangeTime}
          onCancel={() => setTimePicker(false)}
        />
      </View>

      <View style={styles.radioButton}>
        <TouchableOpacity
          onPress={() => toggleRadio('Public')}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={
              radioType === 'Public'
                ? require('../../Assets/Home/selected.png')
                : require('../../Assets/Home/non_selected.png')
            }
            style={styles.radio}
          />
          <Text style={styles.valuetext}>Public</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toggleRadio('Private')}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            source={
              radioType === 'Private'
                ? require('../../Assets/Home/selected.png')
                : require('../../Assets/Home/non_selected.png')
            }
            style={styles.radio}
          />
          <Text style={styles.valuetext}>Private</Text>
        </TouchableOpacity>
        </View>
        </>
          : 
        //View mode source and destination
        isViewOnly ? 
        <View style={styles.viewOnly}>
          <Text style={[styles.valuetext, {marginVertical: 10}]}>From:    {viewCoords[1].name}</Text>
          <Text style={[styles.valuetext]}>Destination:    {viewCoords[0].name}</Text>
          </View>
        :
        <Text style={styles.journyStartText}>Journy started want to save this route ?</Text>
        }
      
      {/* View only buttons */}
      {isViewOnly ? 
        <View style={{marginBottom: -20}}>
          <Button title="Close" onPress={closeViewMood}/>
        </View>
        :
         <View style={styles.buttonContainer}>
         {!isStarted ? <View style={{flex: 0.45}}>
           <Button onPress={() => onStart()} title="Start" />
         </View> : 
         <View style={{flex: 0.45}}>
            <Button onPress={() => onStop()} title="STOP" />
         </View>
         }
         
         <View style={{flex: 0.45}}>
           <Button onPress={() => onSaveRoute()} title="Save" type="white" />
         </View>
         <TouchableOpacity onPress={() => closeBottomSheet()} style={styles.cancleButton}>
           <Text style={styles.croxText}>X</Text>
         </TouchableOpacity>
       </View>
      }
     
    </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    top: HEIGHT * 0.4,
    height: HEIGHT * 0.35,
    backgroundColor: COLORS.WHITE,
    zIndex: 999,
    padding: 10,
    //borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
  },
  ratingBox: {
    position: 'absolute',
    top: -HEIGHT * 0.04,
    alignSelf: 'center',
    width: WIDTH * 0.9,
    height: HEIGHT * 0.05,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: COLORS.WHITE,
    flexDirection: 'row'
  },
  dateContainer: {
    paddingHorizontal: WIDTH * 0.03,
    marginVertical: HEIGHT * 0.02,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: HEIGHT * 0.0,
  },
  textGray: {
    color: 'gray',
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
  },
  valuetext: {
    color: 'black',
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
  },
  icons: {
    height: HEIGHT * 0.03,
    width: WIDTH * 0.15,
  },
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: HEIGHT * 0.01,
  },
  radio: {
    height: HEIGHT * 0.035,
    width: WIDTH * 0.1,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: WIDTH * 0.035,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancleButton: {
    padding: 5, 
    height: HEIGHT * 0.06, 
    width: WIDTH * 0.12, 
    alignItems: 'center', 
    backgroundColor: COLORS.SECONDARY, 
    //borderRadius: 100,
    justifyContent: 'center'
  },
  croxText: {
    fontSize: FONT.SIZE.LARGE,
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.SEMI_BOLD
  },
  journyStartText: {
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.LARGE,
    color: COLORS.PRIMARY,
    marginVertical: HEIGHT * 0.04,
    textAlign: 'center',
    textTransform: 'uppercase'
  },

  topOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    top: -HEIGHT * 0.065,
    width: WIDTH * 0.9,
    padding: HEIGHT * 0.025,
    backgroundColor: COLORS.WHITE
  },
  viewOnly: {
   marginTop: -HEIGHT * 0.018,
   marginHorizontal: WIDTH * 0.01
  }
});
