import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {COLORS, FONT, WIDTH, HEIGHT} from '../../Utils/constants';
import Button from '../../Components/Common/Button';
import Loader from '../../Components/Common/Loader';
import Network from '../../Services/Network';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux'
import {loginUser, setLocation} from '../../Redux/Actions/authAction'
import AskLocationPop from '../../Components/AuthComponent/askLocationPop';

export default function OtpVerify(props) {
  const {navigation, route} = props;
  const email = route.params.email ? route.params.email : '';
  const [box1, setBox1] = useState('');
  const [box2, setBox2] = useState('');
  const [box3, setBox3] = useState('');
  const [box4, setBox4] = useState('');
  const [myUserData, setMyUserData] = useState(null);
  const [locationModal, setLocationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();

  const clearBoxes = () => {
    setBox1('');
    setBox2('');
    setBox3('');
    setBox4('');
  }

  const submitOtp = () => {
    setLoading(true);
    const otp = `${box1}${box2}${box3}${box4}`;
    const data = {email, otp};
    Network('/user/verify_email', 'post', data)
      .then(async (response) => {
        if (response.success) {
          Toast.show('OTP verified successfully');
          await AsyncStorage.setItem('@user', JSON.stringify(response.data))
          setMyUserData(response.data)
          setLocationModal(true)
         // dispatch(loginUser(response.data))
          //navigation.replace('Home')
          setLoading(false);
        } else {
          setLoading(false);
          Toast.show('Invalid OTP please try again !');
          clearBoxes()
        }
      })
      .catch((error) => {
        setLoading(false);
        clearBoxes()
      });
  };

  const setUserLocation = (position) => {
    if(position) {
      dispatch(setLocation(position));
      dispatch(loginUser(myUserData));
    }
  } 

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <AskLocationPop 
         modalVisible={locationModal}
         getlocation={(pos) => setUserLocation(pos)}
         close={() => setLocationModal(false)}
         data={myUserData}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Check your E-mail, we have sent you the pin at {' '}
          <Text style={styles.emailText}>{email}</Text>
        </Text>
      </View>

      <View style={styles.otpInput}>
        <TextInput
          style={styles.optBox}
          value={box1}
          onChangeText={(text) => {
            setBox1(text);
            ref_input2.current.focus();
          }}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="done"
        />
        <TextInput
          style={styles.optBox}
          value={box2}
          onChangeText={(text) => {
            setBox2(text);
            ref_input3.current.focus();
          }}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="done"
          ref={ref_input2}
        />
        <TextInput
          style={styles.optBox}
          value={box3}
          onChangeText={(text) => {
            setBox3(text);
            ref_input4.current.focus();
          }}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="done"
          ref={ref_input3}
        />
        <TextInput
          style={styles.optBox}
          value={box4}
          onChangeText={(text) => setBox4(text)}
          keyboardType="number-pad"
          maxLength={1}
          returnKeyType="done"
          ref={ref_input4}
        />
      </View>

      <Text style={styles.emailText}>Didn't receive email ?</Text>
      <View style={styles.buttonContainer}>
        <Button onPress={submitOtp} width="80%" title="Continue" type="" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '20%',
    backgroundColor: COLORS.WHITE,
  },
  textContainer: {
    width: '80%',
    alignItems: 'center',
  },
  text: {
    color: COLORS.PRIMARY,
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.LARGE,
    textAlign: 'center',
  },
  emailText: {
    color: COLORS.PRIMARY,
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.MEDIUM,
  },
  otpInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: HEIGHT * 0.04,
  },
  optBox: {
    width: WIDTH * 0.13,
    height: HEIGHT * 0.06,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: COLORS.GRAY,
    textAlign: 'center',
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    color: COLORS.SECONDARY,
    fontSize: FONT.SIZE.LARGE,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '5%',
    width: '100%',
    alignItems: 'center',
  },
});
