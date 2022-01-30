import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { HEIGHT, COLORS, WIDTH, FONT, GAP } from '../../Utils/constants';
import * as Animatable from 'react-native-animatable';
import CheckBox from '@react-native-community/checkbox';

export default function TermsCondition(props) {
  const {value, onChange} = props
  console.log("Value111", value);
  
  useEffect(() => {

  }, [value])

  const changeSelector = (value) => { 
    console.log("ch", value);
    
    onChange(value)
  }

  return (
    <Animatable.View animation="fadeInDown" style={styles.container}>
      <View style={styles.selectContainer}>
        <CheckBox
          disabled={false}
          value={value ? value : false}
          boxType="square"
          style={{marginHorizontal: 10, width: WIDTH * 0.03, height: HEIGHT * 0.03, marginRight: 10 }}
          tintColor={COLORS.WHITE}
          offAnimationType="flat"
          checkboxSize={10}
          CheckboxIconSize={10} 
          onValueChange={(newValue) => changeSelector(newValue)}
        />
         <Text style={styles.lable}>Accept <Text style={{color: '#000'}}>Privacy Policy</Text> and <Text style={{color: '#000'}}>Terms & Condition</Text>  </Text>
      </View>
    </Animatable.View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginVertical: HEIGHT * 0.02,
    alignItems: 'flex-start'
  },
  lable: {
    color: COLORS.WHITE,
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'center',
    marginVertical: HEIGHT * 0.02
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems:'center'
  },
  activeContainer: {
    padding: HEIGHT * 0.02,
    borderRadius: 100,
    backgroundColor: COLORS.WHITE,
    borderWidth: 0.6,
    borderColor: COLORS.GRAY,
    marginHorizontal: GAP.SMALL
  },
  inactiveContainer: {
    padding: HEIGHT * 0.02,
    borderRadius: 100,
    backgroundColor: '#b7014863',
    borderWidth: 0.6,
    borderColor: COLORS.GRAY,
    marginHorizontal: GAP.SMALL
  },
  genderIcon: {
    height: HEIGHT * 0.023,
    width: WIDTH * 0.05
  }
})