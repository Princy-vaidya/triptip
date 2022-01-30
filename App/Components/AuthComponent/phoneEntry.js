import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image} from 'react-native';
import CountryCodePicker from './countryCodePicker';
import { HEIGHT, GAP, COLORS, WIDTH, FONT } from '../../Utils/constants';

export default function PhoneEntry(props) {
  const {type, placeholder, value, onChange, icon, onBlur, keyboard, max, label, countryCode} = props
  return(
    <View>
      <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.phoneRow}>
        <View style={{flex: 0.2}}>
          <CountryCodePicker changeCode={(code) => countryCode(code)}/>
        </View>
      <View style={{flex: 0.8}}>
        <TextInput 
          style={styles.textInput}
          placeholderTextColor="#dad0d2"
          placeholder= {placeholder}
          secureTextEntry = {type === "password" ? true: false}
          onChangeText={(text) => onChange(text)}
          value = {value}
          onBlur={onBlur}
          keyboardType={keyboard ? keyboard : 'default'}
          maxLength={max}
        />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Image resizeMode="contain" source={icon} style={styles.icon} />
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  //  backgroundColor: '#b7014863', //COLORS.TRANSPARENT,
  //  borderRadius: 50,
    //margin: GAP.SMALL - 1,
    height: HEIGHT * 0.0658,
    marginVertical: GAP.SMALL,
    alignItems: 'flex-start',
    marginBottom: HEIGHT * 0.03
  },
  textInput: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
   // backgroundColor: 'red',
    padding: HEIGHT * 0.018,
    paddingLeft: 0,
    //width: WIDTH * 0.85,
  // borderWidth: 2,
   borderBottomWidth: 0.5,
   borderBottomColor: COLORS.WHITE,
   // paddingLeft: WIDTH * 0.15,
    //textAlign: 'center',
    fontFamily: FONT.FAMILY.REGULAR,
   
  },
  iconContainer: {
    position: 'absolute',
    //padding: HEIGHT * 0.03,
   // backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    right: 0,
    top: 20
  },
  icon: {
    width: WIDTH * 0.065,
    height: HEIGHT * 0.027
  },
  label: {
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
   // marginBottom: HEIGHT * 0.02
  },
  phoneRow: {
    width: '100%',
    zIndex: 999999999,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
