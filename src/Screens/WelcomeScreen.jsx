import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Logo from './../../assets/logo.png'
import {button1, button} from '../components/button'
const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.childcontainer1}>
          <Image style={styles.logo} source={Logo}/>
          <Text style={button}
          onPress={() => navigation.navigate('Login')}>Login</Text>
          <Text style={button}
          onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#f3c4fb'
  },
  childcontainer1:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    height: '100%',
    width: '100%'
  },

  logo: {
    width: 300,
    height: 300,

  }
})