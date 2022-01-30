// import React from 'react';
// import {View, Text, Platform} from 'react-native';
// import appleAuth, {
//   AppleButton,
//   AppleAuthRequestOperation,
//   AppleAuthRequestScope,
//   AppleAuthCredentialState,
// } from '@invertase/react-native-apple-authentication';
// import { WIDTH, HEIGHT } from '../../Utils/constants';

// export default function AppleLogin() {

//   const onAppleButtonPress = async (result) => {
//     const appleAuthRequestResponse = await appleAuth.performRequest({
//       requestedOperation: AppleAuthRequestOperation.LOGIN,
//       requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
//     });
  
//     // get current authentication state for user
//     // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
//  //   const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
//     // use credentialState response to ensure the user is authenticated
//     if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
//       // user is authenticated
//     }
//   }

//   return (
//     <View>
//       {Platform.OS === "ios" &&
//       <AppleButton
//         buttonStyle={AppleButton.Style.BLACK}
//         buttonType={AppleButton.Type.SIGN_IN}
//         style={{
//           width: WIDTH * 0.35,
//           height: HEIGHT * 0.06,
//           borderRadius: 100,
//           borderWidth: 1
//         }}
//         onPress={() => onAppleButtonPress()}
//       />
//       }
//     </View>
//   );
// }
