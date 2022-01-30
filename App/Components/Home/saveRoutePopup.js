import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TextInput} from 'react-native';
import { HEIGHT, WIDTH, COLORS, FONT } from '../../Utils/constants';
import Button from '../Common/Button';
import Loader from '../Common/Loader';

export default function SaveRoutePopup({visible, close, onSaveRoute, loading}) {

  const [routeName, setRouteName] = useState('')
  const [routeNote, setRouteNote] = useState('')
  const [error, setError] = useState(false)

  const saveRoute = () => {
    if(routeName == '') {
      setError(true)
    } else {
      setError(false)
      setRouteName('')
      setRouteNote('')
      onSaveRoute({routeName, routeNote})
    }
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={() => close()}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.container}>
      <Loader loading={loading} />
          <View style={styles.content}>
          <Text style={styles.head_text}>Save this Route</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Route Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={t => setRouteName(t)}
                value={routeName}
                placeholder="Enter a name for this route"
              />
               <Text style={styles.label}>Route Note</Text>
               <TextInput
                style={[styles.input, {height: HEIGHT * 0.05}]}
                onChangeText={t => setRouteNote(t)}
                multiline={true}
                numberOfLines={2}
                value={routeNote}
                placeholder="Enter a note on this route"
              />
               {error && <Text style={styles.errText}>Enter a customized name for this route.</Text>}
            </View>
           
            <View style={styles.buttonContainer}>
              <Button onPress={saveRoute} title="Done" />
              <Button onPress={() => close()} type="white" title="Cancle" />
            </View> 
          </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'pink'
  },
  content: {
    height: HEIGHT * 0.45,
    width: WIDTH * 0.8,
    backgroundColor: COLORS.WHITE,
    shadowColor: '#000',
    borderRadius: 10,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5.84,
  },
  head_text: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.LARGE,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: HEIGHT * 0.03
  },
  input: {
    padding: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.PRIMARY,
    width: '100%',
    height: HEIGHT * 0.04,
    marginBottom: HEIGHT * 0.02
  },
  inputContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: HEIGHT * 0.03
  },
  label: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    textTransform: 'uppercase',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: HEIGHT * 0.01
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly'
  },
  errText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    marginBottom: -30,
    color: 'red'
  }
})