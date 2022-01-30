import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {HEIGHT, WIDTH, COLORS, FONT} from '../../Utils/constants';
import CountryCodes from '../../Components/AuthComponent/country.json';
import Button from '../Common/Button';

export default function CountryCodePicker({changeCode}) {
  const [country, setCountry] = useState('+1');
  const [showPicker, setShow] = useState(false);
  return (
    <View style={{width: '100%'}}>
      <Modal visible={showPicker} animationType="slide" transparent={true}>
        <View style={styles.pickerModel}>
          <View style={styles.content}>
            <Picker
              selectedValue={country}
              mode="dropdown"
              style={{
                // position: 'absolute',
                // top: HEIGHT * 0.5,
                zIndex: 9999,
                height: HEIGHT * 0.35,
                width: '100%',
                backgroundColor: COLORS.WHITE,
                //borderWidth: 0.5,
                borderColor: COLORS.GRAY,
              }}
              onValueChange={(itemValue, itemIndex) => {setCountry(itemValue); changeCode(itemValue) }}>
              {CountryCodes &&
                CountryCodes.map((country, idx) => {
                  return (
                    <Picker.Item
                      key={idx}
                      label={`${country.name}`}
                      value={`${country.dial_code}`}
                    />
                  );
                })}
            </Picker>
            <Button onPress={() => setShow(false)} title="Done" />
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setShow(!showPicker)} style={styles.container}>
        <Text style={styles.codeText} >
          {country}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    //alignSelf: 'center',
   // backgroundColor: COLORS.WHITE,
    padding: HEIGHT * 0.01,
    paddingBottom: HEIGHT * 0.017,
    marginTop: HEIGHT * 0.01,
    borderBottomWidth: 1,
    borderColor: COLORS.WHITE
  },
  codeText: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    textAlign: 'center',
    color: COLORS.WHITE,
  },

  pickerModel: {
    flex: 1,
    backgroundColor: '#d0c4c452',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.45,
    backgroundColor: COLORS.WHITE
  }
});
