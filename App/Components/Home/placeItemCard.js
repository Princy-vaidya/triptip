import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { WIDTH, HEIGHT, COLORS, FONT, GOOGLE_KEY, PLACE_TYPE } from '../../Utils/constants';
import {useNavigation} from '@react-navigation/native'
import { imageByWikiData, articleByWikiData } from '../../Services/api';

export default function PlaceItemCard({place, markPlace, key, type}) {
  
  const navigation = useNavigation()  
  //const photoRef = place.photos ? place.photos[0].photo_reference : '';
  // const image = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${GOOGLE_KEY}&maxwidth=${200}`;
  const [image, setImage] = useState('')
  const [details, setDetails] = useState('')


  useEffect(() => {
    if(type === PLACE_TYPE.RESTAURANT) {
      const imageUrl = type === PLACE_TYPE.RESTAURANT ? place.other.featured_image : ''
      setImage(imageUrl)
    } else {
      imageByWikiData(place.wikidata).then(image => {
        setImage(image)
       })
       articleByWikiData(place.wikidata).then(article => {
        setDetails(article)
       })
    }
  }, [])
  

  return (
    <View key={key} style={styles.container}>
          <ImageBackground source={image ? {uri: image} : require('../../Assets/Home/placeDefault.jpg')} style={styles.image}>
          {/* <Image  /> */}
          <View style={styles.distance}>
            <Image source={require('../../Assets/Home/distance.png')} resizeMode="contain" style={{height: HEIGHT * 0.02, width: WIDTH * 0.035}} />
            {/* <Text style={styles.distanceText}>{(place.dist/ 1000).toFixed(1)} Km</Text> */}
          </View>
          <TouchableOpacity  activeOpacity={0.7} onPress={() => navigation.navigate('PlaceDetails', {data: place, type: type === PLACE_TYPE.RESTAURANT ? true : false})} style={styles.detailsNav}>
            <Image source={require('../../Assets/Home/arrow.png')} resizeMode="contain" style={{height: HEIGHT * 0.03, width: WIDTH * 0.085}} />
          </TouchableOpacity>
          </ImageBackground>  
       
     
      <View style={styles.content}>
        <View>
         <Text style={styles.headText}>{place.name}</Text>
         <Text numberOfLines={2}>{type === PLACE_TYPE.RESTAURANT ? place.other.location.address : details}</Text>
         {place.rate && <Text style={styles.rating}>Rating: <Text style={{color: COLORS.SECONDARY}}>{type === PLACE_TYPE.RESTAURANT ? place.other.user_rating.aggregate_rating : place.rate}/5</Text></Text>}
         {/* {place.opening_hours && place.opening_hours.open_now == true ? <Text style={styles.openNow}>Open Now</Text> : null} */}
        </View>

        <TouchableOpacity onPress={() => markPlace(place.xid)}>
          <Image source={place.isMarkerSelected ? require('../../Assets/Home/placeholderlocationon.png') : require('../../Assets/Home/placeholderlocation.png')} resizeMode="contain" style={{height: HEIGHT * 0.035, width: WIDTH * 0.075, marginLeft: -10}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  // padding: WIDTH * 0.04,
  // borderWidth: 2,
   borderRadius: 10,
   shadowColor: "#000",
   shadowOffset: {
     width: 1,
     height: 1,
   },
   shadowOpacity: 0.75,
   shadowRadius: 5.84,
   elevation: 5,
   marginVertical: 10,
   backgroundColor: COLORS.WHITE,
  },
  image: {
    height: HEIGHT * 0.2,
    width: '100%',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: WIDTH * 0.04
  },
  headText: {
    fontSize: FONT.SIZE.LARGE,
    fontFamily: FONT.FAMILY.BOLD,
    marginVertical: HEIGHT * 0.01
  },
  distance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    backgroundColor: '#b7b2b275',
    bottom: 15,
    left: 15,
    padding: 5,
    borderRadius: 5
  },
  distanceText: {
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    marginLeft: 5
  },
  detailsNav: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius: 5
  },
})