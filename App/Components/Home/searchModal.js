import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, Image, TouchableOpacity, TouchableOpacityBase, KeyboardAvoidingView} from 'react-native';
import { COLORS, WIDTH, HEIGHT, FONT, GAP } from '../../Utils/constants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Slider from '@ptomasroos/react-native-multi-slider'
import Toast from 'react-native-root-toast';

export default function SearchModal({show, close, onSearch}) {
  const [radius, setRadius] = useState([10])
  const [location, setLocation] = useState({})

  const onSearchSave = () => {
    if(location.latitude) {
      console.log('lll',location)
     onSearch({location, radius})
    } else {
      Toast.show('Please enter location !')
    }
  }

  const googleLocation = (data, details) => {
    //console.log("LocationSelected", data, details);
    const locationData = {
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      name: details.formatted_address
    }
    setLocation(locationData)
  }

  return (
 
    <Modal
    animationType="slide"
    transparent={true}
    visible={show}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
    <View style={styles.centeredView}>
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.close} onPress={() => close()}>
         <Image style={styles.closeModalIcon} source={require('../../Assets/Home/cross.png')} />
        </TouchableOpacity>
        <Text style={styles.headText}>Search Criteria</Text>
        <View style={styles.content}>
        <View style={styles.radiusSlider}>
            <Slider
              containerStyle={{alignItems: 'center'}}
              trackStyle={{
                height: 5,
                backgroundColor: COLORS.GRAY,
                borderRadius: 10
              }}
              selectedStyle={{
                backgroundColor: COLORS.SECONDARY,
              }}
              values={radius}
              sliderLength={WIDTH * 0.69}
              onValuesChangeFinish={(val) => setRadius(val)}
              customMarker={() => (<View style={styles.marker}/>)}
              min={1}
              max={100}
              // onValuesChangeStart={sliderOneValuesChangeStart}
              // onValuesChange={sliderOneValuesChange}
              // onValuesChangeFinish={sliderOneValuesChangeFinish}
            />
            <View style={styles.sliderHead}>
              <Text style={styles.sliderText}>0 KM</Text>
              <Text style={styles.sliderText}>1000 KM</Text>
            </View>
          </View>
         <LocationSearch chooseLocation={(data, details) => googleLocation(data, details)}/>  
         <Text style={styles.infoText}>Enter any type of location Eg: City or place name etc</Text>
         <View style={styles.searchButton}>
            <TouchableOpacity onPress={onSearchSave} style={styles.button}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
         </View>  
        </View>
      </View>
      </KeyboardAvoidingView>
    </View>
  </Modal>
  );
}

const LocationSearch = ({chooseLocation}) => {
  return (
    <>
      <Text style={styles.label}>Location</Text>
      <GooglePlacesAutocomplete
        placeholder="Enter Your Location"
        onPress={(data, details = null) => {
         chooseLocation(data, details)
        }}
        currentLocation={false}
        currentLocationLabel="Current location"
        minLength={4}
        placeholderTextColor='#dad0d2'
        returnKeyType="done"
        fetchDetails={true}
        styles={{
          container: {
            width: '100%',
            marginBottom: 20,//0HEIGHT * 0.02,
          },
          listView: {
            position: 'absolute',
            top: HEIGHT * 0.055,
            left: -5,
          //width: 120,
            color: COLORS.WHITE,
            backgroundColor: COLORS.WHITE,
            width: '100%',
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
            borderBottomColor: COLORS.PRIMARY,
            padding: HEIGHT * 0.08,
            color: '#000',
            paddingLeft: 0,
            height: HEIGHT * 0.052,
            fontSize: FONT.SIZE.MEDIUM,
          }
        }}
        query={{
          key: 'AIzaSyDcZfnitFfPtLPAz1NoYC43c6AJMg7jrG0',
          language: 'en',
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c9baba96'
  },
  modalView: {
    alignSelf: 'center',
    width: WIDTH * 0.8,
    height: HEIGHT * 0.55,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    overflow: 'hidden'
  },
  closeModalIcon: {
    height: HEIGHT * 0.02,
    width: WIDTH * 0.04,
  },
  close: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 5,
    zIndex: 2
  },
  headText: {
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    textTransform: 'uppercase',
    textAlign: 'left',
    color: COLORS.PRIMARY,
    marginTop: HEIGHT * 0.03
  },
  locationText: {
    marginTop: 20,
    marginBottom: -10
  },
  radiusSlider: {
    //alignItems: 'center',
    marginTop: '10%'
  },
  sliderHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10
  },
  sliderText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.SMALL,
    color: COLORS.PRIMARY
  },
  label: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    marginLeft: '2.5%',
    marginTop: '8%',
    marginBottom: '-3%'
  },
  marker: {
    padding: 10, 
    borderRadius: 100, 
    backgroundColor: COLORS.SECONDARY,
    marginTop: 5
  },
  searchButton: {
    alignItems: 'center',
    marginTop: HEIGHT * 0.025,
    zIndex: -1
  },
  button: {
    width: WIDTH *0.7,
    padding: GAP.SMALL,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  },
  saveText: {
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.REGULAR,
    letterSpacing: 2
  },
  infoText: {
    fontSize: FONT.SIZE.SMALL,
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'center',
    marginTop: '20%',
    color: COLORS.SECONDARY,
    zIndex: -1
  }
})