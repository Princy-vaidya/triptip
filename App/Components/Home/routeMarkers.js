import React, {useRef, useState} from 'react';
import {Marker} from 'react-native-maps';
import {View, Text, StyleSheet, Image} from 'react-native';
import {GOOGLE_KEY, COLORS, WIDTH, GAP, FONT, HEIGHT} from '../../Utils/constants';
import {useNavigation} from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function RouteMarkers({data, region}) {
  let markerRef = useRef();
  const navigation = useNavigation();
  return (
    <>
      {data.length > 0 &&
        data.map((m, i) => {
          return (
            <Marker
              key={m.name}
              identifier={m.name}
              ref={(ref) => (markerRef = ref)}
              coordinate={m}
              stopPropagation={true}
              pinColor="red"
              title={m.name}
              //   onPress={}
            >
              <View style={styles.markerPoint}>
                  <FontAwesome5 
                    color={"black"} 
                    name='map-marker-alt' 
                    size={35}
                    />
                   
                </View>
                <View style={styles.routeNumber}>
                  <Text style={styles.routeNumberText}>{i + 1}</Text>
                </View>
            </Marker>
          );
        })}

      {region &&
          <Marker
            key={region.latitude}
            //identifier={region.latitude}
            coordinate={region}
            stopPropagation={true}
            pinColor="black"
            title={'my location'}
            //   onPress={}
          > 
          <Image source={require('../../Assets/car2.png')} style={styles.car} resizeMode="contain" />
          </Marker>
       }
    </>
  );
}

const styles = StyleSheet.create({
  marker: {
    padding: 10,
    // backgroundColor: 'red',
  },
  markerImage: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 2,
  },
  customMarkerImage: {
    height: 30,
    width: 25,
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    position: 'absolute',
    // top: 0,
    left: 30,
  },
  callout: {
    backgroundColor: COLORS.WHITE,

    width: WIDTH * 0.6,
    padding: GAP.SMALL,
    borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.6,
    // shadowRadius: 3.84,
    // elevation: 5
  },
  title: {
    color: COLORS.PRIMARY,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  address: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    textTransform: 'capitalize',
  },
  rating: {
    marginTop: 5,
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    textTransform: 'capitalize',
  },
  openNow: {
    color: 'green',
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.SMALL,
    textTransform: 'uppercase',
    marginTop: 10,
  },
  car: {
    height: 50,
    width: 50
  },
  markerPoint: {
    // borderRadius: 100, 
    marginTop: 60,
    marginRight: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  routeNumber: {
    position: 'absolute',
    backgroundColor: COLORS.SECONDARY,
    alignItems: 'center',
    height: HEIGHT * 0.027,
    width: HEIGHT * 0.025,
    justifyContent:'center',
    top: 45,
    left: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    // borderRadius: 30
  },
  routeNumberText: {
    // position: 'absolute',
    fontFamily: FONT.FAMILY.BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
  }
});
