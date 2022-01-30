import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { COLORS, HEIGHT, FONT, WIDTH, GAP } from '../../Utils/constants';

export default function FacebookLogin(props) {
  const { receiveResponse } = props
  const onLogin = () => {
    LoginManager.setLoginBehavior('browser');
    LoginManager.logInWithPermissions(["public_profile", 'email']).then(
      function (result) { 
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture.type(large),email',
              null,
              (err, res) => receiveResponse(err, res)
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          })
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    )
  }

  return (
    <TouchableOpacity onPress={onLogin} style={styles.btnContainer}>
      <Image resizeMode="contain" source={require('../../Assets/Auths/facebook.png')} style={styles.fbIcon} />
      <Text style={styles.btnText}>Facebook</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    alignItems:'center',
    backgroundColor: '#153979',
    borderRadius: 8,
    padding: HEIGHT * 0.020,
    marginVertical: HEIGHT * 0.02,
  },
  btnText :{
    color: COLORS.WHITE,
    fontSize: FONT.SIZE.MEDIUM,
    fontFamily: FONT.FAMILY.BOLD,
    textTransform: 'uppercase'
  },
  fbIcon: {
    width: WIDTH * 0.08,
    height: HEIGHT * 0.035,
    marginHorizontal: GAP.SMALL
  }
})