import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { HEIGHT, WIDTH } from '../Utils/constants';
import {loginUser, setLocation} from '../Redux/Actions/authAction'
import {useSelector, useDispatch} from 'react-redux'
import LocationModal from '../Components/AuthComponent/askLocationPop'

export default function Splash({navigation}) {
  const location = useSelector(state => state.location)
  const [visible, setVisible] = useState(false)
  const [renderLocation, setRender] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {    
    setTimeout(()=> {
      checkLogin()
    }, 1000)
  }, [])

  const checkLogin = async() => {
   // await AsyncStorage.removeItem('@user')
    const isSignin = await AsyncStorage.getItem('@user')
    if(!isSignin) {
      navigation.replace('Login')
    } else {
      if(!location) {
        setVisible(true)
        setRender(!renderLocation)
      }
      //await dispatch(loginUser(JSON.parse(isSignin)))
     // navigation.replace('Home')
    }
  }

  const getLocation = async(pos) => {
    const isSignin = await AsyncStorage.getItem('@user')
    dispatch(setLocation(pos))
    dispatch(loginUser(JSON.parse(isSignin)))
  }

  return (
    <ImageBackground resizeMode="cover" source={require('../Assets/Splash1.jpg')} style={styles.container}>
     <LocationModal modalVisible={visible} getlocation={(pos) => getLocation(pos)} close={() => setVisible(false)} data={renderLocation} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    width: WIDTH,
    justifyContent: 'center',
    alignItems: 'center'
  }
})