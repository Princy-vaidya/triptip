import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {globalStyle} from '../../Utils/styles';
import {HEIGHT, WIDTH, COLORS, GAP, FONT} from '../../Utils/constants';
import LoginInput from '../../Components/Inputs/loginInput';
import Button from '../../Components/Common/Button';
import {Validate} from '../../Components/Inputs/signupValidate';
import TermsCondition from '../../Components/Inputs/termsCheckBox'
import {Formik} from 'formik';
import Network from '../../Services/Network';
import Loader from '../../Components/Common/Loader';
import Toast from 'react-native-root-toast';
import LocationInput from '../../Components/Inputs/locationInput';
import Md5 from 'md5';
import AskLocationPop from '../../Components/AuthComponent/askLocationPop';
import PhoneEntry from '../../Components/AuthComponent/phoneEntry'
import Geolocation from '@react-native-community/geolocation';


export default function Signup(props) {
  const {navigate} = props.navigation;
  const [loading, setLoading] = useState(false);
  const [countryCode, setCode] = useState('+1');
  const [myLocation, setLocation] = useState();

  useEffect(() => {
    askLocationPermission()
  }, [])

  const askLocationPermission = async () => {
    try {
     await Geolocation.requestAuthorization();
     setTimeout(() => {
      Geolocation.getCurrentPosition((position, error) => {
        if(!error) {
         // getlocation(position)
         setLocation(position.coords)  
        } else {  
          Alert.alert('Failed', 'Failed to fetch your location. Allow location access and try again',
          [
            { text: "Try again", onPress: () => askLocationPermission}    
          ],{ cancelable: false })
        }
      });
     }, 2000)
    } catch (err) {
      Alert.alert('Failed', 'Failed to fetch your location. Allow location access and try again',
      [
        { text: "Try again", onPress: () => askLocationPermission}    
      ],{ cancelable: false })
    }
  }

  const registerSubmit = (values) => {
    const location = JSON.parse(values.location)
    const lat = location.lat
    const lng = location.lng
    const city = location.city
    const state = location.state
    const country = location.country
    const address = location.address
    const zip = location.zipcode

    setLoading(true);
    let email = values.email.toLowerCase();
    const data = {
      email,
      first_name: values.firstname,
      last_name: values.lastname,
      latitude: lat,
      longitude: lng,
      address,
      zip,
      city,
      state,
      country,
      password: Md5(values.password),
      phone: `${countryCode}${values.phone}`,
    };

    console.log("Data", data);
    
    Network('/user/register_user', 'post', data)
      .then((res) => {
        if (res.success) {
          setLoading(false);
          navigate('Verification', {email});
        } else {
          setLoading(false);
          Toast.show(res.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show("Something went wrong !");
      });
  };
 
  return (
    <ImageBackground
      style={styles.container}
      source={require('../../Assets/background.png')}>
      <ScrollView keyboardShouldPersistTaps='always'>
        <Loader loading={loading} />
        <KeyboardAvoidingView style={{}}>
          <Animatable.View animation="fadeInDown" style={styles.subContainer}>
            <Logo />
            <Formik
              initialValues={{email: '', terms: true}}
              onSubmit={(values) => registerSubmit(values)}
              validationSchema={Validate}>
              {({
                values,
                handleChange,
                errors,
                isValid,
                handleSubmit,
                setFieldTouched,
                touched,
              }) => (
                <>
                  <LoginInput
                    placeholder="First Name"
                    label="First Name"
                    value={values.firstname}
                    onChange={handleChange('firstname')}
                    icon={require('./../../Assets/Auths/user.png')}
                    onBlur={() => setFieldTouched('firstname')}
                  />
                   {touched.firstname && errors.firstname && (
                    <Text style={styles.formError}>{errors.firstname}</Text>
                   )}
                   <LoginInput
                    placeholder="Last Name"
                    label="Last Name"
                    value={values.lastname}
                    onChange={handleChange('lastname')}
                    icon={require('./../../Assets/Auths/user.png')}
                    onBlur={() => setFieldTouched('lastname')}
                  />
                   {touched.lastname && errors.lastname && (
                    <Text style={styles.formError}>{errors.lastname}</Text>
                   )}
                  
                  <LoginInput
                    placeholder="Enter your E-mail"
                    label="Email"
                    value={values.email}
                    onChange={handleChange('email')}
                    type="email"
                    icon={require('./../../Assets/Auths/mail.png')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.formError}>{errors.email}</Text>
                  )}
                  <PhoneEntry 
                    placeholder="Enter Phone-number"
                    label="Phone"
                    countryCode={(code) => setCode(code)}
                    value={values.phone}
                    onChange={handleChange('phone')}
                    icon={require('./../../Assets/Auths/call.png')}
                    onBlur={() => setFieldTouched('phone')}
                    keyboard="number-pad"
                    max={10}
                  />
                  {/* <CountryCodePicker /> */}
                  {/* <LoginInput
                    placeholder="Enter Phone-number"
                    label="Phone"
                    value={values.phone}
                    onChange={handleChange('phone')}
                    icon={require('./../../Assets/Auths/call.png')}
                    onBlur={() => setFieldTouched('phone')}
                    keyboard="number-pad"
                    max={10}
                  /> */}
                   {touched.phone && errors.phone && (
                    <Text style={styles.formError}>{errors.phone}</Text>
                  )}

                  <LocationInput 
                    value={myLocation}
                    onChange={handleChange('location')}
                  />
                  {errors.location && (
                    <Text style={styles.formError}>{errors.location}</Text>
                  )}
                  <LoginInput
                    placeholder="Enter new password"
                    label="Password"
                    value={values.password}
                    type="password"
                    onChange={handleChange('password')}
                    icon={require('./../../Assets/Auths/lock.png')}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.formError}>{errors.password}</Text>
                  )}
                  <LoginInput
                    placeholder="Re-enter new password"
                    label="Confirm password"
                    value={values.cpassword}
                    type="password"
                    onChange={handleChange('cpassword')}
                    icon={require('./../../Assets/Auths/lock.png')}
                    onBlur={() => setFieldTouched('cpassword')}
                  />
                  {touched.cpassword && errors.cpassword && (
                    <Text style={styles.formError}>{errors.cpassword}</Text>
                  )}

                  <TermsCondition
                    value={values.terms}
                    onChange={handleChange('terms')}
                  />

                  {touched.terms && errors.terms && (
                    <Text style={styles.formError}>{errors.terms}</Text>
                  )}
                <View style={{width: WIDTH * 0.85}}>
                  <Button
                    //disabled={!isValid}
                    onPress={handleSubmit}
                    type="white"
                    title="Sign Up"
                  />
                </View>
                  
                </>
              )}
            </Formik>

            {/* <Button type="white" title="Register" onPress={registerSubmit} /> */}
            <NewSignupText onPress={() => props.navigation.navigate('Login')} />
          </Animatable.View>
        </KeyboardAvoidingView>
      </ScrollView>
    </ImageBackground>
  );
}

const Logo = () => {
  return (
    <Image
      resizeMode="contain"
      source={require('../../Assets/logo.png')}
      style={styles.logo}
    />
  );
};

const ForgotPass = () => {
  return (
    <View style={styles.forgotPassContainer}>
      <Text style={styles.forgotPass}>Forgot password ?</Text>
    </View>
  );
};

const NewSignupText = (props) => {
  return (
    <View style={styles.newUser}>
      <Text onPress={props.onPress} style={styles.newUserText}>
        Already have an account ?{' '}
        <Text style={{fontFamily: FONT.FAMILY.BOLD}}> Signin</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
  },
  subContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '85%',
    marginVertical: '15%',
  },
  logo: {
    width: WIDTH * 0.22,
    height: HEIGHT * 0.15,
  },
  siginText: {
    color: COLORS.WHITE,
    marginVertical: GAP.LARGE,
  },
  forgotPass: {
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'right',
  },
  forgotPassContainer: {
    marginVertical: HEIGHT * 0.01,
    alignSelf: 'flex-end',
  },
  loginButton: {
    width: '100%',
    padding: HEIGHT * 0.02,
    backgroundColor: COLORS.WHITE,
    borderRadius: 100,
    marginVertical: GAP.SMALL,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    textTransform: 'uppercase',
    fontFamily: FONT.FAMILY.REGULAR,
  },
  newUser: {
    marginTop: HEIGHT * 0.03,
  },
  newUserText: {
    textAlign: 'center',
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.LARGE,
  },
  formError: {
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'center',
    fontSize: FONT.SIZE.SMALL,
  },
});
