import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FacebookLogin from '../../Components/AuthComponent/facebookLogin';
import GoogleLogin from '../../Components/AuthComponent/googleLogin';
import {HEIGHT, WIDTH, COLORS, GAP, FONT} from '../../Utils/constants';
import LoginInput from '../../Components/Inputs/loginInput';
import Button from '../../Components/Common/Button';
import Network from '../../Services/Network';
import Toast from 'react-native-root-toast';
import Loader from '../../Components/Common/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {loginUser, setLocation} from '../../Redux/Actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Md5 from 'md5';
import AskLocationPop from '../../Components/AuthComponent/askLocationPop';

export default function Login(props) {
  const {navigation} = props;
  const [loading, setLoading] = useState(false);
  const [locationModal, setLocationModal] = useState(false);

  const [socialData, setSocialData] = useState(null);

  const dispatch = useDispatch();

  const loginSubmit = (values) => {
    setLoading(true);
    const data = {
      email: values.email.toLowerCase(),
      md_password: Md5(values.password),
    };
    Network('/user/user_login', 'post', data)
      .then(async (res) => {
        setLoading(false);
        if (res.success) {
          setLoading(false);
          if (res.data.user_details._id) {
            dispatch(loginUser(res.data.user_details));
          } else {
            Toast.show('Something went wrong !');
          }
          await AsyncStorage.setItem(
            '@user',
            JSON.stringify(res.data.user_details),
          );
          //  navigation.replace('Splash')
        } else {
          Toast.show('Wrong email or password !');
        }
      })
      .catch((error) => {
        setLoading(false);
        Toast.show('error');
      });
  };

  const facebookResponse = (err, response) => {
    console.log('Facebook res', response);
    if (!err) {
      setSocialData(response);
      setLocationModal(true);
    } else {
      Toast.show('Error with facebook login !');
    }
  };

  const GoogleResponse = (response) => {
   // console.log('Google res', response);
    if (response) {
      const gData = {
        email: response.user.email,
        name: response.user.name,
        id: response.user.id,
        picture: {
          data: {
            url: response.user.photo,
          },
        },
        type: 'GOOGLE',
      };
      setSocialData(gData);
      setLocationModal(true);
    } else {
      Toast.show('Error in google login !');
    }
  };

  const signupTextpress = () => {
    props.navigation.navigate('Signup');
  };

  const forgotPass = () => {
    props.navigation.navigate('ForgotPass');
  };

  const Validate = Yup.object().shape({
    email: Yup.string()
      .email('Not a valid email !')
      .required('Email is required !'),
    password: Yup.string().required('Password is required !'),
  });

  const SocialLogin = () => {
    return (
      <>
        <Text style={styles.socialLoginText}>or sign in with</Text>
        <View style={styles.socialBtnContainer}>
          <GoogleLogin receiveResponse={(res) => GoogleResponse(res)} />
          <FacebookLogin
            receiveResponse={(err, res) => facebookResponse(err, res)}
          />
          {/* <AppleLogin /> */}
        </View>
      </>
    );
  };

  const setUserLocation = (position) => {
    const {coords} = position;
    if (socialData && position) {
      const data = {
        email: socialData.email,
        first_name: socialData.name.substr(0, socialData.name.indexOf(' ')),
        last_name: socialData.name.substr(socialData.name.indexOf(' ') + 1),
        social_id: socialData.id,
        social_image: socialData.picture.data.url,
        login_type: socialData.type ? 'GOOGLE' : 'FACEBOOK',
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      Network('/user/register_user_social', 'post', data)
        .then(async (res) => {
          setLoading(false);
          if (res.success) {
            setLoading(false);
            setLocationModal(false);
            setSocialData(null);
            if (res.data.user_details._id) {
              dispatch(setLocation(position));
              dispatch(loginUser(res.data.user_details));
            } else {
              Toast.show('Something went wrong !');
            }
            await AsyncStorage.setItem(
              '@user',
              JSON.stringify(res.data.user_details),
            );
            //  navigation.replace('Splash')
          } else {
            Toast.show('Something went wrong !');
          }
        })
        .catch((error) => {
          setLoading(false);
          Toast.show(JSON.stringify(error));
        });
    }
  };

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../Assets/background.png')}>
      <Loader loading={loading} />
      <AskLocationPop
        modalVisible={locationModal}
        getlocation={(pos) => setUserLocation(pos)}
        close={() => setLocationModal(false)}
        data={socialData}
      />
      <Animatable.View animation="slideInDown" style={styles.subContainer}>
        <Logo />
        <Formik
          initialValues={{email: ''}}
          onSubmit={(values) => loginSubmit(values)}
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
                placeholder="Email address"
                value={values.email}
                onChange={handleChange('email')}
                type="email"
                label="Email"
                icon={require('./../../Assets/Auths/mail.png')}
                onBlur={() => setFieldTouched('email')}
              />
              {touched.email && errors.email && (
                <Text style={styles.formError}>{errors.email}</Text>
              )}
              <LoginInput
                placeholder="Password"
                value={values.password}
                onChange={handleChange('password')}
                type="password"
                label="Password"
                icon={require('./../../Assets/Auths/lock.png')}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.formError}>{errors.password}</Text>
              )}

              <ForgotPass onPress={forgotPass} />
              <View style={{width: WIDTH * 0.85}}>
                <Button
                  disabled={!isValid}
                  onPress={handleSubmit}
                  type="white"
                  title="Login"
                />
              </View>
            </>
          )}
        </Formik>

        <SocialLogin />
        <NewSignupText onPress={signupTextpress} />
      </Animatable.View>
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

const ForgotPass = (props) => {
  return (
    <View style={styles.forgotPassContainer}>
      <Text onPress={props.onPress} style={styles.forgotPass}>
        Forgot your password ?
      </Text>
    </View>
  );
};

const NewSignupText = (props) => {
  return (
    <View style={styles.newUser}>
      <Text onPress={props.onPress} style={styles.newUserText}>
        I need to create an account ?{' '}
        <Text style={{fontFamily: FONT.FAMILY.BOLD}}> Sign Up</Text>
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
  },
  logo: {
    width: WIDTH * 0.22,
    height: HEIGHT * 0.15,
    marginBottom: HEIGHT * 0.02,
  },
  siginText: {
    color: COLORS.WHITE,
    marginVertical: GAP.LARGE,
  },
  forgotPass: {
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'right',
    padding: 5,
  },
  forgotPassContainer: {
    marginVertical: HEIGHT * 0.015,
    alignSelf: 'center',
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
    marginTop: HEIGHT * 0.09,
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
  socialLoginText: {
    textAlign: 'center',
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    color: COLORS.WHITE,
    textTransform: 'uppercase',
    marginVertical: HEIGHT * 0.02,
  },
  socialBtnContainer: {
    flexDirection: 'row',
    width: WIDTH * 0.85,
    justifyContent: 'space-between',
  },
});
