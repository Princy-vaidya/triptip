import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {logoutUser} from '../../Redux/Actions/authAction'
import {useDispatch} from 'react-redux'
import { FONT, COLORS, GAP } from '../../Utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

export default function Settings() {
  const dispatch = useDispatch()

  const logout = async () => {
    await AsyncStorage.removeItem('@user')
    dispatch(logoutUser())
  }

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
      <Text style={styles.logoutText} onPress={logout}>Logout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    marginVertical: GAP.LARGE
  }
});
