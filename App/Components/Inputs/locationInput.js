import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {HEIGHT, COLORS, WIDTH, FONT, GAP, GOOGLE_KEY} from '../../Utils/constants';
import * as Animatable from 'react-native-animatable';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

navigator.geolocation = require('@react-native-community/geolocation');

export default function LocationInput(props) {
  const {value, onChange } = props;
  console.log("Value", value);
  const [myLocation, setMyLocation] = useState('')
  
  useEffect(() => {
    if(value) {
      // onChange(value.toString())
      getLocationName()
    }
  }, [value]);

  const getLocationName = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.latitude},${value.longitude}&key=${GOOGLE_KEY}`)
    .then(res => res.json())
    .then(response => {
      if(response.status == 'OK') {
        // console.log("res", response);
        const address = response.results[0].formatted_address
        setMyLocation(address)
        chooseLocation(null, response.results[0])
      }  
    })
  }

  const chooseLocation = (data, details) => {
    console.log('value', details);
    let country = '';
    let zipcode = ''
    let city = ''
    let state = ''
    for (var i = 0; i < details.address_components.length; i++) {
      for (var j = 0; j < details.address_components[i].types.length; j++) {
        if (details.address_components[i].types[j] == "country") {
          country = details.address_components[i].long_name;
        }
        if (details.address_components[i].types[j] == "postal_code") {
          zipcode = details.address_components[i].long_name;
        }
        if (details.address_components[i].types[j] == "administrative_area_level_2") {
          city = details.address_components[i].long_name;
        }
        if (details.address_components[i].types[j] == "administrative_area_level_1") {
          state = details.address_components[i].long_name;
        }
      }
    }
    const locationData = {
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
      address: details.formatted_address,
      country,
      zipcode,
      city,
      state
    }

    onChange(JSON.stringify(locationData))
  //  console.log("LOCATION", locationData);
    
  };

  return (
    <>
      <Text style={styles.label}>Location</Text>
      <GooglePlacesAutocomplete
        placeholder={myLocation ? myLocation : "Enter Your Location"}
        onPress={(data, details = null) => {
         chooseLocation(data, details)
        }}
        currentLocation={false}
        currentLocationLabel="Current location"
        minLength={4}
        placeholderTextColor='#dad0d2'
        returnKeyType="done"
        fetchDetails={true}
        renderRightButton={() => (<View style={styles.iconContainer}>
          <Image resizeMode="contain" source={require('../../Assets/Auths/location.png')} style={styles.icon} />
        </View>)}
        styles={{
          container: {
            width: WIDTH * 0.90,
            marginBottom: HEIGHT * 0.02,
          },
          listView: {
            color: COLORS.WHITE,
            backgroundColor: COLORS.WHITE,
            width: WIDTH * 0.90,
          },
          textInputContainer: {
           padding: 1,
           borderWidth: 0,
           margin: 0,
           borderColor: 'transparent',
           backgroundColor: 'transparent',
           borderTopWidth: 0,
           borderBottomWidth: 0
          },
          textInput: {
            borderRadius: 0,
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderBottomColor: COLORS.WHITE,
            padding: HEIGHT * 0.08,
            color: COLORS.WHITE,
            paddingLeft: 0,
            height: HEIGHT * 0.052,
            fontSize: FONT.SIZE.MEDIUM,
          }
        }}
        query={{
          key: GOOGLE_KEY,
          language: 'en',
        }}
      />
      
    </>
  );
}

const styles = StyleSheet.create({
  containerMain: {
   // marginVertical: HEIGHT * 0.02,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: HEIGHT * 0.02
  },
  iconContainer: {
    position: 'absolute',
    //padding: HEIGHT * 0.03,
   // backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    right: 10,
   // top: 20
  },
  icon: {
    width: WIDTH * 0.065,
    height: HEIGHT * 0.027
  },
});
