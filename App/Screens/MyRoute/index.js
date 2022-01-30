import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, FlatList} from 'react-native';
import { HEIGHT, WIDTH, FONT, COLORS } from '../../Utils/constants';
import RouteSuggesionCard from '../../Components/Home/routeSuggesionCard';
import Network from '../../Services/Network';
import Loader from '../../Components/Common/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native'
import Toast from 'react-native-root-toast';

export default function MyRoutes() {
  const navigation = useNavigation()
  navigation.setOptions({
      headerLeft: () => (
          <TouchableOpacity onPress={() =>  navigation.toggleDrawer()}>
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
  const [loading, setLoading] = useState(false)
  const [myRoutes, setMyoutes] = useState([])

  useEffect(() => { 
    // fetchMyRoute()   
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMyRoute()
    });

  }, [navigation])

  const fetchMyRoute = async () => {
    setLoading(true)
    const user = await AsyncStorage.getItem('@user')
    const token = JSON.parse(user).authtoken

    const postData = {
      token
    }
    Network('/route/self_route_list', 'post', postData).then(res => {
      setLoading(false)
      if(res.success) {
        setMyoutes(res.response.docs)
      } else {
        Toast.show(res.message)
      }    
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
          data={myRoutes}
          renderItem={({item}) => <RouteSuggesionCard type="myroute" item={item}/> }
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