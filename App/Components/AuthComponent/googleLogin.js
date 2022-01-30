import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { COLORS, HEIGHT, FONT, WIDTH, GAP } from '../../Utils/constants';

export default function GoogleLogin(props) {
  const { receiveResponse } = props

  GoogleSignin.configure({
    scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '547051479870-ak332mdihvec2r72ve8f317f2p9qe9uh.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    iosClientId: '547051479870-ak332mdihvec2r72ve8f317f2p9qe9uh.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  });

   const signIn = async () => {
     console.log('hello');
     
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log("Google", userInfo);
          
          receiveResponse(userInfo)
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("Cancled");
          } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log("Running");
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log("Not Enable", error);
          } else {
            console.log("ERROR", error);
          }
        }
      };
  return (
    <TouchableOpacity onPress={signIn} style={styles.btnContainer}>
      <Image resizeMode="contain" source={require('../../Assets/Auths/google.png')} style={styles.fbIcon} />
      <Text style={styles.btnText}>Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: '.center',
    justifyContent: 'center',
    width: '45%',
    padding: 10,
    alignItems:'center',
    backgroundColor: '#ab2433',
    borderRadius: 8,
   
    padding: HEIGHT * 0.020,
    marginVertical: HEIGHT * 0.02
  },
  btnText :{
    color: COLORS.WHITE,
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.BOLD,
    textTransform: 'uppercase'
  },
  fbIcon: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.03,
    marginHorizontal: GAP.SMALL
  }
})