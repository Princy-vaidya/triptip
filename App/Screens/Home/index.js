

import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  HEIGHT,
  COLORS,
  WIDTH,
  GOOGLE_KEY,
  PLACE_TYPE,
} from '../../Utils/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MapView from 'react-native-maps';
import MapHeader from '../../Components/Home/mapHeader';
import SearchBox from '../../Components/Home/searchBox';
import * as Animatable from 'react-native-animatable';
import { FetchNearbyPlaces, fetchEvents, fetchResturents ,fetchZomatoResturents} from '../../Services/api';
import Loader from '../../Components/Common/Loader';
import Markers from '../../Components/Home/markers';
import GradientButton from '../../Components/Common/gradientButton';
import MapViewDirections from 'react-native-maps-directions';
import Toast from 'react-native-root-toast';
import ListView from './listView';
import RouteMarkers from '../../Components/Home/routeMarkers';
import BottomSheet from '../../Components/Home/bottomSheet';
import Geolocation from '@react-native-community/geolocation';
import EventsList from '../../Components/Home/eventsList';
import { mapStyle } from '../../Components/Home/mapStyle';


const App = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let mapRef = useRef(null);
  const [markers, setMarkers] = useState([]);
  const [customMarkers, setCustomMarkers] = useState(null);
  const [type, setType] = useState(PLACE_TYPE.ATTRACTION);
  const [myLocation, setMyLocation] = useState({});
  const [radius, setRadius] = useState(10000);
  const [loading, setLoading] = useState(false);
  const [enableMarking, setEnableMarking] = useState(false);
  const [isListView, listViewStatus] = useState(false);
  const [render, setRender] = useState(false);
  const [selectedListItem, setSelectedListItem] = useState([]);
  const [showRoute, setShowRoute] = useState(false);
  const [wayPoints, setWayPoint] = useState([]);
  const [showBottomSheet, setShowSheet] = useState(false);
  const [watchID, setWatchId] = useState(null);
  const [followRegion, setFollowRegion] = useState(null);
  const [isShowingSuggestion, setShowSuggestion] = useState(false);
  const [viewCoords, setViewCoords] = useState([]);
  const [viewWayPoints] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventFilter, setEventFilter] = useState(null);
  const [locationName, setLocationName] = useState('Amsterdam,Europ');
  const [zomatoMarkers, setZomatoMarkers] = useState([]);


  let markerss = []
  let Hotelmarkers = []
  let Zomatomarker =[]

  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity onPress={toggleDrawer}>
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

  const location = useSelector((state) => state.location);
  useEffect(() => {
    console.log('my loc',myLocation.lat)
    if(!route.params) {
      const lat =
        typeof myLocation.lat != 'undefined' 
          ? myLocation.lat
          : location.coords.latitude;
      const lng =
        typeof myLocation.lng != 'undefined'
          ? myLocation.lng
          : location.coords.longitude;
      setMyLocation({lat, lng});
      //mapRef.current.fitToCoordinates({latitude: lat, longitude: lng}, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: true });
      fetchNearByData(lat, lng, type, radius);
    } else {
        if(route.params.type === "SUGGESION"){
          const locations = route.params.locations
          const sCoords = locations.map(l => (
            {latitude: l.coordinates[1], longitude: l.coordinates[0], name: l.name}
          ))
          // console.log("Scoords", sCoords);
          sCoords.map((item, i) => {
            if(i != 0 && i != sCoords.length -1){
              viewWayPoints.push(item)
            }
          })
          setViewCoords(sCoords)
          setShowSuggestion(true)
          moveAndFit(sCoords)
          if(selectedListItem.length === 0) 
            setShowSheet(true)
        } else {
          if(route.params.type === 'event') {
            setType(null)
          }
        const viewRoute = [{
          latitude: myLocation.lat ? myLocation.lat : location.coords.latitude,
          longitude: myLocation.lng ? myLocation.lng : location.coords.longitude,
          name: 'My location'
        }, {
          latitude: route.params.coords.latitude,
          longitude: route.params.coords.longitude,
          name: route.params.coords.name
        }]
        setSelectedListItem(viewRoute)
      }
        setShowRoute(true)
        listViewStatus(false)
        setEnableMarking(false)
        setShowSheet(true)
    }
  }, [route, navigation,locationName]);


  // const routeShowOnly = () => {
  //   console.log("FOCUSED", route.params);
  //   if(route.params.type === "SUGGESION"){
  //     console.log("SUGGESION", route.params);
  //     const locations = route.params.locations
  //     const sCoords = locations.map(l => (
  //       {latitude: l.coordinates[1], longitude: l.coordinates[0], name: l.name}
  //     ))
  //     // console.log("Scoords", sCoords);
  //     sCoords.map((item, i) => {
  //       if(i != 0 && i != sCoords.length -1){
  //         viewWayPoints.push(item)
  //       }
  //     })
  //     setViewCoords(sCoords)
  //     setShowSuggestion(true)
  //     moveAndFit(sCoords)
  //     if(selectedListItem.length === 0) 
  //       setShowSheet(true)

  //     setShowRoute(true)
  //     listViewStatus(false)
  //     setEnableMarking(false)
  //     setShowSheet(true)
      
  //   }
  // }

  const moveAndFit = (coords) => {
    if(coords)
    mapRef.current.animateToRegion(coords[0], 2000)
    setTimeout(() => {
      mapRef.current.fitToCoordinates(coords, { edgePadding: 
        {top: 40,
          right: 140,
          bottom: 250,
          left: 140}, animated: true
      })
    }, 1000)
  }

  const fitMarkers = () => {
    setTimeout(() => {
      mapRef.current.fitToCoordinates(markerss.map(m => ({latitude: m.point.lat, longitude: m.point.lon})),
       { edgePadding: 
       {top: 40,
         right: 40,
         bottom: 40,
         left: 40}, animated: true
     })
   }, 500)
  }

  const watchDriving = () => {
   const watch = Geolocation.watchPosition((position, error) => {
      if(!error) {
        const latlng = {
          latitude: position.coords.latitude, 
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }
        const head = position.coords.heading
        const altitude = position.coords.altitude
        setWatchId(watch)
       setFollowRegion(latlng)
       mapRef.current.animateCamera({pitch: 0.2, heading: head, altitude},1000)
      } else {  
        Alert.alert('Failed', 'Failed to fetch your location. Allow location access and try again',
        [
          { text: "Try again", onPress: () => askLocationPermission}    
        ],{ cancelable: false })
      }
    });
  }

  const fetchNearByData = (lat, lng, placeType, radius) => {
    setLoading(true);
    const myLocation = {lat, lng};
    FetchNearbyPlaces(myLocation, placeType, radius)
      .then((res) => {
        if(res) { 
          const allMarkers = markerss.concat(res)
          if(markers.length > 0) {
            setMarkers(res)
            markerss = allMarkers
          } else {
            setMarkers(res)
            markerss = res
          }
            setLoading(false);
            markerss.length > 0 && fitMarkers()
        } else { 
          setLoading(false);
          markerss.length > 0 && fitMarkers()
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error', error);
      });
  };

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const searchSelectLoction = async (filter) => {
    const {location, radius} = filter;
    console.log('location 1',location)

    setLocationName(location.name)
    setMyLocation({lat: location.latitude, lng: location.longitude});
    const area = radius[0] * 100;
    setRadius(area);
    const data = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.015 * 3,
      longitudeDelta: 0.0121 * 3,
    };
    mapRef.current.animateToRegion(data, 2000);
     fetchNearByData(location.latitude, location.longitude, type, area);
       fetchNearbyResturents(myLocation.lat, myLocation.lng)
    // fetchNearbyZomatoResturents(myLocation.lat, myLocation.lng, radius)
    // fetchNearbyResturents(location.coords.latitude, location.coords.longitude)
    //  setMarkers([data]
  };

  const changePlaceType = (type) => {
    setType(type);
    setMarkers([])
    if (type === PLACE_TYPE.EVENTS) {
      fetchNearbyEvents(myLocation.lat, myLocation.lng, radius);
    } else if(type === PLACE_TYPE.RESTAURANT) {
      fetchNearbyResturents(myLocation.lat, myLocation.lng)      // fetchNearbyZomatoResturents(myLocation.lat, myLocation.lng, radius)


    } else {
      setMarkers([])
      fetchNearByData(myLocation.lat, myLocation.lng, type, radius);
    }
  };

  const fetchNearbyResturents = async (lat,lng) => {
    setLoading(true)

    console.log('lat',lat);
    console.log('lng',lng);

    fetchResturents(lat,lng)
      .then(async (res) => {
        console.log('resaturants',res)
        Hotelmarkers = []


 if(res.results && res.results.length > 0){
          const hotels = res.results
          hotels && hotels.length > 0 ? 
            hotels.map(h => {
              const obj = {
                point: {
                  lat: h.geometry.location.lat,
                  lon: h.geometry.location.lng
                },
                name: h.name,
                other: h.rating,
                xid: h.place_id,
                typelist:h.types,
                userRatingsTotal:h.user_ratings_total,
                address:h.formatted_address
              }
              Hotelmarkers.push(obj)
            }) : ''
           
           await fetchResturents(lat,lng)
            .then((resMore) => {
              setLoading(false)
              if(resMore.results && resMore.results.length > 0){
                console.log("nextRes", resMore);
                const hotelsNext = resMore.results
                hotelsNext && hotelsNext.length > 0 ? 
                hotelsNext.map(h2 => {
                    const newobj = {
                      point: {
                        lat: h2.geometry.location.lat,
                        lon: h2.geometry.location.lng
                      },
                      name: h2.name,
                      other: h2.rating,
                      xid: h2.place_id,
                      typelist:h2.types,
                      userRatingsTotal:h2.user_ratings_total,
                      address:h2.formatted_address
                    }
                    Hotelmarkers.push(newobj)
                  }) : ''
                  console.log("MARK", Hotelmarkers);
                  markerss = Hotelmarkers
                setMarkers(Hotelmarkers)
                fitMarkers()
                
              }
            })

            fetchZomatoResturents(myLocation.lat, myLocation.lng)
            .then(async (res) => {
              Zomatomarker = []
              if(res.restaurants && res.restaurants.length > 0){
                const hotels = res.restaurants
                hotels && hotels.length > 0 ? 
                  hotels.map(h => {
                    const obj = {
                      point: {
                        lat: h.restaurant.location.latitude,
                        lon: h.restaurant.location.longitude
                      },
                      name: h.restaurant.name,
                      other: h.restaurant,
                      xid: h.restaurant.id
                    }
                     Zomatomarker.push(obj)
                  }) : ''
                 
                 await fetchZomatoResturents(myLocation.lat, myLocation.lng)
                  .then((resMore) => {
                    setLoading(false)
                    if(resMore.restaurants && resMore.restaurants.length > 0){
                      console.log("nextRes", resMore);
                      const hotelsNext = resMore.restaurants
                      hotelsNext && hotelsNext.length > 0 ? 
                      hotelsNext.map(h2 => {
                          const newobj = {
                            point: {
                              lat: h2.restaurant.location.latitude,
                              lon: h2.restaurant.location.longitude
                            },
                            name: h2.restaurant.name,
                            other: h2.restaurant,
                            xid: h2.restaurant.id
                          }
                           Zomatomarker.push(newobj)
                        }) : ''
                        console.log("MARKERS",  Zomatomarker);
                        markerss =Zomatomarker
                       setMarkers([...Hotelmarkers,...Zomatomarker])
                       console.log('markers.....',markers)
                       fitMarkers()
                    }
                  })
                // setEvents(res._embedded.events)
              } else {
                setEvents([])
              }
            })
            .catch((err) => {
              setLoading(false)
              Toast.show('Something went wrong !');
              console.log('erroe1',err)
            })
          // setEvents(res._embedded.events)
        } else {
          setEvents([])
        }
        
      })
      .catch((err) => {
        setLoading(false)
        Toast.show('Something went wrong !');
        console.log('erroe',err)
      });
  };

  const fetchNearbyZomatoResturents = async (lat, lng) => {
    setLoading(true)
    fetchZomatoResturents(lat, lng)
      .then(async (res) => {
        console.log('resaturants',res)
        Hotelmarkers = []
        // if(res.restaurants && res.restaurants.length > 0){
        //   const hotels = res.restaurants
        //   hotels && hotels.length > 0 ? 
        //     hotels.map(h => {
        //       const obj = {
        //         point: {
        //           lat: h.restaurant.location.latitude,
        //           lon: h.restaurant.location.longitude
        //         },
        //         name: h.restaurant.name,
        //         other: h.restaurant,
        //         xid: h.restaurant.id
        //       }
        //       Hotelmarkers.push(obj)
        //     }) : ''
           
        //    await fetchResturents(lat, lng, radius, 20)
        //     .then((resMore) => {
        //       setLoading(false)
        //       if(resMore.restaurants && resMore.restaurants.length > 0){
        //         console.log("nextRes", resMore);
        //         const hotelsNext = resMore.restaurants
        //         hotelsNext && hotelsNext.length > 0 ? 
        //         hotelsNext.map(h2 => {
        //             const newobj = {
        //               point: {
        //                 lat: h2.restaurant.location.latitude,
        //                 lon: h2.restaurant.location.longitude
        //               },
        //               name: h2.restaurant.name,
        //               other: h2.restaurant,
        //               xid: h2.restaurant.id
        //             }
        //             Hotelmarkers.push(newobj)
        //           }) : ''
        //           console.log("MARKERS", Hotelmarkers);
        //           markerss = Hotelmarkers
        //          setMarkers(Hotelmarkers)
        //          fitMarkers()
        //       }
        //     })
        //   // setEvents(res._embedded.events)
        // } else {
        //   setEvents([])
        // }
 if(res.results && res.results.length > 0){
          const hotels = res.results
          hotels && hotels.length > 0 ? 
            hotels.map(h => {
              const obj = {
                point: {
                  lat: h.geometry.location.lat,
                  lon: h.geometry.location.lng
                },
                name: h.name,
                other: h.rating,
                xid: h.place_id,
                typelist:h.types,
                userRatingsTotal:h.user_ratings_total,
                address:h.formatted_address
              }
              Hotelmarkers.push(obj)
            }) : ''
           
           await fetchZomatoResturents(lat, lng)
            .then((resMore) => {
              setLoading(false)
              if(resMore.results && resMore.results.length > 0){
                console.log("nextRes", resMore);
                const hotelsNext = resMore.results
                hotelsNext && hotelsNext.length > 0 ? 
                hotelsNext.map(h2 => {
                    const newobj = {
                      point: {
                        lat: h2.geometry.location.lat,
                        lon: h2.geometry.location.lng
                      },
                      name: h2.name,
                      other: h2.rating,
                      xid: h2.place_id,
                      typelist:h2.types,
                      userRatingsTotal:h2.user_ratings_total,
                      address:h2.formatted_address
                    }
                    Hotelmarkers.push(newobj)
                  }) : ''
                  console.log("MARKERS", Hotelmarkers);
                  markerss = Hotelmarkers
                 setMarkers(Hotelmarkers)
                 fitMarkers()
              }
            })
          // setEvents(res._embedded.events)
        } else {
          setEvents([])
        }
        
      })
      .catch((err) => {
        setLoading(false)
        Toast.show('Something went wrong !');
      });
  };


  const fetchNearbyEvents = (lat, lng, radius, startDate, endDate) => {
    setLoading(true)
    fetchEvents(lat, lng, radius, startDate, endDate)
      .then((res) => {
        setLoading(false)
        if(res._embedded){
          // console.log('Hello', res._embedded.events);
          setEvents(res._embedded.events)
        } else {
          setEvents([])
        }
      })
      .catch((err) => {
        setLoading(false)
        Toast.show('Something went wrong !');
      });
  };

  const dateFormater = (date) => {
    const isoString = date.toISOString()
    const split = isoString.split(':')
    const lastVal = split[split.length - 1]
    const toRemove = lastVal.split('.')[1]
    const edate = isoString.replace(`.${toRemove}`, '')
    return `${edate}Z`
  }

  const filterEvents = (type) => {
    setEventFilter(type)
    if(type === 'today') {
      const d = new Date()
      d.setDate(new Date().getDate()+1)
      const startDate = dateFormater(new Date())
      const endDate = dateFormater(d)
      fetchNearbyEvents(myLocation.lat, myLocation.lng, radius, startDate, endDate);
    } else if(type === 'week') {
      const startDate = dateFormater(new Date())
      const endDate = new Date()
      const weekDay = new Date().getDay()
      const daysToAdd = 6 - weekDay
      endDate.setDate(new Date().getDate()+daysToAdd)
      fetchNearbyEvents(myLocation.lat, myLocation.lng, radius, startDate, dateFormater(endDate));
    } else if(type === 'weekend') {
      const startDay = new Date()
      const endDay = new Date()
      startDay.setDate(startDay.getDate() + 4)
      endDay.setDate(endDay.getDate() + 6)
      console.log("WEEKEND", startDay, endDay);
      fetchNearbyEvents(myLocation.lat, myLocation.lng, radius, dateFormater(startDay), dateFormater(endDay));
    } else if(type === 'month') {
      const date = new Date()
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      console.log("1st day", firstDay, lastDay);
      fetchNearbyEvents(myLocation.lat, myLocation.lng, radius, dateFormater(firstDay), dateFormater(lastDay));
    }
  }

  const onMapPress = (e) => {
    // const coords = e.nativeEvent.coordinate;
    // const customMarker = {
    //   geometry: {
    //     location: {
    //       lat: coords.latitude,
    //       lng: coords.longitude,
    //     },
    //   },
    //   name: 'Marked',
    //   type: 'custom',
    // };
    // //let newMarkers = customMarkers.push(customMarker)
    // setCustomMarkers(customMarker);
  };

  const markingToggle = () => {
    setEnableMarking(!enableMarking);
  };

  const toggleListView = () => {
    setSelectedListItem([])
    listViewStatus(!isListView);
  };

  const viewRoute = () => {
   if(selectedListItem.length > 1) {
    selectedListItem.map((item, i) => {
      if(i != 0 && i != selectedListItem.length -1){
        wayPoints.push(item)
      }
    })
    setShowRoute(true)
    listViewStatus(false)
    setEnableMarking(false)
    setShowSheet(true)
    setTimeout(() => {
      mapRef.current.fitToCoordinates(selectedListItem.map(m => ({latitude: m.latitude, longitude: m.longitude})),
       { edgePadding: 
       {top: 40,
         right: 140,
         bottom: 350,
         left: 140}, animated: true
     })
   }, 2000)
   } else {
     Alert.alert('No route selected !')
   }
  };

  const markFromList = (place) => {    
    const {xid, name, point: {lat, lon}} = place
    if (enableMarking) {
      const elementsIndex = markers.findIndex((marker) => marker.xid == xid );
      if (markers[elementsIndex].isMarkerSelected) {
        markers[elementsIndex].isMarkerSelected = false;
        const removeIndex = selectedListItem.findIndex((item) => item.latitude === lat );
        selectedListItem.splice(removeIndex, 1);
        setSelectedListItem(selectedListItem)
      } else {
        markers[elementsIndex].isMarkerSelected = true;
        selectedListItem.push({latitude: lat, longitude: lon, name})
        setSelectedListItem(selectedListItem)
      }
      setMarkers(markers); //Updating the markers with additional key
      setRender(!render); //For re-rendering child component
    }
  };

  const onStartJourny = () => {
    // alert('started')
    watchDriving()
  }

  const onStopJourney = () => {
    Geolocation.clearWatch(watchID)
    // setFollowRegion({
    //   latitude: myLocation ? myLocation.lat : location.coords.latitude, 
    //   longitude: myLocation ? myLocation.lng : location.coords.longitude,
    //   latitudeDelta: 0.015,
    //   longitudeDelta: 0.0121,
    // })
    //setFollowRegion(null)
    fetchNearByData(myLocation.lat, myLocation.lng, type, radius);
  }

  const onSaveRoute = () => {
    // alert('save')
  }

  const onCancel = () => {
    setShowRoute(false)
    listViewStatus(false)
    setEnableMarking(false)
    setSelectedListItem([])
    setShowSheet(false)
  }

  const closeViewMood = () => {
    setShowSuggestion(false)
    setViewCoords([])
    if(selectedListItem.length > 0) {
      mapRef.current.fitToCoordinates(selectedListItem, { edgePadding: 
        {top: 40,
          right: 140,
          bottom: 350,
          left: 140}, animated: true
      })
    } else {
      setShowSheet(false)
    }
  }

  // const drawSource = isShowingSuggestion ? viewCoords[0] : {latitude: selectedListItem[selectedListItem.length - 1].latitude, longitude: selectedListItem[selectedListItem.length - 1].longitude }
  // const drawDest = isShowingSuggestion ? viewCoords[1] : { latitude: selectedListItem[0].latitude, longitude: selectedListItem[0].longitude}
  
  return (
    <>
      <View style={styles.container}>
        {/* <Loader loading={loading} /> */}
        <MapHeader activeType={type} changeType={(type) => changePlaceType(type)} disabled={showBottomSheet} />
        {!isListView && !showBottomSheet && type !== PLACE_TYPE.EVENTS ? 
          <Animatable.View animation="bounceIn" style={styles.searchBox}>
            <SearchBox chooseLocation={(filter) => searchSelectLoction(filter)} />
          </Animatable.View> : null
        }
        <View>
          <MapView
            ref={mapRef}
            provider="google"
            style={styles.mapView}
            initialRegion={{
              latitude: myLocation ? myLocation.lat : location.coords.latitude, 
              longitude: myLocation ? myLocation.lng : location.coords.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}  
           // region={followRegion ? followRegion : {}}
            showsIndoors={true}
            showsUserLocation={false}
            followsUserLocation={true}
            showsMyLocationButton={false}
            customMapStyle={mapStyle}
            showsBuildings={false}
            showsTraffic={false}
            onPress={onMapPress}>
            {(selectedListItem.length > 0 || viewCoords.length > 0) && showRoute ?
              <RouteMarkers data={isShowingSuggestion ? viewCoords : selectedListItem} region={followRegion}/> :
              <Markers data={markers} type={type} enableMarking={enableMarking} markPlace={(place) => markFromList(place)} /> }
            {(selectedListItem.length > 0 || viewCoords.length > 0) && showRoute ?
              <MapViewDirections
                origin={isShowingSuggestion ? viewCoords[0] : {latitude: selectedListItem[selectedListItem.length - 1].latitude, longitude: selectedListItem[selectedListItem.length - 1].longitude }}
                destination={isShowingSuggestion ? viewCoords[1] : { latitude: selectedListItem[0].latitude, longitude: selectedListItem[0].longitude}}
                apikey={GOOGLE_KEY}
                strokeWidth={5}
                strokeColor={COLORS.SECONDARY}
                waypoints={isShowingSuggestion ? viewWayPoints : wayPoints}
                onError={(err) => {
                  Alert.alert('Route not found !', 'There are no route available fot the location')
                }}
            /> : null }
          </MapView>

          {isListView && (
            <Animatable.View animation="fadeInUpBig" style={styles.listView}>
              <ListView
                markPlace={(id) => markFromList(id)}
                places={markers}
                render={render}
                type={type}
              />
            </Animatable.View>
          )}

          {type === PLACE_TYPE.EVENTS &&
           <Animatable.View animation="fadeInUpBig" style={styles.listView}>
              <EventsList events={events ? events : []} filter={(type) => filterEvents(type)} activeFilter={eventFilter}/>
            </Animatable.View>
          }

        {!isShowingSuggestion && type !== PLACE_TYPE.EVENTS ?
        <>
          <TouchableOpacity onPress={toggleListView} style={[styles.listViewIcon]}>
            <Image resizeMode="contain"  source={
                isListView
                  ? require('../../Assets/Home/listiconon.png')
                  : require('../../Assets/Home/listiconoff.png')
              }
              style={styles.listViewIconImage}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={markingToggle} style={[styles.enableMarking, enableMarking ? {top: HEIGHT * 0.54} : {}]}>
            <Image resizeMode="contain" source={enableMarking ? require('../../Assets/Home/location_active.png'): require('../../Assets/Home/location_inactive.png')} style={styles.markingImage} />
          </TouchableOpacity>
          </> : null}

          {enableMarking && (
            <Animatable.View animation="bounceIn" style={styles.ViewRoute}>
              <GradientButton onPress={viewRoute} title="View Route" />
            </Animatable.View>
          )}
          
          <BottomSheet 
            onStartPress={() => onStartJourny()}
            onJouernyStope={() => onStopJourney()}
            onSave={ () => onSaveRoute()} 
            onCancel={() => onCancel()} 
            selectedListItem={selectedListItem}
            wayPoints={wayPoints}
            showCard = {showBottomSheet}
            isViewOnly={isShowingSuggestion}
            closeViewMood={() => closeViewMood()}
            viewCoords={viewCoords}
          /> 

        </View>
      </View>
    </> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    // paddingTop: GAP.MEDIUM,
    backgroundColor: COLORS.WHITE,
  },
  mapView: {
    flex: 1,
    height: HEIGHT * 0.78,
    ...StyleSheet.absoluteFillObject,
  },
  searchBox: {
    // height: HEIGHT * 8,
    position: 'absolute',
    top: HEIGHT * 0.06,
    alignItems: 'center',
    zIndex: 1,
    // backgroundColor: 'red'
  },
  listView: {
    // height: HEIGHT * 8,
    position: 'absolute',
    top: -HEIGHT * 0.07,
    alignItems: 'center',
    zIndex: 5,
    // backgroundColor: 'red'
  },
  enableMarking: {
    position: 'absolute',
    top: HEIGHT * 0.56,
    right: '5%',
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
  },
  listViewIcon: {
    position: 'absolute',
    top: HEIGHT * 0.42,
    right: '6%',
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
    //backgroundColor: 'red'
  },
  ViewRoute: {
    position: 'absolute',
    top: HEIGHT * 0.64,
    marginHorizontal: '5%',
    zIndex: 5,
    //right: '-5%'
  },
  markingImage: {
    height: HEIGHT * 0.09,
    width: WIDTH * 0.20,
    //marginTop: HEIGHT * 0.9
  },
  listViewIconImage: {
    height: HEIGHT * 0.11,
    width: WIDTH * 0.17,
  },
});

export default App;

