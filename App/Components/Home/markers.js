import React, {useRef, useState} from 'react';
import {Marker, Callout} from 'react-native-maps';
import {View, Text, StyleSheet, Image} from 'react-native';
import {GOOGLE_KEY, COLORS, WIDTH, GAP, FONT, PLACE_TYPE, PLACE_COLOR} from '../../Utils/constants';
import {useNavigation} from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Markers({data, enableMarking, markPlace, type}) {
  let markerRef = useRef();
  const [test, setTest] = useState(false);
  const navigation = useNavigation()

  return (
    <>
      {data &&
        data.map((m, i) => {
        //  const photoRef = m.photos ? m.photos[0].photo_reference : '';
          const location = {
            latitude: m.point.lat,
            longitude: m.point.lon,
          };
         
          //const image = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${GOOGLE_KEY}&maxwidth=${200}`;
          return (
            <Marker
              ref={(ref) => (markerRef = ref)}
              coordinate={location}
              stopPropagation={true}
              pinColor="red"
              title={m.name}
              identifier={m.xid}
              onPress={() => {
                if (enableMarking) {
                  if (m.scope == 'marked') {
                    m.scope = 'not-marked';
                  } else {
                    m.scope = 'marked';
                  }
                  markPlace(m)
                  setTest(!test);
                } else {
                  markerRef.hideCallout()
                  console.log('value',m )
                  navigation.navigate('PlaceDetails', {data: m, type: m.other ? true : false})
                }  
              }}>
              <View style={styles.marker}>
                 <View style={styles.markerPoint}>
                  <FontAwesome5 
                    color={PLACE_COLOR[type] ? PLACE_COLOR[type] : '#60bb60'} 
                    name='map-marker-alt' 
                    size={35}
                    />
                  </View>
                {/* <Image source={photoRef ? {uri: image} : require('../../Assets/Home/placeDefault.jpg')} style={[styles.markerImage, {borderColor: PLACE_COLOR[type]}]} /> */}
                {m.scope === 'marked' && (
                  <Image
                    resizeMode='contain'
                    source={require('../../Assets/Home/pin.png')}
                    style={styles.customMarkerImage}
                  />
                )}
              </View>
            </Marker>
          );
        })}
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    padding: 15,
    // backgroundColor: 'red',
  },
  markerPoint: {
    borderRadius: 100, 
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  markerImage: {
    height: 36,
    width: 36,
    borderRadius: 100,
    borderWidth: 2,
  },
  customMarkerImage: {
    height: 39,
    width: 29,
    borderColor: COLORS.WHITE,
    position: 'absolute',
    top: -4,
    left: 27
  },
  callout: {
    backgroundColor: COLORS.WHITE,
  
    width: WIDTH * 0.6,
    padding: GAP.SMALL,
    borderRadius: 10
  },
  title: {
    color: COLORS.PRIMARY,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    textTransform: 'capitalize',
    marginBottom: 5
  },
  address: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    textTransform: 'capitalize'
  },
  rating: {
    marginTop: 5,
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    textTransform: 'capitalize'
  },
  openNow: {
    color: 'green',
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.SMALL,
    textTransform: 'uppercase',
    marginTop: 10
  }
});
