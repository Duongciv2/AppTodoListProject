import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigation from './src/Navigation/TabNavigation'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import Login from './src/authentication/Login';
import SignUp from './src/authentication/SignUp';
// import Login from './src/screens/LoginScreen/Login.jsx'
// import Welcome from './src/screens/WelcomeScreen/WelcomeScreen.jsx'
// import SignUp from './src/screens/SignupScreen/Signup.jsx'

const Stack = createNativeStackNavigator()

export default function App() {

    return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name = 'Login' component={Login}/>
        <Stack.Screen name = 'SignUp' component={SignUp}/>
        <Stack.Screen
          name="Home"
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );




  // return (
  // <NavigationContainer>
  // <TabNavigation/>
  // </NavigationContainer>
  // );
  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator screenOptions={{headerShown: false}}>
  //       <Stack.Screen name = 'Welcome' component={Welcome}/>
  //       <Stack.Screen name = 'Login' component={Login}/>
  //       <Stack.Screen name = 'SignUp' component={SignUp}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}


// return (
// <NavigationContainer>
// <TabNavigation/>
// </NavigationContainer>
// );