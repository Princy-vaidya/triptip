import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Loader from '../../Components/Common/Loader';
import {HEIGHT, WIDTH, COLORS, GAP, FONT} from '../../Utils/constants';
import {Formik} from 'formik';
import LoginInput from '../../Components/Inputs/loginInput';
import Network from '../../Services/Network';
import Toast from 'react-native-root-toast';
import * as Yup from 'yup';
import Button from '../../Components/Common/Button';
import { globalStyle } from '../../Utils/styles';


export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, SetshowSuccess] = useState(false);

  const resetPassword = (values) => {
    setLoading(true)
    Network('/user/forget_password_email', 'post',{email: values.email.toLowerCase()}).then((res) => {
      setLoading(false)
      if(res.success) {
        SetshowSuccess(true)
        Toast.show('Reset password email has been sent!')
      } else {
        Toast.show(res.message)
      }
    }).catch(error => {
      Toast.show(error)
      setLoading(false)
    })
  }

  const Validate = Yup.object().shape({
    email: Yup.string()
      .email('Not a valid email !')
      .required('Email is required !')
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../Assets/background.png')}>
      <View style={styles.contain}>
      <Loader loading={loading} />
      <Text style={[globalStyle.SemiboldMedium, styles.siginText]}>Forgot Password </Text>
      <Text style={styles.subText}>A password reset link will be sent to your email.</Text>
      <Formik
        initialValues={{email: ''}}
        onSubmit={(values) => resetPassword(values)}
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
              label="Email"
              onChange={handleChange('email')}
              type="email"
              icon={require('./../../Assets/Auths/mail.png')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <Text style={styles.formError}>{errors.email}</Text>
            )}

            <Button
              disabled={!isValid}
              onPress={handleSubmit}
              type="white"
              title="Reset Password"
            />
          </>
        )}
      </Formik>
      {showSuccess && <Text style={styles.successMsg}>Password reset email has been sent.
       Please check your email.</Text>}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: HEIGHT,
    width: WIDTH,
    alignItems: 'center'
  },
  contain: {
    width: WIDTH * 0.9,
    alignItems: 'center'
  },
  siginText: {
    color: COLORS.WHITE,
    marginVertical: GAP.LARGE,
  },
  subText: {
    fontFamily: FONT.FAMILY.REGULAR,
    fontSize: FONT.SIZE.SMALL,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: -GAP.MEDIUM,
    marginBottom: GAP.MEDIUM
  },
  formError: {
    color: COLORS.WHITE,
    fontFamily: FONT.FAMILY.REGULAR,
    textAlign: 'center',
    fontSize: FONT.SIZE.SMALL,
  },
  successMsg: {
    fontFamily: FONT.FAMILY.SEMI_BOLD,
    fontSize: FONT.SIZE.MEDIUM,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginTop: GAP.MEDIUM + 10
  }
});
