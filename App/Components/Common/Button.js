import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { HEIGHT, GAP, COLORS, FONT } from '../../Utils/constants';

export default function Button(props) {
  const {disabled} = props
  return (
    <TouchableOpacity disabled={disabled} onPress={props.onPress} style={[props.type === "white" ? styles.buttonWhite : styles.buttonDark, props.width ? {width: props.width} : {}]}>
      <Text style={props.type === "white" ? styles.whiteButtonText : styles.darkButtonText}>
        {props.title ? props.title : 'button'}
      </Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  buttonWhite: {
    //width: '100%',
    padding: HEIGHT * 0.019,
    backgroundColor: COLORS.WHITE,
    marginVertical: GAP.SMALL + 5,
    //borderWidth: 1,
  },
  whiteButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.REGULAR
  },
  buttonDark: {
    //width: '100%',
    padding: HEIGHT * 0.02,
    backgroundColor: COLORS.PRIMARY,
    marginVertical: GAP.SMALL + 5
  },
  darkButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.SEMI_BOLD
  },
})