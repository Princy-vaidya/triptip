import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {HEIGHT, GAP, COLORS, FONT, WIDTH} from '../../Utils/constants';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton(props) {
  const {disabled, onPress} = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <LinearGradient
        colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
        start={{x: 1, y: 0}}
        style={styles.container}>
        <Text style={styles.button}>
          {props.title ? props.title : 'button'}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: WIDTH * 0.9,
    padding: HEIGHT * 0.023,
  },
  button: {
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
  },
});
