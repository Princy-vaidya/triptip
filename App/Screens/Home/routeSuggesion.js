import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { HEIGHT, WIDTH, FONT, COLORS } from '../../Utils/constants';
import RouteSuggesionCard from '../../Components/Home/routeSuggesionCard';
import {useNavigation, useRoute} from '@react-navigation/native'
import Network from '../../Services/Network';
import Loader from '../../Components/Common/Loader';
import AsyncStorage from '@react-native-community/async-storage';

export default function RouteSuggesion() {
  const route = useRoute()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [routeSuggest, setSuggest] = useState([])
  useEffect(() => {
    const waypoints = route.params ? route.params.selectedListItem : []
    const from_location = waypoints[waypoints.length - 1]
    const to_location = waypoints[0]
    console.log("WELL", from_location, to_location);
    if(from_location) {
    fetchSuggesions(from_location, to_location)
    }
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSuggesions()
    });
  }, [navigation])

  const fetchSuggesions = async (from_location, to_location) => {
    setLoading(true)
    const user = await AsyncStorage.getItem('@user')
    const token = JSON.parse(user).authtoken
    const postData = {
      from_location: JSON.stringify(from_location),
      to_location: JSON.stringify(to_location),
      token
    }
    Network('/route/route_list', 'post', postData).then(res => {
      setLoading(false)
      if(res.success){
        setSuggest(res.response.docs)
      }
    //  console.log("Res", res);
      
    }).catch(err => {
      setLoading(false)
    })
  }

  const RenderEmpty = () => (
    <View style={{marginTop: HEIGHT * 0.4, alignItems: 'center'}}>
      <Text style={styles.emptyText}>No saved route found !</Text>
    </View>
  )


  return (
    <View style={{alignItems: 'center'}}>
        <Loader loading={loading} />
          <FlatList
            horizontal={false}
            contentContainerStyle={styles.container}
            key={({item, i}) => i}
            keyExtractor={({item, i}) => i}
            data={routeSuggest}
            renderItem={({item}) => <RouteSuggesionCard item={item}/> }
            ListEmptyComponent={() => <RenderEmpty />}
          />
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 1,
    marginVertical: HEIGHT * 0.03,
    paddingHorizontal: WIDTH * 0.04
  },
  emptyText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.LARGE,
    color: COLORS.GRAY,
    textTransform: 'uppercase'
  }
})