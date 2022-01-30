import React,{useEffect} from 'react';
import {View, Text, Modal, StyleSheet, ImageBackground, Image, Alert, PermissionsAndroid, Platform } from 'react-native';
import { WIDTH, HEIGHT, COLORS, GAP, FONT } from '../../Utils/constants';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';

export default function AskLocationPop({modalVisible, close, getlocation, data}) {
  const navigation = useNavigation()
  useEffect(() => {
    if(data) {
      if(Platform.OS === 'android') {
        requestCameraPermission()
      } else {
        askLocationPermission()
      }
    }
  }, [data])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "This app need location permission to show maps",
          message:
            "Enable location permission" +
            "so you can use this app",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
        Geolocation.getCurrentPosition(location=> 
        getlocation(location));
        console.log('lat coords',location.coords)
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
    Geolocation.getCurrentPosition(info => console.log(info));
  };
  

  const askLocationPermission = async () => {
    try {
     await Geolocation.requestAuthorization();
     setTimeout(() => {
      Geolocation.getCurrentPosition((position, error) => {
        console.log("loc", position, error);
        
        if(!error) {
          getlocation(position)
        } else {  
          Alert.alert('Failed', 'Failed to fetch your location. Allow location access and try again',
          [
            { text: "Try again", onPress: () => askLocationPermission}    
          ],{ cancelable: false })
        }
      });
     }, 2000)
    } catch (err) {
      Alert.alert('Failed', 'Failed to fetch your location. Allow location access and try again',
      [
        { text: "Try again", onPress: () => askLocationPermission}    
      ],{ cancelable: false })
    }
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ImageBackground source={require('../../Assets/background.png')} style={styles.centeredView}>
          <View style={styles.content}>
            <Image source={require('../../Assets/logo.png')} resizeMode="contain" style={styles.logo}/>
            <Text style={styles.locationText}>Allow TripTip to access your location.</Text>
          </View>
          <Animatable.Text animation="fadeIn" iterationCount="infinite" easing="ease-in-out-circ" style={styles.animtext}>Fetching location...</Animatable.Text>
          {/* <Text style={styles.closeText} onPress={close}>Cancel</Text> */}
        </ImageBackground>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex:1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  content: {
    marginTop: HEIGHT * 0.12,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.LARGE,
    color: COLORS.PRIMARY,
    marginTop: '10%',
    textTransform: 'uppercase'
  },

  contentContainer: {
    position:'absolute',
    bottom: '8%'
  },
  logo: {
    width: WIDTH * 0.22,
    height: HEIGHT * 0.15,
    marginBottom: HEIGHT * 0.02
  },
  locationText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.EXTRALARGE + 2,
    color: COLORS.WHITE,
    textAlign: 'center',
    width: '80%',
    marginVertical: HEIGHT * 0.02
  },
  animtext: {
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.EXTRALARGE,
    textAlign: 'center',
    width: '80%',
    marginVertical: HEIGHT * 0.15
  }
})