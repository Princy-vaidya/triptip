import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  HEIGHT,
  WIDTH,
  GOOGLE_KEY,
  COLORS,
  FONT,
  WIKIDATA,
  WIKI_IMAGE_URL,
  FETCH_TITLE,
  FETCH_ARTICLE,
} from '../../Utils/constants';
import {fetchDistance, imageByWikiData} from '../../Services/api';
import {useSelector} from 'react-redux';
import { AirbnbRating} from 'react-native-ratings';
import * as Animatable from 'react-native-animatable';

export default function PlaceDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const location = useSelector((state) => state.location);
  const placeData = route.params.data ? route.params.data : null;
  const type = route.params.type ?? route.params.type;
  // const photoRef = placeData.photos && placeData.photos.length > 0 ? placeData.photos[0].photo_reference : ''
  // const image = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${GOOGLE_KEY}&maxwidth=${WIDTH}`;
  navigation.setOptions({
    headerTitle: placeData.name,
  });
  const [distance, setDistance] = useState(0);
  const [imageUri, setUri] = useState('');
  const [content, setContent] = useState('');
  const lat = placeData ? placeData.point.lat : '';
  const lng = placeData ? placeData.point.lon : '';
 const kinds = !type ? placeData.kinds.split(',') : [];

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const viewRoute = () => {
    navigation.navigate('Home', {
      coords: {latitude: lat, longitude: lng, name: placeData.name},
    });
  };

  useEffect(() => {
    console.log("TYPE1",  placeData);
    getDistance()

   if(type) {
    renderRestaurentData()
   } else {
     fetchExtraData();
   }
  }, []);

  const getDistance = () => {
    const {coords: {latitude, longitude}} = location;
    const origin = `${latitude},${longitude}`;
    const destination = `${lat},${lng}`;
    fetchDistance(origin, destination)
    .then((res) => {
      if (res.length > 0) {
        setDistance(res[0].elements[0].distance.text);
      }
    })
    .catch((error) => {
      console.log('error', error);
    });
  }

  const renderRestaurentData = () => {
    const {other} = placeData
    const mainImage = other.featured_image
    setUri(mainImage)
    // console.log("123", placeData.other.user_rating.aggregate_rating);
        
  }

  const fetchExtraData = async () => {
    const wikiData = placeData.wikidata;
    if (wikiData) {
      fetchArticleFromWiki(wikiData);
      imageByWikiData(wikiData).then(image => {
        setUri(image)
      })
    }
  };

  const fetchArticleFromWiki = (wikidata_code) => {
    fetch(`${FETCH_TITLE}${wikidata_code}`)
      .then((res) => res.json())
      .then((titles) => {
        console.log('Title', titles);
        if (titles) {
          const title = titles.entities[wikidata_code].sitelinks.enwiki.title;
          console.log('Title', title);
          fetch(`${FETCH_ARTICLE}${title}`)
            .then((res) => res.json())
            .then((article) => {
              if (article) {
                const page = article.query.pages;
                const pageId = Object.keys(page);
                const content = page[pageId[0]].extract;
                setContent(content);
              }
            });
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          imageUri
            ? {uri: imageUri}
            : require('../../Assets/Home/placeDefault.jpg')
        }
        style={styles.bannerImage}
      />
      <View style={styles.actionButtons}>
        <View style={styles.btnContainer}>
          <Image
            resizeMode="contain"
            source={require('../../Assets/Home/distance.png')}
            style={styles.btnImg}
          />
          <Text style={styles.btnText}>{distance==0?'NA':distance}</Text>
        </View>
        <View>
          <Text style={{color: 'lightgray'}}> || </Text>
        </View>
        <View style={styles.btnContainer}>
          <Image
            resizeMode="contain"
            source={require('../../Assets/Home/mappath.png')}
            style={styles.btnImg}
          />
          <Text onPress={viewRoute} style={styles.btnText}>
            View Route
          </Text>
        </View>
      </View>

      <View style={{height: '50%'}}>
      <ScrollView style={styles.content}>
        <Text style={styles.headText}>{placeData.name}</Text>

        <View style={styles.badgesContainer}>
          {kinds && kinds.length > 0
            ? kinds.map((type) => (
                <View
                  style={[styles.pill, {backgroundColor: COLORS.SECONDARY}]}>
                  <Text
                    style={[
                      styles.btnText,
                      {
                        color: COLORS.WHITE,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {type}
                  </Text>
                </View>
              ))
            : null}
        </View>

        {type&& <View style={styles.badgesContainer}>
          {placeData.typelist !=0 
            ? placeData.typelist.map((item) => (
                <View
                  style={[styles.pill, {backgroundColor: COLORS.SECONDARY}]}>
                  <Text
                    style={[
                      styles.btnText,
                      {
                        color: COLORS.WHITE,
                        textTransform: 'capitalize',
                      },
                    ]}>
                    {item}
                  </Text>
                </View>
              ))
            : null}
        </View>}

        <View
          style={styles.ratingContainer}>
          {/* <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>Place rating: </Text>
          <AirbnbRating
            count={5}
            fractions={3}
            reviews={['Terrible', 'Bad', 'OK', 'Good', 'Awesome']}
            defaultRating={!type ? placeData.rate:placeData.other}
            size={17}
            isDisabled={true}
            showRating={false}
          /> */}
          <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM,}]}>Place rating: <Text style={[styles.values]}>{!type ? placeData.rate:placeData.other}</Text> </Text>

        </View>
         {type &&
            <View>
               {/* <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>{placeData.other.cuisines}</Text> */}
               
               <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>User Rating : <Text style={styles.values}>{placeData.userRatingsTotal}</Text> </Text>
               
               {/* <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>Price for two:  <Text style={styles.values}>{placeData.other.average_cost_for_two}</Text> </Text>

               <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>Price range: <Text style={styles.values}>{placeData.other.price_range} / 5</Text></Text>
               
               <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>Currency: <Text style={styles.values}>{placeData.other.currency}</Text> </Text> */}

               <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>Address:</Text>
               <Text style={styles.values}>{placeData.address}</Text>

               {/* <Text style={[styles.headText, {fontSize: FONT.SIZE.MEDIUM}]}>Phone numbers: </Text>
               <Text style={styles.values}>{placeData.other.phone_numbers}</Text> */}

            </View>
          }
        {!type && <Text style={styles.headText}>About </Text>}
        <Animatable.Text animation="fadeInDown" style={[styles.btnText, {marginTop: 5, fontSize: FONT.SIZE.SMALL + 1}]}>{content}</Animatable.Text>
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerImage: {
    height: HEIGHT * 0.4,
    width: WIDTH,
  },
  actionButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: HEIGHT * 0.028,
    backgroundColor: COLORS.WHITE,
    borderRadius: 40,
    marginTop: -HEIGHT * 0.035,
    width: WIDTH * 0.75,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnImg: {
    width: WIDTH * 0.1,
    height: HEIGHT * 0.023,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
  },
  headText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.LARGE + 3,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: HEIGHT * 0.01
  },
  values: {
    color: COLORS.PRIMARY
  },
  content: {
    width: WIDTH,
    alignSelf: 'flex-start',
    paddingHorizontal: WIDTH * 0.06,
    marginTop: HEIGHT * 0.02,
    marginBottom: HEIGHT * 0.05,
    // overflow: 'hidden',
  },
  badgesContainer: {
    width: WIDTH * 0.95,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: HEIGHT * 0.02,
    // marginBottom: HEIGHT * 0.02
  },
  pill: {
    padding: HEIGHT * 0.005,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 30,
    marginRight: WIDTH * 0.01,
    marginVertical: HEIGHT * 0.007,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: HEIGHT * 0.007,
  }
});
