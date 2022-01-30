import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { COLORS, WIDTH, HEIGHT, FONT } from '../../Utils/constants';
import AsyncStorage from '@react-native-community/async-storage'

export default function DrawerComponent(props) {

  const [userMe, setUser] = useState(null)

  useEffect(() => {
    getUser()
  },[])

  const menuItems = [
    {title: 'Home', onPress: () => navigate('Home')},
    {title: 'Profile', onPress: () => alert('pending')},
    {title: 'My Routes', onPress: () => navigate('MyRoute')},
    {title: 'Create Route', onPress: () => alert('Home')},
    {title: 'My Messages', onPress: () => navigate('Message')},
    {title: 'My Calendar', onPress: () => navigate('Calendar')},
    {title: 'About Us', onPress: () => alert('pending')},
    {title: 'Terms & Condition', onPress: () => alert('pending')},
    {title: 'Logout', onPress: () => navigate('Settings')}
  ]

  const getUser = async() => {
    const userMe = await AsyncStorage.getItem('@user')
    if(userMe) {
      setUser(JSON.parse(userMe))
    }
  }

  const renderMenu = (title, onPress) => {
    return(
      <TouchableOpacity key={title} onPress={onPress} style={styles.menuItem}>
          <Text style={styles.name}>{title}</Text>
      </TouchableOpacity>
    )
  }

  const navigate = (path) => {
    props.navigation.navigate(path)
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <Image resizeMode="contain" source={require('../../Assets/Home/profileImg.png')} style={styles.pImage} />
        <Text style={styles.name}>{`${userMe && userMe.first_name} ${userMe && userMe.last_name}`}</Text>
        <Text style={styles.email}>{`${userMe && userMe.email}`}</Text>
      </View>
      <View style={styles.menu}>
        {menuItems.map(menu => (
         renderMenu(menu.title, menu.onPress)
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingTop: '15%'
  },
  profileImage: {
    alignItems: 'center'
  },
  pImage: {
    width: WIDTH * 0.35,
    height: HEIGHT * 0.22 
  },
  name: {
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    color: COLORS.WHITE,
    textAlign: 'center'
  },
  email: {
    fontSize: FONT.SIZE.SMALL,
    fontFamily: FONT.FAMILY.REGULAR,
    color: COLORS.WHITE,
    textAlign: 'center'
  },
  menu: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    marginHorizontal: WIDTH * 0.07,
    marginTop: '10%'
  },
  menuItem: {
    marginVertical: HEIGHT * 0.02
  }
})