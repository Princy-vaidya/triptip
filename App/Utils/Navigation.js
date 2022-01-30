import React, {useEffect, useState} from 'react';
import {ImageBackground, Text, Image, TouchableOpacity, View} from 'react-native';
import Home from './../Screens/Home';
import RouteSuggesion from './../Screens/Home/routeSuggesion';
import CurrentTravel from './../Screens/Home/currentTravel';
import LoginScreen from './../Screens/AuthScreens/login';
import SignupScreen from './../Screens/AuthScreens/signup';
import EmailVarifyScreeen from './../Screens/AuthScreens/otpVerify';
import ForgotPassword from '../Screens/AuthScreens/forgotPassword'
import CalendarScreen from '../Screens/Calendar'
import MyRoutesScreen from '../Screens/MyRoute'
import SettingsScreen from '../Screens/Settings'
import MessageScreen from '../Screens/Message'
import Splash from './../Screens/splash';
import PlaceDetails from '../Screens/Home/placeDetails'
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {HEIGHT, COLORS, WIDTH, FONT} from './constants';
import {useSelector} from 'react-redux';
import DrawerComponent from '../Components/Common/DrawerComponent';
import EventDetails from '../Screens/Home/eventDetails'
// import MyTabBar from './customTab'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


export default Navigation = () => {
  const userdata = useSelector((state) => state.userdata);
  const [userMe, setUser] = useState(null);

  useEffect(() => {
    let user = userdata && userdata._id ? true : false
    setUser(user);
  }, [userdata]);

  const LogoTitle = (props) => {
    return (
      <Image
        source={require('./../Assets/logo.png')}
        style={{
          width: 35,
          height: 35,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  };

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            headerStyle: {height: HEIGHT * 0.1, backgroundColor: COLORS.SECONDARY},
            headerTitle: "",
            headerRight: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />), 
          }}
        />
        <Stack.Screen name="PlaceDetails" component={PlaceDetails}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: 'transparent'},
            headerTitle: "Hello",
            headerRight: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />) 
          }}
        />
         <Stack.Screen name="RouteSuggesion" component={RouteSuggesion}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: COLORS.SECONDARY},
            headerTitle: "Route Suggesion",
            headerRight: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />) 
          }}
        />
         <Stack.Screen name="CurrentTravel" component={CurrentTravel}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: COLORS.SECONDARY},
            headerTitle: "Current Travels",
            headerRight: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />) 
          }}
        />
          <Stack.Screen name="EventDetails" component={EventDetails}
            options={{
              headerShown: true,
              headerStyle: {backgroundColor: 'transparent'},
              headerTitle: "EventDetails",
             // headerLeft: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />) 
            }}
         />
      </Stack.Navigator>
    );
  };

  const CalendarStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            headerShown: true,
           // headerStyle: {height: HEIGHT * 0.12},
            headerTitle: 'Calendar',
            headerStyle: {backgroundColor: COLORS.SECONDARY},
            headerLeft: (props) => (<Image source={require('../Assets/Home/menu.png')} resizeMode="contain" style={{width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04}} />) ,
            headerRight: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />) 
          }}
        />
      </Stack.Navigator>
    );
  };

  const MyRouteStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyRoute"
          component={MyRoutesScreen}
          options={{
            headerShown: true,
            headerStyle: {backgroundColor: COLORS.SECONDARY},
           // headerStyle: {height: HEIGHT * 0.12},
            headerTitle: "My Routes",
            headerLeft: (props) => (<Image source={require('../Assets/Home/menu.png')} resizeMode="contain" style={{width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04}} />) ,
            headerRight: (props) => (<Image source={require('../Assets/Home/notification.png')} resizeMode="contain" style={{width: WIDTH * 0.065, height: HEIGHT * 0.03, marginRight: WIDTH * 0.04}} />) 
          }}
        />
      </Stack.Navigator>
    );
  };


  const MessageStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Message"
          component={MessageScreen}
          options={{
            headerShown: true,
            headerStyle: {height: HEIGHT * 0.12},
            headerTitle: (props) => <LogoTitle {...props} />,
           // headerLeft: (props) => (<Image source={require('../Assets/Home/Menu.png')} resizeMode="contain" style={{width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04}} />) 
          }}
        />
      </Stack.Navigator>
    );
  };

  const SettingsStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Setting"
          component={SettingsScreen}
          options={{
            headerShown: true,
            headerStyle: {height: HEIGHT * 0.12},
            headerTitle: (props) => <LogoTitle {...props} />,
           // headerLeft: (props) => (<Image source={require('../Assets/Home/Menu.png')} resizeMode="contain" style={{width: WIDTH * 0.055, HEIGHT: HEIGHT * 0.01, marginLeft: WIDTH * 0.04}} />) 
          }}
        />
      </Stack.Navigator>
    );
  };


  return (
    <>
      {userMe ? (
        <>
          <Drawer.Navigator drawerContent={(props) => (<DrawerComponent {...props}/>)} drawerType="slide" initialRouteName="Home" >
            <Drawer.Screen 
              name="Home" 
              component={HomeStack}
            />
            <Drawer.Screen name="Calendar" component={CalendarStack} />
            <Drawer.Screen name="MyRoute" component={MyRouteStack} />
            <Drawer.Screen name="Message" component={MessageStack} />
            <Drawer.Screen name="Settings" component={SettingsStack} />
          </Drawer.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={LoginScreen} />

            <Stack.Screen options={{
                headerShown: true,
                headerTitle: 'Forgot Password',
                headerStyle: {backgroundColor: COLORS.SECONDARY},
              }} name="ForgotPass" component={ForgotPassword} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen
              name="Verification"
              component={EmailVarifyScreeen}
              options={{
                headerShown: true,
                headerTitle: 'Verification Code',
                headerBackTitle: '',
                headerStyle: {backgroundColor: '#fff'},
              }}
            />
          </Stack.Navigator>
        </>
      )}
    </>
  );
};
