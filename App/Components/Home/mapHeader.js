import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { HEIGHT, COLORS, WIDTH, FONT, PLACE_TYPE, PLACE_COLOR } from '../../Utils/constants';
import * as Animatable from 'react-native-animatable';

export default function MapHeader({activeType, changeType, disabled}) {

  const ALL_TYPES = `${PLACE_TYPE.ATTRACTION},${PLACE_TYPE.ART_GALLERY},${PLACE_TYPE.BAR},${PLACE_TYPE.CAFE},${PLACE_TYPE.MUSEUM},${PLACE_TYPE.RESTAURANT}`

  return (
    <LinearGradient colors={[COLORS.SECONDARY, '#ecececde']} style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalSlider}>
        <Animatable.Text  onPress={() => !disabled && changeType(ALL_TYPES)} style={[ activeType == ALL_TYPES ? [styles.activeoption, {backgroundColor: PLACE_COLOR["all"]}] : styles.optionText]}>All</Animatable.Text>
        <Animatable.Text  onPress={() => !disabled && changeType(PLACE_TYPE.ATTRACTION)} style={[ activeType == PLACE_TYPE.ATTRACTION ? [styles.activeoption, {backgroundColor: PLACE_COLOR[activeType]}] : styles.optionText]}>Attraction</Animatable.Text>
        <Animatable.Text  onPress={() => !disabled && changeType(PLACE_TYPE.RESTAURANT)} style={[ activeType == PLACE_TYPE.RESTAURANT ? [styles.activeoption, {backgroundColor: PLACE_COLOR[activeType]}] : styles.optionText]}>Resturents</Animatable.Text>
        <Animatable.Text  onPress={() => !disabled && changeType(PLACE_TYPE.BAR)} style={[ activeType == PLACE_TYPE.BAR ? [styles.activeoption, {backgroundColor: PLACE_COLOR[activeType]}] : styles.optionText]}>Bars/Cafe</Animatable.Text>
        <Animatable.Text  onPress={() => !disabled && changeType(PLACE_TYPE.MUSEUM)} style={[ activeType == PLACE_TYPE.MUSEUM ? [styles.activeoption, {backgroundColor: PLACE_COLOR[activeType]}] : styles.optionText]}>Museum</Animatable.Text>
        {/* <Animatable.Text  onPress={() => !disabled && changeType(PLACE_TYPE.EVENTS)} style={[ activeType == PLACE_TYPE.EVENTS ? [styles.activeoption, {backgroundColor: PLACE_COLOR[activeType]}] : styles.optionText]}>Events</Animatable.Text> */}
        </ScrollView>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingBottom: HEIGHT * 0.08,
    backgroundColor: 'transparent'
  },
  horizontalSlider: {
    marginVertical: HEIGHT * 0.01,
    marginLeft: WIDTH * 0.03
  },
  optionText: {
    marginHorizontal: WIDTH * 0.02,
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    padding: 5,
  },
  activeoption: {
    color: COLORS.WHITE,
    marginHorizontal: WIDTH * 0.02,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    padding: 4,
    borderRadius: 3,
    overflow: 'hidden',
    shadowColor: COLORS.WHITE,
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 3.84,
  },
})